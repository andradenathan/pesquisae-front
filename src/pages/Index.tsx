import { Logo } from "@/components/Logo";
import { SearchInput } from "@/components/SearchInput";
import { SearchResults } from "@/components/SearchResults";
import { useProductSearch } from "@/hooks/use-product-search";
import { X } from "lucide-react";

const Index = () => {
  const {
    data: respostaApi,
    buscarProdutos,
    mudarPagina,
    resetarBusca,
    isLoading,
    error,
    queryAtual,
    paginaAtual,
  } = useProductSearch();

  const shouldShowResults =
    isLoading || error !== null || (respostaApi !== null && queryAtual !== "");

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8">
          <Logo />
          <div className="w-full max-w-xl flex flex-col items-center space-y-4">
            {" "}
            <SearchInput onSearch={buscarProdutos} disabled={isLoading} />
            {!isLoading && queryAtual && (
              <button
                type="button"
                onClick={resetarBusca}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150"
              >
                <X className="mr-2 h-4 w-4" />
                Limpar Busca ({queryAtual})
              </button>
            )}
          </div>

          {shouldShowResults && (
            <SearchResults
              isLoading={isLoading}
              error={error}
              respostaApi={respostaApi}
              query={queryAtual}
              paginaAtual={paginaAtual}
              onMudarPagina={mudarPagina}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
