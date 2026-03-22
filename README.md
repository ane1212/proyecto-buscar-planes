# PLANES - FAV

**Planes-Fav** es una aplicación web orientada a ayudar a los usuarios a descubrir, explorar y guardar actividades y planes de ocio de forma sencilla e intuitiva. La plataforma permite acceder a un catálogo de propuestas adaptadas a distintos gustos y preferencias, facilitando la toma de decisiones sobre qué hacer en el tiempo libre.

El proyecto está dirigido a cualquier persona que quiera organizar su ocio sin complicaciones: desde quienes buscan actividades para el fin de semana hasta los que desean guardar ideas para una fecha concreta. La aplicación resuelve el problema de la dispersión de información sobre planes, centralizando todo en un único espacio accesible desde cualquier dispositivo.

Para mejorar la experiencia, la app incorpora integración con APIs externas que enriquecen la información mostrada: datos sobre los propios planes y condiciones meteorológicas en tiempo real, lo que permite al usuario tomar decisiones más informadas sobre cuándo y dónde realizar cada actividad.


---


## Estructura de la App

Está compuesto por tres vistas principales entre las que el usuario puede navegar de forma fluida:

- **index.html:** Página principal de la aplicación. Muestra el catálogo de planes disponibles en formato de tarjetas (cards). Desde aquí el usuario puede explorar las opciones, aplicar filtros y acceder al detalle de cada plan. Requiere estar autenticado para acceder a ciertas funcionalidades.
- **login.html:** Pantalla de acceso de usuarios. Permite a los usuarios identificarse para acceder a la plataforma de forma personalizada. Incluye el formulario de autenticación y gestiona el almacenamiento de la sesión en local storage.
- **details-card.html:** Vista de detalle de un plan concreto. Muestra toda la información ampliada de la actividad seleccionada desde el listado principal: descripción, imágenes, datos de interés y condiciones meteorológicas asociadas obtenidas a través de la API del tiempo.


---


## Caraterísticas Principales 

- **Filtro de eventos:** Algoritmo que clasifica eventos según las APIs de Agenda Cultural de Euskadi y del tiempo Open-Meteo.
Open-Meteo
- **Geolocalizaión automática:** Detección de la ubicación del usuario para mostrar planes cercanos con el pronóstico local.
- **Gestión de favoritos:** Sistema de persistencia para guardar planes ideales.
- **Diseño Responsive:** Experiencia fluida tanto en dispositivos móviles como en escritorio.


---


## Stack Tecnológico

- **Cliente:** HTML5, CSS3 y JavaScript (ES6+).
- **APIs externas:** API Agenda Cultural de Euskadi y API del tiempo Open-Meteo.
- **Gestor de tareas:** Jira.
- **Control de versiones:** Github.


---


## Estructura del Proyecto

PROYECTO-Planes-Fav/
├── assets/                  # Imágenes y recursos estáticos
├── diagrams/                # Diagramas de flujo y favoritos
├── src/                     # Código fuente
│   ├── api/
│   │   ├── apiPlanes.js     # Llamadas a la API de planes
│   │   └── apiTiempo.js     # Llamadas a la API meteorológica
│   ├── components/
│   │   ├── footer.js        # Componente de pie de página
│   │   └── nav.js           # Componente de navegación
│   ├── css/                 # Hojas de estilos (index, login, cards)
│   └── js/                  # Lógica de aplicación (index, login, storage)
├── index.html               # Página principal
├── login.html               # Acceso de usuarios
├── details-card.html        # Detalle de cada plan
├── favorites.html           # Página favoritos
├── about.html               # Sobre nosotros
└── README.md                # Documentación


---


## Enfoque Técnico

Breve resumen de cómo se ha planteado el desarrollo:

- **Diseño Mobile First.** La interfaz se ha diseñado priorizando la experiencia en dispositivos móviles, escalando progresivamente a pantallas más grandes.
- Uso de selectores básicos y combinados. Los estilos CSS hacen uso de selectores de clase, elemento y combinados para una mayor especificidad y mantenibilidad.
- Uso de diferentes valores de Display y Position. Se han aplicado propiedades como _*flexbox, grid, absolute, relative y sticky*_ para construir los distintos layouts de la aplicación.
- Componentes reutilizables. La navegación y el footer están implementados como módulos JavaScript independientes (_*nav.js, footer.js*_) para facilitar su reutilización entre vistas.
- Integración con APIs externas. Se consumen dos APIs mediante _*fetch*_: una para obtener los planes disponibles y otra para mostrar datos meteorológicos en tiempo real.
- Persistencia con localStorage. La gestión de sesión de usuario se realiza a través de _*localStorage*_, permitiendo mantener el estado de autenticación entre visitas.


---


## Cómo ejecutarlo
No requiere instalación de dependencias (npm). 
1. Clona el repositorio:
   `git clone https://github.com/ane1212/proyecto-planes-fav.git`
2. Abre el archivo `index.html` en tu navegador favorito.


---


## Autores

- Ane Jauregui.
- Saray Guillen.
- Frank Rocha.
- Darío Arenaza.


---