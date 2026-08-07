import React, { useEffect, useState } from "react";

import mockBseService from "../services/mockBseService";
import clientService from "../services/clientService";

import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

const MockBseTrades = () => {

  const [trades, setTrades] = useState([]);
  const [clients, setClients] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const [sortBy, setSortBy] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  const [clientId, setClientId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

      }

  };


  const fetchTrades = async () => {

      try {

          setLoading(true);

          const response = await mockBseService.getTrades(

              clientId,
              startDate,
              endDate,
              pageNumber,
              pageSize,
              sortBy,
              sortDirection

          );

          setTrades(response.data.content);
          setTotalPages(response.data.totalPages);

          setError("");

      } catch (err) {

          console.error(err);

          setError("Unable to fetch trades from Mock BSE.");

      } finally {

          setLoading(false);

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

  useEffect(() => {

    fetchTrades();
    fetchClients();

  }, [pageNumber, sortBy, sortDirection]);

  return (

      <div className="container mt-4">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <Link to="/" className="btn btn-primary mb-3">
                ← Dashboard
            </Link>            

            <h2>Mock BSE Trades</h2>

            <button
                className="btn btn-outline-primary"
                onClick={fetchTrades}
            >
                Refresh
            </button>

          </div>

          <div className="row mb-4">

              <div className="col-md-3">

                  <select
                      className="form-select"
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                  >

                      <option value="">All Clients</option>

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

              <div className="col-md-3">

                  <input
                      type="date"
                      className="form-control"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                  />

              </div>

              <div className="col-md-3">

                  <input
                      type="date"
                      className="form-control"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                  />

              </div>

              <div className="col-md-3 d-flex">

                  <button
                      className="btn btn-primary me-2"
                      onClick={() => {

                          setPageNumber(0);
                          fetchTrades();

                      }}
                  >
                      Filter
                  </button>

                  <button
                      className="btn btn-secondary"
                      onClick={() => {

                          setClientId("");
                          setStartDate("");
                          setEndDate("");
                          setPageNumber(0);

                          setTimeout(fetchTrades, 0);

                      }}
                  >
                      Clear
                  </button>

              </div>

          </div>

          {

              loading ?

                  (

                      <div className="text-center mt-5">

                          <div
                              className="spinner-border text-primary"
                              role="status"
                          ></div>

                          <h5 className="mt-3">
                            Fetching trades from Mock BSE...
                          </h5>

                          <p className="text-muted">
                            This may take a few seconds because the backend
                            is simulating a slow BSE response.
                          </p>

                      </div>

                  )

                  :

                  error ?

                      (
                            <div className="alert alert-danger d-flex justify-content-between align-items-center">

                                <span>{error}</span>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={fetchTrades}
                                >
                                    Retry
                                </button>

                            </div>
                      )

                      :

                      (

                          <>

                              <table className="table table-bordered table-striped">

                                <thead>

                                    <tr>

                                        <th
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleSort("id")}
                                        >
                                            ID {sortBy === "id" && (sortDirection === "asc" ? "▲" : "▼")}
                                        </th>

                                        <th
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleSort("tradeDate")}
                                        >
                                            Trade Date {sortBy === "tradeDate" && (sortDirection === "asc" ? "▲" : "▼")}
                                        </th>

                                        <th
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleSort("stockName")}
                                        >
                                            Stock Name {sortBy === "stockName" && (sortDirection === "asc" ? "▲" : "▼")}
                                        </th>

                                        <th
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleSort("quantity")}
                                        >
                                            Quantity {sortBy === "quantity" && (sortDirection === "asc" ? "▲" : "▼")}
                                        </th>

                                        <th
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleSort("price")}
                                        >
                                            Price {sortBy === "price" && (sortDirection === "asc" ? "▲" : "▼")}
                                        </th>

                                        <th
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleSort("brokerage")}
                                        >
                                            Brokerage {sortBy === "brokerage" && (sortDirection === "asc" ? "▲" : "▼")}
                                        </th>

                                        <th
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleSort("client.clientCode")}
                                        >
                                            Client Code{" "}

                                            {
                                                sortBy === "client.clientCode" &&

                                                (
                                                    sortDirection === "asc"

                                                        ? "▲"

                                                        : "▼"
                                                )
                                            }

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        trades.length === 0 ?

                                            (

                                                <tr>

                                                    <td
                                                        colSpan="7"
                                                        className="text-center"
                                                    >
                                                        No trades found.
                                                    </td>

                                                </tr>

                                            )

                                            :

                                            (

                                                trades.map((trade) => (

                                                    <tr key={trade.id}>

                                                        <td>{trade.id}</td>

                                                        <td>{trade.tradeDate}</td>

                                                        <td>{trade.stockName}</td>

                                                        <td>{trade.quantity}</td>

                                                        <td>{trade.price}</td>

                                                        <td>{trade.brokerage}</td>

                                                        <td>{trade.clientCode}</td>

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

                          </>

                      )

          }

      </div>

  );
}

export default MockBseTrades