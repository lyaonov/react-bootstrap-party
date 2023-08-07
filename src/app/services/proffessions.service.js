import httpService from "./http.service";
const proffessionEndpoint = "profession/";

const proffessionService = {
    update: async (id, content) => {
        const { data } = await httpService.put(proffessionEndpoint + id, content);
        return data;
    },
    get: async () => {
        const { data } = await httpService.get(proffessionEndpoint);
        return data;
    },
    fetchAll: async () => {
        const { data } = await httpService.get(proffessionEndpoint);
        return data;
    },
    create: async (content) => {
        const { data } = await httpService.post(proffessionEndpoint, content);
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(
            proffessionEndpoint + id
        );
        return data;
    },
};
export default proffessionService;
