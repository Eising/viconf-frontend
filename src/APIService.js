import axios from 'axios'
import { Promise } from 'es6-promise';
import router from './router'
const API_URL = process.env.VUE_APP_API_URL


export class APIService {
    constructor(){
        this.instance = axios.create()
        this.instance.interceptors.request.use(
            config => {
                if (this.isAuthenticated())  {
                    const token = this.getToken()
                    config.headers['Authorization'] = `Bearer ${token}`

                }
                else {
                    router.push({name: 'login'})
                }

                return config
            },
            error => {
                Promise.reject(error)
            }
        )
        this.instance.interceptors.response.use((response) => {
            return response
        }, (error) => {
            // Pass on non 401 errors
            console.log(error)
            if (error.response.status != 401) {
                return new Promise((resolve, reject) => {
                    reject(error)
                })
            }

            if (error.config.url == `${API_URL}/api/token/refresh/`) {
                // refresh didn't work
                this.clear()
                router.push({name: 'login'})
                return new Promise((resolve, reject) => {
                    reject(error)
                })
            } else if (error.config.url == `${API_URL}/api/token/`) {
                this.clear()
                router.push({name: 'login'})
                return new Promise((resolve, reject) => {
                    reject(error)
                })
            }
            return this.getNewToken()
                .then((token)=> {
                    const config = error.config
                    config.headers['Authorization'] = `Bearer ${token}`

                    return new Promise((resolve, reject) => {
                        this.instance.request(config).then(response => {
                            resolve(response)
                        }).catch((error) => {
                            reject(error)
                        })
                    })
                })
                .catch((error) => {
                    Promise.reject(error)
                })


        })



    }

    isAuthenticated() {
        return this.getToken() !== null
    }

    getAuthentication() {
        return {
            headers: { 'Authorization': 'Bearer ' + this.getToken()}
        }
    }

    getNewToken() {
        return new Promise((resolve, reject) => {
            this.refreshToken({ refresh: this.getRefreshToken() })
                .then(response => {
                    this.storeToken(response.access)
                    resolve(response.access)
                })
                .catch((error) => {
                    reject(error)
                })

        })
    }

    storeToken(token) {
        localStorage.setItem('token', token)
    }

    storeRefreshToken(refreshToken) {
        localStorage.setItem('refresh_token', refreshToken)
    }

    clear() {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
    }

    getRefreshToken() {
        return localStorage.getItem('refresh_token')
    }

    getToken() {
        return localStorage.getItem('token')
    }



