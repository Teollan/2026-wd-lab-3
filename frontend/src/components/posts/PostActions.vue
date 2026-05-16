<script setup lang="ts">
import IconEdit from '@/components/ui/icons/IconEdit.vue'
import IconDelete from '@/components/ui/icons/IconDelete.vue'

const emit = defineEmits<{
  edit: []
  delete: []
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    <button
      type="button"
      class="text-content-tertiary hover:text-accent-hover"
      @click="emit('edit')"
    >
      <IconEdit />
    </button>

    <button
      type="button"
      class="text-content-tertiary hover:text-destructive"
      @click="emit('delete')"
    >
      <IconDelete />
    </button>
  </div>
</template>
