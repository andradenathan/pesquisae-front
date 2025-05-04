import api from "@/lib/axios";
import { BuscarProdutosResultadoDTO } from "@/types/Produto";
import { AxiosResponse } from "axios";

type RecuperaProdutosResponse = AxiosResponse<BuscarProdutosResultadoDTO>;

export const recuperaProdutos = async (
  query: string,
  pagina: number
): Promise<RecuperaProdutosResponse> =>
  await api.get(`/produtos/buscar?q=${query}&pagina=${pagina}`);
