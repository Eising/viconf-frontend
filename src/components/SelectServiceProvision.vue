<template>
    <div id="selectserviceprovisioncomponent">
        <ValidationObserver ref="observer" v-slot="{ invalid }">
            <v-expansion-panels
                :value="baseform"
            >
                <v-expansion-panel>
                    <v-expansion-panel-header>Provision Service</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-card>
                            <v-card-text>
                                <ValidationProvider v-slot="{ errors }" name="reference" rules="required">
                                    <v-text-field
                                        label="Reference"
                                        hint="A service reference"
                                        v-model="reference"
                                        :error-messages="errors"
                                        required
                                    >
                                    </v-text-field>
                                </ValidationProvider>
                                <ValidationProvider v-slot="{ errors }" name="customer" rules="required">
                                    <v-text-field
                                        label="Customer"
                                        hint="Customer name or reference"
                                        v-model="customer"
                                        :error-messages="errors"
                                        required
                                    ></v-text-field>
                                </ValidationProvider>
                                <ValidationProvider v-slot="{ errors }" name="location" rules="required">
                                    <v-text-field
                                        label="Location"
                                        hint="Customer/service location information"
                                        v-model="location"
                                        :error-messages="errors"
                                        required
                                    ></v-text-field>
                                </ValidationProvider>
                                <ValidationProvider v-slot="{ errors }" name="service" rules="required">
                                    <v-select
                                        label="Select Service"
                                        :items="services"
                                        v-model="service"
                                        :error-messages="errors"
                                        required
                                    ></v-select>
                                </ValidationProvider>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn
                                    color="primary"
                                    @click="openProvisioner"
                                    :disabled="invalid"
                                >Start</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </ValidationObserver>
        <div
            v-if="provisioner"
        >

            <ProvisionServiceComponent :key="service"></ProvisionServiceComponent>
        </div>

    </div>
</template>

<script>

 import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
 import validations from '@/validation.js'
 validations.ValidationSetup();
 setInteractionMode('eager')
 import ProvisionServiceComponent from './ProvisionService.vue'
 export default {
     name: 'SelectServiceProvisionComponent',
     components: {
         ProvisionServiceComponent,
         ValidationObserver,
         ValidationProvider
     },
     props: {
     },
     data: () => ({
         services: [],
         provisioner: false,
         baseform: 0,
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
         },
         openProvisioner() {
             this.baseform = null,
             this.provisioner = true
         },
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
