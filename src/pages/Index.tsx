
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { SearchInput } from "@/components/SearchInput";
import { ProductCard } from "@/components/ProductCard";

interface Product {
  id: number;
  name: string;
  price: string;
  description?: string;
  image?: string;
  rating?: number;
  inStock?: boolean;
}

const Index = () => {
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const handleSearch = (query: string) => {
    // Aqui você pode implementar a lógica de busca dos produtos
    console.log("Pesquisando por:", query);
    // Por enquanto apenas simularemos alguns resultados
    setSearchResults([
      {
        id: 1,
        name: "Smartphone Galaxy S24 Ultra",
        price: "R$ 8.999,00",
        description: "O mais avançado smartphone da Samsung com câmera de 200MP e IA integrada.",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=300&fit=crop",
        rating: 4.8,
        inStock: true
      },
      {
        id: 2,
        name: "Notebook ProBook Elite i7",
        price: "R$ 5.499,00",
        description: "Notebook premium com processador Intel Core i7 e 16GB de RAM.",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=300&fit=crop",
        rating: 4.5,
        inStock: true
      },
      {
        id: 3,
        name: "iPad Pro M2 11 polegadas",
        price: "R$ 7.299,00",
        description: "iPad com chip M2, tela Liquid Retina e compatível com Apple Pencil.",
        image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=300&fit=crop",
        rating: 4.9,
        inStock: false
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8">
          <Logo />
          <SearchInput onSearch={handleSearch} />
          
          {searchResults.length > 0 && (
            <div className="w-full mt-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Resultados da pesquisa</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                    image={product.image}
                    rating={product.rating}
                    inStock={product.inStock}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
