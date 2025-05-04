import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Marketplace } from "@/types/Produto";
import { cn } from "@/lib/utils";
import { formataMoeda } from "@/lib/format";

interface ProductCardProps {
  nome: string;
  preco: number;
  imageUrl: string | null; // Permitir null ou undefined para imagens
  link: string;
  marketplace: Marketplace;
}

export function ProductCard({
  nome,
  preco,
  imageUrl,
  link,
  marketplace,
}: ProductCardProps) {
  const cardHeight = "h-96";

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col",
        cardHeight
      )}
    >
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden flex-shrink-0">
        {" "}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full"
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={nome}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => (e.currentTarget.src = "/placeholder-image.png")}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-xs">
              Imagem Indisponível
            </div>
          )}
        </a>
      </div>
      <div className="flex flex-col flex-grow p-4">
        {" "}
        <CardHeader className="p-0 mb-2">
          {" "}
          <div className="flex items-start justify-between gap-2">
            <CardTitle
              className="text-base font-medium line-clamp-2 flex-grow"
              title={nome}
            >
              {nome}
            </CardTitle>
            <div className="flex-shrink-0">
              {marketplace === "Amazon" ? (
                <img
                  width="32"
                  height="32"
                  src="/amazon.jpg"
                  alt="Amazon Logo"
                  className="object-contain"
                />
              ) : (
                <img
                  width="32"
                  height="32"
                  src="/mercado-livre.png"
                  alt="Mercado Livre Logo"
                  className="object-contain"
                />
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 mt-auto">
          {" "}
          <div>
            <span className="text-xl font-bold text-purple-600">
              {formataMoeda(preco)}
            </span>
          </div>
        </CardContent>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-purple-600 text-white text-center py-2 px-4 hover:bg-purple-700 transition-colors mt-4 font-medium rounded-b-md" // Adiciona margem superior
        >
          Ver na loja
        </a>
      </div>
    </Card>
  );
}
