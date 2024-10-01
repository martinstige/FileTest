export const filterFileTypes = (
  files: File[],
  validFileTypes: RegExp
): File[] => {
  if (!files || files.length <= 0) return [];

  const validImageFiles = files.filter((file) =>
    file.type.match(validFileTypes)
  );

  return validImageFiles;
};

export const readFileAsDataURL = (
  file: File
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });
};
