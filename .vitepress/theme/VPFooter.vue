<script setup lang="ts">
import { useData } from 'vitepress'
import { useSidebar } from 'vitepress/theme'
import VPMenuGroup from 'vitepress/dist/client/theme-default/components/VPMenuGroup.vue'
import VPMenuLink from 'vitepress/dist/client/theme-default/components/VPMenuLink.vue'
import VPNavBarMenuLink from 'vitepress/dist/client/theme-default/components/VPNavBarMenuLink.vue'
import VPNavBarMenuGroup from 'vitepress/dist/client/theme-default/components/VPNavBarMenuGroup.vue'

const { theme, frontmatter } = useData()
const { hasSidebar } = useSidebar()
</script>

<template>
  <footer v-if="theme.footer && frontmatter.footer !== false" class="VPFooter" :class="{ 'has-sidebar': hasSidebar }">
    <div class="container">
      <!-- zammad-org START -->
      <nav
        v-if="theme.footer.items?.length"
        aria-labelledby="footer-nav-aria-label"
        class="VPFooterMenu menu"
      >
        <span id="footer-nav-aria-label" class="visually-hidden">
          Footer Navigation
        </span>
        <template v-for="item in theme.footer.items" :key="JSON.stringify(item)">
          <VPNavBarMenuLink v-if="'link' in item" :item="item" />
          <component
            v-else-if="'component' in item"
            :is="item.component"
            v-bind="item.props"
          />
          <VPNavBarMenuGroup v-else :item="item" />
        </template>
      </nav>
      <!-- zammad-org END -->
      <p v-if="theme.footer.message" class="message" v-html="theme.footer.message"></p>
      <p v-if="theme.footer.copyright" class="copyright" v-html="theme.footer.copyright"></p>
    </div>
  </footer>
</template>

<style scoped>
/* zammad-org:START */
.VPFooterMenu {
  display: flex;
  justify-content: center;
}
/* zammad-org:END */
.VPFooter {
  position: relative;
  z-index: var(--vp-z-index-footer);
  border-top: 1px solid var(--vp-c-gutter);
  padding: 32px 24px;
  background-color: var(--vp-c-bg);
}

.VPFooter.has-sidebar {
  display: none;
}

.VPFooter :deep(a) {
  text-decoration-line: underline;
  text-underline-offset: 2px;
  transition: color 0.25s;
}

.VPFooter :deep(a:hover) {
  color: var(--vp-c-text-1);
}

@media (min-width: 768px) {
  .VPFooter {
    padding: 32px;
  }
}

.container {
  margin: 0 auto;
  max-width: var(--vp-layout-max-width);
  text-align: center;
}

.message,
.copyright {
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
</style>
