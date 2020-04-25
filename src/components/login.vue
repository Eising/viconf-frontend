<template>
    <div id="logincomponent">
        <v-card>
            <v-card-title>Login</v-card-title>
            <v-card-text>
                <ValidationObserver ref="observer">
                    <form @submit.prevent="doLogin">
                        <ValidationProvider v-slot="{ errors }" name="username" rules="required">
                            <v-text-field
                                label="Username"
                                required
                                :error-messages="errors"
                                v-model="username"
                            ></v-text-field>
                        </ValidationProvider>
                        <ValidationProvider v-slot="{ errors }" name="password" rules="required">
                            <v-text-field
                                label="Password"
                                required
                                v-model="password"
                                :error-messages="errors"
                                type="password"
                            ></v-text-field>
                        </ValidationProvider>
                        <v-btn
                            type="submit"
                        >Login</v-btn>
                    </form>
                </ValidationObserver>
            </v-card-text>
        </v-card>
        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <v-btn text @click="snack = false">Close</v-btn>
        </v-snackbar>
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
                     console.log(err)
                     this.snack = true
                     this.snackColor = 'error'
                     this.snackText = 'Invalid username or password'
                 })
         }
     },
     mounted() {
     }
 }
</script>
