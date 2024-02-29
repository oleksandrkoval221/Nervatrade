import { useState } from "react";

interface propsType {
  maxPages: number;
  currentPage: number;
  setCurrentPage: any;
}

const roundEffectClass =
  "rounded-lg w-[38px] h-8 flex items-center justify-center cursor-pointer font-semibold text-xs";

const Pagenation = ({ maxPages, currentPage, setCurrentPage }: propsType) => {
  let items = [];
  let leftSide = currentPage - 2;
  if (leftSide <= 0) leftSide = 1;
  let rightSide = currentPage + 2;
  if (rightSide > maxPages) rightSide = maxPages;
  for (let number = leftSide; number <= rightSide; number++) {
    items.push(
      <div
        key={number}
        className={`${roundEffectClass} ${
          number === currentPage ? "border border-[#626D7C]" : ""
        }`}
        onClick={() => {
          setCurrentPage(number);
        }}
      >
        {number}
      </div>
    );
  }
  const nextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div className="flex justify-center">
      <div className={`${roundEffectClass}`} onClick={prevPage}>
        {" "}
        &lsaquo;{" "}
      </div>
      {items}
      <div className={`${roundEffectClass}`} onClick={nextPage}>
        {" "}
        &rsaquo;{" "}
      </div>
    </div>
  );
};
export default Pagenation;
