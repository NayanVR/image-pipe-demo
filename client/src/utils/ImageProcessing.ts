export const getClippedImage = async (
    originalImageData: string,
    maskImageData: string
): Promise<string> => {
    const {
        data: maskPixels,
        width: maskWidth,
    } = await getImageDataFromString(maskImageData);
    const {
        data: originalPixels,
        width: originalWidth,
        height: originalHeight,
    } = await getImageDataFromString(originalImageData);

    const exportImageData = new ImageData(originalWidth, originalHeight);

    for (let y = 0; y < originalHeight; y++) {
        for (let x = 0; x < originalWidth; x++) {
            const maskIndex = (y * maskWidth + x) * 4;
            const originalIndex = (y * originalWidth + x) * 4;

            if (maskPixels[maskIndex + 3] === 0) {
                exportImageData.data[originalIndex] = 0; // R
                exportImageData.data[originalIndex + 1] = 0; // G
                exportImageData.data[originalIndex + 2] = 0; // B
                exportImageData.data[originalIndex + 3] = 0; // A
            } else {
                exportImageData.data[originalIndex] = originalPixels[originalIndex]; // R
                exportImageData.data[originalIndex + 1] =
                    originalPixels[originalIndex + 1]; // G
                exportImageData.data[originalIndex + 2] =
                    originalPixels[originalIndex + 2]; // B
                exportImageData.data[originalIndex + 3] = 255; // A
            }
        }
    }

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = originalWidth;
    exportCanvas.height = originalHeight;
    const exportCtx = exportCanvas.getContext("2d");
    exportCtx?.putImageData(exportImageData, 0, 0);

    return exportCanvas.toDataURL("image/png");
};

export const getImageDataFromString = (imageData: string): Promise<ImageData> => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = imageData;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            const data = ctx?.getImageData(0, 0, canvas.width, canvas.height);
            if (data) {
                resolve(data);
            } else {
                reject(new Error("Failed to get image data"));
            }
        };
    });
};