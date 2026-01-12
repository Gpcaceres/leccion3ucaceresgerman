import { useState, useEffect } from 'react'

export default function DestinationForm({ destination, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    description: '',
    lat: '',
    lng: '',
    img: ''
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (destination) {
      setFormData({
        name: destination.name || '',
        country: destination.country || '',
        description: destination.description || '',
        lat: destination.lat || '',
        lng: destination.lng || '',
        img: destination.img || ''
      })
    } else {
      resetForm()
    }
  }, [destination])

  const resetForm = () => {
    setFormData({
      name: '',
      country: '',
      description: '',
      lat: '',
      lng: '',
      img: ''
    })
    setErrors({})
  }

  const validateForm = () => {
    const newErrors = {}

    // BR-DEST-001: Nombre obligatorio
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del destino es obligatorio'
    }

    // BR-DEST-002: País obligatorio
    if (!formData.country.trim()) {
      newErrors.country = 'El país es obligatorio'
    }

    // BR-DEST-003: Coordenadas obligatorias y válidas
    const lat = parseFloat(formData.lat)
    const lng = parseFloat(formData.lng)

    if (!formData.lat) {
      newErrors.lat = 'La latitud es obligatoria'
    } else if (isNaN(lat) || lat < -90 || lat > 90) {
      newErrors.lat = 'La latitud debe estar entre -90 y 90 grados'
    }

    if (!formData.lng) {
      newErrors.lng = 'La longitud es obligatoria'
    } else if (isNaN(lng) || lng < -180 || lng > 180) {
      newErrors.lng = 'La longitud debe estar entre -180 y 180 grados'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setSubmitting(true)

    try {
      const dataToSubmit = {
        ...formData,
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng)
      }

      if (destination) {
        await onSubmit(destination._id, dataToSubmit)
      } else {
        await onSubmit(dataToSubmit)
        resetForm()
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="destination-form">
      <div className="form-group">
        <label htmlFor="name">Nombre del Destino *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
          disabled={submitting}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="country">País *</label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className={errors.country ? 'error' : ''}
          disabled={submitting}
        />
        {errors.country && <span className="error-text">{errors.country}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="lat">Latitud * (-90 a 90)</label>
          <input
            type="number"
            id="lat"
            name="lat"
            step="any"
            value={formData.lat}
            onChange={handleChange}
            className={errors.lat ? 'error' : ''}
            disabled={submitting}
            placeholder="Ej: 41.9028"
          />
          {errors.lat && <span className="error-text">{errors.lat}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="lng">Longitud * (-180 a 180)</label>
          <input
            type="number"
            id="lng"
            name="lng"
            step="any"
            value={formData.lng}
            onChange={handleChange}
            className={errors.lng ? 'error' : ''}
            disabled={submitting}
            placeholder="Ej: 12.4964"
          />
          {errors.lng && <span className="error-text">{errors.lng}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          disabled={submitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="img">URL de Imagen</label>
        <input
          type="url"
          id="img"
          name="img"
          value={formData.img}
          onChange={handleChange}
          disabled={submitting}
          placeholder="https://..."
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Guardando...' : destination ? 'Actualizar' : 'Crear Destino'}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={submitting}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
