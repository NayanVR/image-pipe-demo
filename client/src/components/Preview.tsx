import React, { useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { getClippedImage } from "../utils/ImageProcessing";

interface PreviewProps {
  original: string | null;
  canvasRef: React.MutableRefObject<CanvasDraw | null>;
}

const Preview: React.FC<PreviewProps> = ({ original, canvasRef }) => {
  const [mask, setMask] = useState<string | null>(null);

  const handleExport = async () => {
    if (!canvasRef.current || !original) return;

    // @ts-expect-error: getDataURL method is not typed correctly in react-canvas-draw library
    const imgString = canvasRef.current.getDataURL({ useBgImage: false });
    const clippedImageStringData = await getClippedImage(original, imgString);

    const link = document.createElement("a");
    link.href = clippedImageStringData;
    link.download = "edited-image.png";
    link.click();
  };

  const handleUpload = async () => {
    if (!canvasRef.current || !original) return;
    const baseUrl = import.meta.env.VITE_SERVER_URL;
    const imageName = Math.random().toString(36).substring(2, 9);

    // @ts-expect-error: getDataURL method is not typed correctly in react-canvas-draw library
    const maskedImgString = canvasRef.current.getDataURL({ useBgImage: false });
    const clippedImageStringData = (await getClippedImage(
      original,
      maskedImgString
    )) as string;

    console.log(maskedImgString);

    Promise.all([
      fetch(`${baseUrl}/upload-image/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: clippedImageStringData.replace("data:image/png;base64,", ""),
          type: "mask",
          image_id: imageName,
        }),
      }),
      fetch(`${baseUrl}/upload-image/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: original
            .replace("data:image/png;base64,", "")
            .replace("data:image/jpeg;base64,", "")
            .replace("data:image/jpg;base64,", ""),
          type: "original",
          image_id: imageName,
        }),
      }),
    ]);
  };

  const handlePreview = async () => {
    if (!canvasRef.current || !original) return;

    // @ts-expect-error: getDataURL method is not typed correctly in react-canvas-draw library
    const imgString = canvasRef.current.getDataURL({ useBgImage: false });
    const clippedImageStringData = await getClippedImage(original, imgString);
    setMask(clippedImageStringData);
  };

  const handleClear = () => {
    if (!canvasRef.current) return;
    canvasRef.current.clear();
  };

  return (
    <div className="flex my-4 w-full gap-4">
      {original && (
        <div className="w-1/3">
          <h3>Original Image</h3>
          <img src={original} alt="Original" style={{ width: "100%" }} />
        </div>
      )}
      {mask && (
        <div className="w-1/3">
          <h3>Masked Image</h3>
          <img src={mask} alt="Mask" style={{ width: "100%" }} />
        </div>
      )}
      {original && (
        <div className="flex flex-col gap-4 w-1/3 py-8 justify-center items-center">
          <button
            className="bg-blue-600 text-white py-2 px-5 rounded-md hover:bg-blue-800"
            onClick={handlePreview}
          >
            Preview
          </button>
          <button
            className="bg-blue-600 text-white py-2 px-5 rounded-md hover:bg-blue-800"
            onClick={handleClear}
          >
            Clear Brush
          </button>
          <button
            className="bg-green-600 text-white py-2 px-5 rounded-md hover:bg-green-700"
            onClick={handleExport}
          >
            Export as PNG
          </button>
          <button
            className="bg-green-600 text-white py-2 px-5 rounded-md hover:bg-green-700"
            onClick={handleUpload}
          >
            Upload to Cloud
          </button>
        </div>
      )}
    </div>
  );
};

export default Preview;
