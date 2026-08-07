import React from "react";

const Footer = () => {
    return (

        <footer className="bg-dark text-white py-4">

            <div className="container">

                <div className="row align-items-center">

                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">

                        <h5 className="fw-bold mb-2">
                            Mock BSE Internal Portal
                        </h5>

                        <p className="mb-1">
                            Employee • Client • Trade Management System
                        </p>

                        <small className="text-secondary">
                            Built with React, Spring Boot & MySQL
                        </small>

                    </div>

                    <div className="col-md-6 text-center text-md-end">

                        <p className="mb-2">

                            Developed by{" "}

                            <strong>
                                Harshvardhan Gupta
                            </strong>

                        </p>

                        <a
                            href="https://www.linkedin.com/in/harshvardhan-gupta-b10308397/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white text-decoration-none me-4"
                        >
                            <i className="bi bi-linkedin fs-5 me-2"></i>
                            LinkedIn
                        </a>

                        <a
                            href="https://github.com/harshgupta73"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white text-decoration-none"
                        >
                            <i className="bi bi-github fs-5 me-2"></i>
                            GitHub
                        </a>

                    </div>

                </div>

                <hr className="border-secondary my-3" />

                <div className="text-center">

                    <small className="text-secondary">

                        © {new Date().getFullYear()} Harshvardhan Gupta. All Rights Reserved.

                    </small>

                </div>

            </div>

        </footer>

    );
};

export default Footer;