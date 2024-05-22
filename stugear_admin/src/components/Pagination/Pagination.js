import React from "react";
import { Pagination } from "@mui/material";
const CustomPagination = ({ currentPage, totalPage, setCurrentPage }) => {
  const handleChange = (ChangeEvent, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      {totalPage == 1 ? (
        <></>
      ) : (
        <>
              <Pagination count={totalPage} page={currentPage} onChange={handleChange}/>

        </>
      )}
    </>
  );
};

export default CustomPagination;
