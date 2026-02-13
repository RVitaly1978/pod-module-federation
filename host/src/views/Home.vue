<script setup>
import { useRouter } from 'vue-router'

import { remoteUi } from '../utils/remote-loader'
const UiButton = remoteUi('UiButton')

const router = useRouter()

const onClick = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="absolute inset-0 flex flex-col items-center justify-center">
    <h2 class="text-5xl">Main System Dashboard</h2>
    <p class="mt-4 text-xl">Select a module from the navigation bar above to get started.</p>

    <UiButton class="mt-10" @click="onClick('/app-react')">Go to App-react</UiButton>
    <UiButton class="mt-10" @click="onClick('/app-vue2')">Go to App-vue2</UiButton>
    <UiButton class="mt-10" @click="onClick('/app-vue3')">Go to App-vue3</UiButton>
  </div>
</template>
