import React, { useEffect, useState } from "react";
import employeeService from "../services/employeeService";
import { Link } from "react-router-dom";

const Incentives = () => {
  
  const [employees, setEmployees] = useState([]);

  const [employeeId, setEmployeeId] = useState("");

  const [incentive, setIncentive] = useState(null);

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

  const fetchIncentive = async () => {

    if (!employeeId) {

        alert("Please select an employee.");

        return;

    }

    setSearched(true);

    try {

        setLoading(true);

        const response =
            await employeeService.getEmployeeIncentive(employeeId);

        setIncentive(response.data);

        setError("");

    } catch (err) {

        console.error(err);

        setError("Unable to fetch incentive.");

        setIncentive(null);

    } finally {

        setLoading(false);

    }

  };

  useEffect(() => {

    fetchEmployees();

  }, []);
  
  return (

    <div className="container mt-4">

        <div className="d-flex justify-content-end mb-3">
            <Link to="/" className="btn btn-primary">
                ← Dashboard
            </Link>
        </div>

        <h2 className="mb-4">Employee Incentive</h2>

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
                    onClick={fetchIncentive}
                >
                    Load
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
                        Loading incentive...
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

            incentive &&

            (

                <div className="card shadow">

                    <div className="card-header bg-primary text-white">

                        Employee Incentive Details

                    </div>

                    <div className="card-body">

                        <table className="table table-bordered mb-0">

                            <tbody>

                                <tr>
                                    <th>Employee Code</th>
                                    <td>{incentive.employeeCode}</td>
                                </tr>

                                <tr>
                                    <th>Total Brokerage</th>
                                    <td>₹ {incentive.totalBrokerage}</td>
                                </tr>

                                <tr>
                                    <th>Incentive Percentage</th>
                                    <td>{incentive.incentivePercentage}%</td>
                                </tr>

                                <tr className="table-success">

                                    <th>Incentive Amount</th>

                                    <td>

                                        <strong>

                                            ₹ {incentive.incentiveAmount}

                                        </strong>

                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            )

        }

        {

            searched &&
            !loading &&
            !error &&
            incentive === null &&

            (

                <div className="alert alert-info">

                    No incentive data found.

                </div>

            )

        }

    </div>

  );
};

export default Incentives