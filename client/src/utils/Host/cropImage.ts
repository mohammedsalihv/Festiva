interface PixelCrop {
    x: number;
    y: number;
    width: number;
    height: number;
  }
  
  export const getCroppedImg = (imageSrc: string, pixelCrop: PixelCrop): Promise<string> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        if (!ctx) {
          return reject('Failed to get canvas context');
        }
  
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );
  
        const croppedImage = canvas.toDataURL('image/jpeg', 0.92); // Optional quality
        canvas.remove(); // Cleanup
        resolve(croppedImage);
      };
  
      image.onerror = () => reject('Error loading image');
    });
  };
  