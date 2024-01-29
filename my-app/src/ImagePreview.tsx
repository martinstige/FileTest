import React, { useEffect, useState } from "react";
import { readFileAsDataURL } from "./hooks/readAttachmentFiles";
import styles from "./ImagePreview.module.css";

interface ImagePreviewProps {
  imageFiles: File[];
}

export function ImagePreview(props: ImagePreviewProps) {
  const [imageFiles, setImageFiles] = useState<File[]>(props.imageFiles);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<string>("");

  useEffect(() => {
    if (props.imageFiles.length === 0) return;
    setImageFiles(props.imageFiles);
    readFileAsDataURL(imageFiles[imageIndex]).then((image) =>
      setCurrentImage(image as string)
    );
  }, [imageIndex, props.imageFiles]);

  console.log("render image preview");

imageFiles.forEach((file) => {
    console.log(file.name);
});

  return (
    <div className={styles.imagePreview}>
      <h2>Image preview ({imageFiles.length})</h2>
      {imageFiles.length > 0 ? (
        <>
          <div className={styles.buttons}>
            <button
              onClick={() => setImageIndex(imageIndex - 1)}
              disabled={imageIndex === 0}
            >
              Previous
            </button>
            <button
              onClick={() => setImageIndex(imageIndex + 1)}
              disabled={imageIndex === imageFiles.length - 1}
            >
              Next
            </button>
          </div>
          <img src={currentImage} alt="" />
        </>
          
      ) : null}
    </div>
  );
}
