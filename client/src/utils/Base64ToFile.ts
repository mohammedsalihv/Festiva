

const base64ToFile = (base64: string, filename: string, mimeType: string): File => {
  const byteString = atob(base64.split(',')[1]); // Decode base64 string
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uintArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uintArray[i] = byteString.charCodeAt(i);
  }

  return new File([arrayBuffer], filename, { type: mimeType });
};

export default base64ToFile;