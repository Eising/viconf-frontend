<template>
    <div id="grouplist">
        <v-card>
            <v-card-title>Groups</v-card-title>
            <v-card-text>
                <v-container>
                    <v-data-table
                        :headers="headers"
                        :items="groups"
                        :loading="isLoading"
                    >
                        <template v-slot:item.actions="{ item }">
                            <v-icon
                                small
                                @click="deleteGroup(item.name)"
                            >
                                mdi-delete
                            </v-icon>
                        </template>
                        <template v-slot:item.password>
                            <i class="text--disabled">(hidden)</i>
                        </template>
                        <template v-slot:item.enable_password>
                            <i class="text--disabled">(hidden)</i>
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
                                @click="dialog = true"
                            >
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-container>
            </v-card-text>
        </v-card>
        <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
        >
            <v-card>
                <v-card-title>New Group</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Name" required v-model="newgroup.name"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Username" required v-model="newgroup.username"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Password" required v-model="newgroup.password"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Enable password" required v-model="newgroup.enable_password"></v-text-field>
                            </v-col>

                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog = !dialog"
                    >Close</v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="addGroup"
                    >Add</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <v-btn text @click="snack = false">Close</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
 export default {
     name: 'GroupListComponent',
     components: {

     },
     props: {
     },
     data: () => ({
         headers: [
             {
                 text: 'Name',
                 value: 'name'
             },
             {
                 text: 'Username',
                 value: 'username'
             },
             {
                 text: 'Password',
                 value: 'password'
             },
             {
                 text: 'Enable Password',
                 value: 'enable_password'
             },
             {
                 text: '',
                 value: 'actions',
                 sortable: false,
                 align: 'end'
             }
         ],
         groups: [],
         isLoading: false,
         snack: false,
         snackColor: '',
         snackText: '',
         newgroup: {},
         dialog: false,

     }),
     methods: {
         async fetchData() {
             this.isLoading = true
             this.$api.listGroups()
                 .then(resp => (this.groups = resp))
                 .catch(err => {
                     console.log(err)
                 })
                 .then(() => (this.isLoading = false))
         },
         async deleteGroup(name) {
             const res = await this.$dialog.confirm({
                 text: "Do you really want to delete this group?",
                 title: "Warning"
             })
             if (res) {
                 this.$api.deleteGroup(name)
                     .then(() => {
                         this.groups = this.groups.filter(item => item.name !== name)

                     })
             }
         },
         async addGroup() {
             this.$api.createGroup(this.newgroup)
                 .then(() => (this.addGroupToTable()))
                 .catch(err => {
                     this.snack = true
                     this.snackColor = 'error'
                     this.snackText = 'Remote error'
                     console.log(err)
                 })

         },
         addGroupToTable() {
             this.groups.push(this.newgroup)
             this.newgroup = {}
             this.dialog = false
             this.snack = true
             this.snackColor = 'success'
             this.snackText = 'Group added'
         }
     },
     mounted() {
         this.fetchData()

     }
 }
</script>
