import API from './baseService';

export default class {

    static get = () => API.get('/users');
    static delete = (id) => API.delete(`/users/${id}`);


    static addUserRole = (id, role) => API.post(`/users/${id}/roles`, role);
    static removeUserRole = (id, roleId) => API.delete(`/users/${id}/roles/${roleId}`);

    static addUserGroup = (id, userId) => API.post(`/groups/${id}/members?userId=${userId}`); // id of role
    static deleteUserGroup = (id, userId) => API.delete(`/groups/${id}/members?userId=${userId}`);

}
