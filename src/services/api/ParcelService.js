import axios from "axios";
import Cookies from 'js-cookie';
import { mapParcelModel } from "../../utils/mapping";

export class ParcelService {
    apiUrl = import.meta.env.VITE_LAST_MILE_API_URL

    async getAllParcels() {
        try {
            const response = await axios.get(`${this.apiUrl}/api/parcels`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            });
            return { error: false, data: response.data.map(mapParcelModel) };
        } catch (error) {
            return { error: true, message: error.message };
        }
    }

    async getParcelById(id) {
        try {
            const response = await axios.get(`${this.apiUrl}/api/parcels/${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            });
            return { error: false, data: mapParcelModel(response.data) };
        } catch (error) {
            return { error: true, message: error.message };
        }
    }

    async createParcel(data) {
        try {
            const response = await axios.post(`${this.apiUrl}/api/parcels`, data, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            });
            return { error: false, data: mapParcelModel(response.data) };
        } catch (error) {
            return { error: true, message: error.message };
        }
    }

    async updateParcel(id, data) {
        try {
            const response = await axios.put(`${this.apiUrl}/api/parcels/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            });
            return { error: false, data: mapParcelModel(response.data) };
        } catch (error) {
            return { error: true, message: error.message };
        }
    }

    async deleteParcel(id) {
        try {
            await axios.delete(`${this.apiUrl}/api/parcels/${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            });
            return { error: false, data: null };
        } catch (error) {
            return { error: true, message: error.message };
        }
    }


    async closeParcels(id) {
        try {
            const response = await axios.put(`${this.apiUrl}/api/parcels/close/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            });
            return { error: false, data: mapParcelModel(response.data) };
        } catch (error) {
            return { error: true, message: error.message };
        }
    }
}