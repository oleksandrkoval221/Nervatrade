import { useState } from "react";

interface propsType {
  maxPages: number;
  currentPage: number;
  setCurrentPage: any;
}

const roundEffectClass = 'rounded-full border border-gray-500 w-8 h-8 flex items-center justify-center cursor-pointer';

const Pagenation = ({
  maxPages,
  currentPage,
  setCurrentPage
}: propsType) => {
  let items = [];
  let leftSide = currentPage - 2;
  if (leftSide <= 0) leftSide = 1;
  let rightSide = currentPage + 2;
  if (rightSide > maxPages) rightSide = maxPages;
  for (let number = leftSide; number <= rightSide; number++) {
    items.push(
      <div key={number} className={`${roundEffectClass} ${number === currentPage ? 'bg-green-main text-black' : ''}`} onClick={() => { setCurrentPage(number) }}>
        {number}
      </div>,
    );
  }
  const nextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  return (
    <div className="flex justify-center gap-1 py-2">
      <div className={`${roundEffectClass}`} onClick={prevPage}> &lsaquo; </div>
      {items}
      <div className={`${roundEffectClass}`} onClick={nextPage}> &rsaquo; </div>
    </div>
  )
}
export default Pagenation;