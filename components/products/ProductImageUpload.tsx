import { Upload } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
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
      const newImages: string[] = [];
      // Iterate through the FileList to maintain the order
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        newImages.push(URL.createObjectURL(file));
      }
      // Limit Images to 3
      setImages(newImages.slice(0, 3));
    }
  };

  return (
    <div className="flex flex-col gap-4 max-md:items-center">
      {/* Thumbnail Image */}
      <Image
        src={images[0] || "/assets/image-placeholder.svg"}
        width={200}
        height={200}
        alt="Product Image"
        className="aspect-square size-full rounded-md object-cover"
      />

      <div className="flex justify-between gap-2 lg:flex-row">
        {/* Additional Images */}
        {[1, 2].map((index) => (
          <Image
            key={index}
            src={images[index] || "/assets/image-placeholder.svg"}
            width={200}
            height={200}
            alt="Product Image"
            className="aspect-square size-24 rounded-md border object-cover md:size-20"
          />
        ))}

        {/* Upload Button */}
        <Button
          onClick={handleOpenFolder}
          variant="outline"
          className="size-24 cursor-pointer bg-input md:size-20"
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
        accept=".jpg, .png, .jpeg, .webp, .svg"
        multiple
      />
    </div>
  );
}

export default ProductImageUpload;
