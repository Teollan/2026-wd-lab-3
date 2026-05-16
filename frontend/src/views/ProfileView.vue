<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { fetchMyPosts } from '@/api/posts'
import { fetchCommentsByAuthor } from '@/api/comments'
import ProfileAvatar from '@/components/user/ProfileAvatar.vue'
import ProfileInfoTable from '@/components/user/ProfileInfoTable.vue'
import ProfileActions from '@/components/user/ProfileActions.vue'
import { formatDate } from '@/utils/date'

const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.user)

const postsCount = ref(0)
const commentsCount = ref(0)

function formatGender(gender: string): string {
  switch (gender) {
    case 'male':
      return 'Male'
    case 'female':
      return 'Female'
    default:
      return 'Other'
  }
}

onMounted(async () => {
  if (!user.value) {
    return
  }

  const [posts, comments] = await Promise.all([
    fetchMyPosts(user.value.id),
    fetchCommentsByAuthor(user.value.id),
  ])

  postsCount.value = posts.length
  commentsCount.value = comments.length
})

const entries = computed(() => {
  if (!user.value) {
    return []
  }

  return [
    { label: 'Username', value: user.value.username },
    { label: 'Email', value: user.value.email },
    { label: 'Gender', value: formatGender(user.value.gender) },
    { label: 'Date of birth', value: formatDate(user.value.dateOfBirth) },
    { label: 'Bio', value: user.value.bio },
    { label: 'Posts', value: postsCount.value.toString() },
    { label: 'Comments', value: commentsCount.value.toString() },
  ]
})

function onLogOut() {
  authStore.logOut()
  router.push('/')
}
</script>

<template>
  <div v-if="user" class="mx-auto max-w-2xl">
    <h1 class="mb-8 text-3xl font-bold text-content-primary">Profile</h1>

    <div class="rounded-xl border border-stroke-primary bg-surface-secondary p-6">
      <ProfileAvatar :user="user" />

      <ProfileInfoTable :entries="entries" />

      <ProfileActions @log-out="onLogOut" />
    </div>
  </div>
</template>
