import React from "react";

type Props = {
    currentPage: number;
    itemsPerPageMax: number;
    itemsLength?: number;
    onPreviousClick: () => void;
    onNextClick: () => void;
};

const Pagination = ({ currentPage, itemsPerPageMax, itemsLength, onPreviousClick, onNextClick }: Props) => {
    return Number(itemsLength) > 0 ? (
        <>
            {currentPage > 1 && <button onClick={onPreviousClick}>&lt; previous</button>}
            <span> -= {currentPage} =- </span>
            {itemsLength === itemsPerPageMax && <button onClick={onNextClick}>next &gt;</button>}
        </>
    ) : null;
};

export default Pagination;
