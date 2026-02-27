<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const STORAGE_KEY = window.MFE?.STORAGE_KEY || 'MFE_OVERRIDE'
const manifest = window.MFE?.manifest || {}

const isOpen = ref(false)
const overrides = reactive(window.MFE?.getOverrides() || {})
const localPorts = reactive({})

const save = (key, version, active) => {
  if (version === active) {
    delete overrides[key]
  } else {
    overrides[key] = version
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides))
}

const setLocalhost = (key, port) => {
  if (!port) return
  overrides[key] = `http://localhost:${port}`
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides))
}

const getActiveVersion = (key, manifestActive) => overrides[key] || manifestActive

const handleOpen = () => {
  // initSelected()
  isOpen.value = true
}

const reset = () => window.MFE?.reset()
const reload = () => window.location.reload()
const close = () => {
  isOpen.value = false
}

onMounted(() => {
  window.addEventListener('open-mfe-devtools', handleOpen)
})

onUnmounted(() => {
  window.removeEventListener('open-mfe-devtools', handleOpen)
})
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-100 flex items-center justify-center p-4">
    <div 
      class="absolute inset-0 backdrop-blur-md" style="background-color: rgba(0, 0, 0, 0.4);"
      @click="close"
    ></div>
    
    <div class="relative w-full max-w-xl bg-base-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[90vh]">
      
      <div class="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
        <div>
          <h2 class="text-lg font-bold text-brand-700">MFE Developer Tools</h2>
          <p class="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Environment Overrides</p>
        </div>
        <button 
          @click="close" 
          class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
        >
          ✕
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-6 space-y-8">
        
        <section>
          <div class="flex items-center gap-2 mb-3">
            <div class="w-2 h-2 rounded-full bg-brand-500"></div>
            <h3 class="text-sm font-bold text-gray-900">Host Application</h3>
          </div>
          
          <div class="flex flex-wrap gap-2">
            <button 
              @click="save('host', manifest.host.active, manifest.host.active)"
              :class="getActiveVersion('host', manifest.host.active) === manifest.host.active 
                ? 'bg-brand-500 text-base-white border-brand-700' 
                : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'"
              class="px-4 py-2 text-xs font-bold rounded-lg border transition-all"
            >
              Default ({{ manifest.host.active }})
            </button>
            <button 
              v-for="(path, ver) in manifest.host.versions" 
              :key="ver"
              v-show="ver !== manifest.host.active"
              @click="save('host', ver, manifest.host.active)"
              :class="overrides.host === ver 
                ? 'bg-brand-500 text-base-white border-brand-700' 
                : 'bg-base-white text-gray-600 border-gray-200 hover:border-brand-300'"
              class="px-4 py-2 text-xs font-bold rounded-lg border transition-all"
            >
              {{ ver }}
            </button>
          </div>
        </section>

        <div class="grid gap-4">
          <div v-for="(data, name) in manifest.remotes" :key="name" class="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div class="flex justify-between items-center mb-4">
              <span class="text-sm font-bold uppercase text-gray-700 tracking-tight">{{ name }}</span>
              <span v-if="overrides[name]?.startsWith('http')" class="text-[10px] font-bold px-2 py-0.5 rounded bg-warning-500 text-base-white">
                LOCAL DEV
              </span>
            </div>

            <div class="flex flex-wrap gap-2 mb-4">
              <button 
                @click="save(name, data.active, data.active)"
                :class="getActiveVersion(name, data.active) === data.active 
                  ? 'bg-brand-500 text-base-white' 
                  : 'bg-base-white text-gray-500 border-gray-200'"
                class="px-3 py-1.5 text-[11px] font-bold rounded-md border transition-all shadow-sm"
              >
                Default ({{ data.active }})
              </button>
              <button 
                v-for="(url, ver) in data.versions" :key="ver"
                v-show="ver !== data.active"
                @click="save(name, ver, data.active)"
                :class="overrides[name] === ver 
                  ? 'bg-brand-500 text-base-white border-brand-700' 
                  : 'bg-base-white text-gray-500 border-gray-200'"
                class="px-3 py-1.5 text-[11px] font-bold rounded-md border transition-all shadow-sm"
              >
                {{ ver }}
              </button>
            </div>

            <div class="flex gap-2">
              <div class="relative flex-1 group">
                <input 
                  v-model="localPorts[name]" 
                  type="number" 
                  placeholder="Local Port (e.g. 5174)"
                  class="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
                />
              </div>
              <button 
                @click="setLocalhost(name, localPorts[name])"
                class="px-4 py-2 text-[11px] font-black rounded-lg bg-information-500 text-base-white hover:bg-information-700 transition-colors shadow-md shadow-information-100"
              >
                USE LOCAL
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="p-6 bg-gray-50 border-t border-gray-100 flex gap-3">
        <button 
          @click="reset" 
          class="px-4 py-3 text-xs font-bold text-error-500 bg-base-white border border-error-100 rounded-xl hover:bg-error-100 transition-colors"
        >
          Clear Overrides
        </button>
        <button 
          @click="reload" 
          class="flex-1 px-4 py-3 text-xs font-bold text-base-white bg-brand-500 rounded-xl hover:bg-brand-700 shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
        >
          Apply Changes & Refresh
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--gray-200);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--gray-300);
}
</style>