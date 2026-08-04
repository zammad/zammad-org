<script setup>
import { computed, useSlots } from 'vue'

const slots = useSlots()

const sections = computed(() => {
  let result = []
  let lastDefinition

  slots.default()[0].children.forEach((node) => {
    if (node.type === 'dt') {
      const definition = {
        term: node.children,
      }

      if (typeof node.children !== 'string') {
        definition.term = node.children[0].children
        definition.termNodes = node.children
      }

      const sectionHeading = definition.term.replace(/\s?\(.*\)\s?/, '')[0].toUpperCase()
      const existingSection = result.find((section) => section.heading === sectionHeading)

      if (existingSection) {
        existingSection.children.push(definition)
      } else {
        result.push({
          id: `section-${sectionHeading.toLowerCase()}`,
          heading: sectionHeading,
          children: [definition],
        })
      }
      lastDefinition = definition
    } else if (node.type === 'dd') {
      if (!lastDefinition) return
      if (typeof node.children !== 'string') lastDefinition.detailNodes = node.children
      else lastDefinition.detailText = node.children
    }
  })

  // Sort sections alphabetically.
  result = result.sort((a, b) => a.heading.localeCompare(b.heading))

  // Sort terms alphabetically within each section.
  result.forEach((section) => {
    section.children = section.children.sort((a, b) => a.term.localeCompare(b.term))
  })

  return result
})
</script>

<template>
  <template
    v-for="section in sections"
    :key="section.id"
  >
    <h2
      :id="section.id"
      tabindex="-1"
    >
      {{ section.heading }}
      <a class="header-anchor" :href="`#${section.id}`" />
    </h2>

    <dl>
      <template
        v-for="definition in section.children"
        :key="definition.term"
        >
        <template v-if="definition.termNodes">
          <template v-for="termNode in definition.termNodes" :key="termNode.uid">
            <component :is="termNode" />
          </template>
        </template>
        <dt v-else>{{ definition.term }}</dt>
        <dd>
          <template v-if="definition.detailNodes" v-for="detailNode in definition.detailNodes" :key="detailNode.uid">
            <component :is="detailNode" />
          </template>
          <p v-else-if="definition.detailText">
            {{ definition.detailText }}
          </p>
        </dd>
      </template>
    </dl>
  </template>
</template>
