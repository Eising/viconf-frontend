<template>
    <div id="grouplistaddgroup">
        <ValidationObserver ref="observer" v-slot="{ invalid }">
            <form
                @submit.prevent="addGroup"
            >

                <v-card>
                    <v-card-title>New Group</v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <ValidationProvider
                                        ref="groupname"
                                        v-slot="{ errors }"
                                        name="Name"
                                        rules="required|string"
                                    >
                                        <v-text-field
                                            label="Name"
                                            required
                                            v-model="newgroup.name"
                                            :error-messages="errors"
                                        ></v-text-field>
                                    </ValidationProvider>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Username" v-model="newgroup.username"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Password" v-model="newgroup.password"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Enable password" v-model="newgroup.enable_password"></v-text-field>
                                </v-col>

                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="$emit('add-group-close')"
                        >Close</v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            :disabled="invalid"
                            type="submit"
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
     name: 'GroupListAddGroup',
     components: {
         ValidationObserver,
         ValidationProvider
     },
     props: {
     },
     data: () => ({
         newgroup: {},
         valid: true

     }),
     methods: {
         async addGroup() {
             this.$api.createGroup(this.newgroup)
                 .then(() => (this.$emit('add-group-success', this.newgroup)))
                 .catch((err) => {
                     this.handleError(err)
                 })

         },
         handleError(error) {
             if (error.response.status == 400) {
                 if ('name' in error.response.data) {
                     this.$refs.groupname.applyResult({
                         errors: error.response.data.name,
                         valid: false,
                         failedRules: {}
                     })
                 }
             }
             this.$emit('add-group-error', error)
             console.log(error.response.data)
         }
     },
     mounted() {
     }
 }
</script>
