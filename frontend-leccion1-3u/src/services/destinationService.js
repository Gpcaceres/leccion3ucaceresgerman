import api from './api'
import { API_CONFIG } from '../config'

export const destinationService = {
  // Obtener todos los destinos
  getAll: async () => {
    const response = await api.get(API_CONFIG.ENDPOINTS.DESTINATIONS)
    return response.data
  },

  // Obtener un destino por ID
  getById: async (id) => {
    const response = await api.get(API_CONFIG.ENDPOINTS.DESTINATION_BY_ID(id))
    return response.data
  },

  // Crear nuevo destino
  create: async (destinationData) => {
    const response = await api.post(API_CONFIG.ENDPOINTS.DESTINATIONS, destinationData)
    return response.data
  },

  // Actualizar destino
  update: async (id, destinationData) => {
    const response = await api.put(API_CONFIG.ENDPOINTS.DESTINATION_BY_ID(id), destinationData)
    return response.data
  },

  // Eliminar destino
  delete: async (id) => {
    const response = await api.delete(API_CONFIG.ENDPOINTS.DESTINATION_BY_ID(id))
    return response.data
  }
}
