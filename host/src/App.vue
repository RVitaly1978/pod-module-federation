<script setup>
import { defineAsyncComponent, computed } from 'vue'
import MfeDevTools from './components/MfeDevTools.vue'
import GlobalSidebar from './components/GlobalSidebar.vue'

const NavigationPanel = defineAsyncComponent(() => import('nav-panel/NavigationPanel'))

const hasOverride = computed(() => {
  const data = window.MFE?.getOverrides()
  return data && Object.keys(data).length > 0
})
</script>

<template>
  <div
    class="min-h-screen bg-slate-900 text-base-white flex flex-col p-4 gap-4"
    :class="hasOverride && 'fixed inset-0 z-9998 border-5 border-red-500 border-dashed'"
  >
    <header>
      <Suspense>
        <template #default>
          <NavigationPanel />
        </template>
        <template #fallback>
          <nav>Loading navigation...</nav>
        </template>
      </Suspense>
    </header>

    <div class="flex-grow-1 flex gap-4">
      <aside class="flex">
        <GlobalSidebar />
      </aside>

      <main class="relative flex-grow-1 flex flex-col">
        <router-view v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </router-view>
      </main>
    </div>

    <MfeDevTools />
  </div>
</template>
