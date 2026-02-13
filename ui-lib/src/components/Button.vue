<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  hierarchy?: 'primary'
  actionType?: 'productive'
  disabled?: boolean
  loading?: boolean
  block?: boolean,
}>(), {
  hierarchy: 'primary',
  actionType: 'productive',
  disabled: false,
  loading: false,
  block: false,
})

const computedClass = computed(() => {
  const classes = [
    'relative inline-flex items-center justify-center text-center no-underline rounded cursor-pointer transition-all duration-200 whitespace-nowrap select-none font-[inherit] outline-none',
    'h-[48px] min-w-[48px] min-h-[48px] max-h-[48px] px-4 py-[14px] gap-2',
    'text-base font-bold leading-normal text-base-white',
    'border-2',
    'bg-brand-500 border-transparent',
    'hover:enabled:bg-brand-300',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    'active:enabled:bg-brand-700',
    'disabled:bg-gray-200 disabled:text-gray-500 disabled:border-transparent'
  ]
  
  if (props.disabled) classes.push('!cursor-not-allowed')
  if (props.loading) classes.push('!cursor-wait')
  if (props.block) classes.push('!flex !w-full')
  
  return classes
})
</script>

<template>
  <button
    :class="computedClass"
    :disabled="disabled || loading"
    type="button"
  >
    <span class="flex items-center gap">
      <slot />
    </span>
  </button>
</template>
