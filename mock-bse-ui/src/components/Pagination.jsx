import React from "react";

const Pagination = ({ pageNumber, totalPages, onPageChange }) => {

    if (totalPages <= 1) {
        return null;
    }

    const getPageNumbers = () => {

        const pages = [];

        if (totalPages <= 7) {

            for (let i = 0; i < totalPages; i++) {
                pages.push(i);
            }

        } else {

            pages.push(0);

            if (pageNumber > 2) {
                pages.push("...");
            }

            const start = Math.max(1, pageNumber - 1);
            const end = Math.min(totalPages - 2, pageNumber + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (pageNumber < totalPages - 3) {
                pages.push("...");
            }

            pages.push(totalPages - 1);

        }

        return pages;
    };

    return (

        <nav className="mt-4">

            <ul className="pagination justify-content-center">

                <li className={`page-item ${pageNumber === 0 ? "disabled" : ""}`}>

                    <button
                        className="page-link"
                        onClick={() => onPageChange(pageNumber - 1)}
                        disabled={pageNumber === 0}
                    >
                        &laquo; Previous
                    </button>

                </li>

                {getPageNumbers().map((page, index) =>

                    page === "..." ? (

                        <li
                            key={index}
                            className="page-item disabled"
                        >
                            <span className="page-link">...</span>
                        </li>

                    ) : (

                        <li
                            key={page}
                            className={`page-item ${pageNumber === page ? "active" : ""}`}
                        >

                            <button
                                className="page-link"
                                onClick={() => onPageChange(page)}
                            >
                                {page + 1}
                            </button>

                        </li>

                    )

                )}

                <li className={`page-item ${pageNumber === totalPages - 1 ? "disabled" : ""}`}>

                    <button
                        className="page-link"
                        onClick={() => onPageChange(pageNumber + 1)}
                        disabled={pageNumber === totalPages - 1}
                    >
                        Next &raquo;
                    </button>

                </li>

            </ul>

        </nav>

    );

};

export default Pagination;