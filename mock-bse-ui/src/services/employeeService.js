import api from "../api/axiosConfig";

const getEmployees = (pageNumber = 0,pageSize = 5,sortBy = "id",sortDirection = "asc") => {

    return api.get("/employees", {
        params: {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection
        }
    });

};

const getAllEmployees = () => {

    return api.get("/employees", {
        params: {
            pageNumber: 0,
            pageSize: 1000,
            sortBy: "employeeCode",
            sortDirection: "asc"
        }
    });

};

const getEmployeeById = (id) => {

    return api.get(`/employees/${id}`);

};

const addEmployee = (employee) => {

    return api.post("/employees", employee);

};

const updateEmployee = (id, employee) => {

    return api.put(`/employees/${id}`, employee);

};

const deleteEmployee = (id) => {

    return api.delete(`/employees/${id}`);

};

const getEmployeeTrades = (employeeId) => {

    return api.get(`/employees/${employeeId}/trades`);

};

const getEmployeeBrokerage = (employeeId) => {

    return api.get(`/employees/${employeeId}/brokerage`);

};

const getEmployeeIncentive = (employeeId) => {

    return api.get(`/employees/${employeeId}/incentive`);

};

const employeeService = {
    getEmployees,
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeTrades,
    getEmployeeBrokerage,
    getEmployeeIncentive
};

export default employeeService;