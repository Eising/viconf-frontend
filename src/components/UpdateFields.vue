<template>
    <div v-if="loaded">
        <UpdateFieldsForm v-bind:fieldset="fieldset"></UpdateFieldsForm>
    </div>
</template>

<script>
 import UpdateFieldsForm from '@/components/UpdateFieldsForm.vue'
 export default {
     name: 'UpdateFieldsComponent',
     components: {
         UpdateFieldsForm,

     },
     props: {
         id: Number,
         fields: Object,
         labels: Object,
     },
     data: () => ({
         loaded: false,
         fieldset: {
             resource_template_id: null,
             resource_fieldset: [],
         }
     }),
     methods: {
         collapseFields() {
             const params = []
             this.fieldset.resource_template_id = this.id

             for (let [key, value] of Object.entries(this.fields)) {
                 params.push(
                     {
                         name: key,
                         validator: value,
                         label: this.labels[key]
                     }
                 )
             }
             this.fieldset["resource_fieldset"] = params

         }
     },
     mounted() {
         this.collapseFields()
         this.loaded = true
         console.log(this.fieldset)
     }
 }
</script>
