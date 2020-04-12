<template>
    <div id="viewconfigcomponent">
        <v-card>
            <div v-if="configLoaded">
                <v-tabs
                    v-model="tab"
                    grow
                >
                    <v-tab
                        v-for="node in nodes"
                        :key="`${node.node}-tab`"
                    >
                        {{ node.node }}
                    </v-tab>
                </v-tabs>
                <v-tabs-items
                    v-model="tab"
                >
                    <v-tab-item
                        v-for="node in nodes"
                        :key="`${node.node}-tabitem`"
                    >
                        <v-card>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <h3>Service Up</h3>
                                        <code
                                            class="config"
                                            v-text="node.service_up"
                                        ></code>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <h3>Service Down</h3>
                                        <code
                                            class="config"
                                            v-text="node.service_down"
                                        ></code>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </div>
        </v-card>
    </div>
</template>

<script>

 export default {
     name: 'ViewConfigComponent',
     components: {

     },
     props: {
         id: Number,
     },
     data: () => ({
         configLoaded: false,
         nodes: [],
         tab: null
     }),
     methods: {
         async fetchData() {
             this.$api.getServiceOrderConfig(this.id)
                 .then(res => (this.nodes = res))
                 .catch(err => {
                     console.log(err)
                 })
                 .then(() => (this.configLoaded = true))
         }
     },
     mounted() {
         this.fetchData()
     }
 }
</script>

<style scoped>
    .config  {
        font-family: "Inconsolata", monospace;
    }
</style>
