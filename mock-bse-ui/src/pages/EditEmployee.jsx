import React, { useState,useEffect } from "react";
import employeeService from "../services/employeeService";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
    
    const navigate = useNavigate();

    const{id}=useParams()

    const [employee, setEmployee] = useState({

        employeeCode: "",

        name: "",

        email: "",

        mobile: ""

    });

    const handleChange = (e) => {

        console.log(e.target.name);
        console.log(e.target.value);

        setEmployee({

            ...employee,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await employeeService.updateEmployee(id, employee);

            alert("Employee updated successfully.");

            navigate("/employees");

        } catch (err) {

            console.error(err);

            alert("Unable to add employee.");

        }

    };

    const fetchEmployee = async () => {

        try {

            const response = await employeeService.getEmployeeById(id);

            setEmployee(response.data);

        } catch (err) {

            console.error(err);

        }

    };

    useEffect(() => {

        fetchEmployee();

    }, []);

    return (

        <div className="container mt-4">

            <h2 className="mb-4">Edit Employee</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">

                    <label className="form-label">
                        Employee Code
                    </label>

                    <input
                        type="text"
                        name="employeeCode"
                        className="form-control"
                        value={employee.employeeCode}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={employee.name}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={employee.email}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Mobile
                    </label>

                    <input
                        type="text"
                        name="mobile"
                        className="form-control"
                        value={employee.mobile}
                        onChange={handleChange}
                    />

                </div>

                <div className="mt-4">

                    <button
                        type="submit"
                        className="btn btn-success me-2"
                    >
                        Save
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/employees")}
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    );

};

export default EditEmployee;