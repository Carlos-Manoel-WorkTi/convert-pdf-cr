
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, RefreshCcw } from "lucide-react";
import { toast } from "sonner";

interface PDFPreviewProps {
  pdfBlob: Blob | null;
  onReset: () => void;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ pdfBlob, onReset }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
      
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [pdfBlob]);

  const handleDownload = () => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "documento-convertido.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("PDF baixado com sucesso!");
    }
  };

  if (!pdfUrl) return null;

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col items-center justify-center mb-5">
        <h2 className="text-xl font-bold mb-1">Visualização do PDF</h2>
        <p className="text-sm text-muted-foreground mb-4">Sua imagem foi convertida para PDF</p>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
          <Button 
            className="button-primary"
            onClick={handleDownload}
          >
            <Download className="mr-2 h-4 w-4" />
            Baixar PDF
          </Button>
          <Button
            variant="outline"
            onClick={onReset}
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Converter Outra
          </Button>
        </div>
      </div>
      
      <div className="w-full border border-border rounded-lg overflow-hidden bg-card">
        <iframe
          ref={iframeRef}
          src={pdfUrl}
          className="w-full h-[300px] sm:h-[400px] md:h-[500px]"
          title="Visualização do PDF"
        />
      </div>
    </div>
  );
};

export default PDFPreview;
