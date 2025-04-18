import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { Marketplace } from "@/types/Product";

interface ProductCardProps {
  nome: string;
  preco: number;
  imageUrl: string;
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
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="w-full overflow-hidden">
        <a href={link} target="_blank">
          <img
            src={imageUrl}
            alt={nome}
            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
          />
        </a>
      </div>
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-2">{nome}</CardTitle>
          {marketplace === "Amazon" ? (
            <img width="50" height="50" src="/amazon.jpg" />
          ) : (
            <img width="50" height="50" src="/mercado-livre.png" />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-purple-600">
              {formatCurrency(preco)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
