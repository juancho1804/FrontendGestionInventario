import { useState, useRef } from "react";

export function useImageManager(product) {
  const [images, setImages] = useState(
    product?.urlImages?.map((url) => ({
      preview: `${import.meta.env.VITE_API_URL}${url}`,
      data: url,
    })) || [],
  );
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const nuevas = files.map((file) => ({
      preview: URL.createObjectURL(file),
      data: file,
    }));
    setImages((prev) => [...prev, ...nuevas].slice(0, 4));
    e.target.value = "";
  };

  const handleRemove = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    images,
    fileInputRef,
    handleImageChange,
    handleRemove,
    canAddMore: images.length < 4,
  };
}