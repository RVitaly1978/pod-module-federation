<script setup>
const isStandalone = import.meta.env.DEV
</script>

<template>
  <div class="relative bg-error-100 text-base-white rounded-md border-5 border-error-500 flex-grow-1 p-2">
    <header class="flex justify-end">
      <div class="bg-error-500 text-base-white px-2 rounded-md">
        {{ isStandalone ? 'Dev mode' : 'App-vue3' }}
      </div>
    </header>

    <router-view v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>
  </div>
</template>
