<template>
    <div id="servicecreatecomponent">
        <v-card>
            <v-card-title>Create Service</v-card-title>
            <v-card-text>
                <v-text-field
                    label="Name"
                    required
                    v-model="name"
                ></v-text-field>
                <v-select
                    :items="resource_services"
                    label="Resource Services"
                    multiple
                    v-model="rs"
                ></v-select>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    color="primary"
                    @click="submit"
                >
                    Submit
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <v-btn text @click="snack = false">Close</v-btn>
        </v-snackbar>

    </div>
</template>

<script>
 export default {
     name: 'ServiceCreateComponent',
     components: {

     },
     props: {
     },
     data: () => ({
         resource_services: [],
         snack: false,
         snackColor: '',
         snackText: '',
     }),
     methods: {
         async getResourceServices() {
             this.$api.listResourceServices()
                 .then(res => {
                     res.forEach(item => this.resource_services.push({
                         text: item.name,
                         value: item.id
                     }))
                 })
                 .catch(err => {
                     this.snack = true
                     this.snackColor = 'error'
                     this.snackText = 'Remote Error'
                     console.log(err)
                 })
         },
         async submit() {
             this.$api.createService(this.$store.state.service)
                 .then(() => (this.$router.push({name: "ServiceList"})))
                 .catch(err => {
                     this.snack = true
                     this.snackColor = 'error'
                     this.snackText = 'Remote Error'
                     console.log(err)
                 })
         }
     },
     mounted() {
         this.getResourceServices()
     },
     computed: {
         name: {
             get () {
                 return this.$store.state.service.name
             },
             set (value) {
                 this.$store.commit('updateServiceName', value)
             }
         },
         rs: {
             get () {
                 return this.$store.state.service.resource_service
             },
             set (value) {
                 this.$store.commit('updateServiceRS', value)
             }
         }
     }
 }
</script>
