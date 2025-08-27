// src/download.js
import { getResumeFilename } from './i18n.js'; // Import our new function

export function setupPdfDownloader() {
  const downloadButton = document.getElementById('download-pdf-btn');
  const resumeContent = document.getElementById('resume-content');

  if (!downloadButton) {
    console.error("Download button not found.");
    return;
  }

  downloadButton.addEventListener('click', () => {
    console.log("Generating PDF...");
    downloadButton.style.display = 'none';
        const filename = getResumeFilename();

    document.body.classList.add('generating-pdf');

    const options = {
      scale: 3, 
      useCORS: true,
      logging: true,
    };

    html2canvas(resumeContent, options).then(canvas => {
      // Clean up after capture
      document.body.classList.remove('generating-pdf');
      downloadButton.style.display = 'flex';

      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = window.jspdf;

      // --- STANDARD A4 PDF GENERATION ---
      
      // A4 page dimensions in millimeters [width, height]
      const A4_DIMENSIONS = [210, 297]; 
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Get the image dimensions from the canvas
      // The canvas is at a higher scale, so we need to get its aspect ratio
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Add the image to the PDF, scaling it to fit the page width
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${filename}.pdf`);
      
      console.log("PDF download initiated.");

    }).catch(error => {
      console.error("Error generating PDF:", error);
      // Clean up even if there's an error
      document.body.classList.remove('generating-pdf');
      downloadButton.style.display = 'flex';
    });
  });
}