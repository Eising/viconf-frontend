<template>
    <div id="addnodecomponent">
        <ValidationObserver ref="observer" v-slot="{ invalid }">
            <form @submit.prevent="addNode">
                <v-card>
                    <v-card-title>New Node</v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <ValidationProvider v-slot="{ errors }" name="Hostname" rules="required|string">
                                        <v-text-field
                                            label="Hostname"
                                            required
                                            v-model="newnode.hostname"
                                            :error-messages="errors"
                                        ></v-text-field>
                                    </ValidationProvider>
                                </v-col>
                                <v-col cols="12">
                                    <ValidationProvider v-slot="{ errors }" name="Site" rules="string">
                                        <v-text-field
                                            label="Site"
                                            :error-messages="errors"
                                            v-model="newnode.site"
                                        ></v-text-field>
                                    </ValidationProvider>
                                </v-col>
                                <v-col cols="12">
                                    <ValidationProvider v-slot="{ errors }" name="IPv4" rules="ipv4">
                                        <v-text-field
                                            label="IPv4 Address"
                                            :error-messages="errors"
                                            v-model="newnode.ipv4"
                                        ></v-text-field>
                                    </ValidationProvider>
                                </v-col>
                                <v-col cols="12">
                                    <ValidationProvider v-slot="{ errors }" name="IPv6" rules="ipv6">
                                        <v-text-field
                                            label="IPv6 Address"
                                            v-model="newnode.ipv6"
                                            :error-messages="errors"
                                        ></v-text-field>
                                    </ValidationProvider>
                                </v-col>
                                <v-col cols="12">
                                    <ValidationProvider v-slot="{ errors }" name="driver" rules="required">
                                        <v-select
                                            v-model="newnode.driver"
                                            label="Driver"
                                            :items="drivers"
                                            :error-messages="errors"
                                        ></v-select>
                                    </ValidationProvider>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="comment" v-model="newnode.comment"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <ValidationProvider v-slot="{ errors }" name="Group" rules="required">
                                        <v-select
                                            v-model="newnode.group"
                                            label="Group"
                                            :items="groups"
                                            :error-messages="errors"
                                        ></v-select>
                                    </ValidationProvider>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="$emit('add-node-close')"
                        >Close</v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            type="submit"
                            :disabled="invalid"
                        >Add</v-btn>
                    </v-card-actions>
                </v-card>
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
 import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
 import validations from '@/validation.js'
 validations.ValidationSetup();
 setInteractionMode('eager')

 export default {
     name: 'NodeListAddNode',
     components: {
         ValidationObserver,
         ValidationProvider
     },
     props: {
     },
     data: () => ({
         drivers: [
             {
                 text: 'None',
                 value: 'none'
             }
         ],
         groups: [],
         newnode: {},

     }),
     methods: {
         async addNode() {
             this.$api.createNode(this.newnode)
                 .then(() => (this.$emit('add-node-success', this.newnode)))
                 .catch(err => {
                     this.$emit('add-node-error', 'Remote Error')
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


     },
     mounted() {
         this.fetchGroups()
     }
 }
</script>
