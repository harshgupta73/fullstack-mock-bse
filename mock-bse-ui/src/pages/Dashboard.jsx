import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {

    const cards = [

        {
            title: "Employees",
            description: "Manage employees",
            color: "primary",
            link: "/employees"
        },

        {
            title: "Clients",
            description: "Manage clients",
            color: "success",
            link: "/clients"
        },

        {
            title: "Trades",
            description: "Manage trades",
            color: "warning",
            link: "/trades"
        },

        {
            title: "My Clients",
            description: "Employee assigned clients",
            color: "info",
            link: "/my-clients"
        },

        {
            title: "My Trades",
            description: "Employee trade history",
            color: "secondary",
            link: "/my-trades"
        },

        {
            title: "Incentives",
            description: "Employee incentives",
            color: "dark",
            link: "/incentives"
        },

        {
            title: "Mock BSE Clients",
            description: "Simulated BSE Clients API",
            color: "danger",
            link: "/bse/clients"
        },

        {
            title: "Mock BSE Trades",
            description: "Simulated BSE Trades API",
            color: "primary",
            link: "/bse/trades"
        }

    ];

    return (

        <div className="container mt-4 mb-4">

            <div className="text-center mb-5">

                <h1 className="fw-bold">
                    Mock BSE Internal Portal
                </h1>

                <p className="text-muted">

                    Employee • Client • Trade Management System

                </p>

            </div>

            <div className="row">

                {

                    cards.map((card, index) => (

                        <div
                            className="col-lg-3 col-md-6 mb-4"
                            key={index}
                        >

                            <div className="card shadow h-100">

                                <div className={`card-header bg-${card.color} text-white`}>

                                    <h5 className="mb-0">

                                        {card.title}

                                    </h5>

                                </div>

                                <div className="card-body d-flex flex-column">

                                    <p className="card-text flex-grow-1">

                                        {card.description}

                                    </p>

                                    <Link
                                        to={card.link}
                                        className={`btn btn-${card.color}`}
                                    >

                                        Open

                                    </Link>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

            <div className="card shadow mt-4">

                <div className="card-header bg-light">

                    <h4 className="mb-0">

                        Project Features

                    </h4>

                </div>

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6">

                            <ul>

                                <li>Employee Management</li>

                                <li>Client Management</li>

                                <li>Trade Management</li>

                                <li>Employee Client Mapping</li>

                                <li>Incentive Calculation</li>

                                <li>Pagination</li>

                            </ul>

                        </div>

                        <div className="col-md-6">

                            <ul>

                                <li>Sorting</li>

                                <li>Filtering</li>

                                <li>Mock BSE APIs</li>

                                <li>Delay Simulation</li>

                                <li>Failure Simulation</li>

                                <li>Server Sent Events (SSE)</li>

                            </ul>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Dashboard;