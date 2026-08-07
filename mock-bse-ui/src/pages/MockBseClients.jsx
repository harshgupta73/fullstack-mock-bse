import React, { useEffect, useState } from "react";
import mockBseService from "../services/mockBseService";
import Pagination from "../components/Pagination";

import sseService from "../services/sseService";
import { Link } from "react-router-dom";

const MockBseClients = () => {
    const [clients, setClients] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [pageNumber, setPageNumber] = useState(0);

    const [pageSize] = useState(5);

    const [totalPages, setTotalPages] = useState(0);

    const [sortBy, setSortBy] = useState("id");

    const [sortDirection, setSortDirection] = useState("asc");

    const fetchClients = async () => {

        try {

            setLoading(true);

            const response =
                await mockBseService.getClients(
                    pageNumber,
                    pageSize,
                    sortBy,
                    sortDirection
                );
        

            setClients(response.data.content);

            setTotalPages(response.data.totalPages);

            setError("");

        } catch (err) {
            console.log(err)
            setError("Unable to fetch clients from Mock BSE.");

        } finally {
            setLoading(false);

        }

    };

    useEffect(() => {

        fetchClients();

        const eventSource =
            sseService.subscribeToEvents((event) => {

            if (event.type === "BSE_DATA_UPDATED") {

                fetchClients();

            }

        });

        return () => {

            eventSource.close();

        };

    }, [pageNumber, sortBy, sortDirection]);

    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-3">

                <Link to="/" className="btn btn-primary">
                    ← Dashboard
                </Link>                

                <h2>Mock BSE Clients</h2>

                <button
                    className="btn btn-outline-primary"
                    onClick={fetchClients}
                >
                    Refresh
                </button>

            </div>

            {

                loading &&

                (

                    <div className="text-center my-5">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        ></div>

                        <h5 className="mt-3">

                            Fetching data from Mock BSE...

                        </h5>

                        <p className="text-muted">

                            This may take a few seconds because the backend
                            is simulating a slow BSE response.

                        </p>

                    </div>

                )

            }

            {

                error &&

                (

                    <div className="alert alert-danger d-flex justify-content-between align-items-center">

                        <span>{error}</span>

                        <button
                            className="btn btn-danger btn-sm"
                            onClick={fetchClients}
                        >
                            Retry
                        </button>

                    </div>

                )

            }

            {

                !loading &&
                !error &&

                (

                    <>

                        <table className="table table-bordered table-striped">

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>Client Code</th>

                                    <th>Name</th>

                                    <th>Email</th>

                                    <th>Mobile</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    clients.length === 0

                                        ?

                                        (

                                            <tr>

                                                <td
                                                    colSpan="5"
                                                    className="text-center"
                                                >

                                                    No clients found.

                                                </td>

                                            </tr>

                                        )

                                        :

                                        (

                                            clients.map(client => (

                                                <tr key={client.id}>

                                                    <td>{client.id}</td>

                                                    <td>{client.clientCode}</td>

                                                    <td>{client.name}</td>

                                                    <td>{client.email}</td>

                                                    <td>{client.mobile}</td>

                                                </tr>

                                            ))

                                        )

                                }

                            </tbody>

                        </table>

                        <Pagination
                            pageNumber={pageNumber}
                            totalPages={totalPages}
                            onPageChange={setPageNumber}
                        />

                    </>

                )

            }

        </div>

    );
};

export default MockBseClients