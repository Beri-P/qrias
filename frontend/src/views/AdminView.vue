<template>
  <div class="page">
    <nav class="navbar">
      <router-link to="/" class="brand">← Qrias</router-link>
      <span>Admin — {{ auth.user?.name }}</span>
    </nav>
    <main class="admin">
      <h2>Create Content</h2>
      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>

      <div class="form">
        <input v-model="form.title" placeholder="Title" />
        <textarea v-model="form.description" placeholder="Description" rows="4" />
        <select v-model="form.type">
          <option value="article">Article</option>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
          <option value="live">Live</option>
        </select>
        <input v-model="form.mediaUrl" placeholder="Media URL (optional)" />
        <input v-model="form.thumbnailUrl" placeholder="Thumbnail URL (optional)" />
        <input v-model="form.category" placeholder="Category (optional)" />
        <div class="form-actions">
          <button @click="submit(false)" :disabled="loading">Save as Draft</button>
          <button @click="submit(true)" :disabled="loading" class="primary">Publish</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useContentStore } from '../stores/content'
import { useAuthStore } from '../stores/auth'

const store = useContentStore()
const auth = useAuthStore()
const loading = ref(false)
const message = ref('')
const error = ref('')

const form = reactive({
  title: '', description: '', type: 'article',
  mediaUrl: '', thumbnailUrl: '', category: ''
})

async function submit(publish: boolean) {
  error.value = ''
  message.value = ''
  loading.value = true
  try {
    const content = await store.create(form)
    if (publish) await store.publish(content.id)
    message.value = `Content ${publish ? 'published' : 'saved as draft'} successfully!`
    Object.assign(form, { title: '', description: '', type: 'article', mediaUrl: '', thumbnailUrl: '', category: '' })
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Failed to save content'
  } finally { loading.value = false }
}
</script>