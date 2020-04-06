<template>
    <div id="resourceservicelist">
        <v-card>
            <v-card-title>Resource Services</v-card-title>
            <v-card-text>
                <v-data-table
                    :loading="isLoading"
                    :headers="headers"
                    :items="services"
                    single-expand
                    item-key="id"
                    show-expand
                >
                    <template v-slot:item.actions="{ item }">
                        <v-icon
                            small
                            @click="deleteService(item.id)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                    <template v-slot:item.resource_template_list="{ item }">
                        <span
                            v-for="template in item.resource_template_list"
                            :key="template.id"
                        >
                            <router-link :to="{ name: 'TemplateEdit', params: { id: template.id}}">
                                <v-chip
                                class="mr-2"
                                >
                                    {{template.name}}
                                </v-chip>
                            </router-link>
                        </span>
                    </template>
                    <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                            <v-container
                                class="pa-15"
                            >

                                <v-data-table
                                    :headers="subheaders"
                                    :items="item.defaults"
                                    disable-pagination
                                    disable-sort
                                    hide-default-footer
                                    dense

                                >
                                </v-data-table>
                            </v-container>
                        </td>
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
                            :to="{name: 'ResourceServiceCreate'}"
                        >
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </template>


                </v-data-table>
            </v-card-text>
        </v-card>
        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <v-btn text @click="snack = false">Close</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
 export default {
     name: 'ResourceServiceListComponent',
     components: {

     },
     props: {
     },
     data: () => ({
         services: [],
         isLoading: false,
         headers: [
             {
                 text: "Name",
                 value: "name"
             },
             {
                 text: "Node",
                 value: "node"
             },
             {
                 text: "Templates",
                 value: "resource_template_list"
             },
             {
                 text: "",
                 value: "actions",
                 sortable: false,
                 align: 'end'
             },
         ],
         subheaders: [
             {
                 text: "Field",
                 value: "field"
             },
             {
                 text: "Default",
                 value: "default"

             },
             {
                 text: "Configurable",
                 value: "configurable"
             }
         ],
         snack: false,
         snackColor: '',
         snackText: '',

     }),
     methods: {
         async fetchData() {
             this.isLoading = true
             this.$api.listResourceServices()
                 .then(res => (this.services = res))
                 .catch(err => {
                     this.handleError(err)
                 })
                 .then(() => (this.isLoading = false))

         },
         handleError(err) {
             console.log(err)
         },
         async deleteService(pk) {
             const res = await this.$dialog.confirm({
                 text: "Are you sure you want to delete this Resource Service?",
                 title: "Warning"
             })
             if (res) {
                 this.$api.deleteResourceService(pk)
                     .then(() => {
                         // FIXME: This doesn't work!
                         this.services.filter(item => item.id !== pk)

                     })
                     .catch(err => {
                         this.displayError()
                         console.log(err)
                     })
             }
         },
         displayError() {
             this.snack = true
             this.snackColor = 'error'
             this.snackText = 'Remote error'
         }
     },
     mounted() {
         this.fetchData()
     }
 }
</script>
