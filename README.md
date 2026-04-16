# Patrones de Diseño - Demo Interactiva

Aplicación CLI en TypeScript que demuestra de forma interactiva y didáctica tres patrones de diseño:

1. **Template Method** - Define la estructura de un algoritmo y delega ciertos pasos a las subclases
2. **Decorator** - Agrega funcionalidades adicionales a un objeto dinámicamente
3. **Factory Method** - Define una interfaz para crear objetos, pero permite a las subclases decidir qué clase instanciar

## Requisitos

- Node.js v16 o superior
- npm o yarn

## Instalación

```bash
npm install
```

## Uso

### Modo desarrollo (con watch):
```bash
npm run dev
```

### Compilar y ejecutar:
```bash
npm run build
npm run run
```

### Ejecutar directamente con ts-node:
```bash
npx tsx src/main.ts
```

### Iniciar la aplicación:
```bash
npm start
```

## Interfaz

Al ejecutar la aplicación, verás un menú principal con 4 opciones:

1. Template Method
2. Decorator  
3. Factory Method
4. Salir

Selecciona una opción para ver la demostración interactiva del patrón elegido.

## Estructura del Proyecto

```
src/
├── main.ts                 # Punto de entrada y menú principal
├── utils/
│   ├── delay.ts            # Función para pausas asincrónicas
│   ├── logger.ts           # Funciones para impresión con colores y animaciones
│   └── index.ts            # Exportaciones de utilidades
├── patterns/
│   ├── templateMethod.ts   # Implementación de Template Method
│   ├── decorator.ts        # Implementación de Decorator
│   ├── factoryMethod.ts    # Implementación de Factory Method
│   └── index.ts            # Exportaciones de patrones
└── package.json            # Configuración del proyecto
```

## Patrones Implementados

### Template Method

El patrón Template Method define el esqueleto de un algoritmo en una clase base, permitiendo que las subclases implementen comportamientos específicos.

**Ejemplo en la demo:**
- Clase abstracta `Bebida` con método `preparar()`
- Subclases `Cafe` y `Te` implementan `agregarIngrediente()`
- El flujo de preparación es el mismo, pero los ingredientes varían

### Decorator

El patrón Decorator permite añadir responsabilidades a un objeto dinámicamente, envolviéndolo en objetos especializados.

**Ejemplo en la demo:**
- Interfaz `Cafe` con `CafeSimple`
- Decoradores `LecheDecorator`, `AzucarDecorator`, `VainillaDecorator`
- Combinación dinámica de decoradores

### Factory Method

El patrón Factory Method define una interfaz para crear objetos, pero permite a las subclases decidir qué clase instanciar.

**Ejemplo en la demo:**
- Clase abstracta `Logistica` con factory method `createTransporte()`
- Subclases `LogisticaTerrestre`, `LogisticaMaritima`, `LogisticaAreas`
- Creación de objetos concretos delegada a subclases

## Características

- ✅ Ejecutable desde consola
- ✅ Interfaz interactiva con menú
- ✅ Animaciones simples (printing lento, loading)
- ✅ Colores en consola con chalk
- ✅ Módulos separados por patrón
- ✅ Uso de async/await para manejo asíncrono
- ✅ Código limpio y modular para explicación educativa
- ✅ Soporte para ts-node y compilación con tsc

## Patrones de Diseño - Explicaciones

### Template Method

Permite definir la estructura de un algoritmo en una clase base, mientras dejamos a las subclases implementar pasos específicos. Es útil cuando tenemos algoritmos similares que difieren en algunos pasos.

### Decorator

Proporciona una forma flexible de extender las funcionalidades de objetos sin usar subclases. Los decoradores se apilan envolviendo el objeto original, añadiendo comportamiento adicional.

### Factory Method

Define una interfaz para crear objetos, pero permite a las subclases cambiar la clase que será instanciada. Esto promueve el principio de responsabilidad única y el principio de inversión de dependencias.

## Licencia

ISC
