import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  image?: string;
  rating?: number;
  source?: "amazon" | "mercadolivre";
}

export function ProductCard({
  id,
  name,
  price,
  image = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop",
  source = "amazon",
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="aspect-square overflow-hidden">
        <a href="#">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </a>
      </div>
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-2">{name}</CardTitle>
          {source === "amazon" ? (
            <img width="50" height="50" src="/amazon.jpg" />
          ) : (
            <img width="50" height="50" src="/mercado-livre.png" />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-purple-600">{price}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
