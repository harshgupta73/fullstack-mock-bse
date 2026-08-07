import React, { useEffect, useState } from "react";
import clientService from "../services/clientService";
import { useNavigate, useParams } from "react-router-dom";

const EditClient = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [client, setClient] = useState({

        clientCode: "",
        name: "",
        panNumber: "",
        email: "",
        mobile: ""

    });

    useEffect(() => {

        fetchClient();

    }, []);

    const fetchClient = async () => {

        try {

            const response = await clientService.getClientById(id);

            setClient(response.data);

        } catch (err) {

            console.error(err);

            alert("Unable to fetch client.");

        }

    };

    const handleChange = (e) => {

        setClient({

            ...client,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await clientService.updateClient(id, client);

            alert("Client updated successfully.");

            navigate("/clients");

        } catch (err) {

            console.error(err);

            alert("Unable to update client.");

        }

    };

    return (

        <div className="container mt-4">

            <h2 className="mb-4">Edit Client</h2>

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
                        disabled
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
                        Update
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

export default EditClient;