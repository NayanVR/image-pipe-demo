import { useRef, useState } from "react";
import CanvasArea from "./components/CanvasArea";
import Preview from "./components/Preview";
import ImageUpload from "./components/ImageUpload";
import Controls from "./components/Controls";
import CanvasDraw from "react-canvas-draw";

const App: React.FC = () => {
  const canvasRef = useRef<CanvasDraw | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [imageWidth, setImageWidth] = useState<number | null>(null);
  const [imageHeight, setImageHeight] = useState<number | null>(null);
  const [brushSize, setBrushSize] = useState(10);

  return (
    <main className="p-4 flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-medium mb-4">Media Pipe Demo</h1>
      <ImageUpload
        setImageData={setImage}
        setImageWidth={setImageWidth}
        setImageHeight={setImageHeight}
      />
      {image && (
        <>
          <Controls brushSize={brushSize} setBrushSize={setBrushSize} />
          <CanvasArea
            canvasRef={canvasRef}
            image={image}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            brushSize={brushSize}
          />
        </>
      )}
      <Preview original={image} canvasRef={canvasRef} />
    </main>
  );
};

export default App;
