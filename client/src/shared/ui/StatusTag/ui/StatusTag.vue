<script setup lang="ts">
import Skeleton from 'primevue/skeleton'
import Tag from 'primevue/tag'

type TagProps = InstanceType<typeof Tag>['$props']
type TagSeverity = TagProps['severity']

interface StatusTagProps {
  label: string
  value?: string | number
  severity?: TagSeverity
  loading?: boolean
  width: string
}

defineProps<StatusTagProps>()
</script>

<template>
  <Tag :severity="severity" rounded>
    <Skeleton v-if="loading" :width="width" height="3.5rem" />

    <span v-else> {{ label }}: {{ value }} </span>
  </Tag>
</template>
