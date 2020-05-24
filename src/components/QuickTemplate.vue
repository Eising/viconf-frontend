<template>
    <div id="quicktemplate">
        <v-card>
            <v-card-title>Quicktemplate</v-card-title>
            <v-card-subtitle>Quickly fill out a single template without creating a service order.</v-card-subtitle>
            <v-card-text>
                <v-select
                    v-model="template"
                    :items="templates"
                    label="Templates"
                ></v-select>
                <div v-if="template !== null">
                    <QuickTemplateForm :id="template" :key="template"></QuickTemplateForm>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>

 import QuickTemplateForm from './QuickTemplateForm.vue'
 export default {
     name: 'QuickTemplate',
     components: {
         QuickTemplateForm,

     },
     props: {
         id: Number
     },
     data: () => ({
         template: null,
         templates: [],

     }),
     methods: {
         async fetchTemplates() {
             this.$api.listTemplates()
                 .then(res => {
                     res.forEach(element => this.templates.push({
                         text: element.name,
                         value: element.id

                     }))
                 })
                 .catch(err => {
                     console.log(err)
                 })
         },

     },
     mounted() {
         this.fetchTemplates()
     }
 }
</script>
