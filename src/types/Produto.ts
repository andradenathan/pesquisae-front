export interface BuscarProdutosResultadoDTO {
  produtos: CapturarProdutoDTO[];
  total: number;
  totalDePaginas: number;
}

export interface CapturarProdutoDTO {
  nome: string;
  preco: number;
  imageUrl: string;
  link: string;
  marketplace: Marketplace;
}

export type Marketplace = "Amazon" | "Mercado Livre";
