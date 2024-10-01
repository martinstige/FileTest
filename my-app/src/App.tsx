import { useState } from "react";
import styles from "./App.module.css";
import { ImagePreview } from "./ImagePreview";
import { CsvPreview } from "./CsvPreview";

function App() {
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [importFile, setImportFile] = useState<File | null>(null);

  const handleImageFilesSelected = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = e.target;
    setImageFiles(addAsDistinct(imageFiles, files));
  };

  const handleDocumentFilesChanged = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = e.target;
    setDocumentFiles(addAsDistinct(documentFiles, files));
  };

  const addAsDistinct = (
    existingFiles: File[],
    selectedFiles: FileList | null
  ) => {
    const combinedFiles = [
      ...existingFiles,
      ...Array.from(selectedFiles || []),
    ];

    const allFileNames = combinedFiles.map((file) => file.name);
    const distinctFiles = combinedFiles.filter(
      (file, index) => allFileNames.indexOf(file.name) === index
    );
    return distinctFiles;
  };

  const removeImage = (index: number) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
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
            onChange={handleImageFilesSelected}
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
            onChange={(e) => setImportFile(e.target.files?.[0] || null)}
            accept="text/csv, application/xlsx, application/vnd.ms-excel"
          />
        </div>
      </div>
      <ImagePreview imageFiles={imageFiles} removeImage={removeImage} />
      <CsvPreview file={importFile || undefined} imageFiles={imageFiles} docFiles={documentFiles}/>
    </div>
  );
}

export default App;
