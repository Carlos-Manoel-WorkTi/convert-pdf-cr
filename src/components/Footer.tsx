
import React from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-theme-black text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-theme-green">ImgToPDF</h3>
            <p className="text-gray-300 dark:text-gray-400 mb-4">
              Simple tool to convert your images to PDF documents with ease.
              Upload from your device or scan directly using your camera.
            </p>
          </div>
          
          <div className="hidden sm:block md:block">
            <h3 className="text-lg font-semibold mb-4 text-theme-green">Features</h3>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              <li>• Easy image upload</li>
              <li>• Camera scanning</li>
              <li>• PDF preview</li>
              <li>• Instant download</li>
              <li>• Free to use</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-theme-green">Contact</h3>
            <p className="text-gray-300 dark:text-gray-400 mb-4">
              Have questions or feedback? Reach out to us.
            </p>
            <p className="text-gray-300 dark:text-gray-400">contact@imgtopdf.example.com</p>
            <div className="mt-4">
              <Button asChild variant="outline" className="border-theme-green text-theme-green hover:bg-theme-green hover:text-white">
                <a href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} ImgToPDF. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
