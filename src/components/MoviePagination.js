import React, { useState } from "react";
import Pagination from "@material-ui/lab/Pagination";

export default function MoviePagination({ numOfPages, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    numOfPages > 0 && (
      <Pagination
        count={numOfPages}
        page={currentPage}
        onChange={(e, v) => {
          window.scrollTo(0, 0);
          setCurrentPage(v);
          onPageChange(v);
        }}
      />
    )
  );
}
