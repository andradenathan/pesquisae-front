import { ProductCard } from "@/components/ProductCard";
import { Pagination } from "@/components/Pagination";
import { BuscarProdutosResultadoDTO } from "@/types/Produto";

interface SearchResultsProps {
  isLoading: boolean;
  error: string | null;
  respostaApi: BuscarProdutosResultadoDTO;
  query: string;
  paginaAtual: number;
  onMudarPagina: (page: number) => void;
}

export function SearchResults({
  isLoading,
  error,
  respostaApi,
  query,
  paginaAtual,
  onMudarPagina,
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="mt-8 text-center text-gray-600">
        Carregando resultados...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 text-center text-red-600">
        Ocorreu um erro ao buscar os produtos: {error}
      </div>
    );
  }

  if (!respostaApi || !query) return null;

  if (respostaApi.produtos.length === 0) {
    return (
      <div className="mt-8 text-center text-gray-600">
        Nenhum produto encontrado para "{query}"
      </div>
    );
  }

  const { produtos, total, totalDePaginas } = respostaApi;
  return (
    <div className="w-full mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Resultados para "{query}" (Página {paginaAtual} de {totalDePaginas} -{" "}
        {total} produtos nesta página)
      </h2>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtos.map((produto) => (
          <ProductCard
            key={produto.link}
            nome={produto.nome}
            preco={produto.preco}
            imageUrl={produto.imageUrl}
            link={produto.link}
            marketplace={produto.marketplace}
          />
        ))}
      </div>

      {totalDePaginas > 1 && (
        <div className="mt-12 flex justify-center">
          <Pagination
            currentPage={paginaAtual}
            totalPages={totalDePaginas}
            onPageChange={onMudarPagina}
          />
        </div>
      )}
    </div>
  );
}
