# PLANES - FAV

**Planes-Fav** es una aplicación sencilla que recomienda eventos culturales personalizados en Euskadi basados en las condiciones climáticas en tiempo real.


---


## Caraterísticas Pirncipales 

- **Filtro de eventos:** Algoritmo que clasifica eventos según las APIs de Kulturklik y Open-Meteo.
- **Geolocalizaión automática:** Detección de la ubicación del usuario para mostrar planes cercanos con el pronóstico local.
- **Gestión de favoritos:** Sistema de persistencia para guardar planes ideales.
- **Diseño Responsive:** Experiencia fluida tanto en dispositivos móviles como en escritorio.


---


## Stack Tecnológico

- **Cliente:** HTML, CSS y JS Vanilla.
- **APIs externas:** Kulturklik y Open-Meteo.
- **Gestor de tareas:** Jira.
- **Control de versiones:** GIT y Github.


---


## Cómo ejecutarlo
No requiere instalación de dependencias (npm). 
1. Clona el repositorio:
   `git clone https://github.com/ane1212/proyecto-buscar-planes.git`
2. Abre el archivo `index.html` en tu navegador favorito.


---


## Estructura del Proyecto

PROYECTO-BUSCAR-PLANES/
├── assets/             # Imágenes y recursos estáticos
├── src/                # Código fuente
│   ├── api/            # apiPlanes.js, apiTiempo.js
│   ├── components/     # footer.js, nav.js
│   ├── css/            # Estilos (index, login, cards)
│   └── js/             # Lógica (index, login, storage)
├── index.html          # Página principal
├── login.html          # Acceso de usuarios
├── details-card.html   # Detalle de cada plan
└── README.md           # Documentación
