import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Pagination = ({ setTransactions, allTransactions }) => {
  const [pageNumber, setPageNumber] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const totalPages = Math.ceil(allTransactions.length / pageSize);

  useEffect(() => {
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;
    setTransactions(allTransactions.slice(start, end));
  }, [pageNumber, pageSize, allTransactions, setTransactions]);

  const handlePrevious = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNext = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className="flex items-center justify-between p-4">
      <Button
        className={`${pageNumber === 1 && "opacity-50 cursor-not-allowed"}`}
        onClick={handlePrevious}
        disabled={pageNumber === 1}
      >
        <ChevronLeft className="mr-2" />
      </Button>

      <div className="flex items-center space-x-4">
        <Select
          value={pageSize}
          onValueChange={(value) => setPageSize(Number(value))}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Page size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={5}>5</SelectItem>
            <SelectItem value={10}>10</SelectItem>
            <SelectItem value={20}>20</SelectItem>
            <SelectItem value={50}>50</SelectItem>
          </SelectContent>
        </Select>

        <span className="text-sm text-gray-700">
          Page {pageNumber} of {totalPages}
        </span>
      </div>

      <Button
        className={`${
          pageNumber === totalPages && "opacity-50 cursor-not-allowed"
        }`}
        onClick={handleNext}
        disabled={pageNumber === totalPages}
      >
        <ChevronRight className="ml-2" />
      </Button>
    </div>
  );
};

export default Pagination;
