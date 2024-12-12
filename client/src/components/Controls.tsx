import React from "react";

interface ControlsProps {
  brushSize: number;
  setBrushSize: (size: number) => void;
}

const Controls: React.FC<ControlsProps> = ({ brushSize, setBrushSize }) => {
  const handleBrushSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrushSize(parseInt(e.target.value, 10));
  };

  return (
    <div className="my-2">
      <label>
        Brush Size: {brushSize}
        <input
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={handleBrushSizeChange}
          className="ml-2"
        />
      </label>
    </div>
  );
};

export default Controls;
