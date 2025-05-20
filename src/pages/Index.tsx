
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/FileUploader";
import Scanner from "@/components/Scanner";
import PDFPreview from "@/components/PDFPreview";
import Footer from "@/components/Footer";
import { convertImageToPdf } from "@/utils/pdfConverter";
import { FileText, Scan } from "lucide-react";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("upload");

  const handleFileSelected = async (file: File) => {
    setSelectedFile(file);
    await convertToPdf(file);
  };

  const convertToPdf = async (file: File) => {
    try {
      setIsConverting(true);
      const pdf = await convertImageToPdf(file);
      setPdfBlob(pdf);
      toast.success("Image converted successfully!");
    } catch (error) {
      console.error("Error converting image:", error);
      toast.error("Failed to convert image. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPdfBlob(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/50">
      {/* Theme toggle button */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16 flex-grow">
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Image to PDF <span className="text-theme-green">Converter</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert your images to PDF documents easily. Upload from your device or scan with your camera.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {!pdfBlob ? (
            <Card className="shadow-lg border-primary/20 card-glass">
              <CardHeader>
                <CardTitle className="text-center text-xl text-foreground">
                  Choose Your Image Source
                </CardTitle>
                <CardDescription className="text-center">
                  Upload an image from your device or use your camera to scan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="upload" className="data-[state=active]:bg-theme-green data-[state=active]:text-primary-foreground">
                      <FileText className="mr-2 h-4 w-4" />
                      Upload Image
                    </TabsTrigger>
                    <TabsTrigger value="scan" className="data-[state=active]:bg-theme-green data-[state=active]:text-primary-foreground">
                      <Scan className="mr-2 h-4 w-4" />
                      Scan Image
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upload" className="mt-0">
                    <FileUploader onFileSelected={handleFileSelected} />
                  </TabsContent>
                  
                  <TabsContent value="scan" className="mt-0">
                    <Scanner onImageCaptured={handleFileSelected} />
                  </TabsContent>
                </Tabs>
                
                {isConverting && (
                  <div className="flex justify-center items-center mt-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-theme-green"></div>
                    <span className="ml-2">Converting...</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <PDFPreview pdfBlob={pdfBlob} onReset={handleReset} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
