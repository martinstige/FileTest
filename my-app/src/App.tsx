import { useState } from "react";
import styles from "./App.module.css";
import { ImagePreview } from "./ImagePreview";
import { CsvPreview } from "./CsvPreview";

function App() {
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const handleImageFilesChanged = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = e.target;
    setImageFiles(Array.from(files || []));
  };
  const handleDocumentFilesChanged = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = e.target;
    setDocumentFiles(Array.from(files || []));
  };

  return (
    <div className={styles.App}>
      <h1>Import prototype</h1>
      <div className={styles.inputForm}>
        <div className={styles.fileChooser}>
          <label htmlFor="file1">Upload images</label>
          <input
            type="file"
            id="file1"
            onChange={handleImageFilesChanged}
            accept="image/png, image/jpg, image/jpeg"
            multiple
          />
        </div>
        <div className={styles.fileChooser}>
          <label htmlFor="file2">Upload documents</label>
          <input
            type="file"
            id="file2"
            onChange={handleDocumentFilesChanged}
            accept="application/pdf"
            multiple
          />
        </div>
        <div className={styles.fileChooser}>
          <label htmlFor="file3">Upload CSV</label>
          <input
            type="file"
            id="file3"
            onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
            accept="text/csv"
          />
        </div>
      </div>
      <ImagePreview imageFiles={imageFiles} />
      <CsvPreview file={csvFile || undefined} />
    </div>
  );
}

export default App;
