/// <reference types="vite/client" />

declare module 'vue' {
  interface GlobalDirectives {
    vRipple: typeof import('primevue/ripple').default
  }
}

export {}
