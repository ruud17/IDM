import API from './baseService';

export default class {

    static get = () => API.get('/groups?service=identity_manager');
    static add = (group) => API.post('/groups', group);
    static update = (id, group) => API.put(`/groups/${id}`, group);
    static delete = (id) => API.delete(`/groups/${id}`);

    static getGroupUsers = (id) => API.get(`/groups/${id}/members/`);

}
