<template>
  <div class="flex-grow-1 flex flex-col">
    <component
      v-if="isError"
      :is="appConfig?.errorComponent"
      :appName="appConfig?.name"
    />

    <div v-else-if="isLoading" class="absolute inset-0 flex items-center justify-center">
      <slot name="loader">
        <div class="animate-pulse opacity-50">Loading...</div>
      </slot>
    </div>

    <div
      v-show="!isLoading && !isError"
      ref="appContainer"
      class="flex-grow-1 flex flex-col"
    />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mfeApps } from '../config/mfe.config'
import { useMfeRoutesStore } from '../stores/mfe-routes'

const props = defineProps({
  appName: String,
  pathMatch: [Array, String],
})

const mfeStore = useMfeRoutesStore()
const route = useRoute()
const router = useRouter()
const appContainer = ref(null)
const isLoading = ref(true)
const isError = ref(false)
const appConfig = ref(null)
const showLoader = ref(false)

let loaderTimeout = null
const clearLoaderTimer = () => {
  if (loaderTimeout) {
    clearTimeout(loaderTimeout)
    loaderTimeout = null
  }
}

let remoteInstance = null
let remoteInstanceUnmount = null

const getAppConfig = (name) => mfeApps.find((a) => a.name === name)

const handleRemoteNavigate = ({ pathname }) => {
  if (router.currentRoute.value.fullPath !== pathname) {
    router.push(pathname)
  }
}

const mountApp = async (name) => {
  clearLoaderTimer()

  if (remoteInstance) {
    await unmountApp()
  }

  appConfig.value = getAppConfig(name)
  if (!appConfig.value || !appContainer.value) return

  try {
    mfeStore.setAppStatus(name, 'loading')
    isLoading.value = true
    isError.value = false

    loaderTimeout = setTimeout(() => {
      if (isLoading.value) showLoader.value = true
    }, 300)

    const { mount, unmount } = await appConfig.value.loader()
    remoteInstanceUnmount = unmount

    remoteInstance = await mount({
      domElement: appContainer.value,
      initialPath: route.fullPath,
      onNavigate: handleRemoteNavigate,
    })

    clearLoaderTimer()
    isLoading.value = false
    showLoader.value = false
    mfeStore.setAppStatus(name, 'online')
  } catch (err) {
    clearLoaderTimer()
    isError.value = true
    isLoading.value = false
    showLoader.value = false
    mfeStore.setAppStatus(name, 'error')
    console.error(`[MFE] Error:`, err)
  }
}

const unmountApp = async () => {
  if (!isError.value && remoteInstance && appConfig.value) {
    try {
      await remoteInstanceUnmount()
      remoteInstance = null
      mfeStore.setAppStatus(appConfig.value.name, 'idle')
    } catch (err) {}
  }
}

watch(() => props.appName, (newName) => {
  mountApp(newName)
})

watch(() => route.path, (newPath) => {
  if (remoteInstance?.onHostNavigate && newPath.startsWith(`/${props.appName}`)) {
    remoteInstance.onHostNavigate({ pathname: newPath })
  }
})

onMounted(() => mountApp(props.appName))
onUnmounted(() => {
  clearLoaderTimer()
  unmountApp()
})
</script>
