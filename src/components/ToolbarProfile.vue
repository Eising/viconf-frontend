<template>
    <v-menu
        bottom
        right
        left
        offset-y
        v-if="username !== null"
    >
        <template v-slot:activator="{ on }">
            <v-btn
                large
                v-on="on"
                text
            >
                <v-avatar>
                    <v-icon dark>mdi-account-circle</v-icon>
                </v-avatar>
                <strong>{{ username }}</strong>
            </v-btn>
        </template>
        <v-list>
            <v-list-item
                @click="logout"
            >
                <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>

</template>

<script>
import { mapState } from 'vuex';

 export default {
     name: 'ToolbarProfile',
     components: {

     },
     props: {
     },
     data: () => ({

     }),
     methods: {
         logout() {
             this.$api.clear()
             this.$router.push({name: 'login'})
         },
     },
     mounted() {
     },
     computed: mapState({
         username: state => state.user.username
     }),
 }
</script>
