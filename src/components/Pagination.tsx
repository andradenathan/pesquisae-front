import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { usePagination, DOTS } from "@/hooks/use-pagination";

interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  totalPages: number;
  siblingCount?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  totalPages,
  siblingCount = 1,
  currentPage,
  onPageChange,
  className,
  ...props
}: PaginationProps) {
  const totalCountForHook = totalPages;
  const pageSizeForHook = 1;

  const paginationRange = usePagination({
    totalCount: totalCountForHook,
    pageSize: pageSizeForHook,
    siblingCount,
    currentPage,
  });

  if (totalPages <= 1 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  const baseButtonStyles =
    "inline-flex items-center justify-center rounded border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  const sizeStyles = "h-9 w-9 px-0";
  const defaultVariantStyles =
    "border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground";
  const activeVariantStyles =
    "bg-purple-600 text-primary-foreground shadow hover:bg-purple-600/90";

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={clsx("flex justify-center", className)}
      {...props}
    >
      <ul className="flex flex-row items-center gap-1">
        <li>
          <button
            aria-label="Ir para a página anterior"
            onClick={onPrevious}
            disabled={currentPage === 1}
            className={clsx(baseButtonStyles, sizeStyles, defaultVariantStyles)}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </li>

        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li
                key={`${DOTS}-${index}`}
                className="flex items-center justify-center px-1"
              >
                <span className="text-sm text-muted-foreground">...</span>
              </li>
            );
          }

          const isActive = pageNumber === currentPage;
          return (
            <li key={pageNumber}>
              <button
                aria-label={`Ir para a página ${pageNumber}`}
                onClick={() => onPageChange(pageNumber as number)}
                aria-current={isActive ? "page" : undefined}
                className={clsx(
                  baseButtonStyles,
                  sizeStyles,
                  isActive ? activeVariantStyles : defaultVariantStyles
                )}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        <li>
          <button
            aria-label="Ir para a próxima página"
            onClick={onNext}
            disabled={currentPage === lastPage || totalPages === 0}
            className={clsx(baseButtonStyles, sizeStyles, defaultVariantStyles)}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
