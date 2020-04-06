<template>
    <SelectServiceProvisionComponent></SelectServiceProvisionComponent>
</template>

<script>
//import ProvisionServiceComponent from '@/components/ProvisionService.vue'

 import SelectServiceProvisionComponent from '@/components/SelectServiceProvision.vue'
 export default {
     name: 'ProvisionServiceView',
     components: {
         SelectServiceProvisionComponent
//         ProvisionServiceComponent
     },
     props: {
     },
     data: () => ({
     }),
     methods: {
     },
     mounted() {
     }
 }
</script>
