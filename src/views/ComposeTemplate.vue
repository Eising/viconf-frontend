<template>
    <ComposeTemplateComponent v-bind:edit_id="id" />
</template>

<script>
 import ComposeTemplateComponent from '@/components/ComposeTemplate.vue'
 export default {
     name: 'ComposeTemplateView',
     components: {
         ComposeTemplateComponent
     },
     props: {
         id: {
             type: Number,
             required: false,
         }
     },
     data: () => ({
     }),
     methods: {
     },
     mounted() {
     }
 }
</script>
