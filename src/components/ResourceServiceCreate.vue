<template>
    <div id="CreateResourceService">
        <v-card>
            <v-card-title>Create ResourceService</v-card-title>
            <v-card-text>
                <v-stepper v-model="step">
                    <v-stepper-header>
                        <v-stepper-step
                            step="1"
                            editable
                            :complete="step > 1"
                        >
                            Basic data
                        </v-stepper-step>
                        <v-stepper-step
                            step="2"
                            editable
                            :complete="step > 2"
                        >
                            Templates
                        </v-stepper-step>
                        <v-stepper-step
                            step="3"
                            editable
                            :complete="step > 3"
                        >
                            Default values
                        </v-stepper-step>
                        <v-stepper-step
                            step="4"
                            :complete="step > 4"
                        >
                            Review and submit
                        </v-stepper-step>
                    </v-stepper-header>
                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <v-text-field
                                v-model="name"
                                label="Resource Service Name"
                            ></v-text-field>
                            <v-select
                                v-model="node"
                                label="Node"
                                :items="nodes"
                            ></v-select>
                            <v-btn
                                color="primary"
                                @click="step = 2"
                            >Next</v-btn>
                        </v-stepper-content>
                        <v-stepper-content step="2">
                            <v-card>
                                <v-card-title>Select templates</v-card-title>
                                <v-card-text>
                                    <v-select
                                        multiple
                                        v-model="template"
                                        :items="templates"
                                        label="Templates"
                                    ></v-select>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn
                                        color="primary"
                                        @click="step = 3"
                                    >Next</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-stepper-content>
                        <v-stepper-content step="3">
                            <v-card>
                                <v-card-title>Configure defaults</v-card-title>
                                <v-card-text>
                                    <ResourceServiceCreateDefaults></ResourceServiceCreateDefaults>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn
                                        color="primary"
                                        @click="step = 4"
                                    >Next</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-stepper-content>
                        <v-stepper-content step="4">
                            <v-card>
                                <v-card-title>Please review the data before submitting it.</v-card-title>
                                <v-card-text>
                                    <v-list-item two-line>
                                        <v-list-item-content>
                                            <v-list-item-title>Name</v-list-item-title>
                                            <v-list-item-subtitle>{{ resource_service.name }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>Node</v-list-item-title>
                                            <v-list-item-subtitle>{{ resource_service.node }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>Templates</v-list-item-title>
                                            <v-list-item-subtitle>
                                                <template v-for="template in resource_service.resource_templates">
                                                    <v-chip :key="template" class="mr-2">{{ find_template(template) }}</v-chip>
                                                </template>
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                        <v-list-item-content>
                                            <v-list-item-title>Defaults</v-list-item-title>
                                            <v-list-item-subtitle>
                                                <v-container fluid>
                                                    <v-data-iterator
                                                        :items="resource_service.defaults"
                                                        hide-default-footer
                                                    >
                                                        <template v-slot:default="props">
                                                            <v-row>
                                                                <v-col
                                                                    v-for="item in props.items"
                                                                    :key="item.field"
                                                                    cols="12"
                                                                    sm="6"
                                                                    md="4"
                                                                    lg="3"
                                                                >
                                                                    <v-card>
                                                                        <v-card-title class="subheading font-weight-bold">{{ item.field }}</v-card-title>
                                                                        <v-divider></v-divider>
                                                                        <v-list dense>
                                                                            <v-list-item>
                                                                                <v-list-item-content>Default:</v-list-item-content>
                                                                                <v-list-item-content class="align-end">{{ item.default }}</v-list-item-content>
                                                                            </v-list-item>
                                                                            <v-list-item>
                                                                                <v-list-item-content>User configurable:</v-list-item-content>
                                                                                <v-list-item-content class="align-end">{{ item.configurable }}</v-list-item-content>
                                                                            </v-list-item>
                                                                        </v-list>
                                                                    </v-card>
                                                                </v-col>
                                                            </v-row>
                                                        </template>
                                                    </v-data-iterator>
                                                </v-container>
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn
                                        color="primary"
                                        @click="submit"
                                    >Submit</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-card-text>
        </v-card>
        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <v-btn text @click="snack = false">Close</v-btn>
        </v-snackbar>

    </div>
</template>

<script>
 import ResourceServiceCreateDefaults from './ResourceServiceCreateDefaults.vue'
 export default {
     name: 'ResourceServiceCreateComponent',
     components: {
         ResourceServiceCreateDefaults
     },
     props: {
     },
     data: () => ({
         nodes: [],
         templates: [],
         step: 1,
         snack: false,
         snackColor: '',
         snackText: '',
     }),
     methods: {
         async fetchNodes() {
             this.$api.listNodes()
                 .then(res => (this.updateNodes(res)))
                 .catch(err => {
                     console.log(err)
                 })
         },
         updateNodes(nodes) {
             nodes.forEach(element => this.nodes.push(element.hostname))
         },
         async fetchTemplates() {
             this.$api.listTemplates()
                 .then(res => {
                     res.forEach(element => this.templates.push({
                         text: element.name,
                         value: element.id

                     }))
                 })
                 .catch(err => {
                     console.log(err)
                 })
         },
         find_template(id) {
             const template = this.templates.find(element => element.value == id )
             return template.text
         },
         async submit() {
             this.$api.createResourceService(this.resource_service)
                 .then(() => {
                     this.$router.push({name: 'ResourceServiceList'})
                 })
                 .catch(err => {
                     this.snack = true
                     this.snackColor = 'error'
                     this.snackText = 'Remote error'
                     console.log(err)
                 })
         },

     },
     computed: {
         name: {
             get () {
                 return this.$store.state.resource_service.name
             },
             set (value) {
                 this.$store.commit('updateRSName', value)
             },
         },
         node: {
             get () {
                 return this.$store.state.resource_service.node
             },
             set (value) {
                 this.$store.commit('updateRSNode', value)
             }
         },
         template: {
             get () {
                 return this.$store.state.resource_service.resource_templates
             },
             set (value) {
                 this.$store.commit('updateRSTemplates', value)
             }
         },
         resource_service: {
             get() {
                 return this.$store.state.resource_service
             }
         }

     },
     mounted() {
         this.fetchNodes()
         this.fetchTemplates()
     },
     beforeDestroy() {
         this.$store.commit('reset')
     }
 }
</script>
