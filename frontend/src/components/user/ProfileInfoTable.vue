<script setup lang="ts">
interface InfoEntry {
  label: string
  value: string
}

defineProps<{
  entries: InfoEntry[]
}>()
</script>

<template>
  <table class="w-full">
    <tbody class="divide-y divide-stroke-primary text-sm text-content-primary">
      <tr v-for="entry in entries" :key="entry.label" class="align-top">
        <td class="py-3 pr-4 font-medium whitespace-nowrap text-content-secondary">
          {{ entry.label }}
        </td>

        <td class="w-full py-3">
          {{ entry.value }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
