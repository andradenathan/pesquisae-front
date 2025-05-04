import { useReducer, useCallback } from "react";
import { recuperaProdutos } from "@/api/produtos";
import { AxiosError } from "axios";
import {
  buscarProdutoReducer,
  estadosIniciais,
  BuscarProdutoState,
} from "@/reducers/buscar-produto-reducer";

interface UseProductSearch extends BuscarProdutoState {
  buscarProdutos: (query: string) => void;
  mudarPagina: (page: number) => void;
  resetarBusca: () => void;
}

export const useProductSearch = (): UseProductSearch => {
  const [state, dispatch] = useReducer(buscarProdutoReducer, estadosIniciais);

  const recuperarDadosProduto = useCallback(
    async (query: string, pagina: number) => {
      dispatch({ type: "FETCH_START", payload: { query } });

      try {
        const resposta = await recuperaProdutos(query, pagina);
        dispatch({
          type: "FETCH_SUCCESS",
          payload: {
            data: resposta.data,
            query,
            pagina,
          },
        });
      } catch (error: unknown) {
        let errorMessage = "Ocorreu um erro ao buscar os produtos.";

        if (error instanceof AxiosError) {
          errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Erro na comunicação com a API.";
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        dispatch({
          type: "FETCH_FAILURE",
          payload: { error: errorMessage },
        });
      }
    },
    []
  );

  const buscarProdutos = useCallback(
    (query: string) => {
      if (!query || query === state.queryAtual) return;
      recuperarDadosProduto(query, 1);
    },
    [recuperarDadosProduto, state.queryAtual]
  );

  const mudarPagina = useCallback(
    (pagina: number) => {
      if (pagina === state.paginaAtual || !state.queryAtual || state.isLoading)
        return;

      recuperarDadosProduto(state.queryAtual, pagina);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [
      recuperarDadosProduto,
      state.paginaAtual,
      state.queryAtual,
      state.isLoading,
    ]
  );

  const resetarBusca = useCallback(() => {
    dispatch({ type: "RESET_STATE" });
  }, []);

  return {
    ...state,
    buscarProdutos,
    mudarPagina,
    resetarBusca,
  };
};
