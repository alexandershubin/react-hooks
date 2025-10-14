import { use, Suspense, useState } from 'react'

// Функция для создания промиса с задержкой
function fetchData(delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: 'Данные успешно загружены!',
        timestamp: new Date().toLocaleTimeString()
      })
    }, delay)
  })
}

// Компонент, использующий use() для промиса
function DataDisplay({ dataPromise }) {
  const data = use(dataPromise)

  return (
    <div style={{
      padding: '15px',
      backgroundColor: '#065f46',
      color: 'white',
      borderRadius: '8px',
      marginTop: '15px'
    }}>
      <h4 style={{ marginTop: 0 }}>✅ Данные загружены</h4>
      <p style={{ margin: '5px 0' }}>{data.message}</p>
      <p style={{ margin: '5px 0', fontSize: '14px', opacity: 0.9 }}>
        Время: {data.timestamp}
      </p>
    </div>
  )
}

// Компонент с Context
const ThemeContext = { _currentValue: 'dark' }

function ThemedComponent() {
  const theme = use(ThemeContext)

  return (
    <div style={{
      padding: '15px',
      backgroundColor: theme === 'dark' ? '#1f2937' : '#f3f4f6',
      color: theme === 'dark' ? '#f3f4f6' : '#1f2937',
      borderRadius: '8px',
      border: '2px solid #60a5fa'
    }}>
      <h4 style={{ marginTop: 0 }}>🎨 Текущая тема: {theme}</h4>
      <p style={{ margin: 0 }}>Хук use() может читать контекст так же, как useContext</p>
    </div>
  )
}

// Условное использование use()
function ConditionalData({ shouldLoad }) {
  const [showData, setShowData] = useState(false)

  return (
    <div style={{
      padding: '15px',
      backgroundColor: '#1f2937',
      borderRadius: '8px'
    }}>
      <h4 style={{ color: '#60a5fa', marginTop: 0 }}>🔀 Условное использование</h4>
      <p style={{ color: '#d1d5db', marginBottom: '15px' }}>
        В отличие от других хуков, use() можно вызывать условно!
      </p>

      <button
        onClick={() => setShowData(!showData)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          marginBottom: '15px'
        }}
      >
        {showData ? 'Скрыть данные' : 'Показать данные'}
      </button>

      {showData && shouldLoad && (
        <Suspense fallback={
          <div style={{
            padding: '15px',
            backgroundColor: '#fef3c7',
            color: '#92400e',
            borderRadius: '6px'
          }}>
            ⏳ Загрузка данных...
          </div>
        }>
          <DataDisplay dataPromise={fetchData(800)} />
        </Suspense>
      )}
    </div>
  )
}

function UseDemo() {
  const [promise1, setPromise1] = useState(null)
  const [promise2, setPromise2] = useState(null)

  const loadData1 = () => setPromise1(fetchData(1000))
  const loadData2 = () => setPromise2(fetchData(1500))

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h2 style={{ color: '#f3f4f6', marginBottom: '10px' }}>
        use - Универсальный хук для ресурсов
      </h2>

      <div style={{
        backgroundColor: '#1e40af',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>💡 Что делает use()?</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Читает значение ресурса: Promise или Context</li>
          <li>Можно вызывать условно и в циклах (в отличие от других хуков!)</li>
          <li>Интегрируется с Suspense для промисов</li>
          <li>Универсальный API для чтения ресурсов</li>
        </ul>
      </div>

      <div style={{
        backgroundColor: '#374151',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ color: '#f3f4f6', marginTop: 0 }}>🎯 Демо 1: use() с Promise</h3>
        <p style={{ color: '#d1d5db', marginBottom: '15px' }}>
          Хук use() автоматически приостанавливает рендеринг до разрешения промиса
        </p>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <button
            onClick={loadData1}
            disabled={promise1}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              backgroundColor: promise1 ? '#6b7280' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: promise1 ? 'not-allowed' : 'pointer'
            }}
          >
            Загрузить данные (1 сек)
          </button>

          <button
            onClick={loadData2}
            disabled={promise2}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              backgroundColor: promise2 ? '#6b7280' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: promise2 ? 'not-allowed' : 'pointer'
            }}
          >
            Загрузить данные (1.5 сек)
          </button>
        </div>

        {promise1 && (
          <Suspense fallback={
            <div style={{
              padding: '15px',
              backgroundColor: '#fef3c7',
              color: '#92400e',
              borderRadius: '6px',
              marginBottom: '10px'
            }}>
              ⏳ Загрузка первого набора данных...
            </div>
          }>
            <DataDisplay dataPromise={promise1} />
          </Suspense>
        )}

        {promise2 && (
          <Suspense fallback={
            <div style={{
              padding: '15px',
              backgroundColor: '#fef3c7',
              color: '#92400e',
              borderRadius: '6px',
              marginTop: '10px'
            }}>
              ⏳ Загрузка второго набора данных...
            </div>
          }>
            <DataDisplay dataPromise={promise2} />
          </Suspense>
        )}
      </div>

      <div style={{
        backgroundColor: '#374151',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ color: '#f3f4f6', marginTop: 0 }}>🎯 Демо 2: use() с Context</h3>
        <p style={{ color: '#d1d5db', marginBottom: '15px' }}>
          use() может читать контекст, как альтернатива useContext
        </p>

        <ThemedComponent />
      </div>

      <div style={{
        backgroundColor: '#374151',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ color: '#f3f4f6', marginTop: 0 }}>🎯 Демо 3: Условное использование</h3>

        <ConditionalData shouldLoad={true} />
      </div>

      <div style={{
        backgroundColor: '#065f46',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>✅ Когда использовать use()</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li><strong>Загрузка данных</strong> - асинхронные операции с Suspense</li>
          <li><strong>Условная логика</strong> - когда нужно вызвать хук условно</li>
          <li><strong>Чтение контекста</strong> - альтернатива useContext</li>
          <li><strong>Стриминг данных</strong> - Server Components и RSC</li>
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
{`import { use, Suspense } from 'react'

// use() с Promise
function DataComponent({ dataPromise }) {
  const data = use(dataPromise)
  return <div>{data.message}</div>
}

// use() с Context
function ThemedButton() {
  const theme = use(ThemeContext)
  return <button className={theme}>Click</button>
}

// Условное использование (уникально для use!)
function Component({ shouldLoad }) {
  let data = null

  if (shouldLoad) {
    data = use(fetchData()) // ✅ Можно вызвать условно!
  }

  return <div>{data || 'No data'}</div>
}

// Использование с Suspense
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DataComponent dataPromise={fetchData()} />
    </Suspense>
  )
}`}
        </pre>
      </div>

      <div style={{
        backgroundColor: '#7c2d12',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>⚠️ Важные моменты</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>use() - единственный хук, который можно вызывать условно</li>
          <li>Для Promise требуется обернуть компонент в Suspense</li>
          <li>Promise должен быть стабильным (не создавать в рендере)</li>
          <li>Работает только в React 19+</li>
        </ul>
      </div>

      <div style={{
        backgroundColor: '#1e3a8a',
        color: 'white',
        padding: '15px',
        borderRadius: '8px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>🆚 use() vs другие хуки</h3>
        <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
          <div style={{ marginBottom: '10px' }}>
            <strong>use():</strong> Универсальный, условный, для Promise и Context
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>useContext():</strong> Только для Context, правила хуков
          </div>
          <div>
            <strong>useEffect():</strong> Побочные эффекты после рендера
          </div>
        </div>
      </div>
    </div>
  )
}

export default UseDemo