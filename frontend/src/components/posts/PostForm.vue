<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    mode?: 'create' | 'edit'
    initialTitle?: string
    initialContent?: string
  }>(),
  { mode: 'create', initialTitle: '', initialContent: '' },
)

const emit = defineEmits<{
  submit: [payload: { title: string; content: string }]
}>()

const title = ref(props.initialTitle)
const content = ref(props.initialContent)

const isEditing = computed(() => props.mode === 'edit')
const heading = computed(() => (isEditing.value ? 'Edit Post' : 'New Post'))
const subheading = computed(() =>
  isEditing.value ? 'Update your post' : 'Create a new post',
)
const buttonLabel = computed(() =>
  isEditing.value ? 'Save changes' : 'Publish post',
)

function onSubmit() {
  emit('submit', { title: title.value, content: content.value })
}
</script>

<template>
  <div class="mx-auto max-w-2xl">
    <h1 class="mb-8 text-3xl font-bold text-content-primary">
      {{ heading }}
    </h1>

    <section class="rounded-xl border border-stroke-primary bg-surface-secondary p-6">
      <h2 class="mb-4 text-lg font-semibold text-content-primary">
        {{ subheading }}
      </h2>

      <form class="space-y-4" @submit.prevent="onSubmit">
        <div>
          <label
            for="post-title"
            class="mb-1 block text-sm font-medium text-content-secondary"
          >
            Title
          </label>

          <input
            id="post-title"
            v-model="title"
            name="title"
            type="text"
            required
            placeholder="Your post title"
            class="w-full rounded-lg border border-stroke-secondary bg-surface-tertiary px-4 py-2.5 text-content-primary placeholder-content-tertiary focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
          />
        </div>

        <div>
          <label
            for="post-body"
            class="mb-1 block text-sm font-medium text-content-secondary"
          >
            Content
          </label>

          <textarea
            id="post-body"
            v-model="content"
            name="content"
            rows="4"
            required
            placeholder="Write your thoughts..."
            class="min-h-50 w-full resize-none rounded-lg border border-stroke-secondary bg-surface-tertiary px-4 py-2.5 text-content-primary placeholder-content-tertiary focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
          ></textarea>
        </div>

        <button
          type="submit"
          class="cursor-pointer rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-content-primary hover:bg-accent-hover focus:ring-2 focus:ring-accent/20 focus:outline-none"
        >
          {{ buttonLabel }}
        </button>
      </form>
    </section>
  </div>
</template>
