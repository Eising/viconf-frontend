<template>
    <v-app>
        <v-navigation-drawer
            v-model="drawer"
            color="blue-grey lighten-4"
            app
        >
            <v-toolbar
                dark
                color="teal"
            >
                <v-toolbar-title>Viconf</v-toolbar-title>
            </v-toolbar>

            <v-list
                dense
                nav
            >
                <v-list-item to="/">
                    <v-list-item-icon>
                        <v-icon>mdi-format-list-text</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Service Orders</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/provision">
                    <v-list-item-icon>
                        <v-icon>mdi-file-cog</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Provision Service</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>


                <v-list-group
                    prepend-icon="mdi-code-json"
                    no-action
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>Resources</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item to="/templates">
                        <v-list-item-content>
                            <v-list-item-title>Templates</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                   <v-list-item to="/resource_services">
                        <v-list-item-content>
                            <v-list-item-title>Resource Services</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                   <v-list-item to="/services">
                        <v-list-item-content>
                            <v-list-item-title>Network Services</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
                <v-list-group
                    prepend-icon="mdi-router"
                    no-action
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>Devices</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item to="/nodes">
                        <v-list-item-content>
                            <v-list-item-title>Nodes</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item to="/groups">
                        <v-list-item-content>
                            <v-list-item-title>Groups</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>


            </v-list>
        </v-navigation-drawer>

        <v-app-bar
            app
            color="teal darken-1"
            dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-spacer />
            <ToolbarProfile></ToolbarProfile>

        </v-app-bar>

        <v-content class="blue-grey lighten-5">
            <v-container
                fluid
            >
                <v-row>
                    <v-col cols="12">
                        <v-row justify="center">
                            <v-col
                                cols="12"
                                xl="6"
                                md="10"
                                >
                                <router-view></router-view>
                            </v-col>
                        </v-row>

                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>

 import ToolbarProfile from './components/ToolbarProfile.vue'
 import { mapState } from 'vuex';

 export default {
     name: 'App',

     components: {
         ToolbarProfile,
     },

     data: () => ({
         drawer: null,
         //
     }),
     methods: {
         logout() {
             this.$api.clear()
             this.$router.push({name: 'login'})
         },
         login() {
             this.$router.push({name: 'login'})
         },
         async setUserName() {
             if ((!this.username) && (this.loggedIn)) {
                this.$api.getCurrentUser()
                    .then((response) => {
                        this.$store.commit('setUserName', response.username)
                    })
             }
         },
     },
     computed: {

         loggedIn: function () {
             return this.$api.isAuthenticated()
         },
         ...mapState({
             username: state => state.user.username
         }),

     },
     mounted() {
         this.setUserName()
     },
     watch: {
     },
 };
</script>
