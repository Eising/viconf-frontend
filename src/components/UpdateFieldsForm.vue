<template>
    <div id="updatefieldsform">
        <div v-if="loaded">
            <v-form ref="fieldsform">
                <div v-for="field in fieldset.resource_fieldset" :key="field.name">
                    <h6>{{ field.name }}</h6>
                    <v-text-field
                        label="Human readable label"
                        v-model="fields[field.name]['label']"
                    ></v-text-field>
                    <v-select
                        v-model="fields[field.name]['validator']"
                        label="Template field validator"
                        filled
                        :items="validators"
                    ></v-select>
                    <v-divider />
                </div>
                <v-btn @click="submit">Update</v-btn>
            </v-form>
        </div>
    </div>
</template>

<script>
 export default {
     name: 'UpdateFieldsForm',
     components: {

     },
     props: {
         fieldset: Object
     },
     data: () => ({
         validators: [
             {text: "No validation", value: "none"},
             {text: "String", value: "string"},
             {text: "AS Number", value: "asn"},
             {text: "IPv4 CIDR Prefix", value: "cidrv4"},
             {text: "Numbers", value: "digits"},
             {text: "IPv4 Address", value: "ipv4"},
             {text: "IPv6 Prefix", value: "cidrv6"},
             {text: "IPv6 Address", value: "ipv6"},
             {text: "VLAN", value: "vlan"}
         ],
         fields: {},
         loaded: false,
     }),
     methods: {
         createStructure() {
             var self = this
             this.fieldset.resource_fieldset.forEach(function(item) {
                 self.fields[item.name] = {
                     name: item.name,
                     validator: item.validator,
                     label: item.label
                 }
                 console.log(self.fields)
             })
             this.loaded = true
         },

         collapseStructure() {
             const resource_fieldset = []
             for (let [key, value] of Object.entries(this.fields)) {
                 resource_fieldset.push(
                     {
                         name: key,
                         validator: value.validator,
                         label: value.label
                     }
                 )
             }
             const data = {
                 resource_template_id: this.fieldset.resource_template_id,
                 resource_fieldset: resource_fieldset
             }
             return data
         },
         submit() {
             const data = this.collapseStructure()
             this.performUpdate(data)
         },
         async performUpdate(data) {
             this.$api.updateTemplateFieldset(data.resource_template_id, data)
                 .then(() => (this.handleSuccess()))
                 .catch(err => {
                     console.log(err)
                 })
         },
         handleSuccess() {
             this.$router.push({ name: 'TemplateList' })
         }
     },
     mounted() {
         if (this.fieldset != undefined) {
            this.createStructure()

         }
     }
 }
</script>
