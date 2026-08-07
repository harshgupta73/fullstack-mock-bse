import api from "../api/axiosConfig";

const getClients = (
    pageNumber = 0,
    pageSize = 5,
    sortBy = "id",
    sortDirection = "asc"
) => {

    return api.get("/bse/clients", {
        params: {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection
        }
    });

};

const getTrades = (
    clientId = "",
    startDate = "",
    endDate = "",
    pageNumber = 0,
    pageSize = 5,
    sortBy = "id",
    sortDirection = "asc"
) => {

    return api.get("/bse/trades", {
        params: {
            clientId,
            startDate,
            endDate,
            pageNumber,
            pageSize,
            sortBy,
            sortDirection
        }
    });

};

const mockBseService = {

    getClients,
    getTrades

};

export default mockBseService;