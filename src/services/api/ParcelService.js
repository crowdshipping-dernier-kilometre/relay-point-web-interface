import axios from "axios";
import Cookies from 'js-cookie';
import { mapParcelModel } from "../../utils/mapping";

export class ParcelService {
    apiUrl = import.meta.env.VITE_LAST_MILE_API_URL

    async getAllParcelsByRelayPoint(relayPointId) {
        try {
            const response = await axios.get(`${this.apiUrl}/api/parcels/relay-point/${relayPointId}`, {
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

    // Parcel code controller
    async getParcelByCode(code) {
        try {
            const response = await axios.get(`${this.apiUrl}/api/parcels/${code}/relay-code`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            });
            return { error: false, data: mapParcelModel(response.data) };
        } catch (error) {
            return { error: true, message: error.message };
        }
    }

    // pickup parcel by crowdshipper
    async pickupParcelByCrowdshipper(id) {
        try {
            const response = await axios.post(`${this.apiUrl}/api/parcels/${id}/pickup`, null, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            });
            return { error: false, data: mapParcelModel(response.data) };
        } catch (error) {
            return { error: true, message: error.message };
        }
    }

    // Validate Parcel by id
    async validateParcelById(id) {
        try {
            const response = await axios.post(`${this.apiUrl}/api/parcels/${id}/validate`, null, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            });
            return { error: false, data: mapParcelModel(response.data) };
        } catch (error) {
            return { error: true, message: error.message };
        }
    }

    // STATS
    async getParcelStats() {
        const responseParcels = await this.getAllParcelsByRelayPoint();

        if (responseParcels.error) {
            return { error: true, message: responseParcels.message };
        }

        const stats = {
            arrivedAtRelayPoint: responseParcels.data.filter(parcel => parcel.status === 'ARRIVED_AT_RELAY_POINT').length,
            waitingForCrowdshipper: responseParcels.data.filter(parcel => parcel.status === 'WAITING_FOR_CROWDSHIPPER').length,
            inTransit: responseParcels.data.filter(parcel => parcel.status === 'IN_TRANSIT').length,
            deliveredToClient: responseParcels.data.filter(parcel => parcel.status === 'DELIVERED_TO_CLIENT').length,
            blockedOrIssue: responseParcels.data.filter(parcel => parcel.status === 'BLOCKED_OR_ISSUE').length,
            validatedByRelayPoint: responseParcels.data.filter(parcel => parcel.status === 'VALIDATED_BY_RELAY_POINT').length
        };
        return { error: false, data: stats };
    }
}