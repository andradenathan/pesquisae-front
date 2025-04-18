import api from "@/lib/axios";
import { BuscarProdutosResultadoDTO } from "@/types/Product";
import { AxiosResponse } from "axios";

export const getProducts = async (
  query: string
): Promise<AxiosResponse<BuscarProdutosResultadoDTO>> => {
  return await api.get(`/produtos/buscar?q=${query}`);
};
