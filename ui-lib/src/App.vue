<script setup>
import Button from './components/Button.vue'

const isStandalone = import.meta.env.DEV
</script>

<template>
  <div class="flex flex-col gap-4 items-center p-8">
    <header v-if="isStandalone">Dev Mode</header>

    <Button>UI Lib Button</Button>
    <Button block>UI Lib Button Block</Button>
    <Button disabled>UI Lib Button Disabled</Button>
    <Button loading>UI Lib Button Loading</Button>
  </div>
</template>
