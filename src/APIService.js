import axios from 'axios'
const API_URL = process.env.VUE_APP_API_URL

export class APIService {
    constructor(){
    }

    listTemplates() {
        const url = `${API_URL}/api/v1/templates/`
        return axios.get(url).then(response => response.data)
    }
    createTemplate(data) {
        const url = `${API_URL}/api/v1/templates/`
        return axios.post(url, data).then(response => response.data)
    }
    updateTemplate(pk, data) {
        const url = `${API_URL}/api/v1/templates/${pk}/`
        return axios.put(url, data).then(response => response.data)
    }
    getTemplate(pk) {
        const url = `${API_URL}/api/v1/templates/${pk}/`
        return axios.get(url).then(response => response.data)
    }
    deleteTemplate(pk) {
        const url = `${API_URL}/api/v1/templates/${pk}/`
        return axios.delete(url).then(response => response.data)
    }
    getTemplateFieldset(pk) {
        // Retrieve fieldset
        const url = `${API_URL}/api/v1/templates/${pk}/fields/`
        return axios.get(url).then(response => response.data)
    }
    updateTemplateFieldset(pk, fieldset) {
        // PUT the updated fieldset
        const url = `${API_URL}/api/v1/templates/${pk}/fields/`
        return axios.put(url, fieldset).then(response => response.data)
    }
    listNodes() {
        const url = `${API_URL}/api/v1/nodes/`
        return axios.get(url).then(response => response.data)
    }
    createNode(data) {
        const url = `${API_URL}/api/v1/nodes/`
        return axios.post(url, data).then(response => response.data)
    }
    getNode(hostname) {
        const url = `${API_URL}/api/v1/nodes/${hostname}/`
        return axios.get(url).then(response => response.data)
    }
    deleteNode(hostname) {
        const url = `${API_URL}/api/v1/nodes/${hostname}/`
        return axios.delete(url).then(response => response.data)
    }
    updateNode(hostname, data) {
        const url = `${API_URL}/api/v1/nodes/${hostname}/`
        return axios.patch(url, data).then(response => response.data)
    }
    listGroups() {
        const url = `${API_URL}/api/v1/groups/`
        return axios.get(url).then(response => response.data)
    }
    createGroup(data) {
        const url = `${API_URL}/api/v1/groups/`
        return axios.post(url, data).then(response => response.data)
    }
    getGroup(name) {
        const url = `${API_URL}/api/v1/groups/${name}/`
        return axios.get(url).then(response => response.data)
    }
    deleteGroup(name) {
        const url = `${API_URL}/api/v1/groups/${name}/`
        return axios.delete(url).then(response => response.data)
    }
    updateGroup(name, data) {
        const url = `${API_URL}/api/v1/groups/${name}/`
        return axios.patch(url, data).then(response => response.data)
    }
    listResourceServices() {
        const url = `${API_URL}/api/v1/resource_services/`
        return axios.get(url).then(response => response.data)
    }
    getResourceService(pk) {
        const url = `${API_URL}/api/v1/resource_services/${pk}/`
        return axios.get(url).then(response => response.data)
    }
    updateResourceService(pk) {
        const url = `${API_URL}/api/v1/resource_services/${pk}/`
        return axios.put(url).then(response => response.data)
    }
    deleteResourceService(pk) {
        const url = `${API_URL}/api/v1/resource_services/${pk}/`
        return axios.delete(url).then(response => response.data)
    }
    createResourceService(data) {
        const url = `${API_URL}/api/v1/resource_services/`
        return axios.post(url, data).then(response => response.data)
    }
    listServices() {
        const url = `${API_URL}/api/v1/services/`
        return axios.get(url).then(response => response.data)
    }
    createService(data) {
        const url = `${API_URL}/api/v1/services/`
        return axios.post(url, data).then(response => response.data)
    }
    getService(pk) {
        const url = `${API_URL}/api/v1/services/${pk}/`
        return axios.get(url).then(response => response.data)
    }
    updateService(pk) {
        const url = `${API_URL}/api/v1/services/${pk}/`
        return axios.put(url).then(response => response.data)
    }
    deleteService(pk) {
        const url = `${API_URL}/api/v1/services/${pk}/`
        return axios.delete(url).then(response => response.data)
    }
    getServiceSchema(pk) {
        const url = `${API_URL}/api/v1/services/${pk}/schema/`
        return axios.get(url).then(response => response.data)
    }
    listServiceOrders() {
        const url = `${API_URL}/api/v1/orders/`
        return axios.get(url).then(response => response.data)
    }
    createServiceOrder(data) {
        const url = `${API_URL}/api/v1/orders/`
        return axios.post(url, data).then(response => response.data)
    }
    getServiceOrder(pk) {
        const url = `${API_URL}/api/v1/orders/${pk}/`
        return axios.get(url).then(response => response.data)
    }
    updateServiceOrder(pk, data) {
        const url = `${API_URL}/api/v1/orders/${pk}/`
        return axios.put(url, data).then(response => response.data)
    }
    getServiceOrderConfig(pk) {
        const url = `${API_URL}/api/v1/orders/${pk}/config/`
        return axios.get(url).then(response => response.data)
    }


}
