import axios from "axios"

const API_URL = "http://localhost:8080/instituicoes";

export const findAll = async(page: number) =>  {
    return axios.get(API_URL, {
        params: {
            page,
            size: 10
        }
    });
}

export const findById = async(id: string) =>  {
    return axios.get(`${API_URL}/${id}`);
}

export const save = async(data: any) => {
    if (data.id) {
        return axios.put(`${API_URL}/${data.id}`, data);
    }
    return axios.post(API_URL, data);
}

export const deleteById = async(id: string) => {
    return axios.delete(`${API_URL}/${id}`);
}