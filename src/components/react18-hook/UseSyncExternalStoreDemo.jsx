import { useSyncExternalStore, useState, useEffect } from 'react'

// Внешнее хранилище 1: Размер окна
const windowSizeStore = {
  listeners: new Set(),

  getSnapshot() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  },

  subscribe(listener) {
    const handleResize = () => listener()
    window.addEventListener('resize', handleResize)
    this.listeners.add(handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      this.listeners.delete(handleResize)
    }
  },

  getServerSnapshot() {
    return { width: 1024, height: 768 }
  }
}

// Внешнее хранилище 2: Online/Offline статус
const onlineStore = {
  getSnapshot() {
    return navigator.onLine
  },

  subscribe(listener) {
    window.addEventListener('online', listener)
    window.addEventListener('offline', listener)

    return () => {
      window.removeEventListener('online', listener)
      window.removeEventListener('offline', listener)
    }
  },

  getServerSnapshot() {
    return true
  }
}

// Внешнее хранилище 3: Кастомное хранилище с событиями
class CounterStore {
  constructor() {
    this.count = 0
    this.listeners = new Set()
  }

  getSnapshot() {
    return this.count
  }

  subscribe(listener) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  increment() {
    this.count++
    this.emit()
  }

  decrement() {
    this.count--
    this.emit()
  }

  reset() {
    this.count = 0
    this.emit()
  }

  emit() {
    this.listeners.forEach(listener => listener())
  }
}

const counterStore = new CounterStore()

// Хранилище localStorage
const localStorageStore = {
  getSnapshot() {
    return localStorage.getItem('theme') || 'light'
  },

  subscribe(listener) {
    const handleStorage = (e) => {
      if (e.key === 'theme') {
        listener()
      }
    }
    window.addEventListener('storage', handleStorage)

    // Кастомное событие для изменений в той же вкладке
    const customHandler = () => listener()
    window.addEventListener('theme-changed', customHandler)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('theme-changed', customHandler)
    }
  },

  getServerSnapshot() {
    return 'light'
  },

  setTheme(theme) {
    localStorage.setItem('theme', theme)
    window.dispatchEvent(new Event('theme-changed'))
  }
}

// Компонент, отображающий размер окна
function WindowSize() {
  const size = useSyncExternalStore(
    windowSizeStore.subscribe.bind(windowSizeStore),
    windowSizeStore.getSnapshot.bind(windowSizeStore),
    windowSizeStore.getServerSnapshot
  )

  return (
    <div style={{
      padding: '15px',
      backgroundColor: '#1f2937',
      borderRadius: '8px',
      color: '#f3f4f6'
    }}>
      <h4 style={{ marginTop: 0, color: '#60a5fa' }}>📏 Размер окна</h4>
      <div style={{ fontSize: '14px' }}>
        <div>Ширина: <strong>{size.width}px</strong></div>
        <div>Высота: <strong>{size.height}px</strong></div>
      </div>
      <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>
        Измените размер окна браузера
      </div>
    </div>
  )
}

// Компонент статуса сети
function NetworkStatus() {
  const isOnline = useSyncExternalStore(
    onlineStore.subscribe.bind(onlineStore),
    onlineStore.getSnapshot.bind(onlineStore),
    onlineStore.getServerSnapshot
  )

  return (
    <div style={{
      padding: '15px',
      backgroundColor: isOnline ? '#065f46' : '#7f1d1d',
      borderRadius: '8px',
      color: 'white'
    }}>
      <h4 style={{ marginTop: 0 }}>
        {isOnline ? '✅ Онлайн' : '❌ Оффлайн'}
      </h4>
      <p style={{ margin: 0, fontSize: '14px' }}>
        {isOnline
          ? 'Интернет-соединение активно'
          : 'Интернет-соединение отсутствует'}
      </p>
      <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '8px' }}>
        Откройте DevTools и переключите в оффлайн режим
      </div>
    </div>
  )
}

// Компонент счетчика
function Counter() {
  const count = useSyncExternalStore(
    counterStore.subscribe.bind(counterStore),
    counterStore.getSnapshot.bind(counterStore)
  )

  return (
    <div style={{
      padding: '15px',
      backgroundColor: '#1f2937',
      borderRadius: '8px',
      color: '#f3f4f6'
    }}>
      <h4 style={{ marginTop: 0, color: '#60a5fa' }}>🔢 Глобальный счетчик</h4>
      <div style={{
        fontSize: '48px',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '20px 0',
        color: '#3b82f6'
      }}>
        {count}
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button
          onClick={() => counterStore.increment()}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          +
        </button>
        <button
          onClick={() => counterStore.decrement()}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          -
        </button>
        <button
          onClick={() => counterStore.reset()}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Сброс
        </button>
      </div>
    </div>
  )
}