    requestToken(data) {
        const url = `${API_URL}/api/token/`
        return this.instance.post(url, data).then(response => response.data)
    }
    refreshToken(data) {
        const url = `${API_URL}/api/token/refresh/`
        return this.instance.post(url, data).then(response => response.data)
    }
    listTemplates() {
        const url = `${API_URL}/api/v1/templates/`
        return this.instance.get(url).then(response => response.data)
    }
    createTemplate(data) {
        const url = `${API_URL}/api/v1/templates/`
        return this.instance.post(url, data).then(response => response.data)
    }
    updateTemplate(pk, data) {
        const url = `${API_URL}/api/v1/templates/${pk}/`
        return this.instance.put(url, data).then(response => response.data)
    }
    getTemplate(pk) {
        const url = `${API_URL}/api/v1/templates/${pk}/`
        return this.instance.get(url).then(response => response.data)
    }
    deleteTemplate(pk) {
        const url = `${API_URL}/api/v1/templates/${pk}/`
        return this.instance.delete(url).then(response => response.data)
    }
    getTemplateFieldset(pk) {
        // Retrieve fieldset
        const url = `${API_URL}/api/v1/templates/${pk}/fields/`
        return this.instance.get(url).then(response => response.data)
    }
    updateTemplateFieldset(pk, fieldset) {
        // PUT the updated fieldset
        const url = `${API_URL}/api/v1/templates/${pk}/fields/`
        return this.instance.put(url, fieldset).then(response => response.data)
    }
    listNodes() {
        const url = `${API_URL}/api/v1/nodes/`
        return this.instance.get(url).then(response => response.data)
    }
    createNode(data) {
        const url = `${API_URL}/api/v1/nodes/`
        return this.instance.post(url, data).then(response => response.data)
    }
    getNode(hostname) {
        const url = `${API_URL}/api/v1/nodes/${hostname}/`
        return this.instance.get(url).then(response => response.data)
    }
    deleteNode(hostname) {
        const url = `${API_URL}/api/v1/nodes/${hostname}/`
        return this.instance.delete(url).then(response => response.data)
    }
    updateNode(hostname, data) {
        const url = `${API_URL}/api/v1/nodes/${hostname}/`
        return this.instance.patch(url, data).then(response => response.data)
    }
    listGroups() {
        const url = `${API_URL}/api/v1/groups/`
        return this.instance.get(url).then(response => response.data)
    }
    createGroup(data) {
        const url = `${API_URL}/api/v1/groups/`
        return this.instance.post(url, data).then(response => response.data)
    }
    getGroup(name) {
        const url = `${API_URL}/api/v1/groups/${name}/`
        return this.instance.get(url).then(response => response.data)
    }
    deleteGroup(name) {
        const url = `${API_URL}/api/v1/groups/${name}/`
        return this.instance.delete(url).then(response => response.data)
    }
    updateGroup(name, data) {
        const url = `${API_URL}/api/v1/groups/${name}/`
        return this.instance.patch(url, data).then(response => response.data)
    }
    listResourceServices() {
        const url = `${API_URL}/api/v1/resource_services/`
        return this.instance.get(url).then(response => response.data)
    }
    getResourceService(pk) {
        const url = `${API_URL}/api/v1/resource_services/${pk}/`
        return this.instance.get(url).then(response => response.data)
    }
    updateResourceService(pk, data) {
        const url = `${API_URL}/api/v1/resource_services/${pk}/`
        return this.instance.patch(url, data).then(response => response.data)
    }
    deleteResourceService(pk) {
        const url = `${API_URL}/api/v1/resource_services/${pk}/`
        return this.instance.delete(url).then(response => response.data)
    }
    createResourceService(data) {
        const url = `${API_URL}/api/v1/resource_services/`
        return this.instance.post(url, data).then(response => response.data)
    }
    listServices() {
        const url = `${API_URL}/api/v1/services/`
        return this.instance.get(url).then(response => response.data)
    }
    createService(data) {
        const url = `${API_URL}/api/v1/services/`
        return this.instance.post(url, data).then(response => response.data)
    }
    getService(pk) {
        const url = `${API_URL}/api/v1/services/${pk}/`
        return this.instance.get(url).then(response => response.data)
    }
    updateService(pk) {
        const url = `${API_URL}/api/v1/services/${pk}/`
        return this.instance.put(url).then(response => response.data)
    }
    deleteService(pk) {
        const url = `${API_URL}/api/v1/services/${pk}/`
        return this.instance.delete(url).then(response => response.data)
    }
    getServiceSchema(pk) {
        const url = `${API_URL}/api/v1/services/${pk}/schema/`
        return this.instance.get(url).then(response => response.data)
    }
    listServiceOrders() {
        const url = `${API_URL}/api/v1/orders/`
        return this.instance.get(url).then(response => response.data)
    }
    createServiceOrder(data) {
        const url = `${API_URL}/api/v1/orders/`
        return this.instance.post(url, data).then(response => response.data)
    }
    getServiceOrder(pk) {
        const url = `${API_URL}/api/v1/orders/${pk}/`
        return this.instance.get(url).then(response => response.data)
    }
    updateServiceOrder(pk, data) {
        const url = `${API_URL}/api/v1/orders/${pk}/`
        return this.instance.put(url, data).then(response => response.data)
    }
    deleteServiceOrder(pk) {
        const url = `${API_URL}/api/v1/orders/${pk}/`
        return this.instance.delete(url).then(response => response.data)
    }
    getServiceOrderConfig(pk) {
        const url = `${API_URL}/api/v1/orders/${pk}/config/`
        return this.instance.get(url).then(response => response.data)
    }


}
