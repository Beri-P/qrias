import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../api'

export const useContentStore = defineStore('content', () => {
  const items = ref<any[]>([])
  const current = ref<any>(null)
  const loading = ref(false)

  async function fetchAll(type?: string) {
    loading.value = true
    const { data } = await api.get('/content', { params: type ? { type } : {} })
    items.value = data
    loading.value = false
  }

  async function fetchOne(id: string) {
    const { data } = await api.get(`/content/${id}`)
    current.value = data
  }

  async function create(payload: any) {
    const { data } = await api.post('/content', payload)
    return data
  }

  async function publish(id: string) {
    const { data } = await api.post(`/content/${id}/publish`)
    return data
  }

  return { items, current, loading, fetchAll, fetchOne, create, publish }
})