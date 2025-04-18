import { useId, useState } from "react";
import { Logo } from "@/components/Logo";
import { SearchInput } from "@/components/SearchInput";
import { ProductCard } from "@/components/ProductCard";
import { CapturarProdutoDTO } from "@/types/Product";
import { getProducts } from "@/api/products";

const Index = () => {
  const idPrefix = useId();
  const [searchResults, setSearchResults] = useState<CapturarProdutoDTO[]>([]);

  const handleSearch = async (query: string) => {
    const response = await getProducts(query);
    setSearchResults(response.data.produtos);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8">
          <Logo />
          <SearchInput onSearch={handleSearch} />

          {searchResults.length > 0 && (
            <div className="w-full mt-8">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Resultados da pesquisa (exibindo {searchResults.length + " "}
                produtos)
              </h2>
              <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((product) => (
                  <ProductCard
                    key={`${idPrefix}-${product.nome}`}
                    nome={product.nome}
                    preco={product.preco}
                    imageUrl={product.imageUrl}
                    link={product.link}
                    marketplace={product.marketplace}
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
