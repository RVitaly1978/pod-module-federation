<template>
  <div class="relative bg-success-100 text-base-white rounded-md border-5 border-success-500 flex-grow-1 p-2">
    <header class="flex justify-end">
      <div class="bg-success-500 text-base-white px-2 rounded-md">
        {{ isStandalone ? 'Dev mode' : 'App-vue2' }}
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
    isStandalone: import.meta.env.DEV,
  }),
}
</script>
