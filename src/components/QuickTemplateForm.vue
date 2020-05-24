<template>
    <div id="quicktemplate_form">
        <div v-if="isLoaded">
            <div class="my-5">

                <ValidationObserver ref="observer" v-slot="{ invalid }">
                    <form @submit.prevent="submitQuickTemplate">
                        <div v-for="(opts, field) in schema" :key="field">
                            <ValidationProvider v-slot="{ errors }" :name="opts.label" :rules="`required|${opts.validator}`">
                                <v-text-field
                                    :label="opts.label"
                                    v-model="fields[field]"
                                    :error-messages="errors"
                                    required
                                ></v-text-field>
                            </ValidationProvider>
                        </div>
                        <v-btn
                            :disabled="invalid"
                            @click="submitQuickTemplate"
                        >Compile</v-btn>
                    </form>
                </ValidationObserver>
            </div>

                <div v-if="template !== ''">
                    <v-textarea
                        class="config"
                        v-model="template"
                        readonly
                        filled
                        auto-grow
                        label="Template"
                    ></v-textarea>
                </div>
        </div>
    </div>
</template>

<script>

 import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
 import validations from '@/validation.js'
 validations.ValidationSetup();
 setInteractionMode('eager')

 export default {
     name: 'QuickTemplateForm',
     components: {
         ValidationProvider,
         ValidationObserver,
     },
     props: {
         id: Number,
     },
     data: () => ({
         schema: null,
         fields: {},
         isLoaded: false,
         template: ''

     }),
     methods: {
         async getSchema() {
             this.$api.getQuicktemplate(this.id)
                 .then((response) => {
                     this.schema = response
                     this.isLoaded = true
                 })
                 .catch((err) => { console.log(err) })
         },
         async submitQuickTemplate() {
             this.$api.compileQuicktemplate(this.id, {fields: this.fields})
                 .then((response) => { this.template = response.template })
                 .catch((err) => { console.log(err) })
         },

     },
     mounted() {
         this.getSchema()
     }
 }
</script>

<style scoped>
    .config {
        font-family: "Inconsolata", monospace;
    }
</style>
