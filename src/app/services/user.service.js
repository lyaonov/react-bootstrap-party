import httpService from "./http.service";
import localStorageService from "./localStorage.service";
const userEndpoint = "user/";

const userService = {
    update: async (id, content) => {
        const { data } = await httpService.put(userEndpoint + id, content);
        return data;
    },
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    fetchAll: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(userEndpoint + payload._id, payload);
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(
            userEndpoint + id
        );
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(userEndpoint + localStorageService.getUserId());
        return data;
    },
};
export default userService;
