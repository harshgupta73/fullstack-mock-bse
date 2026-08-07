import React, { useEffect, useState } from "react";
import clientService from "../services/clientService";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Clients = () => {

    const navigate = useNavigate();

    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    const [sortBy, setSortBy] = useState("id");
    const [sortDirection, setSortDirection] = useState("asc");

    useEffect(() => {
        fetchClients();
    }, [pageNumber, sortBy, sortDirection]);

    const fetchClients = async () => {

        try {

            setLoading(true);

            const response = await clientService.getClients(
                pageNumber,
                pageSize,
                sortBy,
                sortDirection
            );

            setClients(response.data.content);
            setTotalPages(response.data.totalPages);

            setError("");

        } catch (err) {

            console.error(err);
            setError("Unable to fetch clients.");

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this client?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await clientService.deleteClient(id);

            alert("Client deleted successfully.");

            fetchClients();

        } catch (err) {

            console.error(err);

            alert("Unable to delete client.");

        }

    };

    const handleSort = (column) => {

        if (sortBy === column) {

            setSortDirection(
                sortDirection === "asc" ? "desc" : "asc"
            );

        } else {

            setSortBy(column);
            setSortDirection("asc");

        }

    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border" role="status"></div>
                <p className="mt-2">Loading clients...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger">
                    {error}
                </div>
            </div>
        );
    }

    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-3">

                <Link to="/" className="btn btn-primary mb-3">
                    ← Dashboard
                </Link>

                <h2>Clients</h2>

                <button
                    className="btn btn-success"
                    onClick={() => navigate("/clients/add")}
                >
                    Add Client
                </button>

            </div>

            <table className="table table-bordered table-striped">

                <thead>

                    <tr>

                        <th
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("id")}
                        >
                            ID{" "}
                            {
                                sortBy === "id" &&
                                (
                                    sortDirection === "asc"
                                        ? "▲"
                                        : "▼"
                                )
                            }
                        </th>

                        <th
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("clientCode")}
                        >
                            Client Code{" "}
                            {
                                sortBy === "clientCode" &&
                                (
                                    sortDirection === "asc"
                                        ? "▲"
                                        : "▼"
                                )
                            }
                        </th>

                        <th
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("name")}
                        >
                            Name{" "}
                            {
                                sortBy === "name" &&
                                (
                                    sortDirection === "asc"
                                        ? "▲"
                                        : "▼"
                                )
                            }
                        </th>

                        <th
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("panNumber")}
                        >
                            PAN Number{" "}
                            {
                                sortBy === "panNumber" &&
                                (
                                    sortDirection === "asc"
                                        ? "▲"
                                        : "▼"
                                )
                            }
                        </th>

                        <th
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("email")}
                        >
                            Email{" "}
                            {
                                sortBy === "email" &&
                                (
                                    sortDirection === "asc"
                                        ? "▲"
                                        : "▼"
                                )
                            }
                        </th>

                        <th
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("mobile")}
                        >
                            Mobile{" "}
                            {
                                sortBy === "mobile" &&
                                (
                                    sortDirection === "asc"
                                        ? "▲"
                                        : "▼"
                                )
                            }
                        </th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        clients.length === 0 ?

                            (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        No clients found.
                                    </td>
                                </tr>
                            )

                            :

                            (

                                clients.map((client) => (

                                    <tr key={client.id}>

                                        <td>{client.id}</td>
                                        <td>{client.clientCode}</td>
                                        <td>{client.name}</td>
                                        <td>{client.panNumber}</td>
                                        <td>{client.email}</td>
                                        <td>{client.mobile}</td>

                                        <td>

                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => navigate(`/clients/edit/${client.id}`)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(client.id)}
                                            >
                                                Delete
                                            </button>

                                        </td>

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

        </div>

    );

};

export default Clients;