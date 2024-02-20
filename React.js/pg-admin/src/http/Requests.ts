import IRequestData from '@/types/IRequestData';
import axios from 'axios';
import { FieldValues } from 'react-hook-form';

export const getAllUsers = async () => {
	try {
		return (await axios.get<IRequestData[]>('http://localhost:8080/api/usuarios')).data;
	} catch (error) {
		console.error(error);
		return [{} as IRequestData];
	}
};

export const getUser = async (ID: number) => {
	try {
		return (await axios.get<IRequestData>(`http://localhost:8080/api/usuarios/${ID}`)).data;
	} catch (error) {
		console.error(error);
		return {} as IRequestData;
	}
};

export const addUser = async (data: FieldValues) => {
	try {
		const res = await axios.post('http://localhost:8080/api/usuarios', data);
    alert("Conta registrada com sucesso!")
    return res
	} catch (error) {
		console.error(error);
	}
};

export const deleteUser = async (ID: number) => {
	try {
		if (confirm("Tem certeza que deseja deletar este ítem?")) {
			return await axios.delete<JSON>(`http://localhost:8080/api/usuarios/${ID}`)
		}
	} catch (error) {
		console.log(error);
	}
}

export const login = async (json: FieldValues) => {
	var resp: object = {found: false}
	try {
		resp = (await axios.post<JSON>('http://localhost:8080/api/login', json)).data
	} catch (error) {
		console.log(error);
	}
	return resp
}