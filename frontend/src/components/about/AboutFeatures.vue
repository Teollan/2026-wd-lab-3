<script setup lang="ts">
import FeatureCard from '@/components/about/FeatureCard.vue'
import IconEdit from '@/components/ui/icons/IconEdit.vue'
import IconComment from '@/components/ui/icons/IconComment.vue'
import IconUser from '@/components/ui/icons/IconUser.vue'
</script>

<template>
  <section>
    <h2 class="mb-8 text-center text-2xl font-bold text-content-primary">Features</h2>

    <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      <FeatureCard
        :icon="IconEdit"
        title="Write Posts"
        body="Create and publish blog posts with a clean, distraction-free editor."
      />

      <FeatureCard
        :icon="IconComment"
        title="Comments"
        body="Engage with your readers through a threaded comment system on every post."
      />

      <FeatureCard
        :icon="IconUser"
        title="User Profiles"
        body="Personalize your profile, manage your posts, and track your activity."
      />
    </div>
  </section>
</template>
