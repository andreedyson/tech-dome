import React, { ChangeEvent, useRef, useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";

function ProductImageUpload() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const thumbnailImageRef = useRef<HTMLImageElement>(null);
  const firstImageRef = useRef<HTMLImageElement>(null);
  const secondImageRef = useRef<HTMLImageElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setSelectedImage(previewUrl);
    } else {
      setSelectedImage(null);
    }
  };

  const handleOpenFolder = () => {
    if (inputImageRef.current) {
      inputImageRef.current.click();
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      !thumbnailImageRef.current ||
      !firstImageRef.current ||
      !secondImageRef.current
    ) {
      return;
    }

    if (e.target.files && e.target.files.length >= 3) {
      thumbnailImageRef.current.src = URL.createObjectURL(e.target.files[0]);
      firstImageRef.current.src = URL.createObjectURL(e.target.files[1]);
      secondImageRef.current.src = URL.createObjectURL(e.target.files[2]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Image Preview */}
      <Image
        ref={thumbnailImageRef}
        src={"/assets/image-placeholder.svg"}
        width={200}
        height={200}
        alt="Product Image"
        className="aspect-square h-full w-full rounded-md object-cover"
      />

      <div className="flex items-center justify-between gap-2">
        <Image
          ref={firstImageRef}
          src={"/assets/image-placeholder.svg"}
          width={200}
          height={200}
          alt="Product Image"
          className="aspect-square size-20 rounded-md object-cover"
        />
        <Image
          ref={secondImageRef}
          src={"/assets/image-placeholder.svg"}
          width={200}
          height={200}
          alt="Product Image"
          className="aspect-square size-20 rounded-md object-cover"
        />
        <Button
          onClick={handleOpenFolder}
          variant={"outline"}
          className="size-20 cursor-pointer bg-input"
          asChild
        >
          <Upload color="#955cf6" />
        </Button>
      </div>

      <Input
        ref={inputImageRef}
        type="file"
        id="image"
        name="image"
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
