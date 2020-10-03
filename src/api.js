import axios from 'axios';
import { toast } from 'react-toastify';

// Fetch all shipments
export async function getShipments() {
    try {
        const res = await axios.get('/api/shipments');
        return res.data;
    } catch (err) {
        console.error('Fetching shipments failed!');
        toast.error('Error loading shipment data. Please try again later.', {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
        throw err;
    }
}

export async function postShipment(body) {
    try {
        const res = await axios.post('/api/shipments', body);
        return res.data;
    } catch(err) {
        console.error('Creating shipment failed!');
        toast.error('Error creating shipment. Please try again later.', {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
        throw err;
    }
}

export async function changeActiveStatus(id, body) {
    try {
        const res = await axios.patch(`/api/shipments/${id}`, body);
        return res.data;
    } catch(err) {
        console.error('Editing shipment failed!');
        toast.error('Error changing shipment status. Please try again later.', {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
        throw err;
    }
}

export async function deleteShipment(id) {
    try {
        const res = await axios.delete(`/api/shipments/${id}`);
        return res.data;
    } catch(err) {
        console.error('Deleting shipment failed!');
        toast.error('Error deleting shipment. Please try again later.', {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
        throw err;
    }
}

export async function deleteAllShipments() {
    try {
        const res = await axios.delete('/api/all-shipments');
        return res.data;
    } catch(err) {
        console.error('Deleting all shipments failed!');
        toast.error('Error deleting all shipments. Please try again later.', {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
        throw err;
    }
}
