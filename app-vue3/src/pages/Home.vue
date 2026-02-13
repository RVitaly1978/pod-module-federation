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
  <div className="absolute inset-0 flex flex-col items-center justify-center">
    <img width="300" src="../assets/vue3.png" class="rounded-xl border-error-500 border-5" />

    <router-link to="/app-vue3/page1" class="mt-8 border-2 border-error-500 text-error-500 text-xl font-bold px-4 py-2 rounded-md">
      Link to Page 1
    </router-link>

    <UiButton class="mt-10" @click="onClick('/')">Go to Home</UiButton>
  </div>
</template>
