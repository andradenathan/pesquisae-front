import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo() {
  return (
    <div className={cn("text-center mb-8")}>
      <a
        href="/"
        className={cn(
          "inline-flex items-center gap-2 sm:gap-3 text-decoration-none group",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
        )}
        aria-label="Pesquisaê - Página Inicial"
      >
        <Search
          className={cn(
            "h-7 w-7 sm:h-9 sm:h-9 text-purple-600 transition-transform duration-300 group-hover:scale-110"
          )}
          strokeWidth={2.5}
        />

        <h1
          className={cn(
            "text-4xl sm:text-5xl font-bold",

            "bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600",

            "transition-all duration-300 group-hover:from-purple-500 group-hover:to-blue-500 group-hover:tracking-tight"
          )}
        >
          Pesquisaê
        </h1>
      </a>

      <p className={cn("text-sm sm:text-base text-gray-500 mt-2")}>
        Busque por produtos e encontre as melhores ofertas
      </p>
    </div>
  );
}
