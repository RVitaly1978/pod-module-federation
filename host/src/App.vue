<script setup>
import { defineAsyncComponent } from 'vue'
import GlobalSidebar from './components/GlobalSidebar.vue'

const NavigationPanel = defineAsyncComponent(() => import('nav-panel/NavigationPanel'))
</script>

<template>
  <div class="min-h-screen bg-slate-900 text-base-white flex flex-col p-4 gap-4">
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
  </div>
</template>
