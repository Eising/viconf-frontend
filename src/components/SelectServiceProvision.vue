<template>
    <div id="selectserviceprovisioncomponent">
        <v-card>
            <v-card-title>Provision Service</v-card-title>
            <v-card-text>
                <v-text-field
                    label="Reference"
                    hint="A service reference"
                    v-model="reference"
                >
                </v-text-field>
                <v-text-field
                    label="Customer"
                    hint="Customer name or reference"
                    v-model="customer"
                ></v-text-field>
                <v-text-field
                    label="Location"
                    hint="Customer/service location information"
                    v-model="location"
                ></v-text-field>
                <v-select
                    label="Select Service"
                    :items="services"
                    v-model="service"
                ></v-select>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    color="primary"
                    @click="provisioner = true"
                    :disabled="service === null"
                >Start</v-btn>
            </v-card-actions>
        </v-card>
        <v-dialog
            v-model="provisioner"
            persistent
            max-width="600px"
        >
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn
                        icon
                        dark
                        @click="provisioner = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Provision</v-toolbar-title>
                </v-toolbar>
                <v-spacer></v-spacer>
                <v-card-text>
                    <ProvisionServiceComponent :key="service"></ProvisionServiceComponent>
                </v-card-text>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
 import ProvisionServiceComponent from './ProvisionService.vue'
 export default {
     name: 'SelectServiceProvisionComponent',
     components: {
         ProvisionServiceComponent
     },
     props: {
     },
     data: () => ({
         services: [],
         provisioner: false,
     }),
     methods: {
         async getServiceList() {
             this.$api.listServices()
                 .then(res => {
                     res.forEach(element => this.services.push({
                         text: element.name,
                         value: element.id
                     }))
                 })
                 .catch(err => {
                     console.log(err)
                 })
         }
     },
     mounted() {
         this.getServiceList()
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
         service: {
             get () {
                 return this.$store.state.serviceorder.service
             },
             set (value) {
                 this.$store.commit('updateSOservice', value)
             }
         },


     }
 }
</script>
