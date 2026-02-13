<template>
  <nav class="w-64 flex flex-col border-r border-slate-600 text-slate-300">
    <div class="font-bold text-xl flex items-center px-2">
      <div class="w-100 h-10 bg-slate-600 rounded flex items-center justify-center">MFE Application</div>
    </div>

    <div class="pa-2">
      <div class="mt-4">
        <p class="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 px-2">Common</p>
        <div class="flex flex-col gap-1">
          <router-link 
            v-for="link in staticLinks" 
            :key="link.path"
            :to="link.path"
            class="nav-link"
            :class="{ 'active': route.path === link.path }"
          >
            {{ link.meta?.title }}
          </router-link>
        </div>
      </div>

      <div v-for="app in remoteAppsNav" :key="app.name" class="mt-8">
        <div class="flex items-center justify-between mb-2 px-2">
          <p class="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            {{ app.name }}
          </p>
  
          <div class="flex items-center gap-1.5">
            <span 
              class="w-2 h-2 rounded-full transition-all duration-300"
              :class="statusClasses[mfeStore.appStatuses[app.name] || 'idle']"
            />
          </div>
        </div>
  
        <div class="flex flex-col gap-1">
          <router-link 
            v-for="subRoute in app.routes" 
            :key="subRoute.path"
            :to="subRoute.path"
            class="nav-link"
            :class="{ 'active': isActive(subRoute.path) }"
          >
            {{ subRoute.meta?.title }}
          </router-link>
        </div>
      </div>
    </div>

    <div class="mt-auto p-2 border-t border-slate-600 flex items-center gap-3 text-lg">
      <div class="w-16 h-8 rounded bg-slate-600 flex items-center justify-center font-bold">POD</div>
      <div class="flex flex-col overflow-hidden">
        <span class="truncate">Prototype</span>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMfeRoutesStore } from '../stores/mfe-routes'

const route = useRoute()
const router = useRouter()
const mfeStore = useMfeRoutesStore()

const staticLinks = computed(() => {
  return router.getRoutes().filter((route) => route.name !== 'remote-container')
})

const remoteAppsNav = computed(() => {
  const registry = mfeStore.registry

  const groups = registry.reduce((acc, curr) => {
    if (curr.meta?.hidden) return acc
    if (!acc[curr.appName]) acc[curr.appName] = []
    acc[curr.appName].push(curr)
    return acc
  }, [])

  return Object.entries(groups)
    .map(([name, routes]) => ({ name, routes }))
})

const isActive = (path) => route.path.startsWith(path)

const statusClasses = {
  loading: 'bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]',
  online: 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]',
  error: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]',
  idle: 'bg-slate-600'
}
</script>
