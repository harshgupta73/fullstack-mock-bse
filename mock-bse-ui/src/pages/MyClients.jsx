import React, { useEffect, useState } from "react";
import employeeService from "../services/employeeService";
import myClientService from "../services/myClientService";
import { Link } from "react-router-dom";

const MyClients = () => {

    const [employees, setEmployees] = useState([]);

    const [employeeId, setEmployeeId] = useState("");

    const [clients, setClients] = useState([]);

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


    const fetchClients = async () => {

      if (!employeeId) {

          alert("Please select an employee.");

          return;

      }

      setSearched(true);

      try {

          setLoading(true);

          const response =
              await myClientService.getMyClients(employeeId);

          setClients(response.data);

          setError("");

      } catch (err) {

          console.error(err);

          setError("Unable to fetch assigned clients.");

          setClients([]);

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

          <h2 className="mb-4">My Clients</h2>

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
                      onClick={fetchClients}
                  >
                      Load Clients
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

                          Loading clients...

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

              clients.length > 0 &&

              (

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

                              clients.map((client) => (

                                  <tr key={client.id}>

                                      <td>{client.id}</td>

                                      <td>{client.clientCode}</td>

                                      <td>{client.name}</td>

                                      <td>{client.email}</td>

                                      <td>{client.mobile}</td>

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

              clients.length === 0 &&

              !error &&

              (

                  <div className="alert alert-info">

                      No clients assigned to this employee.

                  </div>

              )

          }

      </div>

    );
};

export default MyClients