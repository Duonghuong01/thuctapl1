import ConstantList from "../../appConfig";
const { default: axios } = require("axios");

export const getEmployee = () => {
    return axios
        .post(ConstantList.API_ENPOINT + "/employees/search", {})
        .then((res) => res.data.data)
        .catch((e) => console.log("error ", e));
};

export const deleteEmployee = (id) => {
    return axios
        .delete(ConstantList.API_ENPOINT + `/employees/${id}`)
        .then((res) => res.data)
        .catch((e) => console.log("error".e))
}
export const getDistricts = () => {
    return axios
        .post(ConstantList.API_ENPOINT + `/districts/search`, {})
        .then((res) => res.data.data)
        .catch((e) => console.log("error".e))
}
export const getCommunes = () => {
    return axios
        .post(ConstantList.API_ENPOINT + `/communes/search`, {})
        .then((res) => res.data.data)
        .catch((e) => console.log("error".e))
}
export const getProvinces = () => {
    return axios
        .post(ConstantList.API_ENPOINT + `/provinces/search`, {})
        .then((res) => res.data.data)
        .catch((e) => console.log("error".e))

} 
export const updateEmployee=(id, data)=>{
    return axios 
    .put(ConstantList.API_ENPOINT+ `/employees/${id}`,data)
    .then((res)=>console.log(res.data.data))
    .catch((e)=>console.log("error".e))
}
export const postEmployee=(data)=>{
    return axios
    .post(ConstantList.API_ENPOINT + `/employees`,data)
    .then((res)=> res.data)
    .catch((e)=>console.log("error",e))
}