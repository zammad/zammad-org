<script setup>
import { useData } from 'vitepress'
import VPFeatures from 'vitepress/dist/client/theme-default/components/VPFeatures.vue'

const { frontmatter } = useData()
</script>

<template>
  <VPFeatures class="vp-doc-features" :features="frontmatter.features" />
</template>
