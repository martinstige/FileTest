import React, { useEffect, useState } from "react";
import styles from "./CsvPreview.module.css";
import useFetch from "./hooks/useFetch";

interface CsvPreviewProps {
  file?: File;
}

export function CsvPreview(prop: CsvPreviewProps) {
  const { fetchCsvFile } = useFetch();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (!prop.file) return;
    fetchCsvFile(prop.file, (data: any[]) => {
      console.log("csv data fetched" + data);
      setData(data);
    });
  }, [prop.file]);

  const keys = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Csv Preview</h2>
        <span>{prop.file?.name}</span>
      </div>
      <table className={styles.csvTable}>
        <thead>
          <tr>
            {keys.map((key) => {
              return <th>{key}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((obj) => {
            return (
              <tr key={obj[0]}>
                {keys.map((key) => {
                  return <td>{obj[key]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

class Item {
  id: number;
  name: string;
  swlt: number;
  imageFileName: string;

  constructor(id: number, name: string, swlt: number, imageFileName: string) {
    this.id = id;
    this.name = name;
    this.swlt = swlt;
    this.imageFileName = imageFileName;
  }
}
