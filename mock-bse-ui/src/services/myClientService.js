import api from "../api/axiosConfig";

const getMyClients = (employeeId) => {
    return api.get(`/employees/${employeeId}/clients`);
};

const myClientService = {
    getMyClients
};

export default myClientService;