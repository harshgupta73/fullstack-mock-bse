import api from "../api/axiosConfig";

const getClients = (
    pageNumber = 0,
    pageSize = 5,
    sortBy = "id",
    sortDirection = "asc"
) => {

    return api.get("/clients", {
        params: {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection
        }
    });

};

const getClientById = (id) => {

    return api.get(`/clients/${id}`);

};

const addClient = (client) => {

    return api.post("/clients", client);

};

const updateClient = (id, client) => {

    return api.put(`/clients/${id}`, client);

};

const deleteClient = (id) => {

    return api.delete(`/clients/${id}`);

};

const clientService = {

    getClients,
    getClientById,
    addClient,
    updateClient,
    deleteClient

};

export default clientService;