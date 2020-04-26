<template>
    <div id="logincomponent">
        <ValidationObserver ref="observer">
            <form @submit.prevent="doLogin">
                <v-card>
                    <v-card-title>Login</v-card-title>
                    <v-card-text>
                        <ValidationProvider v-slot="{ errors }" name="username" rules="required" ref="username">
                            <v-text-field
                                label="Username"
                                required
                                :error-messages="errors"
                                v-model="username"
                                prepend-icon="mdi-account"
                            ></v-text-field>
                        </ValidationProvider>
                        <ValidationProvider v-slot="{ errors }" name="password" rules="required" ref="password">
                            <v-text-field
                                label="Password"
                                required
                                v-model="password"
                                :error-messages="errors"
                                type="password"
                                prepend-icon="mdi-lock"
                            ></v-text-field>
                        </ValidationProvider>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn
                            color="primary"
                            type="submit"
                        >Login</v-btn>
                    </v-card-actions>

                </v-card>
                <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
                    {{ snackText }}
                    <v-btn text @click="snack = false">Close</v-btn>
                </v-snackbar>
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
     name: 'LoginComponent',
     components: {
         ValidationProvider,
         ValidationObserver,

     },
     props: {
     },
     data: () => ({
         login: true,
         username: '',
         password: '',
         snack: false,
         snackColor: '',
         snackText: '',

     }),
     methods: {
         async doLogin() {
             this.$api.requestToken({username: this.username, password: this.password})
                 .then((response) => {
                     this.$api.storeToken(response.access)
                     this.$api.storeRefreshToken(response.refresh)
                     this.$router.go(-1)
                 })
                 .catch((err) => {
                     this.handleError(err)
                 })
         },
         handleError(error) {
             if (error.response.status === 401) {
                 this.$refs.username.applyResult({
                     errors: [ "Username or password incorrect" ],
                     valid: false,
                     failedRules: {}
                 })
                 this.$refs.password.applyResult({
                     errors: [ "Username or password incorrect" ],
                     valid: false,
                     failedRules: {}
                 })
             }
             console.log(error)
         },

     },
     mounted() {
     }
 }
</script>
