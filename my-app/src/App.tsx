import { useEffect, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

function App() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageFilesStorage , setImageFilesStorage] = useLocalStorage<string>('imageFiles', '');
  const [images, setImages] = useState<string[]>([]);
  const [imageIndex, setImageIndex] = useState<number>(0);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const validImageFiles = [];
    if (files && files.length > 0) {
      for (let i = 0; i < (files.length); i++) {
        const file = files[i];
        if (file.type.match(imageTypeRegex)) {
          validImageFiles.push(file);
        }
      }
      if (validImageFiles.length) {
        setImageFiles(validImageFiles);
        setImageFilesStorage(JSON.stringify(validImageFiles));
        return;
      }
    }
    alert("Selected images are not of valid type!");
  };

useEffect(() => {
  
}, [imageFiles]);

  useEffect(() => {
    const images: string[] = [], fileReaders: FileReader[] = [];

    let isCancel = false;
    if (imageFiles.length) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = e => {
          const result = e.target?.result;
          if (result) {
            images.push(result as string);
          }
          if (images.length === imageFiles.length && !isCancel) {
            setImages(images);
          }
        }
        fileReader.readAsDataURL(file);
      })
    };
    return () => {
      isCancel = true;
      fileReaders.forEach(fileReader => {
        if (fileReader.readyState === 1) {
          fileReader.abort()
        }
      })
    }
  }, [imageFiles]);
  return (
    <div className="App">
      <form>
        <p>
          <label htmlFor="file">Upload images</label>
          <input
            type="file"
            id="file"
            onChange={changeHandler}
            accept="image/png, image/jpg, image/jpeg"
            multiple
          />
        </p>
      </form>
      {
        images.length > 0 ?
          <div>
            <button onClick={() => setImageIndex(imageIndex - 1)} disabled={imageIndex === 0}>Previous</button>
            <button onClick={() => setImageIndex(imageIndex + 1)} disabled={imageIndex === images.length - 1}>Next</button>
            {
              <p > <img src={images[imageIndex]} alt="" width="500px" /> </p>
            }
          </div> : null
      }
    </div>
  );
}

export default App;