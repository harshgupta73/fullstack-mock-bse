import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import tradeService from "../services/tradeService";
import clientService from "../services/clientService";
import { Link } from "react-router-dom";

const EditTrade = () => {
  
    const navigate = useNavigate();

    const { id } = useParams();

    const [trade, setTrade] = useState({

        clientId: "",

        clientCode: "",

        tradeDate: "",

        stockName: "",

        quantity: "",

        price: "",

        brokerage: ""

    });


    const fetchTrade = async () => {

        try {

            const response = await tradeService.getTradeById(id);

            setTrade(response.data);

        } catch (err) {

            console.error(err);

            alert("Unable to fetch trade.");

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

            await tradeService.updateTrade(id, {

                tradeDate: trade.tradeDate,

                stockName: trade.stockName,

                quantity: trade.quantity,

                price: trade.price,

                brokerage: trade.brokerage

            });

            alert("Trade updated successfully.");

            navigate("/trades");

        } catch (err) {

            console.error(err);

            alert("Unable to update trade.");

        }

    };


    useEffect(() => {

        fetchTrade();

    }, []);

    return (

        <div className="container mt-4">

            <Link to="/" className="btn btn-primary mb-3">
                ← Dashboard
            </Link>            

            <h2 className="mb-4">Edit Trade</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">

                    <label className="form-label">
                        Client
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={trade.clientCode}
                        disabled
                    />

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
                    Update
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
};

export default EditTrade