
import jsPDF from 'jspdf';

export const convertImageToPdf = async (imageFile: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (!event.target?.result) {
          reject(new Error('Failed to read file'));
          return;
        }
        
        const img = new Image();
        img.src = event.target.result as string;
        
        img.onload = () => {
          // Calculate dimensions to fit the image properly on the PDF
          const pdf = new jsPDF({
            orientation: img.width > img.height ? 'landscape' : 'portrait',
            unit: 'px',
          });
          
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          
          // Calculate scale to fit image on page while maintaining aspect ratio
          const imageRatio = img.width / img.height;
          const pageRatio = pageWidth / pageHeight;
          
          let imgWidth, imgHeight;
          
          if (imageRatio > pageRatio) {
            // Image is wider than page ratio
            imgWidth = pageWidth - 40; // Leave some margins
            imgHeight = imgWidth / imageRatio;
          } else {
            // Image is taller than page ratio
            imgHeight = pageHeight - 40; // Leave some margins
            imgWidth = imgHeight * imageRatio;
          }
          
          // Center the image on the page
          const x = (pageWidth - imgWidth) / 2;
          const y = (pageHeight - imgHeight) / 2;
          
          // Add the image to the PDF
          pdf.addImage(
            img.src, 
            'JPEG', 
            x, 
            y, 
            imgWidth, 
            imgHeight
          );
          
          // Convert to blob and resolve the promise
          const pdfBlob = pdf.output('blob');
          resolve(pdfBlob);
        };
        
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsDataURL(imageFile);
      
    } catch (error) {
      reject(error);
    }
  });
};
