<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1>Qrias</h1>
      <h2>Create account</h2>
      <p v-if="error" class="error">{{ error }}</p>
      <input v-model="name" type="text" placeholder="Full name" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password (min 8 chars)" />
      <button @click="submit" :disabled="loading">
        {{ loading ? 'Creating...' : 'Register' }}
      </button>
      <p>Have an account? <router-link to="/login">Sign in</router-link></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await auth.register(email.value, name.value, password.value)
    router.push('/')
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Registration failed'
  } finally { loading.value = false }
}
</script>