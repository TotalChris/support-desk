import axios from "axios";

const API_URL = '/api/tickets/'

//create new ticket
const createTicket = async (ticket, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.post(API_URL, ticket, config);

    return response.data;
}

const ticketService = {
    createTicket,
}

export default ticketService;