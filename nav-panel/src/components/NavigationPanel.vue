<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { UiButton } from '@scope/ui-lib/src/index.js'

import 'virtual:uno.css'

const isDev = import.meta.env.DEV
const VERSION = import.meta.env.VITE_APP_VERSION

const router = useRouter()
const route = useRoute()

const BASE = '/'
const links = [
  { text: 'App-vue3', to: '/app-vue3' },
  { text: 'App-vue2', to: '/app-vue2' },
  { text: 'App-react', to: '/app-react' },
]

const isDisabled = computed(() => {
  return route.fullPath === BASE
})

const onClick = () => {
  router.push(BASE)
}
</script>

<template>
  <nav class="w-full bg-warning-100 rounded-md border-5 border-warning-500 px-4 py-2 flex items-center justify-between">
    <div class="flex gap-4">
      <router-link :to="BASE" class="panel-nav-link">Home</router-link>

      <router-link v-for="link in links" :key="link.to"
        :to="link.to"
        custom
        v-slot="{ href, navigate, isActive, isExactActive }"
      >
        <a 
          :href="href" 
          @click="navigate"
          :class="[
            'panel-nav-link', 
            (isActive || $route.path.startsWith(link.to)) ? 'router-link-active' : '',
            (isExactActive || $route.path === link.to) ? 'router-link-exact-active' : '',
          ]"
        >
          {{ link.text }}
        </a>
      </router-link>
    </div>

    <div class="font-bold text-base-black">{{ (isDev || !VERSION) ? 'local' : VERSION }}</div>

    <div>
      <UiButton :disabled="isDisabled" @click="onClick">Go to Home</UiButton>
    </div>
  </nav>
</template>

<style scoped>
.panel-nav-link {
  text-decoration: none;
  font-weight: 700;
  padding: 8px 16px;
  transition: color 0.3s;
  border-radius: 4px;
  color: var(--warning-700);
}
.router-link-active.panel-nav-link {
  color: var(--base-white);
  background-color: var(--warning-300);
}
.router-link-exact-active.panel-nav-link {
  background-color: var(--warning-700);
}
</style>