import React, { useEffect, useState } from "react";
import { readFileAsDataURL } from "./hooks/readAttachmentFiles";
import styles from "./ImagePreview.module.css";

interface ImagePreviewProps {
  imageFiles: File[];
  removeImage: (index: number) => void;
}

export function ImagePreview(props: ImagePreviewProps) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (props.imageFiles.length === 0) return;

    const promises = props.imageFiles.map((file) => readFileAsDataURL(file));
    Promise.all(promises).then((images) => setImages(images as string[]));
  }, [props.imageFiles]);

  return (
    <div className={styles.imagePreview}>
      <h2>Image preview ({props.imageFiles.length})</h2>

      <div className={styles.imageList}>
        {images.map((file, index) => {
          const filename = props?.imageFiles[index]?.name;

          return (
            <div key={filename}>
              <img
                onClick={() => props.removeImage(index)}
                className={styles.imageInList}
                src={file}
                alt={filename}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
