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
        return res;
    } catch(err) {
        console.error("Creating shipment failed!");
        throw err;
    }
}
