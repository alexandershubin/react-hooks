import { useState, useDeferredValue, useMemo } from 'react'

// Компонент со списком, который медленно рендерится
function SlowList({ text, isDeferredVersion }) {
  const items = useMemo(() => {
    const arr = []
    for (let i = 0; i < 5000; i++) {
      arr.push(`${text} - Элемент ${i + 1}`)
    }
    return arr
  }, [text])

  return (
    <div style={{
      backgroundColor: isDeferredVersion ? '#1f2937' : '#374151',
      padding: '15px',
      borderRadius: '8px',
      maxHeight: '400px',
      overflowY: 'auto',
      color: '#f3f4f6'
    }}>
      <h4 style={{ margin: '0 0 10px 0', color: isDeferredVersion ? '#fbbf24' : '#60a5fa' }}>
        {isDeferredVersion ? '⚡ С useDeferredValue' : '🐌 Без useDeferredValue'}
      </h4>
      <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '10px' }}>
        Рендерится {items.length} элементов
      </p>
      {items.slice(0, 50).map((item, index) => (
        <div
          key={index}
          style={{
            padding: '8px',
            margin: '4px 0',
            backgroundColor: isDeferredVersion ? '#374151' : '#4b5563',
            borderRadius: '4px',
            fontSize: '12px'
          }}
        >
          {item}
        </div>
      ))}
      <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '10px', textAlign: 'center' }}>
        ...показано 50 из {items.length} элементов
      </div>
    </div>
  )
}

function UseDeferredValueDemo() {
  const [input, setInput] = useState('')
  const [showComparison, setShowComparison] = useState(false)

  // Отложенное значение для оптимизации
  const deferredInput = useDeferredValue(input)

  // Проверяем, отложено ли значение
  const isStale = input !== deferredInput

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h2 style={{ color: '#f3f4f6', marginBottom: '10px' }}>
        useDeferredValue - Отложенное обновление UI
      </h2>

      <div style={{
        backgroundColor: '#1e40af',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>💡 Что делает useDeferredValue?</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Позволяет отложить обновление части UI</li>
          <li>Приоритизирует важные обновления (ввод текста)</li>
          <li>Тяжелые вычисления выполняются с задержкой</li>
          <li>Улучшает отзывчивость интерфейса</li>
        </ul>
      </div>

      <div style={{
        backgroundColor: '#374151',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ color: '#f3f4f6', marginTop: 0 }}>🎯 Интерактивная демонстрация</h3>

        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            color: '#f3f4f6',
            marginBottom: '8px',
            fontWeight: 'bold'
          }}>
            Введите текст для поиска:
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Начните вводить..."
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              borderRadius: '6px',
              border: '2px solid #60a5fa',
              backgroundColor: '#1f2937',
              color: '#f3f4f6',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
          {isStale && (
            <div style={{
              marginTop: '8px',
              padding: '8px',
              backgroundColor: '#fef3c7',
              color: '#92400e',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              ⏳ Обновление списка отложено... Ввод остается быстрым!
            </div>
          )}
        </div>

        <button
          onClick={() => setShowComparison(!showComparison)}
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
          {showComparison ? 'Скрыть сравнение' : 'Показать сравнение с/без useDeferredValue'}
        </button>

        {showComparison ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginTop: '20px'
          }}>
            <SlowList text={input} isDeferredVersion={false} />
            <SlowList text={deferredInput} isDeferredVersion={true} />
          </div>
        ) : (
          <SlowList text={deferredInput} isDeferredVersion={true} />
        )}
      </div>

      <div style={{
        backgroundColor: '#065f46',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>✅ Когда использовать useDeferredValue</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li><strong>Поиск в больших списках</strong> - отложить фильтрацию</li>
          <li><strong>Тяжелые вычисления</strong> - не блокировать UI</li>
          <li><strong>Отображение графиков/диаграмм</strong> - приоритет вводу</li>
          <li><strong>Рендеринг сложных компонентов</strong> - оптимизация отзывчивости</li>
        </ul>
      </div>

      <div style={{
        backgroundColor: '#1f2937',
        padding: '15px',
        borderRadius: '8px',
        color: '#f3f4f6'
      }}>
        <h3 style={{ marginTop: 0 }}>📝 Пример кода</h3>
        <pre style={{
          backgroundColor: '#111827',
          padding: '15px',
          borderRadius: '6px',
          overflow: 'auto',
          fontSize: '13px'
        }}>
{`import { useState, useDeferredValue } from 'react'

function SearchComponent() {
  const [input, setInput] = useState('')

  // Отложенное значение
  const deferredInput = useDeferredValue(input)

  // Проверка, отложено ли обновление
  const isStale = input !== deferredInput

  return (
    <>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Поиск..."
      />

      {isStale && <div>Обновление...</div>}

      {/* Тяжелый компонент использует
          отложенное значение */}
      <SlowList searchText={deferredInput} />
    </>
  )
}`}
        </pre>
      </div>

      <div style={{
        backgroundColor: '#7c2d12',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>⚠️ Важные моменты</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>useDeferredValue не делает рендеринг быстрее</li>
          <li>Он просто откладывает обновление с низким приоритетом</li>
          <li>Работает лучше всего с React.memo компонентами</li>
          <li>Не подходит для критических обновлений</li>
        </ul>
      </div>
    </div>
  )
}

export default UseDeferredValueDemo