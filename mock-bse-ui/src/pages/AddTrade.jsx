import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import tradeService from "../services/tradeService";
import clientService from "../services/clientService";
import { Link } from "react-router-dom";

const AddTrade = () => {
    const navigate = useNavigate();

    const [clients, setClients] = useState([]);

    const [trade, setTrade] = useState({

        clientId: "",

        tradeDate: "",

        stockName: "",

        quantity: "",

        price: "",

        brokerage: ""

    });

    const fetchClients = async () => {

        try {

            const response = await clientService.getClients(
                0,
                1000,
                "clientCode",
                "asc"
            );

            setClients(response.data.content);

        } catch (err) {

            console.error(err);

            alert("Unable to load clients.");

        }

    };

    const handleChange = (e) => {

        setTrade({

            ...trade,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await tradeService.addTrade(trade);

            alert("Trade added successfully.");

            navigate("/trades");

        } catch (err) {

            console.error(err);

            alert("Unable to add trade.");

        }

    };

    useEffect(() => {

        fetchClients();

    }, []);


    return (

        <div className="container mt-4">

            <Link to="/" className="btn btn-primary mb-3">
                ← Dashboard
            </Link>

            <h2 className="mb-4">Add Trade</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">

                    <label className="form-label">
                        Client
                    </label>

                    <select
                        name="clientId"
                        className="form-select"
                        value={trade.clientId}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Client
                        </option>

                        {

                            clients.map((client) => (

                                <option
                                    key={client.id}
                                    value={client.id}
                                >
                                    {client.clientCode}
                                </option>

                            ))

                        }

                    </select>

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Trade Date
                    </label>

                    <input
                        type="date"
                        name="tradeDate"
                        className="form-control"
                        value={trade.tradeDate}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Stock Name
                    </label>

                    <input
                        type="text"
                        name="stockName"
                        className="form-control"
                        value={trade.stockName}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Quantity
                    </label>

                    <input
                        type="number"
                        name="quantity"
                        className="form-control"
                        value={trade.quantity}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Price
                    </label>

                    <input
                        type="number"
                        name="price"
                        className="form-control"
                        value={trade.price}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Brokerage
                    </label>

                    <input
                        type="number"
                        name="brokerage"
                        className="form-control"
                        value={trade.brokerage}
                        onChange={handleChange}
                    />

                </div>

                <button
                    type="submit"
                    className="btn btn-success me-2"
                >
                    Save
                </button>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/trades")}
                >
                    Cancel
                </button>

            </form>

        </div>

    );
}

export default AddTrade