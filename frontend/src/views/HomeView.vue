<template>
  <div class="page">
    <nav class="navbar">
      <span class="brand">Qrias</span>
      <div class="nav-links">
        <select v-model="filter" @change="load">
          <option value="">All</option>
          <option value="article">Articles</option>
          <option value="video">Videos</option>
          <option value="audio">Audio</option>
          <option value="live">Live</option>
        </select>
        <router-link v-if="auth.isLoggedIn" to="/admin">Admin</router-link>
        <button v-if="auth.isLoggedIn" @click="auth.logout()">Logout</button>
        <router-link v-else to="/login">Sign in</router-link>
      </div>
    </nav>

    <main class="feed">
      <p v-if="store.loading">Loading...</p>
      <p v-else-if="!store.items.length">No published content yet.</p>
      <div v-else class="grid">
        <router-link
          v-for="item in store.items"
          :key="item.id"
          :to="`/content/${item.id}`"
          class="card"
        >
          <img v-if="item.thumbnailUrl" :src="item.thumbnailUrl" alt="" />
          <div class="card-body">
            <span class="badge">{{ item.type }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </router-link>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useContentStore } from '../stores/content'
import { useAuthStore } from '../stores/auth'

const store = useContentStore()
const auth = useAuthStore()
const filter = ref('')

function load() { store.fetchAll(filter.value || undefined) }
onMounted(load)
</script>