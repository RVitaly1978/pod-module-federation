<template>
  <div class="p-8 text-center border-2 border-dashed border-red-300 rounded-lg">
    <h3 class="text-xl font-bold text-red-600">The {{ props.appName }} app is temporarily unavailable</h3>
    <p class="mt-2 text-gray-600">Please check your connection or try refreshing the page</p>

    <UiButton 
      @click="reload" 
    >
      Reload
    </UiButton>
  </div>
</template>

<script setup>
import { remoteUi } from '../utils/remote-loader'

const UiButton = remoteUi('UiButton')

const props = defineProps({
  appName: String,
  pathMatch: [Array, String],
})

const reload = () => {
  window.location.reload()
}
</script>
