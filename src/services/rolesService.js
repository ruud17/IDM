import API from './baseService';

export default class {

    static get = () => API.get('/roles?service=identity_manager');
    static add = (role) => API.post('/roles', role);
    static update = (id, role) => API.put(`/roles/${id}`, role);
    static delete = (id) => API.delete(`/roles/${id}`);

}
