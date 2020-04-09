<template>
    <div id="provisionservicecomponent" class="mt-10">
        <div v-if="isLoaded">

            <ValidationObserver ref="observer" v-slot="{ invalid }">
                <form @submit.prevent="submitServiceOrder">
                    <v-stepper
                        v-model="step"
                        :alt-labels="true"
                    >
                        <v-stepper-header>
                            <v-stepper-step
                                v-for="n in Object.keys(schema.template_fields).length"
                                :key="`${n}-step`"
                                :complete="step > n"
                                :step="n"
                                editable
                            >
                                <span v-if="Object.keys(schema.template_fields)[n -1] == '__NONODE__'">Unspecified Node</span>
                                <span v-else>Node {{ Object.keys(schema.template_fields)[n -1] }}</span>
                            </v-stepper-step>
                            <v-stepper-step
                                :step="lastfield"
                                :key="`${lastfield}-step`"
                                :complete="step > (Object.keys(schema.template_fields).length + 1)"
                                editable
                            >
                                Provision Service
                            </v-stepper-step>
                        </v-stepper-header>
                        <v-stepper-items>
                            <v-stepper-content
                                v-for="n in Object.keys(schema.template_fields).length"
                                :key="`${n}-content`"
                                :step="n"
                            >
                                <v-card>
                                    <v-card-text>
                                        <div v-if="Object.keys(schema.template_fields)[n -1] == '__NONODE__'">
                                            <v-select
                                                :items="nodes"
                                                label="Select node"
                                                @change="updateServiceOrder('__NONODE__', 'node', $event)"
                                                required
                                            ></v-select>
                                        </div>

                                        <div
                                            v-for="(opts, field) in schema.template_fields[Object.keys(schema.template_fields)[n -1]]"
                                            :key="`${field}-${n}`"
                                        >

                                            <ValidationProvider v-slot="{ errors }" :name="opts.label" :rules="`required|${opts.validator}`">
                                                <v-text-field
                                                    :label="opts.label"
                                                    :value="getServiceOrderField(Object.keys(schema.template_fields)[n -1], field, opts.default)"
                                                    @change="updateServiceOrder(Object.keys(schema.template_fields)[n -1], field, $event)"
                                                    :error-messages="errors"
                                                    required
                                                ></v-text-field>
                                            </ValidationProvider>
                                        </div>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn
                                            @click="step += 1"
                                        >
                                            Continue
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-stepper-content>
                            <v-stepper-content
                                :step="lastfield"
                            >
                                <v-card>
                                    <v-card-text>
                                        <code>
                                            {{ JSON.stringify(getServiceOrderComplete(), undefined, 2) }}
                                        </code>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn
                                            color="primary"
                                            @click="submitServiceOrder"
                                            :disabled="invalid"
                                        >Submit</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-stepper-content>

                        </v-stepper-items>
                    </v-stepper>
                </form>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
 import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
 import validations from '@/validation.js'
 validations.ValidationSetup();
 setInteractionMode('eager')

 export default {
     name: 'ProvisionServiceComponent',
     components: {
         ValidationProvider,
         ValidationObserver,
     },
     props: {
         id: {
             type: Number,
             required: false
         },
     },
     data: () => ({
         isLoaded: false,
         form: null,
         step: 1,
         schema: null,
         serviceorder: {},
         nodes: []
     }),
     methods: {
         async fetchSchema() {
             this.$api.getServiceSchema(this.service)
                 .then(res => (this.schema = res))
                 .catch(err => {
                     console.log(err)
                 })
                 .then(() => (this.isLoaded = true))
         },
         async fetchServiceOrder(pk) {
             this.$api.getServiceOrder(pk)
                 .then(res => (this.setServiceParamters(res)))
                 .catch(err => {
                     console.log(err)
                 })
         },
         setServiceParamters(service_order) {
             this.schema = service_order
             this.reference = service_order.reference
             this.customer = service_order.customer
             this.location = service_order.location
         },
         async fetchNodes() {
             this.$api.listNodes()
                 .then(res => {
                     res.forEach(element => this.nodes.push(element.hostname))
                 })
                 .catch(err => {
                     console.log(err)
                 })
         },
         updateServiceOrder(node, field, value) {
             if (node in this.serviceorder) {
                 this.serviceorder[node][field] = value
             }
             else {
                 this.serviceorder[node] = {}
                 this.serviceorder[node][field] = value
             }
         },
         getServiceOrderField(node, field, defaultval) {
             if (node in this.serviceorder) {
                 if (field in this.serviceorder[node]) {
                     return this.serviceorder[node][field]
                 }
                 else {
                     return defaultval
                 }
             }
            return defaultval
         },
         getServiceOrderComplete() {
             const serv = {
                 reference: this.reference,
                 customer: this.customer,
                 location: this.location,
                 service: this.service,
                 template_fields: {}
             }
             const self = this
             for (let [node, fields] of Object.entries(self.serviceorder)) {
                 let key = undefined
                 if (node == '__NONODE__') {
                     key = fields['node']
                 }
                 else {
                     key = node
                 }
                 if (key == undefined) {
                     throw "No node selected"
                 }
                 else {
                     if (!(key in serv.template_fields)) {
                         serv.template_fields[key] = {}
                     }
                 }
                 for (let [field, value] of Object.entries(fields)) {
                     serv.template_fields[key][field] = value
                 }
             }
             return serv
         },
         async submitServiceOrder() {

             this.$refs.observer.validate()
             if (this.id == undefined) {
                 this.$api.createServiceOrder(this.getServiceOrderComplete())
                     .then(() => {this.$router.push({name: "ServiceOrderList"})})
                     .catch(err => {
                         console.log(err)
                     })
             }
             else {
                 this.$api.updateServiceOrder(this.id, this.getServiceOrderComplete())
                     .then(() => (this.$emit('updated')))
                     .catch(err => {
                         console.log(err)
                     })
             }
         }

     },
     mounted() {
         if (this.id == undefined) {
             if (this.service != null) {
                 this.fetchSchema()
             }
             this.fetchNodes()
         }
         else {
             this.fetchServiceOrder(this.id)
         }
     },
     watch: {

     },
     computed: {
         lastfield: {
             get () {
                 return Object.keys(this.schema.template_fields).length +1
             },
         },
         reference: {
             get () {
                 return this.$store.state.serviceorder.reference
             },
             set (value) {
                 this.$store.commit('updateSOreference', value)
             }
         },
         customer: {
             get () {
                 return this.$store.state.serviceorder.customer
             },
             set (value) {
                 this.$store.commit('updateSOcustomer', value)
             }
         },
         location: {
             get () {
                 return this.$store.state.serviceorder.location
             },
             set (value) {
                 this.$store.commit('updateSOlocation', value)
             }
         },
         service: {
             get () {
                 return this.$store.state.serviceorder.service
             },
             set (value) {
                 this.$store.commit('updateSOservice', value)
             }
         },
         completeServiceOrder: {
             get () {
                 const serv = {
                     reference: this.reference,
                     customer: this.customer,
                     location: this.location,
                     service: this.service,
                     template_fields: {}
                 }
                 const self = this
                 for (let [node, fields] of Object.entries(self.serviceorder)) {
                     console.log("foo")
                     let key = undefined
                     if (node == '__NONODE__') {
                         key = fields['node']
                     }
                     else {
                         key = node
                     }
                     if (key == undefined) {
                         throw "No node selected"
                     }
                     else {
                         if (!(key in serv.template_fields)) {
                             serv.template_fields[key] = {}
                         }
                     }
                     for (let [field, value] of Object.entries(fields)) {
                         serv.template_fields[key][field] = value
                     }
                 }
                 return serv
             }
         }

     }

 }
</script>

<style>
 .v-stepper__step {
     flex: 1 1;
 }

</style>
