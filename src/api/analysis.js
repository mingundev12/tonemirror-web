export function dataUrlToFile(dataUrl, filename = "capture.jpg") {
    const [meta, data] = dataUrl.split(",");
    const mime = meta.match(/:(.*?);/)[1];
    const bytes = atob(data);
    const arr = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
    return new File([arr], filename, { type: mime });
}

export async function postAnalysis(imageFile) {
    const formData = new FormData();
    formData.append("file", imageFile);

    const res = await fetch("/api/analysis", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        throw new Error(`분석 요청 실패 (${res.status})`);
    }

    return res.json();
}
