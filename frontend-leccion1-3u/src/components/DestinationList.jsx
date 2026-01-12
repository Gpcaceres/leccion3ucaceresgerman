export default function DestinationList({ destinations, onEdit, onDelete }) {
  if (destinations.length === 0) {
    return <p className="empty-message">No hay destinos registrados. ¡Crea uno nuevo!</p>
  }

  return (
    <div className="destination-list">
      {destinations.map((destination) => (
        <div key={destination._id} className="destination-card">
          {destination.img && (
            <div className="destination-image">
              <img src={destination.img} alt={destination.name} />
            </div>
          )}
          <div className="destination-info">
            <h3>{destination.name}</h3>
            <p className="country">📍 {destination.country}</p>
            {destination.description && (
              <p className="description">{destination.description}</p>
            )}
            <div className="coordinates">
              <span className="coord">
                <strong>Lat:</strong> {typeof destination.lat === 'number' ? destination.lat.toFixed(4) : destination.lat || 'N/A'}°
              </span>
              <span className="coord">
                <strong>Lng:</strong> {typeof destination.lng === 'number' ? destination.lng.toFixed(4) : destination.lng || 'N/A'}°
              </span>
            </div>
          </div>
          <div className="destination-actions">
            <button
              className="btn btn-edit"
              onClick={() => onEdit(destination)}
              title="Editar"
            >
              ✏️ Editar
            </button>
            <button
              className="btn btn-delete"
              onClick={() => onDelete(destination._id)}
              title="Eliminar"
            >
              🗑️ Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
