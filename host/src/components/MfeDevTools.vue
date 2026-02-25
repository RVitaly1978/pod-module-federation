<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const MFE = window.MFE

const isOpen = ref(false)
const selected = reactive({})

const initSelected = () => {
  const overrides = MFE?.getOverrides()
  const manifest = MFE?.manifest

  if (!manifest) return

  selected['host'] = overrides['host'] || manifest.host.active
  
  Object.keys(manifest.remotes).forEach(name => {
    selected[name] = overrides[name] || manifest.remotes[name].active
  })
}

const handleOpen = () => {
  initSelected()
  isOpen.value = true
}

const applyOverrides = () => {
  localStorage.setItem(MFE?.STORAGE_KEY, JSON.stringify(selected))
  window.location.reload()
}

const reset = () => {
  MFE?.reset()
}

onMounted(() => {
  window.addEventListener('open-mfe-devtools', handleOpen)
})

onUnmounted(() => {
  window.removeEventListener('open-mfe-devtools', handleOpen)
})
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    <div class="bg-white dark:bg-gray-900 w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-90vh border border-gray-200 dark:border-gray-800">
      
      <header class="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <span class="i-carbon-settings text-blue-500" /> MFE Version Control
        </h2>
        <button @click="isOpen = false" class="i-carbon-close text-2xl text-gray-500 hover:text-red-500 transition-colors" />
      </header>

      <main class="p-6 overflow-y-auto space-y-8">

        <div v-for="(module, name) in { host: MFE?.manifest.host, ...MFE?.manifest.remotes }" :key="name" 
             class="border-b border-gray-100 dark:border-gray-800 pb-6 last:border-0">
          
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-lg font-bold text-blue-600 dark:text-blue-400 capitalize">
                {{ name === 'host' ? 'Main Application (Host)' : name }}
              </h3>
              <p class="text-xs text-gray-500 dark:text-gray-400 font-mono">
                Active in prod: <span class="text-green-600 dark:text-green-500 font-bold">{{ module.active }}</span>
              </p>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <label v-for="(_, ver) in module.versions" :key="ver" 
                   :class="[
                     'relative flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all',
                     selected[name] === ver 
                       ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                       : 'border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                   ]">
              <input type="radio" :name="name" :value="ver" v-model="selected[name]" class="hidden" />
              
              <div class="flex flex-col">
                <span :class="[
                  'text-sm font-semibold',
                  selected[name] === ver ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'
                ]">
                  {{ ver }}
                </span>
                <span v-if="ver === module.active" class="text-[10px] uppercase text-green-600 font-bold">Default</span>
              </div>

              <div v-if="selected[name] === ver" class="absolute top-2 right-2 i-carbon-checkmark-filled text-blue-500" />
            </label>
          </div>
        </div>

      </main>

      <footer class="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-3 bg-gray-50 dark:bg-gray-900/50">
        <button @click="reset" 
                class="px-4 py-2 rounded-lg font-bold text-sm border border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
          Reset to Defaults
        </button>
        <button @click="applyOverrides" 
                class="px-8 py-2 rounded-lg font-bold text-sm bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-transform active:scale-95">
          Apply Changes
        </button>
      </footer>

    </div>
  </div>
</template>