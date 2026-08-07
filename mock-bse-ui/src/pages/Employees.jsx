import React, { useEffect, useState } from "react";
import employeeService from "../services/employeeService";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

const Employees = () => {

    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    const [sortBy, setSortBy] = useState("id");
    const [sortDirection, setSortDirection] = useState("asc");


    useEffect(() => {
        fetchEmployees();
    }, [pageNumber,sortBy,sortDirection]);

    const fetchEmployees = async () => {

        try {

            setLoading(true);

            const response = await employeeService.getEmployees(pageNumber,pageSize,sortBy,sortDirection);

            setEmployees(response.data.content);
            setTotalPages(response.data.totalPages);

            setError("");

        } catch (err) {

            console.error(err);

            setError("Unable to fetch employees.");

        } finally {

            setLoading(false);

        }

    };


    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await employeeService.deleteEmployee(id);

            fetchEmployees();

            alert("Employee deleted successfully.");

        } catch (err) {

            console.error(err);

            alert("Unable to delete employee.");

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
                <p className="mt-2">Loading employees...</p>
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

                <h2>Employees</h2>

                <button
                    className="btn btn-success"
                    onClick={() => navigate("/employees/add")}
                >
                    Add Employee
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
                            onClick={() => handleSort("employeeCode")}
                        >
                            Code{" "}

                            {
                                sortBy === "employeeCode" &&

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
                        employees.length === 0 ?

                            (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No employees found.
                                    </td>
                                </tr>
                            )

                            :

                            (
                                employees.map((employee) => (

                                    <tr key={employee.id}>

                                        <td>{employee.id}</td>
                                        <td>{employee.employeeCode}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.mobile}</td>
                                        <td>

                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => navigate(`/employees/edit/${employee.id}`)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(employee.id)}
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

export default Employees;