import React from "react";
import CanvasDraw from "react-canvas-draw";

interface CanvasAreaProps {
  canvasRef: React.MutableRefObject<CanvasDraw | null>;
  image: string | null;
  imageWidth: number | null;
  imageHeight: number | null;
  brushSize: number | null;
}

const CanvasArea: React.FC<CanvasAreaProps> = ({
  canvasRef,
  image,
  imageWidth,
  imageHeight,
  brushSize,
}) => {
  return (
    <CanvasDraw
      ref={canvasRef}
      brushColor="white"
      lazyRadius={0}
      imgSrc={image ?? ""}
      loadTimeOffset={0}
      brushRadius={brushSize !== null ? brushSize : 5}
      canvasWidth={imageWidth !== null ? imageWidth : 500}
      canvasHeight={imageHeight !== null ? imageHeight : 500}
    />
  );
};

export default CanvasArea;
