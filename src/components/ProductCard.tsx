
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Star } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  description?: string;
  image?: string;
  rating?: number;
  inStock?: boolean;
}

export function ProductCard({
  id,
  name,
  price,
  description,
  image = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop",
  rating = 4.5,
  inStock = true,
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-2">{name}</CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Heart className="h-5 w-5 text-purple-500" />
          </Button>
        </div>
        <div className="flex items-center space-x-1 text-sm">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-1 text-gray-500">({rating})</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {description && (
          <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{description}</p>
        )}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-purple-600">{price}</span>
          </div>
          {inStock ? (
            <Badge className="bg-green-500">Em estoque</Badge>
          ) : (
            <Badge variant="outline" className="text-red-500 border-red-500">Esgotado</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-purple-600 hover:bg-purple-700">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  );
}
