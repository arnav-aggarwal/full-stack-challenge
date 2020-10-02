import axios from "axios";

// Fetch all shipments
export async function getShipments() {
    try {
        const res = await axios.get("/api/shipments");
        return res.data;
    } catch (err) {
        console.error("Fetching shipments from API failed!");
        throw err;
    }
}

export async function postShipment(body) {
    try {
        const res = await axios.post("/api/shipments", body);

        if(res.status !== 201) {
            throw new Error("Create shipment response code was not 201");
        }

        return res.data;
    } catch(err) {
        console.error("Creating shipment failed!");
        throw err;
    }
}

export async function changeActiveStatus(id, body) {
    try {
        const res = await axios.patch(`/api/shipments/${id}`, body);

        if(res.status !== 200) {
            throw new Error("Edit shipment active status response code was not 200");
        }

        return res.data;
    } catch(err) {
        console.error("Editing shipment failed!");
        throw err;
    }
}

export async function deleteShipment(id) {
    try {
        const res = await axios.delete(`/api/shipments/${id}`);

        if(res.status !== 200) {
            throw new Error("Edit shipment active status response code was not 200");
        }

        return res.data;
    } catch(err) {
        console.error("Editing shipment failed!");
        throw err;
    }
}
