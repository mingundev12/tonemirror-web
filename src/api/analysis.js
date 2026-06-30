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

// dataURL(웹캠 캡처) → File 변환
export function dataUrlToFile(dataUrl, filename = "capture.jpg") {
    const [meta, data] = dataUrl.split(",");
    const mime = meta.match(/:(.*?);/)[1];
    const bytes = atob(data);
    const arr = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
    return new File([arr], filename, { type: mime });
}

// 최초 진단: 원본 사진 업로드 → 퍼스널컬러 + 피부톤 + 초기 메이크업 결과 수신
export async function postAnalysis(imageFile) {
    const formData = new FormData();
    formData.append("file", imageFile);

    const res = await fetch("/ai/virtual-makeup", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        throw new Error(`분석 요청 실패 (${res.status})`);
    }

    const data = await res.json();
    return {
        personalColor: toToneEng(data.personal_color),
        skinTone: data.detected_skin_hex,
        makeupImageUrl: data.makeup_image_url,
        makeupInputs: data.makeup_inputs,
        originalImageId: data.original_image_id,
    };
}

// 컬러칩 재합성: 저장해 둔 ROI(files)와 원본 ID로 새 메이크업 이미지만 재요청
export async function postVirtualMakeup({ originalImageId, targetFoundationHex, files }) {
    const res = await fetch("/ai/virtual-makeup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            original_image_id: originalImageId,
            target_foundation_hex: targetFoundationHex,
            files,
        }),
    });

    if (!res.ok) {
        throw new Error(`메이크업 요청 실패 (${res.status})`);
    }

    const data = await res.json();
    return { makeupImageUrl: data.makeup_image_url };
}
