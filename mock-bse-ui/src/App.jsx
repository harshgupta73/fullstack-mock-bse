import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Clients from "./pages/Clients";
import Trades from "./pages/Trades";
import MyClients from "./pages/MyClients";
import MyTrades from "./pages/MyTrades";
import Incentives from "./pages/Incentives";

import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";

import AddClient from "./pages/AddClient";
import EditClient from "./pages/EditClient";

import AddTrade from "./pages/AddTrade";
import EditTrade from "./pages/EditTrade";

import MockBseClients from "./pages/MockBseClients";
import MockBseTrades from "./pages/MockBseTrades";

const App = () => {
    return (

        <div className="d-flex flex-column min-vh-100">

            <Navbar />

            <main className="flex-grow-1">

                <Routes>

                    <Route path="/" element={<Dashboard />} />

                    <Route path="/employees" element={<Employees />} />
                    <Route path="/employees/add" element={<AddEmployee />} />
                    <Route path="/employees/edit/:id" element={<EditEmployee />} />

                    <Route path="/clients" element={<Clients />} />
                    <Route path="/clients/add" element={<AddClient />} />
                    <Route path="/clients/edit/:id" element={<EditClient />} />

                    <Route path="/trades" element={<Trades />} />
                    <Route path="/trades/add" element={<AddTrade />} />
                    <Route path="/trades/edit/:id" element={<EditTrade />} />

                    <Route path="/my-clients" element={<MyClients />} />
                    <Route path="/my-trades" element={<MyTrades />} />

                    <Route path="/incentives" element={<Incentives />} />

                    <Route path="/bse/clients" element={<MockBseClients />} />
                    <Route path="/bse/trades" element={<MockBseTrades />} />

                </Routes>

            </main>

            <Footer />

        </div>

    );
};

export default App;