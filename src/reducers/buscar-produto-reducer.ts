import { BuscarProdutosResultadoDTO } from "@/types/Produto";

export interface BuscarProdutoState {
  data: BuscarProdutosResultadoDTO;
  isLoading: boolean;
  error: string;
  paginaAtual: number;
  queryAtual: string;
}

export type BuscarProdutoAction =
  | { type: "FETCH_START"; payload?: { query: string } }
  | {
      type: "FETCH_SUCCESS";
      payload: {
        data: BuscarProdutosResultadoDTO;
        query: string;
        pagina: number;
      };
    }
  | { type: "FETCH_FAILURE"; payload: { error: string } }
  | { type: "RESET_STATE" };

export const estadosIniciais: BuscarProdutoState = {
  data: {} as BuscarProdutosResultadoDTO,
  isLoading: false,
  error: "",
  paginaAtual: 1,
  queryAtual: "",
};

export const buscarProdutoReducer = (
  state: BuscarProdutoState,
  action: BuscarProdutoAction
): BuscarProdutoState => {
  switch (action.type) {
    case "FETCH_START": {
      const isNewQuery =
        action.payload?.query && action.payload.query !== state.queryAtual;

      return {
        ...state,
        isLoading: true,
        error: "",
        queryAtual: action.payload?.query || "",
        paginaAtual: isNewQuery ? 1 : state.paginaAtual,
      };
    }
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        paginaAtual: action.payload.pagina,
        queryAtual: action.payload.query,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        data: {} as BuscarProdutosResultadoDTO,
        isLoading: false,
        error: action.payload.error,
      };

    case "RESET_STATE":
      return estadosIniciais;
    default:
      return state;
  }
};
