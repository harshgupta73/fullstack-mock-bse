import React, { useEffect, useState } from "react";
import employeeService from "../services/employeeService";
import { Link } from "react-router-dom";

const MyTrades = () => {

    const [employees, setEmployees] = useState([]);

    const [employeeId, setEmployeeId] = useState("");

    const [trades, setTrades] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [searched, setSearched] = useState(false);

    const fetchEmployees = async () => {

        try {

            const response =
                await employeeService.getAllEmployees();

            setEmployees(response.data.content);

        } catch (err) {

            console.error(err);

            setError("Unable to load employees.");

        }

    };


    const fetchTrades = async () => {

        if (!employeeId) {

            alert("Please select an employee.");

            return;

        }

        setSearched(true);

        try {

            setLoading(true);

            const response =
                await employeeService.getEmployeeTrades(employeeId);

            setTrades(response.data);

            setError("");

        } catch (err) {

            console.error(err);

            setError("Unable to fetch employee trades.");

            setTrades([]);

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchEmployees();

    }, []);

    return (

        <div className="container mt-4">

            <Link to="/" className="btn btn-primary">
                ← Dashboard
            </Link>

            <h2 className="mb-4">Employee Trades</h2>

            <div className="row mb-4">

                <div className="col-md-4">

                    <select
                        className="form-select"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                    >

                        <option value="">
                            Select Employee
                        </option>

                        {

                            employees.map((employee) => (

                                <option
                                    key={employee.id}
                                    value={employee.id}
                                >

                                    {employee.employeeCode}

                                </option>

                            ))

                        }

                    </select>

                </div>

                <div className="col-md-2">

                    <button
                        className="btn btn-primary w-100"
                        onClick={fetchTrades}
                    >
                        Load Trades
                    </button>

                </div>

            </div>

            {

                loading &&

                (

                    <div className="text-center my-5">

                        <div
                            className="spinner-border"
                            role="status"
                        ></div>

                        <p className="mt-3">
                            Loading trades...
                        </p>

                    </div>

                )

            }

            {

                error &&

                (

                    <div className="alert alert-danger">

                        {error}

                    </div>

                )

            }

            {

                !loading &&
                trades.length > 0 &&

                (

                    <table className="table table-bordered table-striped">

                        <thead>

                            <tr>

                                <th>ID</th>

                                <th>Trade Date</th>

                                <th>Client Code</th>

                                <th>Stock</th>

                                <th>Quantity</th>

                                <th>Price</th>

                                <th>Brokerage</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                trades.map((trade) => (

                                    <tr key={trade.id}>

                                        <td>{trade.id}</td>

                                        <td>{trade.tradeDate}</td>

                                        <td>{trade.clientCode}</td>

                                        <td>{trade.stockName}</td>

                                        <td>{trade.quantity}</td>

                                        <td>{trade.price}</td>

                                        <td>{trade.brokerage}</td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                )

            }

            {

                searched &&
                !loading &&
                employeeId &&
                trades.length === 0 &&
                !error &&

                (

                    <div className="alert alert-info">

                        No trades found for this employee.

                    </div>

                )

            }

        </div>

    );
};

export default MyTrades