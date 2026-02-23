<script setup lang="ts">
import cls from './SectionCard.module.scss'
import { Button, Toolbar, Card } from 'primevue'

interface Props {
  title: string
  buttonLabel?: string
  buttonIcon?: string
  onButtonClick?: () => void
}

defineProps<Props>()
</script>

<template>
  <Card :class="cls.section_card">
    <template #content>
      <Toolbar :class="cls.header">
        <template #start>
          <h2>{{ title }}</h2>
        </template>

        <template #end>
          <Button
            v-if="buttonLabel"
            :label="buttonLabel"
            :icon="buttonIcon"
            severity="contrast"
            @click="onButtonClick"
          />
          <slot name="toolbar-end" />
        </template>
      </Toolbar>

      <div :class="cls.content">
        <slot />
      </div>
    </template>
  </Card>
</template>
