
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
      setOpen(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // Only open popover when user has stopped typing for a moment
    if (searchHistory.length > 0) {
      setOpen(false); // Close popup when typing to avoid blocking input
    }
  };

  const handleFocus = () => {
    // Only open history if there's actual history
    if (searchHistory.length > 0) {
      setOpen(true);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Check if the new focus target is within our component before closing
    // This prevents the popover from closing when clicking inside it
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!relatedTarget || !relatedTarget.closest('.search-history-popover')) {
      // Add a small delay to allow for clicking items in the popover
      setTimeout(() => setOpen(false), 200);
    }
  };

  return (
    <div className="flex w-full max-w-xl gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative flex-1">
            <Input
              placeholder="Pesquisar produtos..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="h-12 text-lg w-full"
            />
          </div>
        </PopoverTrigger>
        {searchHistory.length > 0 && (
          <PopoverContent 
            className="w-[400px] p-0 search-history-popover" 
            align="start"
          >
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
