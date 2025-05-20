
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
              Ferramenta simples para converter suas imagens em documentos PDF com facilidade.
              Faça o upload do seu dispositivo ou escaneie diretamente usando sua câmera.
            </p>
          </div>
          
          <div className="hidden sm:block md:block">
            <h3 className="text-lg font-semibold mb-4 text-theme-green">Recursos</h3>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              <li>• Upload fácil de imagens</li>
              <li>• Escaneamento com câmera</li>
              <li>• Visualização de PDF</li>
              <li>• Download instantâneo</li>
              <li>• Gratuito para usar</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-theme-green">Contato</h3>
            <p className="text-gray-300 dark:text-gray-400 mb-4">
              Tem perguntas ou feedback? Entre em contato conosco.
            </p>
            <p className="text-gray-300 dark:text-gray-400">contato@imgtopdf.exemplo.com</p>
            <div className="mt-4">
              <Button asChild variant="outline" className="border-theme-green text-theme-green hover:bg-theme-green hover:text-white">
                <a href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Voltar para Início
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} ImgToPDF. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
