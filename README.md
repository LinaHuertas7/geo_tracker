# Geo Tracker App

## Descripción del proyecto

GeoTracker es una aplicación móvil desarrollada con **React Native** y **Expo**, orientada al monitoreo y visualización de dispositivos GPS en tiempo real mediante la integración con el servidor **Traccar.org**

El proyecto se enfoca en la comunicación en tiempo real, la gestión del estado global y una experiencia de usuario consistente. La aplicación permite autenticación de usuarios, persistencia de sesión entre cierres de la app y una navegación estructurada entre vistas dedicadas al seguimiento de dispositivos

GeoTracker ofrece una vista de dispositivos con actualización en tiempo real a través de **WebSockets**, así como una visualización en mapa de la última posición conocida y de la ubicación en tiempo real de cada dispositivo mediante los eventos recibidos por WebSocket. Esta información se complementa con datos externos, como los datos del clima actual obtenidos desde la API de **OpenWeather**

## Instalación

### Requisitos previos

```bash
-   [Node.js](https://nodejs.org/) (versión 14 o superior)
-   [Expo CLI](https://docs.expo.dev/get-started/installation/)
-   [npm]
-   [Emulador de Android](https://developer.android.com/studio/run/emulator) o [Simulador de iOS](https://developer.apple.com/documentation/xcode/running_your_app_in_the_simulator_or_on_a_device) (opcional, para pruebas en dispositivos virtuales)
```

### Pasos de instalación

1. Clona este repositorio

    ```bash
    git clone https://github.com/LinaHuertas7/geo_tracker.git
    ```

2. Navega al directorio del proyecto

    ```bash
    cd geo_tracker
    ```

3. Instala las dependencias del proyecto

    ```bash
    npm install
    ```

4. Configura las variables de entorno

    Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:

    ```env
    OPEN_WEATHER_API_KEY=<TU_API_KEY_DE_OPENWEATHER>
    ```

5. Inicia el servidor de desarrollo de Expo

    ```bash
    npx expo start

    npm run android # para Android

    npm run ios # para iOS

    npm run web # para web
    ```

## Decisiones técnicas

### Manejo de estado global – Zustand

### Gestión de estado

Para la gestión del estado global opté por usar **Zustand**, ya que permite manejar el estado de forma simple y clara mediante stores personalizados, manteniendo la lógica desacoplada de los componentes. Esta decisión me permitió estructurar de manera ordenada información como la sesión del usuario, el listado de dispositivos y los datos que llegan en tiempo real desde el WebSocket, sin mezclar lógica de negocio con la UI. Consideré alternativas como Redux, pero para el alcance de este proyecto implicaba una configuración más compleja poco escalable. En el caso del Context API, lo descarté porque el estado cambia con frecuencia y depende de múltiples fuentes, lo que puede terminar afectando la legibilidad y el rendimiento

### Comunicación en tiempo real – WebSocket

Para la comunicación en tiempo real con el servidor de Traccar implementé un servicio de WebSocket, ya que el comportamiento principal de la aplicación depende de recibir actualizaciones constantes del estado y la ubicación de los dispositivos. En lugar de una implementación básica, estructuré la conexión siguiendo buenas prácticas, apoyándome de una guia estructurada que cuenta con una arquitectura limpia y escalable https://medium.com/@tusharkumar27864/best-practices-of-using-websockets-real-time-communication-in-react-native-projects-89e749ba2e3f con el objetivo de tener mayor control sobre el ciclo de vida de la conexión, manejo de reconexiones y suscripciones a eventos específicos

### UX / UI

Busqué que la navegación fuera intuitiva y amigable, especialmente en vistas como dispositivos y mapa, así mismo implementé soporte para modo claro y oscuro (dependiendo de la preferencia del dispositivo). La intención fue acompañar el flujo del usuario con una UI funcional y agradable

### Estructura de carpetas

Partí de la estructura base que propone **Expo** y decidí extenderla en lugar de modificarla por completo, con la intención de mantener una organización familiar y fácil de entender para cualquier desarrollador que quiera trabajar en el proyecto. Esto ayuda a reducir la curva de aprendizaje y a que la navegación del código sea más predecible.

Separé el proyecto en carpetas claras para componentes, servicios, estado, constantes y tipos, buscando que cada parte tenga una responsabilidad bien definida. Esta organización me permitió mantener la lógica de negocio, la comunicación con APIs y el estado global desacoplados de la UI, facilitando el mantenimiento y la escalabilidad del proyecto
