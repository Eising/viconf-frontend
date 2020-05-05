<template>
    <div id="serviceorderlist">
        <v-card>
            <v-card-title>Service Orders</v-card-title>
            <v-card-text>
                <v-data-table
                    :headers="headers"
                    :items="serviceorders"
                    :loading="isLoading"
                >
                    <template v-slot:item.actions="{ item }">
                        <v-menu
                            bottom
                            left
                            :key="item.id"
                        >
                            <template v-slot:activator="{ on }">
                                <v-btn
                                    icon
                                    v-on="on"
                                >
                                    <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item @click="showConfig(item.id)">
                                    <v-list-item-title>View configuration</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="deleteServiceOrder(item.id)">
                                    <v-list-item-title>Delete Service Order</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </template>
                    <template v-slot:top>
                        <v-btn
                            color="pink"
                            small
                            absolute
                            top
                            right
                            fab
                            dark
                            :to="{ name: 'Provision'}"
                        >
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </template>

                </v-data-table>
            </v-card-text>
        </v-card>
        <v-dialog
            v-model="config"
            max-width="800px"
        >
            <v-card>
                <v-toolbar
                    dark
                    color="teal"
                >
                    <v-btn
                        icon
                        dark
                        @click="config = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Configuration</v-toolbar-title>
                </v-toolbar>
                <v-spacer></v-spacer>
                <v-card-text>
                    <template v-if="selectedService != null">
                        <ViewConfigComponent :key="selectedService" :id="selectedService"></ViewConfigComponent>
                    </template>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <v-btn text @click="snack = false">Close</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
 import ViewConfigComponent from './ViewConfig.vue'
 export default {
     name: 'ListServiceOrdersComponent',
     components: {
         ViewConfigComponent

     },
     props: {
     },
     data: () => ({
         config: false,
         selectedService: null,
         headers: [
             {
                 text: "#",
                 value: "id"
             },
             {
                 text: "Reference",
                 value: "reference"
             },
             {
                 text: "Customer",
                 value: "customer"
             },
             {
                 text: "Location",
                 value: "location"
             },
             {
                 text: "Service",
                 value: "service_name"
             },
             {
                 text: '',
                 value: "actions",
                 sortable: false,
                 align: 'end'
             }
         ],
         isLoading: false,
         serviceorders: [],
         snack: false,
         snackColor: '',
         snackText: '',


     }),
     methods: {
         async fetchData() {
             this.isLoading = true
             this.$api.listServiceOrders()
                 .then(res => (this.serviceorders = res))
                 .catch(err => {
                     console.log(err)
                 })
                 .then(() => (this.isLoading = false))
         },
         showConfig(id) {
             this.selectedService = id
             this.config = true
         },
         async deleteServiceOrder(pk) {
             const res = await this.$dialog.confirm({
                 text: "Are you sure you want to delete this Service Order?",
                 title: "Warning"
             })
             if (res) {
                 this.$api.deleteServiceOrder(pk)
                     .then(() => {
                         this.serviceorders = this.serviceorders.filter(function(e) {
                             if (e.id != pk) {
                                 return e
                             }
                         })
                     })
                     .catch((err) => {
                         this.displayError()
                         console.log(err)
                     })
             }
         },
         displayError() {
             this.snack = true
             this.snackColor = 'error'
             this.snackText = 'Remote error'
         },

     },
     mounted() {
         this.fetchData()
     }
 }
</script>
