import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), visualizer({ open: true }), vueDevTools(), svgLoader()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('primevue/datatable')) return 'pv-datatable'
          if (id.includes('primevue/datepicker')) return 'pv-datepicker'
          if (id.includes('primevue/paginator')) return 'pv-paginator'
          if (id.includes('primevue/confirmdialog')) return 'pv-confirmdialog'
          if (id.includes('primevue/cascadeselect')) return 'pv-cascadeselect'
          if (id.includes('primevue')) return 'pv-core'
        },
      },
    },
  },
})
