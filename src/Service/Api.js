import axios from 'axios';


const url = "http://127.0.0.1:3003/foods";

export async function getAll() {
	let foods = (await axios.get(url)).data;
	return foods;
}

export const getFoods = async(id) => {
    id = id || '';
    return await axios.get(`${url}/${id}`);
};


export const addFood = async(food) => {
    return await axios.post(url, food);
};

export const editFood = async(id, food) => {
    return await axios.put(`${url}/${id}`, food);
};


export const deleteFood = async(id) => {
    return await axios.delete(`${url}/${id}`);
};

export async function getById(id) {
    return axios.get(`${url}?id=${id}`);
}