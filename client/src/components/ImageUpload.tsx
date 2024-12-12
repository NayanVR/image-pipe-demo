interface ImageUploadProps {
  setImageData: (image: string) => void;
  setImageWidth: (width: number) => void;
  setImageHeight: (height: number) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  setImageData,
  setImageWidth,
  setImageHeight,
}) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          const imageData = reader.result.toString();
          setImageData(imageData);

          const img = new Image();
          img.src = imageData;
          img.onload = () => {
            setImageWidth(img.width);
            setImageHeight(img.height);
          };
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/png, image/jpeg"
        className="text-sm file:text-md bg-stone-200 p-2 rounded-md text-stone-500 file:mr-5 file:py-1 file:px-3 file:border-[1px] file:rounded-md file:font-medium file:bg-stone-50 file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700"
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default ImageUpload;
