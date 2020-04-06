<template>
    <v-app>
        <v-navigation-drawer
            v-model="drawer"
            app
        >
            <v-list
                dense
                nav
            >
                <v-list-item to="/">
                    <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
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
            color="indigo"
            dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title>Viconf</v-toolbar-title>
        </v-app-bar>

        <v-content>
            <v-container
                fluid
            >
                <v-row>
                    <v-col>
                        <v-container fluid>
                            <router-view></router-view>
                        </v-container>

                    </v-col>
                </v-row>
            </v-container>
        </v-content>
        <v-footer
            color="indigo"
            app
        >
            <span class="white--text">&copy; 2020</span>
        </v-footer>
    </v-app>
</template>

<script>


 export default {
     name: 'App',

     components: {
     },

     data: () => ({
         drawer: null,
         //
     }),
 };
</script>
