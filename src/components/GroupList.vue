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
            <add-group
                @add-group-success="addGroupToTable"
                @add-group-error="displayError"
                @add-group-close="dialog = !dialog"
            ></add-group>
        </v-dialog>

        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <v-btn text @click="snack = false">Close</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
 import GroupListAddGroup from './GroupListAddGroup.vue'
 export default {
     name: 'GroupListComponent',
     components: {
         'add-group': GroupListAddGroup

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
         addGroupToTable(group) {
             this.groups.push(group)
             this.newgroup = {}
             this.dialog = false
             this.snack = true
             this.snackColor = 'success'
             this.snackText = 'Group added'
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
