<template>
    <div id="provisionservicecomponent" class="mt-10">
        <div v-if="isLoaded">
            <v-stepper v-model="step">
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
                        :step="Object.keys(schema.template_fields).length + 1"
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
                                    ></v-select>
                                </div>

                                <div
                                    v-for="(opts, field) in schema.template_fields[Object.keys(schema.template_fields)[n -1]]"
                                    :key="`${field}-${n}`"
                                >
                                    <v-text-field
                                        :label="opts.label"
                                        :value="opts.default"
                                        @change="updateServiceOrder(Object.keys(schema.template_fields)[n -1], field, $event)"
                                    ></v-text-field>
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
                        :step="Object.keys(schema.template_fields).length + 1"
                    >
                        <v-card>
                            <v-card-text>
                                <code>
                                    {{ JSON.stringify(getServiceOrderComplete(), undefined, 2) }}
                                </code>
                            </v-card-text>
                        </v-card>
                    </v-stepper-content>

                </v-stepper-items>
            </v-stepper>
        </div>
    </div>
</template>

<script>
 export default {
     name: 'ProvisionServiceComponent',
     components: {

     },
     props: {
     },
     data: () => ({
         isLoaded: false,
         form: null,
         step: 0,
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
         getServiceOrderField(node, field) {
             return this.serviceorder[node][field]
         },
         getServiceOrderComplete() {
             const serv = {
                 reference: this.reference,
                 customer: this.customer,
                 location: this.location,
                 speed: this.speed,
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
         }

     },
     mounted() {
         if (this.service != null) {
             this.fetchSchema()
         }
         this.fetchNodes()
     },
     computed: {
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
         speed: {
             get () {
                 return this.$store.state.serviceorder.speed
             },
             set (value) {
                 this.$store.commit('updateSOspeed', value)
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
                     speed: this.speed,
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
