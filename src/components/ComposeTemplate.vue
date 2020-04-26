<template>
    <div id="composetemplate">
        <v-card>
            <v-card-title v-if="edit">Edit Template</v-card-title>
            <v-card-title v-else>Compose Template</v-card-title>
            <v-card-text>
                <form
                    ref="form"
                    @submit.prevent="submit"
                >
                    <v-text-field
                        v-model="name"
                        label="Template name"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="description"
                        label="Template description"
                    ></v-text-field>
                    <v-container fluid>
                        <v-row>
                            <v-col
                                cols="12"
                                md="8"
                                >
                                <v-textarea
                                    v-model="up_contents"
                                    filled
                                    auto-grow
                                    outlined
                                    ref="upcontent"
                                    label="Template for service activation"
                                    @keydown="handleKeyDown"
                                >
                                </v-textarea>
                                <v-divider />
                                <v-textarea
                                    v-model="down_contents"
                                    filled
                                    auto-grow
                                    outlined
                                    label="Template for service removal"
                                    @keydown="handleKeyDown"
                                ></v-textarea>
                            </v-col>
                            <v-col
                                cols="12"
                                md="4"
                            >
                                <v-card>
                                    <v-card-title>Template help</v-card-title>
                                    <v-card-text>
                                        <span class="title" v-pre>{{ variable }}</span>
                                        <p class="body-2">Use {{  }} around variables. The type of variable will be chosen on template submission</p>
                                        <span class="title">Global variables</span>
                                        <p class="body-2">You can use the following to refer to the global service options:</p>
                                        <ul>
                                            <li v-pre>{{ customer }}</li>
                                            <li v-pre>{{ location }}</li>
                                            <li v-pre>{{ reference }}</li>
                                            <li v-pre>{{ node }} </li>
                                        </ul>
                                        <span class="title">Template hierarchy</span>
                                        <p class="body-2" v-pre>
                                            You can specify a template to have all other templates inserted at a certain position.<br>
                                            Insert the magic tag {{! maintemplate }} in the top and at the point where you want the other templates, insert the {{! subtemplates }} tag.
                                        </p>
                                        <p class="body-2" v-pre>
                                            You can exclude individual templates from this by specifying the magic tag {{! subexclude }}.
                                            These templates will always be added to the end of the configuration.
                                        </p>

                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-btn
                        type="submit"
                    >submit</v-btn>


                </form>
            </v-card-text>
        </v-card>
        <v-dialog
            v-model="fieldsetdialog"
            persistent
            max-width="600px"
        >
            <div v-if="submitted">
                <v-card>
                    <v-card-title>Update Fields</v-card-title>
                    <v-card-text>
                        <UpdateFieldsComponent
                            v-bind:id="template_id"
                            v-bind:fields="template_fields"
                            v-bind:labels="template_labels"
                        ></UpdateFieldsComponent>
                    </v-card-text>
                </v-card>
            </div>
        </v-dialog>
    </div>
</template>


<script>
// import { getIndent, getDeindentLevel } from "../util/getIndent";
 import UpdateFieldsComponent from '@/components/UpdateFields.vue'
 export default {
     name: 'ComposeTemplateComponent',
     components: {
         UpdateFieldsComponent,

     },
     props: {
         edit_id: {
             type: Number,
             required: false
         }
     },
     data: () => ({
         name: null,
         up_contents: null,
         down_contents: null,
         template_id: null,
         template_fields: null,
         template_labels: null,
         submitted: false,
         fieldsetdialog: false,
         edit: false,
         description: null,
     }),
     methods: {
         loadEdit() {
             if (this.edit_id != undefined) {
                 this.edit = true
                 this.template_id = this.edit_id
                 this.fetchData()
             }
         },
         submit() {
             const data = {
                 name: this.name,
                 up_contents: this.up_contents,
                 down_contents: this.down_contents,
                 description: this.description,
             }
             if (this.edit) {
                 this.updateData(this.edit_id, data)
             }
             else {
                 this.postData(data)
             }
         },
         handleKeyDown(evt) {
             if (evt.keyCode === 9) {
                 document.execCommand("insertHTML", false, "  ");
                 evt.preventDefault()
             }
         },
         async postData(data) {
             this.$api.createTemplate(data)
                 .then(resp => (this.handleSuccess(resp)))
                 .catch(err => {console.log(err)})
         },
         async updateData(pk, data) {
             this.$api.updateTemplate(pk, data)
                 .then(resp => (this.handleSuccess(resp)))
                 .catch(err => {
                     console.log(err)
                 })
         },
         async fetchData() {
             this.$api.getTemplate(this.edit_id)
                 .then(response => (this.fillData(response)))
                 .catch(err => {
                     console.log(err)
                 })
         },
         fillData(item) {
             this.up_contents = item.up_contents
             this.down_contents = item.down_contents
             this.name = item.name
             this.description = item.description
         },
         handleSuccess(response) {
             this.template_id = response.id
             this.template_fields = response.fields
             this.template_labels = response.labels
             this.submitted = true
             this.fieldsetdialog = true
         }
     },
     mounted() {
         this.loadEdit()
     }
 }
</script>
