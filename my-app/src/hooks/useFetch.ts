import Papa, { LocalFile } from "papaparse";
import readXlsxFile from "read-excel-file";
type Callback = (data: any) => void;
const useFetch = () => {
  const sanitizeColumns = (data: any) => {
    return data.map((item: any) => {
      const sanitizedItem: any = {};
      Object.keys(item).forEach((key) => {
        const sanitizedKey = key.toLowerCase().replace(/(\s|-)+/g, "_");
        sanitizedItem[sanitizedKey] = item[key];
      });
      return sanitizedItem;
    });
  };

  const fetchCsvData = async (filePath: string, callback: Callback) => {
    const response = await fetch(filePath);
    const reader = response.body!.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder("utf-8");
    const csvString = decoder.decode(result.value!);
    const { data } = Papa.parse(csvString, {
      header: true,
      dynamicTyping: true,
    });
    const sanitizedData = sanitizeColumns(data);
    callback(sanitizedData);
  };

  const fetchCsvFile = async (file: File, callback: Callback) => {
    Papa.parse(file, {
      header: false,
      dynamicTyping: true,
      complete: function (results) {
        // const sanitizedData = sanitizeColumns(results.data);
        callback(results.data);
      },
    });
  };

  const fetchExcelFile = async (file: File, callback: Callback) => {
    readXlsxFile(file).then((rows) => {
      // `rows` is an array of rows
      // each row being an array of cells.

      //   console.log(rows);
      callback(rows);
    });
  };

  return { fetchCsvData, fetchCsvFile, fetchExcelFile };
};

export default useFetch;
