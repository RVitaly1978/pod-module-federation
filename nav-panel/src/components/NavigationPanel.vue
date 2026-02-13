<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { remoteUi } from '../utils/remote-loader'
const UiButton = remoteUi('UiButton')

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
      <router-link :to="BASE" class="nav-link">Home</router-link>

      <router-link v-for="link in links" :key="link.to"
        :to="link.to"
        custom
        v-slot="{ href, navigate, isActive, isExactActive }"
      >
        <a 
          :href="href" 
          @click="navigate"
          :class="[
            'nav-link', 
            (isActive || $route.path.startsWith(link.to)) ? 'router-link-active' : '',
            (isExactActive || $route.path === link.to) ? 'router-link-exact-active' : '',
          ]"
        >
          {{ link.text }}
        </a>
      </router-link>
    </div>

    <div>
      <UiButton :disabled="isDisabled" @click="onClick">Go to Home</UiButton>
    </div>
  </nav>
</template>

<style scoped>
.nav-link {
  text-decoration: none;
  font-weight: 700;
  padding: 8px 16px;
  transition: color 0.3s;
  border-radius: 4px;
  color: var(--warning-700);
}
.router-link-active.nav-link {
  color: var(--base-white);
  background-color: var(--warning-300);
}
.router-link-exact-active.nav-link {
  background-color: var(--warning-700);
}
</style>