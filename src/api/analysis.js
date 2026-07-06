// 백엔드 퍼스널컬러 값(예: "Spring (봄 웜)") → 프론트 데이터 키("Warm Spring") 매핑
const SEASON_TO_ENG = {
    Spring: "Warm Spring",
    Summer: "Cool Summer",
    Autumn: "Warm Autumn",
    Winter: "Cool Winter",
};

// 응답 문자열에 포함된 계절 키워드로 프론트 eng 키를 찾음 (없으면 원본 그대로)
function toToneEng(personalColor) {
    if (!personalColor) return null;
    const season = Object.keys(SEASON_TO_ENG).find((s) => personalColor.includes(s));
    return season ? SEASON_TO_ENG[season] : personalColor;
}

async function parseErrorMessage(res) {
    try {
        const body = await res.json();
        if (typeof body?.message === "string" && body.message) return body.message;
        if (typeof body?.detail === "string" && body.detail) return body.detail;
        if (Array.isArray(body?.detail)) {
            return body.detail.map((item) => item?.msg ?? item).join(", ");
        }
    } catch {
        // JSON 파싱 실패 시 status만 사용
    }
    return `요청 실패 (${res.status})`;
}

// dataURL(웹캠 캡처) → File 변환
export function dataUrlToFile(dataUrl, filename = "capture.jpg") {
    const [meta, data] = dataUrl.split(",");
    const mime = meta.match(/:(.*?);/)[1];
    const bytes = atob(data);
    const arr = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
    return new File([arr], filename, { type: mime });
}

// 1차 진단(Spring): 퍼스널컬러 + 피부톤 + ROI 파일 목록만 수신 (메이크업 결과는 포함하지 않음)
export async function postAnalysis(imageFile) {
    const formData = new FormData();
    formData.append("file", imageFile);

    const res = await fetch("/api/analysis", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        throw new Error(await parseErrorMessage(res));
    }

    const body = await res.json();
    // 스프링 응답 구조: { message, results: { data: {...DiagnoseResponse...} } }
    const data = body?.results?.data ?? body?.data ?? body;
    const makeupInputs = data.files ?? data.makeup_inputs ?? [];

    // 백엔드 응답 포맷(camelCase/snake_case) 혼재 대비 방어 코드
    return {
        personal_color: toToneEng(data.personal_color || data.personalColor),
        detected_skin_hex: data.detected_skin_hex || data.skinTone || data.detectedSkinHex,
        diagnosis_confidence: data.diagnosis_confidence || data.diagnosisConfidence || null,
        original_image_id: (data.original_image_id ?? data.originalImageId) != null
            ? String(data.original_image_id ?? data.originalImageId) : null,
        original_image_url: data.original_image_url || data.originalImageUrl || null,
        makeup_image_url: data.makeup_image_url || data.makeupImageUrl || null,
        makeup_inputs: Array.isArray(makeupInputs) ? makeupInputs : [],
    };
}

// 2차 메이크업(FastAPI): React에서 독립적으로 격발 — Spring 파이프라인과 분리
export async function postVirtualMakeup({ originalImageId, targetFoundationHex, files }) {
    if (!originalImageId || !files?.length) {
        throw new Error("메이크업 요청에 originalImageId 또는 files가 없습니다.");
    }

    const res = await fetch("/ai/virtual-makeup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            original_image_id: String(originalImageId),
            ...(targetFoundationHex ? { target_foundation_hex: targetFoundationHex } : {}),
            files,
        }),
    });

    if (!res.ok) {
        throw new Error(await parseErrorMessage(res));
    }

    const data = await res.json();
    return { makeupImageUrl: data.makeup_image_url };
}
