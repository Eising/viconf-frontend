<template>
    <div id="servicelist">
        <v-card>
            <v-card-title>Services</v-card-title>
            <v-card-text>
                <v-data-table
                    :loading="isLoading"
                    :headers="headers"
                    :items="services"
                    item-key="id"
                >
                    <template v-slot:item.actions="{ item }">
                        <v-icon
                            small
                            @click="deleteService(item.id)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                    <template v-slot:item.resource_service_list="{ item }">
                        <span
                            v-for="rs in item.resource_service_list"
                            :key="rs.id"
                        >
                            <v-chip
                                class="mr-2"
                            >
                                {{rs.name}}
                            </v-chip>
                        </span>
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
                            :to="{name: 'ServiceCreate'}"
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
     name: 'ServiceListComponent',
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
                 text: "Resource Services",
                 value: "resource_service_list"
             },
             {
                 text: '',
                 value: 'actions',
                 sortable: false,
                 align: 'end'
             }
         ],
         snack: false,
         snackColor: '',
         snackText: '',

     }),
     methods: {
         async fetchData() {
             this.isLoading = true
             this.$api.listServices()
                 .then(res => (this.services = res))
                 .catch(err => {
                     this.snack = true
                     this.snackColor = 'error'
                     this.snackText = 'Remote Error'
                     console.log(err)
                 })
                 .then(this.isLoading = false)

         }
     },
     mounted() {
         this.fetchData()
     }
 }
</script>
