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


## Diagramas de Secuencia
### Secuencia de Inicialización
```mermaid
sequenceDiagram
    actor Usuario
    participant B as Navegador
    participant HTML as HTML Pages<br/>(index / login / details / favorites / about)
    participant NAV as nav.js<br/>Componente navegación
    participant FOOTER as footer.js<br/>Componente footer
    participant JS as js/<br/>Lógica de app
    participant STORAGE as storage.js<br/>Gestión localStorage
    participant API_P as apiPlanes.js<br/>API de planes
    participant API_T as apiTiempo.js<br/>API meteorológica
    participant LS as localStorage<br/>Navegador
    participant EXT_P as API Externa<br/>Planes
    participant EXT_T as API Externa<br/>Tiempo

    rect rgb(220, 230, 255)
        Note over Usuario,EXT_T: 1 — Inicialización general (cualquier página)
        Usuario->>B: Abre la app
        B->>HTML: Carga página HTML
        HTML->>NAV: Inyecta nav.js
        HTML->>FOOTER: Inyecta footer.js
        NAV-->>HTML: Renderiza barra de navegación
        FOOTER-->>HTML: Renderiza pie de página
        HTML->>JS: Ejecuta lógica de la página
        JS->>STORAGE: getItem("usuario") — ¿sesión activa?
        STORAGE->>LS: getItem("usuario")
        LS-->>STORAGE: Datos de sesión o null
        STORAGE-->>JS: Usuario logueado o no
    end

    rect rgb(255, 240, 220)
        Note over Usuario,LS: 2 — Flujo de login (login.html)
        Usuario->>HTML: Introduce credenciales y envía
        HTML->>JS: login.js recoge datos del formulario
        JS->>STORAGE: setItem("usuario", datos)
        STORAGE->>LS: Guarda sesión
        LS-->>STORAGE: Guardado ✓
        STORAGE-->>JS: Confirmación
        JS->>B: Redirige a index.html
    end

    rect rgb(230, 255, 235)
        Note over Usuario,EXT_T: 3 — Carga de planes (index.html)
        JS->>API_P: fetchPlanes()
        API_P->>EXT_P: GET /planes
        EXT_P-->>API_P: JSON con listado de planes
        API_P-->>JS: Array de planes
        JS->>API_T: fetchTiempo(ubicación)
        API_T->>EXT_T: GET /weather
        EXT_T-->>API_T: JSON con datos meteorológicos
        API_T-->>JS: Datos del tiempo
        JS->>STORAGE: getItem("favoritos")
        STORAGE->>LS: getItem("favoritos")
        LS-->>STORAGE: Array de IDs favoritos
        STORAGE-->>JS: IDs guardados
        JS-->>HTML: Renderiza tarjetas con datos + clima + ♥
        HTML-->>Usuario: Página de planes visible
    end

    rect rgb(255, 230, 240)
        Note over Usuario,LS: 4 — Guardar / quitar favorito
        Usuario->>HTML: Click en ♥ de una tarjeta
        HTML->>JS: index.js dispara evento
        JS->>STORAGE: toggleFavorito(id)
        STORAGE->>LS: getItem("favoritos")
        LS-->>STORAGE: Array actual
        Note over STORAGE: ¿ID existe?<br/>splice(id) o push(id)
        STORAGE->>LS: setItem("favoritos", JSON)
        LS-->>STORAGE: Guardado ✓
        STORAGE-->>JS: Array actualizado
        JS-->>HTML: Actualiza clase CSS del ♥
        HTML-->>Usuario: Feedback visual inmediato
    end

    rect rgb(245, 235, 255)
        Note over Usuario,EXT_T: 5 — Ver detalle de un plan (details-card.html)
        Usuario->>HTML: Click en tarjeta de plan
        B->>HTML: Carga details-card.html?id=X
        HTML->>NAV: Inyecta nav.js
        HTML->>FOOTER: Inyecta footer.js
        HTML->>JS: Ejecuta lógica de detalle
        JS->>API_P: fetchPlanById(id)
        API_P->>EXT_P: GET /planes/:id
        EXT_P-->>API_P: JSON del plan
        API_P-->>JS: Datos del plan
        JS->>API_T: fetchTiempo(ubicación del plan)
        API_T->>EXT_T: GET /weather
        EXT_T-->>API_T: Previsión meteorológica
        API_T-->>JS: Datos del tiempo
        JS->>STORAGE: getItem("favoritos")
        STORAGE->>LS: getItem("favoritos")
        LS-->>STORAGE: Array de IDs
        STORAGE-->>JS: ¿Este plan es favorito?
        JS-->>HTML: Renderiza detalle + clima + estado ♥
        HTML-->>Usuario: Vista de detalle completa
    end

    rect rgb(230, 250, 255)
        Note over Usuario,LS: 6 — Ver favoritos (favorites.html)
        Usuario->>B: Click en "Favoritos" en nav.js
        B->>HTML: Carga favorites.html
        HTML->>NAV: Inyecta nav.js
        HTML->>FOOTER: Inyecta footer.js
        HTML->>JS: Ejecuta lógica de favoritos
        JS->>STORAGE: getItem("favoritos")
        STORAGE->>LS: getItem("favoritos")
        LS-->>STORAGE: Array de IDs
        STORAGE-->>JS: Lista de IDs
        JS->>API_P: fetchPlanesByIds(ids)
        API_P->>EXT_P: GET /planes (filtrado)
        EXT_P-->>API_P: JSON de planes favoritos
        API_P-->>JS: Array de planes favoritos
        Note over JS: ¿Array vacío?<br/>Mensaje o tarjetas
        JS-->>HTML: Renderiza tarjetas favoritas con ♥ activo
        HTML-->>Usuario: Lista de favoritos visible
    end

    rect rgb(255, 248, 220)
        Note over Usuario,LS: 7 — Cerrar sesión
        Usuario->>NAV: Click en "Cerrar sesión"
        NAV->>JS: logout()
        JS->>STORAGE: removeItem("usuario")
        STORAGE->>LS: Elimina sesión
        LS-->>STORAGE: Eliminado ✓
        JS->>B: Redirige a login.html
        B-->>Usuario: Vuelve a pantalla de login
    end
    ``` 

### Secuencia de Favoritos
```mermaid
sequenceDiagram
    actor Usuario
    participant I as index.html
    participant DOM as DOM / JS
    participant LS as localStorage
    participant F as favorites.html

    rect rgb(240, 240, 255)
        Note over Usuario,DOM: A — Carga de la página de planes
        Usuario->>I: Abre index.html
        I->>LS: getItem("favoritos")
        LS-->>I: Array de IDs guardados (o vacío)
        I->>DOM: Marca ♥ ya guardados
    end

    rect rgb(255, 245, 230)
        Note over Usuario,LS: B — El usuario guarda un plan como favorito
        Usuario->>DOM: Click en ♥ (evento onclick)
        DOM->>LS: getItem("favoritos")
        LS-->>DOM: Array actual
        Note over DOM: ¿Ya es favorito?<br/>push(id) o splice(id)
        DOM->>LS: setItem("favoritos", JSON)
        LS-->>DOM: Guardado ✓
        DOM-->>I: ♥ cambia color (activo/inactivo)
    end

    rect rgb(255, 240, 240)
        Note over Usuario,F: C — El usuario visita favorites.html
        Usuario->>F: Navega a favorites.html
        F->>LS: getItem("favoritos")
        LS-->>F: Array de IDs guardados
        F->>DOM: Genera tarjetas con los planes guardados
        DOM-->>I: Renderiza lista de favoritos
        I-->>Usuario: Ve sus planes favoritos
    end
    ```