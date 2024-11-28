import axios from "axios";

export const maps = axios.create({
	baseURL: "https://maps.googleapis.com/maps/api",
	timeout: 5000,
});
