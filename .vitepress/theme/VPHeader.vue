<script setup>
import { useData } from 'vitepress'

const { theme } = useData()
</script>

<template>
  <div v-if="theme.header?.text" class="VPHeader">
    <a v-if="theme.header.link" :href="theme.header.link" target="_blank">
      {{ theme.header.text }} 🔗
    </a>
    <span v-else>
      {{ theme.header.text }}
    </span>
  </div>
</template>
