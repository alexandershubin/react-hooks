import { useState, useEffect, useLayoutEffect, useInsertionEffect, useRef } from 'react'

// Утилита для логирования порядка выполнения
const executionLog = []

function UseInsertionEffectDemo() {
  const [count, setCount] = useState(0)
  const [showComparison, setShowComparison] = useState(false)
  const [dynamicStyles, setDynamicStyles] = useState(false)
  const logRef = useRef([])

  // Очистка лога при каждом рендере
  logRef.current = []

  // useInsertionEffect - выполняется первым
  useInsertionEffect(() => {
    logRef.current.push('1. useInsertionEffect')
    console.log('🔵 useInsertionEffect выполнен')

    if (dynamicStyles) {
      // Вставка стилей ДО того как браузер читает layout
      const styleId = 'dynamic-style'
      let styleTag = document.getElementById(styleId)

      if (!styleTag) {
        styleTag = document.createElement('style')
        styleTag.id = styleId
        document.head.appendChild(styleTag)
      }

      styleTag.textContent = `
        .dynamic-box {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
          border-radius: 12px;
          color: white;
          font-weight: bold;
          text-align: center;
          transition: transform 0.3s;
        }
        .dynamic-box:hover {
          transform: scale(1.05);
        }
      `
    }

    return () => {
      console.log('🔵 useInsertionEffect cleanup')
    }
  }, [dynamicStyles])

  // useLayoutEffect - выполняется вторым
  useLayoutEffect(() => {
    logRef.current.push('2. useLayoutEffect')
    console.log('🟢 useLayoutEffect выполнен')

    return () => {
      console.log('🟢 useLayoutEffect cleanup')
    }
  }, [count])

  // useEffect - выполняется последним
  useEffect(() => {
    logRef.current.push('3. useEffect')
    console.log('🟡 useEffect выполнен')

    return () => {
      console.log('🟡 useEffect cleanup')
    }
  }, [count])

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h2 style={{ color: '#f3f4f6', marginBottom: '10px' }}>
        useInsertionEffect - Вставка стилей перед layout
      </h2>

      <div style={{
        backgroundColor: '#1e40af',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>💡 Что делает useInsertionEffect?</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Выполняется <strong>ДО</strong> любых DOM изменений</li>
          <li>Предназначен для CSS-in-JS библиотек</li>
          <li>Позволяет вставить стили до чтения layout браузером</li>
          <li>Улучшает производительность динамических стилей</li>
        </ul>
      </div>

      <div style={{
        backgroundColor: '#7c2d12',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>⚠️ Важно!</h3>
        <p style={{ margin: 0 }}>
          useInsertionEffect предназначен <strong>только для авторов CSS-in-JS библиотек</strong>.
          В обычном коде приложения используйте useEffect или useLayoutEffect.
        </p>
      </div>

      <div style={{
        backgroundColor: '#374151',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ color: '#f3f4f6', marginTop: 0 }}>🎯 Демо: Порядок выполнения хуков</h3>

        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '15px'
          }}>
            <button
              onClick={() => setCount(count + 1)}
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Увеличить счетчик: {count}
            </button>
            <button
              onClick={() => setShowComparison(!showComparison)}
              style={{
                padding: '12px 24px',
                fontSize: '14px',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              {showComparison ? 'Скрыть' : 'Показать'} сравнение
            </button>
          </div>

          <div style={{
            padding: '15px',
            backgroundColor: '#1f2937',
            borderRadius: '8px',
            color: '#f3f4f6'
          }}>
            <h4 style={{ marginTop: 0, color: '#60a5fa' }}>📋 Порядок выполнения при рендере:</h4>
            {logRef.current.length > 0 ? (
              <ol style={{ margin: 0, paddingLeft: '20px' }}>
                {logRef.current.map((log, index) => (
                  <li key={index} style={{ marginBottom: '5px', fontSize: '14px' }}>
                    {log}
                  </li>
                ))}
              </ol>
            ) : (
              <p style={{ margin: 0, color: '#9ca3af' }}>
                Нажмите кнопку для обновления
              </p>
            )}
            <div style={{
              marginTop: '15px',
              padding: '10px',
              backgroundColor: '#065f46',
              borderRadius: '6px',
              fontSize: '13px'
            }}>
              ✅ Откройте консоль браузера для подробного лога
            </div>
          </div>
        </div>

        {showComparison && (
          <div style={{
            padding: '15px',
            backgroundColor: '#1f2937',
            borderRadius: '8px',
            marginTop: '15px'
          }}>
            <h4 style={{ color: '#60a5fa', marginTop: 0 }}>Временная шкала выполнения:</h4>
            <div style={{ fontSize: '14px', color: '#d1d5db', lineHeight: '2' }}>
              <div style={{ padding: '8px', backgroundColor: '#7c3aed', borderRadius: '4px', marginBottom: '8px' }}>
                🔵 <strong>useInsertionEffect</strong> - Вставка CSS
              </div>
              <div style={{ fontSize: '12px', color: '#9ca3af', marginLeft: '20px', marginBottom: '8px' }}>
                ↓ DOM мутации
              </div>
              <div style={{ padding: '8px', backgroundColor: '#059669', borderRadius: '4px', marginBottom: '8px' }}>
                🟢 <strong>useLayoutEffect</strong> - Чтение/запись layout
              </div>
              <div style={{ fontSize: '12px', color: '#9ca3af', marginLeft: '20px', marginBottom: '8px' }}>
                ↓ Браузер рисует экран
              </div>
              <div style={{ padding: '8px', backgroundColor: '#d97706', borderRadius: '4px' }}>
                🟡 <strong>useEffect</strong> - Побочные эффекты
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{
        backgroundColor: '#374151',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ color: '#f3f4f6', marginTop: 0 }}>🎯 Демо: Динамическая вставка стилей</h3>

        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#f3f4f6',
          marginBottom: '20px',
          cursor: 'pointer'
        }}>
          <input
            type="checkbox"
            checked={dynamicStyles}
            onChange={(e) => setDynamicStyles(e.target.checked)}
            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
          />
          <span style={{ fontSize: '16px' }}>
            Включить динамические стили (через useInsertionEffect)
          </span>
        </label>

        {dynamicStyles && (
          <div className="dynamic-box">
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>✨</div>
            <div>Эти стили были вставлены через useInsertionEffect!</div>
            <div style={{ fontSize: '14px', marginTop: '10px', opacity: 0.9 }}>
              Наведите курсор для эффекта
            </div>
          </div>
        )}

        {!dynamicStyles && (
          <div style={{
            padding: '20px',
            backgroundColor: '#1f2937',
            borderRadius: '8px',
            color: '#9ca3af',
            textAlign: 'center'
          }}>
            Включите опцию выше для демонстрации
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
        <h3 style={{ margin: '0 0 10px 0' }}>✅ Когда использовать useInsertionEffect</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li><strong>CSS-in-JS библиотеки</strong> - styled-components, emotion</li>
          <li><strong>Динамическая вставка стилей</strong> - критические CSS</li>
          <li><strong>Предотвращение layout thrashing</strong> - оптимизация производительности</li>
          <li><strong>Полифилы CSS</strong> - вставка перед чтением layout</li>
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
{`import { useInsertionEffect } from 'react'

// Пример CSS-in-JS библиотеки
function useCSS(rule) {
  useInsertionEffect(() => {
    // Создаем или находим style tag
    const styleTag = document.getElementById('dynamic-styles')
      || document.createElement('style')

    if (!styleTag.id) {
      styleTag.id = 'dynamic-styles'
      document.head.appendChild(styleTag)
    }

    // Вставляем CSS ДО того как браузер
    // прочитает layout
    styleTag.textContent += rule

    return () => {
      // Очистка при размонтировании
    }
  })
}

// Использование
function Button() {
  useCSS(\`
    .my-button {
      background: blue;
      padding: 10px;
      border-radius: 4px;
    }
  \`)

  return <button className="my-button">Click</button>
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
        <h3 style={{ margin: '0 0 10px 0' }}>⚠️ Ограничения useInsertionEffect</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Не может обновлять состояние</li>
          <li>Нет доступа к refs (они еще не установлены)</li>
          <li>Не может взаимодействовать с DOM</li>
          <li>Только для вставки стилей в {'<head>'}</li>
          <li>Не подходит для обычной логики приложения</li>
        </ul>
      </div>

      <div style={{
        backgroundColor: '#1e3a8a',
        color: 'white',
        padding: '15px',
        borderRadius: '8px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>📚 Сравнение с другими эффектами</h3>
        <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
          <div style={{ marginBottom: '10px' }}>
            <strong>useInsertionEffect:</strong> Вставка стилей (только для библиотек)
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>useLayoutEffect:</strong> Чтение/изменение DOM, измерения
          </div>
          <div>
            <strong>useEffect:</strong> Побочные эффекты, запросы, подписки
          </div>
        </div>
      </div>
    </div>
  )
}

export default UseInsertionEffectDemo