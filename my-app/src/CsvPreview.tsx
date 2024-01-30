import React, { useEffect, useState } from "react";
import styles from "./CsvPreview.module.css";
import useFetch from "./hooks/useFetch";

interface CsvPreviewProps {
  file?: File;
  imageFiles?: File[];
}

export function CsvPreview(prop: CsvPreviewProps) {
  const { fetchExcelFile, fetchCsvFile } = useFetch();
  const [data, setData] = useState<any[][]>([]);

  useEffect(() => {
    if (!prop.file) return;

    if (prop.file.name.endsWith(".csv")) {
      fetchCsvFile(prop.file, (data: any[][]) => {
        console.log("csv data fetched", data);
        setData(data);
      });
    } else if (prop.file.name.endsWith(".xlsx")) {
      fetchExcelFile(prop.file, (data: any[][]) => {
        console.log("excel data fetched", data);
        setData(data);
      });
    }
  }, [prop.file]);

  const keys = data.length > 0 ? data[0] : [];

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
          {data.slice(1).map((obj) => {
            console.log("row", obj);
            return <ItemRow item={obj} imageFiles={prop.imageFiles} />; 
          })}
        </tbody>
      </table>
    </div>
  );
}

function ItemRow(props: { item: any[] , imageFiles?: File[]}) {
  const imageFileName = props.item[3];
  const imageFile = props.imageFiles?.find((file) => file.name === imageFileName);

const imageStatus = imageFile ? styles.imageStatusOk : styles.imageStatusMissing ;

  return (
    <tr key={props.item[0]}>
      <td>{props.item[0]}</td>
      <td>{props.item[1]}</td>
      <td>{props.item[2]}</td>
      <td className={imageStatus}>{props.item[3]}</td>
    </tr>
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
