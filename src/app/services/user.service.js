import httpService from "./http.service";
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
    create: async (content) => {
        const { data } = await httpService.post(userEndpoint, content);
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(
            userEndpoint + id
        );
        return data;
    },
};
export default userService;
