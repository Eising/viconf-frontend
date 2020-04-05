<template>
    <div id="templatelist">
        <v-card>
            <v-card-title>Templates</v-card-title>
            <v-card-text>
                <v-container>
                    <v-data-table
                        :headers="headers"
                        :items="templates"
                        :loading="isLoading"
                    >
                        <template v-slot:item.actions="{ item }">
                            <router-link :to="{ name: 'TemplateEdit', params: { id: item.id }}">
                                <v-icon
                                    small
                                    class="mr-2"
                                >
                                    mdi-pencil
                                </v-icon>
                            </router-link>
                            <v-icon
                                small
                                @click="deleteTemplate(item.id)"
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
                                :to="{ name: 'TemplateCompose'}"
                            >
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </template>

                    </v-data-table>
                </v-container>
            </v-card-text>

        </v-card>
    </div>
</template>

<script>
 export default {
     name: 'TemplateListComponent',
     components: {

     },
     props: {
     },
     data: () => ({
         headers: [
             {
                 text: 'Name',
                 value: 'name'
             },
             {
                 text: 'Description',
                 value: 'description',
             },
             {
                 text: 'Platform',
                 value: 'platform'
             },
             {
                 text: 'Actions',
                 value: 'actions',
                 sortable: false,
                 align: 'end'
             }
         ],
         templates: [],
         isLoading: false,
     }),
     methods: {
         async fetchNodes() {
             this.isLoading = true
             this.$api.listTemplates()
                 .then(data => (this.templates = data))
                 .catch(err => {
                     console.log(err)
                 })
                 .then(() => (this.isLoading = false))
         },
         async deleteTemplate(id) {
             const res = await this.$dialog.confirm({
                 text: 'Do you really want to delete this template?',
                 title: 'Warning'
             })
             if (res) {
                 this.$api.deleteTemplate(id)
                 this.templates = this.templates.filter(item => item.id !== id)
             }
         },
     },
     mounted() {
         this.fetchNodes()
     }
 }
</script>
