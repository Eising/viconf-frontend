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
                                @click="addNode"
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
            <add-node
                @add-node-error="displayError"
                @add-node-success="addNodeToTable"
                @add-node-close="dialog = !dialog"
            ></add-node>

        </v-dialog>
        <v-dialog
            v-model="groupadddialog"
            persistent
            max-width="600px"
        >
            <add-group
                @add-group-error="displayError"
                @add-group-success="addGroupToList"
                @add-group-close="groupadddialog = false"
            ></add-group>
        </v-dialog>


        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <v-btn text @click="snack = false">Close</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
 import NodeListAddNode from './NodeListAddNode.vue'
 import GroupListAddGroup from './GroupListAddGroup.vue'

 export default {
     name: 'NodeListComponent',
     components: {
         'add-node': NodeListAddNode,
         'add-group': GroupListAddGroup

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
         snack: false,
         snackColor: '',
         snackText: '',
         dialog: false,
         groupadddialog: false,
         groups: []
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
         async addNode() {
             if (this.groups.length == 0) {
                 const res = await this.$dialog.confirm({
                     text: 'There are no groups defined. Do you want to add a group first?',
                     title: 'No groups defined'
                 })
                 if (res) {
                     this.groupadddialog = true
                 }
             }
             else {
                this.dialog = true
             }
         },
         addGroupToList(group) {
             this.groups.push(group)
             this.groupadddialog = false
             this.dialog = true
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
         addNodeToTable(node) {
             this.nodes.push(node)
             this.newnode = {}
             this.dialog = false
             this.snack = true
             this.snackColor = 'success'
             this.snackText = 'Node added'
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

     },
     mounted() {
         this.fetchData()
         this.fetchGroups()
     }
 }
</script>
