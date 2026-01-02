import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useDarkMode() {
  const isDark = ref(false)
  let observer: MutationObserver | null = null

  const update = () => {
    isDark.value = document.documentElement.classList.contains('my-app-dark')
  }

  onMounted(() => {
    update()

    observer = new MutationObserver(update)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return { isDark }
}
