import React, { useState } from "react";
import clientService from "../services/clientService";
import { useNavigate } from "react-router-dom";

const AddClient = () => {

    const navigate = useNavigate();

    const [client, setClient] = useState({

        clientCode: "",
        name: "",
        panNumber: "",
        email: "",
        mobile: ""

    });

    const handleChange = (e) => {

        setClient({

            ...client,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await clientService.addClient(client);

            alert("Client added successfully.");

            navigate("/clients");

        } catch (err) {

            console.error(err);

            alert("Unable to add client.");

        }

    };

    return (

        <div className="container mt-4">

            <h2 className="mb-4">Add Client</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">

                    <label className="form-label">
                        Client Code
                    </label>

                    <input
                        type="text"
                        name="clientCode"
                        className="form-control"
                        value={client.clientCode}
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
                        value={client.name}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        PAN Number
                    </label>

                    <input
                        type="text"
                        name="panNumber"
                        className="form-control"
                        value={client.panNumber}
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
                        value={client.email}
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
                        value={client.mobile}
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
                        onClick={() => navigate("/clients")}
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    );

};

export default AddClient;