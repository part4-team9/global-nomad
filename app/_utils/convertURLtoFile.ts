export const convertURLtoFile = async (url: string) => {
  const response = await fetch(url);
  const data = await response.blob();
  const ext = url.split('.').pop();
  const filename = url.split('/').pop();
  const metadata = { type: `image/${ext}` };

  return new File([data], filename!, metadata);
};

export const convertSVGToPNGFile = async (svgUrl: string) => {
  const response = await fetch(svgUrl);
  const svgText = await response.text();

  const img = new Image();
  img.src = `data:image/svg+xml;base64,${btoa(svgText)}`;

  return new Promise<File>((resolve, reject) => {
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'converted-image.png', { type: 'image/png' });
          resolve(file);
        } else {
          reject(new Error('Canvas toBlob failed'));
        }
      }, 'image/png');
    };

    img.onerror = () => {
      reject(new Error('Failed to load SVG image'));
    };
  });
};
