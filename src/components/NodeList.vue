<template>
    <div id="nodelist">
        <v-card>
            <v-card-title>Nodes</v-card-title>
            <v-card-text>
                <v-container>
                    <v-data-table
                        :headers="headers"
                        :items="nodes"
                        :loading="isLoading"
                    >
                        <template v-slot:item.ipv4="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.ipv4"
                                @save="updateNode(props.item)"
                            >{{ props.item.ipv4 }}
                                <template v-slot:input>
                                    <v-text-field
                                        v-model="props.item.ipv4"
                                        label="Edit"
                                        single-line
                                    ></v-text-field>
                                </template>
                            </v-edit-dialog>
                        </template>
                        <template v-slot:item.ipv6="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.ipv6"
                                @save="updateNode(props.item)"
                            >{{ props.item.ipv6 }}
                                <template v-slot:input>
                                    <v-text-field
                                        v-model="props.item.ipv6"
                                        label="Edit"
                                        single-line
                                    ></v-text-field>
                                </template>
                            </v-edit-dialog>
                        </template>
                        <template v-slot:item.comment="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.site"
                                @save="updateNode(props.item)"
                            >{{ props.item.site }}
                                <template v-slot:input>
                                    <v-text-field
                                        v-model="props.item.site"
                                        label="Edit"
                                        single-line
                                    ></v-text-field>
                                </template>
                            </v-edit-dialog>
                        </template>
                        <template v-slot:item.comment="props">
                            <v-edit-dialog
                                :return-value.sync="props.item.comment"
                                @save="updateNode(props.item)"
                            >{{ props.item.comment }}
                                <template v-slot:input>
                                    <v-text-field
                                        v-model="props.item.comment"
                                        label="Edit"
                                        single-line
                                    ></v-text-field>
                                </template>
                            </v-edit-dialog>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-icon
                                small
                                @click="deleteNode(item.hostname)"
                            >
                                mdi-delete
                            </v-icon>
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
                <v-card-title>New Node</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Hostname" required v-model="newnode.hostname"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Site" v-model="newnode.site"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="IPv4 Address" v-model="newnode.ipv4"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="IPv6 Address" v-model="newnode.ipv6"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-select v-model="newnode.driver" label="Driver" :items="drivers"></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="comment" v-model="newnode.comment"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-select v-model="newnode.group" label="Group" :items="groups"></v-select>
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
                        @click="addNode"
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
     name: 'NodeListComponent',
     components: {

     },
     props: {
     },
     data: () => ({
         nodes: [],
         isLoading: false,
         headers: [
             {
                 text: 'Hostname',
                 value: 'hostname'

             },
             {
                 text: 'IPv4 Address',
                 value: 'ipv4'
             },
             {
                 text: 'IPv6 Address',
                 value: 'ipv6'
             },
             {
                 text: 'Driver',
                 value: 'driver'
             },
             {
                 text: 'Group',
                 value: 'group'
             },
             {
                 text: 'Site',
                 value: 'site'
             },
             {
                 text: 'Comment',
                 value: 'comment'
             },
             {
                 text: '',
                 value: 'actions',
                 sortable: false,
                 align: 'end'
             }

         ],
         drivers: [
             {
                 text: 'None',
                 value: 'none'
             }
         ],
         groups: [],
         snack: false,
         snackColor: '',
         snackText: '',
         dialog: false,
         newnode: {},
     }),
     methods: {
         async fetchData() {
             this.isLoading = true
             this.$api.listNodes()
                 .then(res => (this.nodes = res))
                 .catch(err => {
                     console.log(err)
                 })
                 .then(() => (this.isLoading = false))
         },
         async deleteNode(hostname) {
             const res = await this.$dialog.confirm({
                 text: 'Do you really want to delete this node?',
                 title: 'Warning'
             })
             if (res) {
                 this.$api.deleteNode(hostname)
                 this.nodes = this.nodes.filter(item => item.hostname !== hostname)
             }
         },
         async updateNode(item) {
             this.$api.updateNode(item.hostname, item)
                 .then(() => (this.displaySuccess()))
                 .catch(err => {
                     this.displayError()
                     console.log(err)
             })
         },
         async fetchGroups() {
             this.$api.listGroups()
                 .then(res => (this.updateGroups(res)))
         },
         updateGroups(groups) {
             groups.forEach(group => {
                 this.groups.push({
                     text: group.name,
                     value: group.name
                 })
             })
         },
         displaySuccess() {
             this.snack = true
             this.snackColor = 'success'
             this.snackText = 'Data saved'
         },
         displayCancel() {
             this.snack = true
             this.snackColor = 'error'
             this.snackText = 'Canceled'
         },
         displayError() {
             this.snack = true
             this.snackColor = 'error'
             this.snackText = 'Remote error'
         },
         async addNode() {
             this.$api.createNode(this.newnode)
                 .then(() => (this.addNodeToTable()))
                 .catch(err => {
                     this.snack = true
                     this.snackColor = 'error'
                     this.snackText = 'Remote error'
                     console.log(err)
                 })
         },
         addNodeToTable() {
             this.nodes.push(this.newnode)
             this.newnode = {}
             this.dialog = false
             this.snack = true
             this.snackColor = 'success'
             this.snackText = 'Node added'
         }
     },
     mounted() {
         this.fetchData()
         this.fetchGroups()
     }
 }
</script>
