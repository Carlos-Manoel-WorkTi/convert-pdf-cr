
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Scan, RefreshCcw } from "lucide-react";
import { toast } from "sonner";

interface ScannerProps {
  onImageCaptured: (file: File) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onImageCaptured }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startScanning = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setIsScanning(true);
      }
    } catch (error) {
      console.error("Erro ao acessar a câmera:", error);
      toast.error("Falha ao acessar a câmera. Por favor, certifique-se que as permissões da câmera foram concedidas.");
    }
  };

  const stopScanning = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsScanning(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw the current video frame to the canvas
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to blob
        canvas.toBlob((blob) => {
          if (blob) {
            // Create a File from the blob
            const file = new File([blob], "imagem-escaneada.png", { type: "image/png" });
            onImageCaptured(file);
            stopScanning();
          }
        }, "image/png");
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full max-w-md bg-background/50 border border-border rounded-lg overflow-hidden">
        {isScanning ? (
          <>
            <video 
              ref={videoRef}
              autoPlay 
              playsInline
              className="w-full"
            />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3">
              <Button 
                className="button-primary"
                onClick={captureImage}
              >
                Capturar Imagem
              </Button>
              <Button 
                variant="outline"
                onClick={stopScanning}
              >
                Cancelar
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 sm:p-10">
            <Scan className="w-8 sm:w-12 h-8 sm:h-12 text-theme-green mb-2" />
            <p className="mb-4 text-center text-sm sm:text-base">Escaneie uma imagem usando sua câmera</p>
            <Button 
              className="button-primary"
              onClick={startScanning}
            >
              <Scan className="mr-2 h-4 w-4" />
              Iniciar Scanner
            </Button>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default Scanner;
