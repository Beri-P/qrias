<template>
  <div class="page">
    <nav class="navbar">
      <router-link to="/" class="brand">← Qrias</router-link>
    </nav>
    <main class="content-detail" v-if="store.current">
      <span class="badge">{{ store.current.type }}</span>
      <h1>{{ store.current.title }}</h1>
      <p class="meta">By {{ store.current.author?.name }} · {{ new Date(store.current.createdAt).toLocaleDateString() }}</p>
      <img v-if="store.current.thumbnailUrl" :src="store.current.thumbnailUrl" class="hero-img" />
      <p class="body-text">{{ store.current.description }}</p>
      <video v-if="store.current.type === 'video' && store.current.mediaUrl"
        :src="store.current.mediaUrl" controls class="media-player" />
      <audio v-if="store.current.type === 'audio' && store.current.mediaUrl"
        :src="store.current.mediaUrl" controls />
    </main>
    <p v-else class="loading">Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useContentStore } from '../stores/content'

const store = useContentStore()
const route = useRoute()
onMounted(() => store.fetchOne(route.params.id as string))
</script>