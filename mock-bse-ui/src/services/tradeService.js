import api from "../api/axiosConfig";

const getTrades = (
    clientId = "",
    startDate = "",
    endDate = "",
    pageNumber = 0,
    pageSize = 5,
    sortBy = "id",
    sortDirection = "asc"
) => {

    const params = {
        pageNumber,
        pageSize,
        sortBy,
        sortDirection
    };

    if (clientId !== "") {
        params.clientId = clientId;
    }

    if (startDate !== "" && endDate !== "") {
        params.startDate = startDate;
        params.endDate = endDate;
    }

    return api.get("/trades", { params });

};

const getTradeById = (id) => {

    return api.get(`/trades/${id}`);

};

const addTrade = (trade) => {

    return api.post("/trades", trade);

};

const updateTrade = (id, trade) => {

    return api.put(`/trades/${id}`, trade);

};

const deleteTrade = (id) => {

    return api.delete(`/trades/${id}`);

};

const tradeService = {

    getTrades,
    getTradeById,
    addTrade,
    updateTrade,
    deleteTrade

};

export default tradeService;