export const formatCurrency = (valor: number) => {
  const numero = valor * 1000;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numero);
};
