import { Upload } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ProductImageUploadProps {
  defaultImages?: string[];
}

function ProductImageUpload({ defaultImages = [] }: ProductImageUploadProps) {
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>(defaultImages);

  // Ensure images are only set initially, avoiding resets when uploading new images
  useEffect(() => {
    if (images.length === 0 && defaultImages.length > 0) {
      setImages(defaultImages);
    }
  }, [defaultImages]);

  const handleOpenFolder = () => {
    inputImageRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file),
      );
      setImages(newImages.slice(0, 3));
    }
  };

  return (
    <div className="space-y-4">
      {/* Thumbnail Image */}
      <Image
        src={images[0] || "/assets/image-placeholder.svg"}
        width={200}
        height={200}
        alt="Product Image"
        className="aspect-square h-full w-full rounded-md object-cover"
      />

      <div className="flex items-center justify-between gap-2">
        {/* Additional Images */}
        {[1, 2].map((index) => (
          <Image
            key={index}
            src={images[index] || "/assets/image-placeholder.svg"}
            width={200}
            height={200}
            alt="Product Image"
            className="aspect-square size-12 rounded-md object-cover md:size-20"
          />
        ))}

        {/* Upload Button */}
        <Button
          onClick={handleOpenFolder}
          variant="outline"
          className="size-12 cursor-pointer bg-input md:size-20"
          asChild
        >
          <Upload color="#955cf6" />
        </Button>
      </div>

      <Input
        ref={inputImageRef}
        type="file"
        id="images"
        name="images"
        onChange={handleImageChange}
        autoComplete="off"
        className="hidden"
        accept=".jpg, .png, .jpeg, images/**"
        multiple
      />
    </div>
  );
}

export default ProductImageUpload;
