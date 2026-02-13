import { defineConfig, presetWind3 } from 'unocss'

const colorScales = {
  brand: [300, 500, 700],
  error: [100, 300, 500, 700],
  warning: [100, 300, 500, 700],
  success: [100, 300, 500, 700],
  information: [100, 300, 500, 700],
  gray: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
}

const themeColors = Object.fromEntries(
  Object.entries(colorScales).map(([name, shades]) => [
    name,
    Object.fromEntries(shades.map(s => [s, `var(--${name}-${s})`]))
  ])
)

export const baseUnoConfig = defineConfig({
  presets: [
    presetWind3(),
  ],
  theme: {
    colors: {
      ...themeColors,
      base: {
        white: 'var(--base-white)',
        black: 'var(--base-black)',
      },
    },
    breakpoints: {
      sm: 'var(--breakpoints-sm)',
      md: 'var(--breakpoints-md)',
      lg: 'var(--breakpoints-ld)',
      xl: 'var(--breakpoints-xl)',
    }
  },
  shortcuts: {},
})
