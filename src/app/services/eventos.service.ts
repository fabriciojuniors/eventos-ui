import axios from "axios"

const API_URL = "http://localhost:8080/instituicoes";

export const findById = async(institucaiId: string, id: string) =>  {
    return axios.get(`${API_URL}/${institucaiId}/eventos/${id}`);
}

export const save = async(data: any, institucaiId: string) => {
    if (data.id) {
        return axios.put(`${API_URL}/${institucaiId}/eventos/${data.id}`, data);
    }
    return axios.post(`${API_URL}/${institucaiId}/eventos`, data);
}

export const deleteById = async(institucaiId: string, id: string) => {
    return axios.delete(`${API_URL}/${institucaiId}/eventos/${id}`);
}