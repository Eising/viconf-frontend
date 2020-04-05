<template>
    <div id="provisionservicecomponent">
        <div v-if="isLoaded">
            <h1>{{ form.name }}</h1>
            <v-stepper v-model="step">
                <v-stepper-header>
                    <template
                        v-for="n in Object.keys(form.fields).length"
                        >

                        <v-stepper-step
                            :key="`${n}-step`"
                            :complete="step > n"
                            :step="n"
                            editable
                        >
                            Node {{ Object.keys(form.fields)[n -1] }}
                        </v-stepper-step>
                    </template>
                </v-stepper-header>
                <v-stepper-items>
                    <v-stepper-content
                        v-for="n in Object.keys(form.fields).length"
                        :key="`${n}-content`"
                        :step="n"
                    >
                        <v-card>
                            <div
                                v-for="(opts, field) in form.fields[Object.keys(form.fields)[n -1]]"
                                :key="`${field}-${n}`"
                            >
                                <v-text-field
                                    :label="opts.label"
                                >
                                </v-text-field>
                            </div>
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
     }),
     methods: {
         generateExampleData() {
             const form = {
                 name: "Example Service",
                 fields: {
                     node1: {
                         ipaddress: {
                             label: "IP address",
                             validator: "ipv4address",
                         },
                         description: {
                             label: "Interface description",
                             validator: "string",
                         },
                     },
                     node2: {
                         ipaddress: {
                             label: "IPv6 address",
                             validator: "ipv4address",
                         },
                         description: {
                             label: "Interface description",
                             validator: "string",
                         },
                     }
                 }
              }
             return form
         },
         async loadData() {
             this.form = this.generateExampleData()
             this.isLoaded = true
             console.log(this.form)

         }
     },
     mounted() {
         this.loadData()
     }
 }
</script>
