
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, KeyboardEvent } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
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
}

export function SearchInput({ onSearch }: SearchInputProps) {
  const [open, setOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSearch(inputValue);
      if (!searchHistory.includes(inputValue)) {
        setSearchHistory((prev) => [inputValue, ...prev].slice(0, 5));
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleHistorySelect = (value: string) => {
    setInputValue(value);
    setOpen(false);
    onSearch(value);
  };

  return (
    <div className="flex w-full max-w-xl gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Input
            placeholder="Pesquisar produtos..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="h-12 text-lg"
          />
        </PopoverTrigger>
        {searchHistory.length > 0 && (
          <PopoverContent className="w-[400px] p-0" align="start">
            <Command>
              <CommandList>
                <CommandGroup heading="Histórico de pesquisas">
                  {searchHistory.map((item) => (
                    <CommandItem
                      key={item}
                      onSelect={() => handleHistorySelect(item)}
                    >
                      <Search className="mr-2 h-4 w-4" />
                      {item}
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
        className="h-12 px-8 bg-purple-600 hover:bg-purple-700"
      >
        <Search className="h-5 w-5" />
      </Button>
    </div>
  );
}
