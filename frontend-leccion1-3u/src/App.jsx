import { useState, useEffect } from 'react'
import DestinationList from './components/DestinationList'
import DestinationForm from './components/DestinationForm'
import { destinationService } from './services/destinationService'
import './App.css'

function App() {
  const [destinations, setDestinations] = useState([])
  const [editingDestination, setEditingDestination] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Cargar destinos al inicios
  useEffect(() => {
    loadDestinations()
  }, [])

  const loadDestinations = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await destinationService.getAll()
      setDestinations(data)
    } catch (err) {
      setError('Error al cargar destinos: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (destinationData) => {
    try {
      await destinationService.create(destinationData)
      await loadDestinations()
      setError('')
    } catch (err) {
      setError('Error al crear destino: ' + err.message)
      throw err
    }
  }

  const handleUpdate = async (id, destinationData) => {
    try {
      await destinationService.update(id, destinationData)
      await loadDestinations()
      setEditingDestination(null)
      setError('')
    } catch (err) {
      setError('Error al actualizar destino: ' + err.message)
      throw err
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este destino?')) {
      try {
        await destinationService.delete(id)
        await loadDestinations()
        setError('')
      } catch (err) {
        setError('Error al eliminar destino: ' + err.message)
      }
    }
  }

  const handleEdit = (destination) => {
    setEditingDestination(destination)
  }

  const handleCancelEdit = () => {
    setEditingDestination(null)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌍 Gestión de Destinos</h1>
        <p className="subtitle">Lección 3U - CACERES German</p>
      </header>

      <main className="app-main">
        {error && <div className="alert alert-error">{error}</div>}

        <div className="content-grid">
          <section className="form-section">
            <h2>{editingDestination ? 'Editar Destino' : 'Nuevo Destino'}</h2>
            <DestinationForm
              destination={editingDestination}
              onSubmit={editingDestination ? handleUpdate : handleCreate}
              onCancel={editingDestination ? handleCancelEdit : null}
            />
          </section>

          <section className="list-section">
            <h2>Lista de Destinos</h2>
            {loading ? (
              <p className="loading">Cargando...</p>
            ) : (
              <DestinationList
                destinations={destinations}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>Backend: 35.239.79.6:3004 | Frontend: 35.222.67.75:5173</p>
      </footer>
    </div>
  )
}

export default App
