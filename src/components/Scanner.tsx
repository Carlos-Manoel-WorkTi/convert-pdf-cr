
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
      console.error("Error accessing camera:", error);
      toast.error("Failed to access camera. Please ensure camera permissions are granted.");
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
            const file = new File([blob], "scanned-image.png", { type: "image/png" });
            onImageCaptured(file);
            stopScanning();
          }
        }, "image/png");
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full max-w-md bg-gray-50 border border-gray-300 rounded-lg overflow-hidden">
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
                Capture Image
              </Button>
              <Button 
                variant="outline"
                onClick={stopScanning}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-10">
            <Scan className="w-12 h-12 text-theme-green mb-2" />
            <p className="mb-4 text-center">Scan an image using your camera</p>
            <Button 
              className="button-primary"
              onClick={startScanning}
            >
              <Scan className="mr-2 h-4 w-4" />
              Start Scanner
            </Button>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default Scanner;
