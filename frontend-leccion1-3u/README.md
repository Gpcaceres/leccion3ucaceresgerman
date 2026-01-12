# Frontend Lección 1-3U - Gestión de Destinos

## 📋 Descripción
Aplicación frontend para gestión de destinos turísticos. Implementa operaciones CRUD completas conectándose al backend de TravelBrain.

## 🎯 Reglas de Negocio Implementadas

### BR-DEST-001 a BR-DEST-008
- Nombre del destino obligatorio
- País obligatorio
- Coordenadas geográficas obligatorias (Lat: -90 a 90, Lng: -180 a 180)
- Descripción opcional
- URL de imagen opcional
- Validación de formularios en tiempo real

## 🚀 Configuración

### Backend
- **IP Backend**: 35.239.79.6:3004
- **Endpoints**: `/destinations`

### Frontend
- **IP Frontend**: 35.222.67.75:5173

## 🐳 Docker

### Levantar el proyecto
```bash
docker-compose up -d --build
```

### Ver logs
```bash
docker-compose logs -f
```

### Detener
```bash
docker-compose down
```

## 📦 Instalación Local

```bash
npm install
npm run dev
```

## 🌐 Acceso
- **Desarrollo**: http://localhost:5173
- **Producción**: http://35.222.67.75:5173

## 👨‍💻 Autor
**UCACERES German** - Lección 3U

## 📝 Estructura del Proyecto
```
frontend-leccion1-3u/
├── src/
│   ├── components/
│   │   ├── DestinationForm.jsx
│   │   └── DestinationList.jsx
│   ├── services/
│   │   ├── api.js
│   │   └── destinationService.js
│   ├── App.jsx
│   ├── main.jsx
│   └── config.js
├── docker-compose.yml
├── Dockerfile
└── package.json
```