// Компонент темы
function ThemeSelector() {
  const theme = useSyncExternalStore(
    localStorageStore.subscribe.bind(localStorageStore),
    localStorageStore.getSnapshot.bind(localStorageStore),
    localStorageStore.getServerSnapshot
  )

  return (
    <div style={{
      padding: '15px',
      backgroundColor: theme === 'dark' ? '#1f2937' : '#f3f4f6',
      color: theme === 'dark' ? '#f3f4f6' : '#1f2937',
      borderRadius: '8px',
      border: '2px solid #60a5fa'
    }}>
      <h4 style={{ marginTop: 0, color: theme === 'dark' ? '#60a5fa' : '#1e40af' }}>
        🎨 Тема (localStorage)
      </h4>
      <div style={{ marginBottom: '15px', fontSize: '14px' }}>
        Текущая тема: <strong>{theme}</strong>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => localStorageStore.setTheme('light')}
          style={{
            padding: '8px 16px',
            backgroundColor: theme === 'light' ? '#3b82f6' : '#e5e7eb',
            color: theme === 'light' ? 'white' : '#374151',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          ☀️ Светлая
        </button>
        <button
          onClick={() => localStorageStore.setTheme('dark')}
          style={{
            padding: '8px 16px',
            backgroundColor: theme === 'dark' ? '#3b82f6' : '#e5e7eb',
            color: theme === 'dark' ? 'white' : '#374151',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          🌙 Темная
        </button>
      </div>
      <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '10px' }}>
        Откройте эту страницу в другой вкладке - тема синхронизируется!
      </div>
    </div>
  )
}

function UseSyncExternalStoreDemo() {
  const [showMultiple, setShowMultiple] = useState(false)

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h2 style={{ color: '#f3f4f6', marginBottom: '10px' }}>
        useSyncExternalStore - Подписка на внешние источники
      </h2>

      <div style={{
        backgroundColor: '#1e40af',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>💡 Что делает useSyncExternalStore?</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Позволяет подписаться на внешние хранилища данных</li>
          <li>Гарантирует согласованность при конкурентных обновлениях</li>
          <li>Поддерживает SSR (Server-Side Rendering)</li>
          <li>Предназначен для библиотек управления состоянием</li>
        </ul>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
      }}>
        <WindowSize />
        <NetworkStatus />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
      }}>
        <Counter />
        <ThemeSelector />
      </div>

      <div style={{
        backgroundColor: '#374151',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ color: '#f3f4f6', marginTop: 0 }}>🎯 Демо: Множественные подписчики</h3>
        <p style={{ color: '#d1d5db', marginBottom: '15px' }}>
          Несколько компонентов могут подписаться на одно хранилище:
        </p>

        <button
          onClick={() => setShowMultiple(!showMultiple)}
          style={{
            padding: '10px 20px',
            fontSize: '14px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          {showMultiple ? 'Скрыть' : 'Показать'} дополнительные счетчики
        </button>

        {showMultiple && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            <Counter />
            <Counter />
            <Counter />
          </div>
        )}

        {showMultiple && (
          <div style={{
            marginTop: '15px',
            padding: '12px',
            backgroundColor: '#065f46',
            color: 'white',
            borderRadius: '6px',
            fontSize: '14px'
          }}>
            ✅ Все счетчики синхронизированы с одним хранилищем!
          </div>
        )}
      </div>

      <div style={{
        backgroundColor: '#065f46',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>✅ Когда использовать useSyncExternalStore</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li><strong>Browser APIs</strong> - navigator.onLine, window размеры, matchMedia</li>
          <li><strong>Библиотеки состояния</strong> - интеграция Redux, MobX, Zustand</li>
          <li><strong>localStorage/sessionStorage</strong> - синхронизация между вкладками</li>
          <li><strong>WebSocket/Server events</strong> - реальное время данные</li>
        </ul>
      </div>

      <div style={{
        backgroundColor: '#1f2937',
        padding: '15px',
        borderRadius: '8px',
        color: '#f3f4f6',
        marginBottom: '20px'
      }}>
        <h3 style={{ marginTop: 0 }}>📝 Пример кода</h3>
        <pre style={{
          backgroundColor: '#111827',
          padding: '15px',
          borderRadius: '6px',
          overflow: 'auto',
          fontSize: '13px'
        }}>
{`import { useSyncExternalStore } from 'react'

// Создаем внешнее хранилище
const store = {
  getSnapshot() {
    return navigator.onLine
  },

  subscribe(listener) {
    window.addEventListener('online', listener)
    window.addEventListener('offline', listener)

    return () => {
      window.removeEventListener('online', listener)
      window.removeEventListener('offline', listener)
    }
  },

  getServerSnapshot() {
    return true // Для SSR
  }
}

// Используем в компоненте
function NetworkStatus() {
  const isOnline = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  )

  return (
    <div>
      Статус: {isOnline ? 'Онлайн' : 'Оффлайн'}
    </div>
  )
}`}
        </pre>
      </div>

      <div style={{
        backgroundColor: '#7c2d12',
        color: 'white',
        padding: '15px',
        borderRadius: '8px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>⚠️ Важные моменты</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>getSnapshot должна возвращать неизменяемое значение</li>
          <li>subscribe должна вызвать listener при изменении</li>
          <li>getServerSnapshot нужна для SSR приложений</li>
          <li>Предпочтительнее использовать встроенные хуки React когда возможно</li>
        </ul>
      </div>
    </div>
  )
}

export default UseSyncExternalStoreDemo