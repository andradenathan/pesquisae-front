import { useState } from "react";
import { Logo } from "@/components/Logo";
import { SearchInput } from "@/components/SearchInput";

const Index = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    console.log("Pesquisando por:", query);
    setSearchResults([{ id: 1, name: "Produto Teste", price: "R$ 99,99" }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8">
          <Logo />
          <SearchInput onSearch={handleSearch} />

          {searchResults.length > 0 && (
            <div className="w-full max-w-2xl mt-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Resultados da pesquisa
                </h2>
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="border-b border-gray-200 py-4 last:border-0"
                  >
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-gray-600">{product.price}</p>
                  </div>
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
