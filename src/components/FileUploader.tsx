
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText } from "lucide-react";
import { toast } from "sonner";

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelected }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (isValidImageFile(file)) {
        onFileSelected(file);
      } else {
        toast.error("Please upload a valid image file (JPEG, PNG, GIF)");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (isValidImageFile(file)) {
        onFileSelected(file);
      } else {
        toast.error("Please upload a valid image file (JPEG, PNG, GIF)");
      }
    }
  };

  const isValidImageFile = (file: File): boolean => {
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
    return validTypes.includes(file.type);
  };

  return (
    <div className="w-full">
      <div
        className={`flex flex-col items-center justify-center w-full p-4 sm:p-6 border-2 border-dashed rounded-lg transition-all duration-300 ${
          dragActive 
            ? "border-theme-green bg-theme-green/10" 
            : "border-border bg-background/50 hover:bg-background/80"
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-8 sm:w-12 h-8 sm:h-12 text-theme-green mb-2" />
        <p className="mb-1 text-base sm:text-lg font-medium text-center">Click or drag an image to upload</p>
        <p className="mb-4 text-xs sm:text-sm text-muted-foreground text-center">
          Supported formats: JPG, PNG, GIF
        </p>
        <Button
          className="button-primary"
          onClick={() => fileInputRef.current?.click()}
        >
          <FileText className="mr-2 h-4 w-4" />
          Select Image
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
          accept="image/jpeg,image/png,image/gif"
        />
      </div>
    </div>
  );
};

export default FileUploader;
