import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      resource_service: {
          name: '',
          node: '',
          resource_templates: [],
          defaults: []
      },
      service: {
          name: '',
          resource_services: []
      },
      serviceorder: {
          reference: '',
          customer: '',
          location: '',
          speed: '',
          service: null
      }

  },
  mutations: {
      updateRSName (state, name) {
          state.resource_service.name = name
      },
      updateRSNode (state, node) {
          state.resource_service.node = node
      },
      updateRSTemplates (state, templates) {
          state.resource_service.resource_templates = templates
      },
      updateRSDefaults (state, defaults) {
          state.resource_service.defaults = defaults
      },
      reset (state) {
          state.resource_service = {
            name: '',
            node: '',
            resource_templates: [],
            defaults: []
          }
      },
      updateServiceName (state, name) {
          state.service.name = name
      },
      updateServiceRS (state, rs) {
          state.service.resource_services = rs
      },
      updateSOreference (state, value) {
          state.serviceorder.reference = value
      },
      updateSOcustomer (state, value) {
          state.serviceorder.customer = value
      },
      updateSOlocation (state, value) {
          state.serviceorder.location = value
      },
      updateSOspeed (state, value) {
          state.serviceorder.speed = value
      },
      updateSOservice (state, value) {
          state.serviceorder.service = value
      },
      resetSO (state) {
          state.serviceorder = {
              reference: '',
              customer: '',
              location: '',
              speed: '',
              service: null
          }
      },
  },
  actions: {
  },
  modules: {
  }
})
