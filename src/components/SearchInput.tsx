import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, History } from "lucide-react";
import { useState, KeyboardEvent, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SearchInputProps {
  onSearch: (query: string) => void;
  disabled: boolean;
}

const STORAGE_CHAVE_HISTORICO = "@pesquisae/historico";
const MAX_ITENS_HISTORICO = 8;

export function SearchInput({ onSearch, disabled }: SearchInputProps) {
  const [estaAberto, setEstaAberto] = useState(false);
  const [historicoDeBusca, setHistoricoDeBusca] = useState<string[]>(() => {
    try {
      const historicoArmazenado = localStorage.getItem(STORAGE_CHAVE_HISTORICO);
      if (historicoArmazenado) {
        const historicoParseado = JSON.parse(historicoArmazenado);

        if (
          Array.isArray(historicoParseado) &&
          historicoParseado.every((item) => typeof item === "string")
        ) {
          return historicoParseado.slice(0, MAX_ITENS_HISTORICO);
        }
      }
    } catch (error) {
      console.error(
        "Falha ao carregar histórico de busca do localStorage:",
        error
      );
    }
    return [];
  });

  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const valorTruncado = query.trim();
    if (valorTruncado) {
      onSearch(valorTruncado);

      if (!historicoDeBusca.includes(valorTruncado)) {
        const novoHistorico = [valorTruncado, ...historicoDeBusca].slice(
          0,
          MAX_ITENS_HISTORICO
        );

        setHistoricoDeBusca(novoHistorico);

        try {
          localStorage.setItem(
            STORAGE_CHAVE_HISTORICO,
            JSON.stringify(novoHistorico)
          );
        } catch (error) {
          console.error(
            "Falha ao salvar histórico de busca no localStorage:",
            error
          );
        }
      }
      setEstaAberto(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !disabled) {
      handleSearch();
    }
  };

  const handleHistorySelect = (value: string) => {
    setQuery(value);
    setEstaAberto(false);
    onSearch(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const novaQuery = e.target.value;
    setQuery(novaQuery);

    if (novaQuery.length === 0 && historicoDeBusca.length > 0) {
      setEstaAberto(true);
    } else {
      setEstaAberto(false);
    }
  };

  const handleFocus = () => {
    if (historicoDeBusca.length > 0 && query.length === 0) {
      setEstaAberto(true);
    }
  };

  return (
    <div className="flex w-full max-w-xl gap-2 items-center">
      <Popover open={estaAberto} onOpenChange={setEstaAberto}>
        <PopoverTrigger asChild>
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              placeholder="Pesquisar produtos..."
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              onFocus={handleFocus}
              className="h-12 text-lg w-full"
              disabled={disabled}
              aria-haspopup="listbox"
              aria-expanded={estaAberto}
            />
            <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
        </PopoverTrigger>
        {historicoDeBusca.length > 0 && (
          <PopoverContent
            className="w-[--radix-popover-trigger-width] p-0"
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <Command>
              <CommandList>
                <CommandGroup heading="Histórico de pesquisas">
                  {historicoDeBusca.map((item) => (
                    <CommandItem
                      key={item}
                      value={item}
                      onSelect={() => handleHistorySelect(item)}
                      className="cursor-pointer"
                    >
                      <History className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="hover:text-purple-600">{item}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        )}
      </Popover>
      <Button
        onClick={handleSearch}
        size="lg"
        className={cn(
          "h-12 px-6 bg-purple-600 hover:bg-purple-700",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        disabled={disabled || !query.trim()}
        aria-label="Pesquisar"
      >
        Buscar
      </Button>
    </div>
  );
}
