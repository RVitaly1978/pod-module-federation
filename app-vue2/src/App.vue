<template>
  <div class="relative bg-success-100 text-base-white rounded-md border-5 border-success-500 flex-grow-1 p-2">
    <header class="flex justify-end">
      <div class="bg-success-500 text-base-white px-2 rounded-md">
        <p>{{ isDev ? 'Dev mode' : 'App-vue2' }}</p>
        <p>{{ (isDev || !VERSION) ? 'local' : VERSION }}</p>
      </div>
    </header>

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    isDev: import.meta.env.DEV,
    VERSION: import.meta.env.VITE_APP_VERSION,
  }),
}
</script>
