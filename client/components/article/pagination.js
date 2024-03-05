import React, { useState } from 'react';

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <li className={`page-item ${currentPage === i ? 'active' : ''}`} key={i}>
          <button className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>
      );
    }
    return buttons;
  };

  return (
    <div className='d-flex justify-content-center pb-3'>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} aria-label="Previous">
              <span aria-hidden="true">«</span>
            </button>
          </li>
          {renderPaginationButtons()}
          <li className="page-item">
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} aria-label="Next">
              <span aria-hidden="true">»</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
