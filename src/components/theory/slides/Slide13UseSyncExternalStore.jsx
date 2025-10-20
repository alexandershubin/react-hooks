import { useState } from 'react'

// Слайд 13: useSyncExternalStore - подписка на внешние источники
function Slide13UseSyncExternalStore() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: '🔌 Что такое useSyncExternalStore?',
      description: 'Хук для подписки на внешние источники данных',
      content: `**useSyncExternalStore** - это хук для подписки на внешние store (хранилища), которые находятся ВНЕ React.

**Зачем нужен:**
• Подписка на глобальные store (Redux, Zustand, MobX)
• Подписка на браузерные API (navigator.onLine, matchMedia)
• Подписка на WebSocket, EventSource
• Интеграция со сторонними библиотеками
• Безопасная работа с Concurrent Rendering

**Проблема которую решает:**
До React 18 подписка на внешние источники могла вызывать "tearing" (разрыв) - когда разные компоненты видят разные значения одного store в один момент времени.

**Сигнатура:**
const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)

• subscribe - функция подписки на изменения
• getSnapshot - функция получения текущего значения
• getServerSnapshot - функция для SSR (опционально)`,
      code: `import { useSyncExternalStore } from 'react'

// Внешний store (вне React)
let currentValue = 0
const listeners = new Set()

const externalStore = {
  // Подписка на изменения
  subscribe(listener) {
    listeners.add(listener)
    // Функция отписки
    return () => listeners.delete(listener)
  },

  // Получение текущего значения
  getSnapshot() {
    return currentValue
  },

  // Изменение значения (уведомляет подписчиков)
  setValue(newValue) {
    currentValue = newValue
    listeners.forEach(listener => listener())
  }
}

// Использование в компоненте
function Counter() {
  const value = useSyncExternalStore(
    externalStore.subscribe,      // Подписка
    externalStore.getSnapshot      // Получение значения
  )

  return (
    <div>
      <p>Значение: {value}</p>
      <button onClick={() => externalStore.setValue(value + 1)}>
        Увеличить
      </button>
    </div>
  )
}

// React автоматически:
// 1. Подписывается при монтировании
// 2. Обновляет компонент при изменениях
// 3. Отписывается при размонтировании`
    },
    {
      title: '⚠️ Проблема: Tearing',
      description: 'Что происходит без useSyncExternalStore',
      content: `**Tearing (разрыв)** - это когда разные компоненты видят разные значения одного store в процессе рендера.

**Как возникает tearing:**

В Concurrent Rendering React может прерывать рендер:
1. Компонент А начинает рендериться, читает store (значение = 1)
2. React прерывает рендер для срочного обновления
3. Store меняется (значение = 2)
4. React продолжает рендер
5. Компонент B рендерится, читает store (значение = 2)
6. Итог: Компонент А видит 1, компонент B видит 2 ❌

**useSyncExternalStore предотвращает tearing:**
React гарантирует что все компоненты увидят одинаковое значение в течение одного рендера.`,
      code: `// ❌ БЕЗ useSyncExternalStore - может быть tearing
let count = 0
const listeners = []

function useCountBad() {
  const [value, setValue] = useState(count)

  useEffect(() => {
    const listener = () => setValue(count)
    listeners.push(listener)
    return () => {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }, [])

  return value
}

// ПРОБЛЕМА: В Concurrent режиме:
function Parent() {
  const count = useCountBad() // Читает count = 1

  // React прерывает рендер здесь
  // count меняется на 2

  return (
    <div>
      <p>Parent: {count}</p>        {/* 1 */}
      <Child />
    </div>
  )
}

function Child() {
  const count = useCountBad() // Читает count = 2
  return <p>Child: {count}</p>       {/* 2 */}
}

// ❌ Parent видит 1, Child видит 2 - TEARING!

// ✅ С useSyncExternalStore - нет tearing
const store = {
  subscribe: (listener) => {
    listeners.push(listener)
    return () => listeners.splice(listeners.indexOf(listener), 1)
  },
  getSnapshot: () => count
}

function useCountGood() {
  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot
  )
}

// ✅ React гарантирует что Parent и Child видят одно значение!`
    },
    {
      title: '🌐 Пример: navigator.onLine',
      description: 'Отслеживание статуса сети',
      content: `**Практический пример: определение онлайн/офлайн статуса**

navigator.onLine - это браузерный API, который находится ВНЕ React.

**Что нужно:**
1. subscribe - подписка на события online/offline
2. getSnapshot - получение текущего статуса
3. getServerSnapshot - для SSR (всегда true на сервере)`,
      code: `import { useSyncExternalStore } from 'react'

// Функция подписки
function subscribe(callback) {
  // Подписываемся на события
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)

  // Функция отписки
  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}

// Функция получения текущего значения
function getSnapshot() {
  return navigator.onLine
}

// Функция для SSR (на сервере всегда считаем что онлайн)
function getServerSnapshot() {
  return true
}

// Кастомный хук
function useOnlineStatus() {
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )
}

// Использование в компонентах
function StatusIndicator() {
  const isOnline = useOnlineStatus()

  return (
    <div style={{
      padding: '10px',
      background: isOnline ? '#10b981' : '#ef4444',
      color: 'white'
    }}>
      {isOnline ? '🟢 Онлайн' : '🔴 Офлайн'}
    </div>
  )
}

function App() {
  const isOnline = useOnlineStatus()

  return (
    <div>
      <StatusIndicator />
      {!isOnline && (
        <div style={{ background: '#fef3c7', padding: '20px' }}>
          ⚠️ Нет подключения к интернету. Некоторые функции недоступны.
        </div>
      )}
    </div>
  )
}

// React автоматически:
// ✅ Подписывается на online/offline при монтировании
// ✅ Обновляет все компоненты при изменении статуса
// ✅ Отписывается при размонтировании
// ✅ Работает корректно с SSR`
    },
    {
      title: '📱 Пример: matchMedia (адаптивность)',
      description: 'Отслеживание медиа-запросов',
      content: `**Пример: реагирование на изменение размера экрана**

window.matchMedia - это браузерный API для отслеживания медиа-запросов.

**Применение:**
• Определение мобильного/десктопного устройства
• Темная/светлая тема (prefers-color-scheme)
• Orientation (портретная/альбомная ориентация)`,
      code: `import { useSyncExternalStore } from 'react'

// Универсальная функция для любого медиа-запроса
function useMediaQuery(query) {
  const subscribe = (callback) => {
    const mediaQuery = window.matchMedia(query)

    // Подписываемся на изменения
    mediaQuery.addEventListener('change', callback)

    return () => {
      mediaQuery.removeEventListener('change', callback)
    }
  }

  const getSnapshot = () => {
    return window.matchMedia(query).matches
  }

  const getServerSnapshot = () => {
    // На сервере нет window, возвращаем false
    return false
  }

  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )
}

// Кастомные хуки для разных случаев
function useIsMobile() {
  return useMediaQuery('(max-width: 768px)')
}

function useIsDarkMode() {
  return useMediaQuery('(prefers-color-scheme: dark)')
}

function useIsPortrait() {
  return useMediaQuery('(orientation: portrait)')
}

// Использование
function ResponsiveComponent() {
  const isMobile = useIsMobile()
  const isDarkMode = useIsDarkMode()
  const isPortrait = useIsPortrait()

  return (
    <div>
      <p>📱 Мобильное: {isMobile ? 'Да' : 'Нет'}</p>
      <p>🌙 Темная тема: {isDarkMode ? 'Да' : 'Нет'}</p>
      <p>📲 Портрет: {isPortrait ? 'Да' : 'Нет'}</p>

      {isMobile ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
    </div>
  )
}

// React автоматически обновит компонент
// при изменении размера экрана! ✅`
    },
    {
      title: '🏪 Пример: Интеграция с Redux',
      description: 'Подписка на Redux store',
      content: `**Пример: создание своего useSelector для Redux**

Redux - это внешний store, useSyncExternalStore идеально подходит для подписки.

**Что делаем:**
1. Подписываемся на изменения Redux store
2. Получаем нужную часть state через selector
3. Компонент обновляется при изменении этой части`,
      code: `import { useSyncExternalStore } from 'react'
import { createStore } from 'redux'

// Redux store (упрощённый пример)
const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    case 'DECREMENT':
      return { count: state.count - 1 }
    default:
      return state
  }
})

// Создаём свой useSelector
function useSelector(selector) {
  return useSyncExternalStore(
    // subscribe - подписка на Redux store
    (callback) => store.subscribe(callback),

    // getSnapshot - получение текущего значения
    () => selector(store.getState()),

    // getServerSnapshot - для SSR
    () => selector(store.getState())
  )
}

// Использование
function Counter() {
  // Подписываемся только на count
  const count = useSelector(state => state.count)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>
        +
      </button>
      <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>
        -
      </button>
    </div>
  )
}

// Оптимизация: подписка только на нужную часть
function UserProfile() {
  // Подписываемся только на user
  const user = useSelector(state => state.user)

  // Компонент НЕ обновится при изменении count ✅
  return <div>User: {user?.name}</div>
}

// React гарантирует:
// ✅ Нет tearing при Concurrent Rendering
// ✅ Все компоненты видят одну версию state
// ✅ Оптимальные обновления (только когда нужно)`
    },
    {
      title: '⚙️ Создание своего store',
      description: 'Полноценный пример с кастомным store',
      content: `**Создаём собственный глобальный store с useSyncExternalStore**

Это упрощённая версия Zustand/Redux.`,
      code: `import { useSyncExternalStore } from 'react'

// Фабрика для создания store
function createStore(initialState) {
  let state = initialState
  const listeners = new Set()

  return {
    // Подписка
    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },

    // Получение state
    getSnapshot() {
      return state
    },

    // Обновление state
    setState(newState) {
      state = typeof newState === 'function'
        ? newState(state)
        : newState

      // Уведомляем всех подписчиков
      listeners.forEach(listener => listener())
    },

    // Получение текущего state (без подписки)
    getState() {
      return state
    }
  }
}

// Создаём глобальный store
const userStore = createStore({
  name: 'John Doe',
  age: 25,
  theme: 'light'
})

// Хук для использования store
function useStore(store, selector = (state) => state) {
  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getSnapshot())
  )
}

// Использование в компонентах
function UserProfile() {
  // Подписываемся на весь store
  const user = useStore(userStore)

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Возраст: {user.age}</p>
      <p>Тема: {user.theme}</p>
      <button onClick={() => {
        userStore.setState(prev => ({
          ...prev,
          age: prev.age + 1
        }))
      }}>
        Увеличить возраст
      </button>
    </div>
  )
}

function ThemeToggle() {
  // Подписываемся только на theme (оптимизация)
  const theme = useStore(userStore, state => state.theme)

  return (
    <button onClick={() => {
      userStore.setState(prev => ({
        ...prev,
        theme: prev.theme === 'light' ? 'dark' : 'light'
      }))
    }}>
      Тема: {theme}
    </button>
  )
}

// ✅ Глобальный state без Context
// ✅ Оптимальные обновления
// ✅ Работает с Concurrent Rendering`
    },
    {
      title: '❌ Когда НЕ использовать',
      description: 'Случаи когда useSyncExternalStore не нужен',
      content: `**НЕ используй useSyncExternalStore для:**

1. **React state** ❌
   • Используй useState/useReducer

2. **Context** ❌
   • Используй useContext

3. **Props** ❌
   • Просто передавай через props

4. **Запросы к API** ❌
   • Используй React Query, SWR или Suspense

5. **Локальные данные** ❌
   • Используй useState

**Используй ТОЛЬКО для:**
✅ Внешних store (Redux, Zustand, MobX)
✅ Браузерных API (navigator, matchMedia, localStorage)
✅ WebSocket, EventSource
✅ Сторонних библиотек вне React
✅ Когда нужна подписка на изменения ВНЕ React`,
      code: `// ❌ НЕПРАВИЛЬНО: React state
function Bad() {
  const [count, setCount] = useState(0) // Используй это!

  // ❌ НЕ делай так:
  const value = useSyncExternalStore(
    (callback) => { /* подписка на useState?? */ },
    () => count
  )
}

// ❌ НЕПРАВИЛЬНО: Context
const MyContext = createContext()

function Bad() {
  const value = useContext(MyContext) // Используй это!

  // ❌ НЕ делай так:
  const contextValue = useSyncExternalStore(
    // Пытаешься подписаться на Context??
  )
}

// ❌ НЕПРАВИЛЬНО: API запросы
function Bad() {
  // ❌ НЕ делай так:
  const data = useSyncExternalStore(
    (callback) => {
      fetch('/api/users').then(callback)
    },
    () => cachedData
  )

  // ✅ Используй React Query:
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(r => r.json())
  })
}

// ✅ ПРАВИЛЬНО: Внешний store
const externalStore = {
  subscribe: (callback) => {
    window.addEventListener('custom-event', callback)
    return () => window.removeEventListener('custom-event', callback)
  },
  getSnapshot: () => window.customData
}

function Good() {
  const data = useSyncExternalStore(
    externalStore.subscribe,
    externalStore.getSnapshot
  )
}

// Золотое правило:
// useSyncExternalStore ТОЛЬКО для источников ВНЕ React!`
    }
  ]

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{
        fontSize: '3em',
        textAlign: 'center',
        color: '#61dafb',
        marginBottom: '40px'
      }}>
        🔌 useSyncExternalStore
      </h1>

      {/* Навигация по шагам */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '30px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {steps.map((step, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            style={{
              padding: '12px 20px',
              fontSize: '0.9em',
              backgroundColor: activeStep === idx ? '#ec4899' : '#f5f5f5',
              color: activeStep === idx ? 'white' : '#333',
              border: `2px solid ${activeStep === idx ? '#ec4899' : '#ddd'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: activeStep === idx ? 'bold' : 'normal',
              transition: 'all 0.3s ease',
              flex: '1 1 180px'
            }}
          >
            Шаг {idx + 1}
          </button>
        ))}
      </div>

      {/* Текущий шаг */}
      <div style={{
        background: 'white',
        border: '3px solid #ec4899',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
      }}>
        <h2 style={{
          color: '#ec4899',
          marginTop: 0,
          fontSize: '2em',
          marginBottom: '10px'
        }}>
          {steps[activeStep].title}
        </h2>

        <p style={{
          fontSize: '1.2em',
          color: '#666',
          fontStyle: 'italic',
          marginBottom: '20px'
        }}>
          {steps[activeStep].description}
        </p>

        <div style={{
          fontSize: '1.1em',
          lineHeight: '1.8',
          whiteSpace: 'pre-line',
          marginBottom: '20px'
        }}>
          {steps[activeStep].content}
        </div>

        {steps[activeStep].code && (
          <>
            <h3 style={{ color: '#ec4899', fontSize: '1.4em' }}>
              💻 Код:
            </h3>
            <pre style={{
              background: '#263238',
              color: '#aed581',
              padding: '20px',
              borderRadius: '10px',
              fontSize: '0.9em',
              overflow: 'auto',
              lineHeight: '1.6',
              margin: 0
            }}>
              {steps[activeStep].code}
            </pre>
          </>
        )}
      </div>

      {/* Прогресс */}
      <div style={{
        marginTop: '30px',
        textAlign: 'center',
        color: '#666',
        fontSize: '1.1em'
      }}>
        Шаг {activeStep + 1} из {steps.length}
      </div>

      {/* Итоговая подсказка */}
      {activeStep === steps.length - 1 && (
        <div style={{
          marginTop: '30px',
          background: '#fff9c4',
          border: '3px solid #fbc02d',
          borderRadius: '15px',
          padding: '25px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#f57f17', marginTop: 0, fontSize: '1.5em' }}>
            💡 Главное правило
          </h3>
          <p style={{ fontSize: '1.2em', lineHeight: '1.8', margin: 0 }}>
            <strong>useSyncExternalStore ТОЛЬКО для внешних источников!</strong><br />
            Браузерные API, Redux, WebSocket - да. React state, Context - нет!
          </p>
        </div>
      )}
    </div>
  )
}

export default Slide13UseSyncExternalStore