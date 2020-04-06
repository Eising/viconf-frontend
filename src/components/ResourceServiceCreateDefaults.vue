<template>
    <div id="resourceservicecreatedefaults">
        <v-alert
            v-if="overlap"
            type="warning"
        >
            The selected templates contain variables with the same names. These will share default values in provisioning. Please edit your template if this is not desired.
        </v-alert>
        <v-container>
            <v-form>
                <v-row v-for="(field, index) in defaults" :key="index">
                    <v-col cols="12">
                        <h2>{{ field.field }}</h2>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="defaults[index].default"
                            @change="updateDefaults"
                            label="Default value"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select
                            v-model="defaults[index].configurable"
                            @change="updateDefaults"
                            :items="configurable"
                            label="User configurable"
                        >
                        </v-select>
                    </v-col>
                </v-row>
            </v-form>
        </v-container>
    </div>
</template>


<script>
 export default {
     name: 'ResourceServiceCreateDefaults',
     components: {

     },
     props: {
     },
     data: () => ({
         overlap: false,
         fields: [],
         defaults: [],
         configurable: [
             {
                 text: "Yes",
                 value: true
             },
             {
                 text: "No",
                 value: false
             }
         ],
     }),
     methods: {
         async checkTemplateOverlap() {
             const self = this
             this.$store.state.resource_service.resource_templates.forEach(function (template) {
                 self.$api.getTemplateFieldset(template)
                     .then(fieldset => {
                         fieldset.resource_fieldset.forEach(function(element) {
                             if (self.fields.includes(element.name)) {
                                 self.overlap = true
                             }
                             else {
                                 console.log(`pushing ${element.name}`)
                                 self.fields.push(element.name)
                                 self.defaults.push({
                                     field: element.name,
                                     default: '',
                                     configurable: true
                                 })
                             }

                         })
                 })
             })
         },

         updateDefaults() {
             this.$store.commit('updateRSDefaults', this.defaults)
         },

     },
     computed: {

     },
     mounted() {
     },
     created() {
         this.unwatch = this.$store.watch(
             (state) => {
                 return state.resource_service.resource_templates
             },
             () => {
                 this.fields = []
                 this.defaults = []
                 this.checkTemplateOverlap()
             }
         )
     },
     beforeDestroy() {
         this.unwatch()
     }
 }
</script>
