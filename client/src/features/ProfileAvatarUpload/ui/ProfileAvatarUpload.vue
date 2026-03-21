<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { Button, FileUpload } from 'primevue'
import { useUploadAvatar } from '@/entities/user'
import type { AvatarUploadState } from '@/widgets/ProfileCard'

interface Props {
  initialAvatar: string | null
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const emit = defineEmits<{
  change: [url: string | null]
  stateChange: [state: AvatarUploadState]
}>()

const { mutateAsync: uploadAvatar, isPending } = useUploadAvatar()

const previewUrl = ref<string | null>(props.initialAvatar)
const selectedFile = ref<File | null>(null)

function revokePreviewUrl() {
  if (previewUrl.value?.startsWith('blob:')) {
    URL.revokeObjectURL(previewUrl.value)
  }
}

function resetToInitial() {
  revokePreviewUrl()
  selectedFile.value = null
  previewUrl.value = props.initialAvatar

  emit('change', props.initialAvatar)
  emit('stateChange', 'idle')
}

function handleFileSelect(event: { files: File[] }) {
  const file = event.files?.[0]
  if (!file) return

  revokePreviewUrl()

  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)

  emit('change', previewUrl.value)
  emit('stateChange', 'selected')
}

async function uploadSelectedAvatar() {
  if (!selectedFile.value) return

  emit('stateChange', 'uploading')

  try {
    const uploadedUrl = await uploadAvatar(selectedFile.value)

    revokePreviewUrl()

    selectedFile.value = null
    previewUrl.value = uploadedUrl

    emit('change', uploadedUrl)
    emit('stateChange', 'uploaded')
  } catch (error) {
    console.error('Failed to upload avatar', error)
    emit('stateChange', 'selected')
  }
}

function cancelSelection() {
  resetToInitial()
}

watch(
  () => props.initialAvatar,
  (nextAvatar) => {
    if (selectedFile.value) return
    previewUrl.value = nextAvatar
  },
)

onBeforeUnmount(() => {
  revokePreviewUrl()
})
</script>

<template>
  <div class="avatar-upload">
    <FileUpload
      mode="basic"
      accept="image/*"
      chooseLabel="Choose avatar"
      customUpload
      auto
      :disabled="disabled || isPending"
      @select="handleFileSelect"
    />

    <Button
      v-if="!disabled && selectedFile"
      label="Save avatar"
      :loading="isPending"
      @click="uploadSelectedAvatar"
    />

    <Button
      v-if="!disabled && selectedFile"
      label="Cancel"
      severity="secondary"
      outlined
      :disabled="isPending"
      @click="cancelSelection"
    />
  </div>
</template>

<style scoped>
.avatar-upload {
  display: flex;
  gap: 8px;
}
</style>
