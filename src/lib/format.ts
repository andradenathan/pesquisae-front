export const formataMoeda = (valor: number | null | undefined): string => {
  if (typeof valor !== "number" || isNaN(valor)) {
    return "R$ --,--";
  }

  let valorAjustado = valor;
  const valorString = String(valor);

  if (valorString.includes(".")) {
    const partes = valorString.split(".");
    const parteInteiraStr = partes[0];
    const parteDecimalStr = partes[1];

    // REGRA 1: Corrige erro do tipo 1.254 -> 1254
    if (parteDecimalStr.length === 3) {
      try {
        const valorCorrigido = Number(parteInteiraStr + parteDecimalStr);
        if (!isNaN(valorCorrigido)) {
          console.warn(
            `Workaround aplicado (3 decimais): ${valor} -> ${valorCorrigido}`
          );
          valorAjustado = valorCorrigido;
        }
      } catch (e) {
        console.error("Erro ao aplicar workaround de 3 decimais", e);
      }
    }
    // REGRA 2: Tenta corrigir erro do tipo 3.99 -> 3990 ou 3.53 -> 3530
    else if (parteDecimalStr.length === 2) {
      const LIMITE_WORKAROUND = 50;
      try {
        const parteInteiraNum = parseInt(parteInteiraStr, 10);
        if (!isNaN(parteInteiraNum) && parteInteiraNum < LIMITE_WORKAROUND) {
          const valorCorrigido = valor * 1000;
          valorAjustado = valorCorrigido;
        }
        // Se a parte inteira for maior ou igual ao limite, assume que 120.50 é R$ 120,50 mesmo.
      } catch (e) {
        console.error("Erro ao aplicar workaround de 2 decimais", e);
      }
    }
    // Se tiver 1 casa decimal (ex: 120.5) ou mais de 3, não fazemos nada por enquanto.
  }
  // Se não tiver ponto decimal (inteiro), usa como está.

  // Formata o valor (original ou ajustado pelo workaround)
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  try {
    return formatter.format(valorAjustado);
  } catch (formatError) {
    console.error(
      `Erro ao formatar o valor final ${valorAjustado}:`,
      formatError
    );
    return "R$ Erro";
  }
};
