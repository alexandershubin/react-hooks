import { useId, useState } from 'react'

// Компонент формы с useId
function FormField({ label, type = 'text' }) {
  const id = useId()

  return (
    <div style={{ marginBottom: '15px' }}>
      <label
        htmlFor={id}
        style={{
          display: 'block',
          color: '#f3f4f6',
          marginBottom: '5px',
          fontWeight: '500'
        }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '14px',
          borderRadius: '6px',
          border: '2px solid #60a5fa',
          backgroundColor: '#1f2937',
          color: '#f3f4f6',
          outline: 'none'
        }}
      />
      <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px' }}>
        ID: {id}
      </div>
    </div>
  )
}

// Компонент с множественными полями
function MultiField({ label }) {
  const baseId = useId()
  const options = ['Вариант 1', 'Вариант 2', 'Вариант 3']

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{
        color: '#f3f4f6',
        marginBottom: '10px',
        fontWeight: '500'
      }}>
        {label}
      </div>
      {options.map((option, index) => {
        const optionId = `${baseId}-option-${index}`
        return (
          <div key={index} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
            <input
              type="radio"
              id={optionId}
              name={baseId}
              style={{ marginRight: '8px', cursor: 'pointer' }}
            />
            <label
              htmlFor={optionId}
              style={{ color: '#d1d5db', cursor: 'pointer', fontSize: '14px' }}
            >
              {option}
            </label>
            <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#6b7280' }}>
              {optionId}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// Компонент с aria-labelledby
function AccessibleSection() {
  const headingId = useId()
  const descriptionId = useId()

  return (
    <section
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
      style={{
        padding: '15px',
        backgroundColor: '#1f2937',
        borderRadius: '8px',
        border: '2px solid #3b82f6'
      }}
    >
      <h4 id={headingId} style={{ color: '#60a5fa', marginTop: 0 }}>
        Доступная секция
      </h4>
      <p id={descriptionId} style={{ color: '#d1d5db', fontSize: '14px' }}>
        Эта секция использует useId для создания уникальных идентификаторов
        для aria-атрибутов, улучшая доступность.
      </p>
      <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '10px' }}>
        <div>Heading ID: {headingId}</div>
        <div>Description ID: {descriptionId}</div>
      </div>
    </section>
  )
}

// Неправильный пример (для демонстрации)
function BadExample() {
  const [counter, setCounter] = useState(0)

  // ❌ НЕ ДЕЛАЙТЕ ТАК - создание ID в рендере
  const badId1 = `field-${Math.random()}`
  const badId2 = `field-${Date.now()}`
  const badId3 = `field-${counter}`

  return (
    <div style={{
      padding: '15px',
      backgroundColor: '#7f1d1d',
      borderRadius: '8px',
      color: 'white'
    }}>
      <h4 style={{ marginTop: 0 }}>❌ Неправильный подход</h4>
      <button
        onClick={() => setCounter(c => c + 1)}
        style={{
          padding: '8px 16px',
          backgroundColor: '#991b1b',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '10px'
        }}
      >
        Перерендерить ({counter})
      </button>
      <div style={{ fontSize: '12px' }}>
        <div style={{ marginBottom: '5px' }}>
          Random ID: {badId1} (меняется при каждом рендере)
        </div>
        <div style={{ marginBottom: '5px' }}>
          Timestamp ID: {badId2} (меняется при каждом рендере)
        </div>
        <div>
          Counter ID: {badId3} (стабилен, но конфликтует между компонентами)
        </div>
      </div>
    </div>
  )
}

function UseIdDemo() {
  const [showMultiple, setShowMultiple] = useState(false)

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h2 style={{ color: '#f3f4f6', marginBottom: '10px' }}>
        useId - Генерация уникальных ID
      </h2>

      <div style={{
        backgroundColor: '#1e40af',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>💡 Что делает useId?</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Генерирует уникальные ID, стабильные между рендерами</li>
          <li>Работает с Server-Side Rendering (SSR)</li>
          <li>Идентификаторы не конфликтуют между компонентами</li>
          <li>Отлично подходит для accessibility (aria-атрибуты)</li>
        </ul>
      </div>

      <div style={{
        backgroundColor: '#374151',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ color: '#f3f4f6', marginTop: 0 }}>🎯 Демо: Форма с label</h3>
        <p style={{ color: '#d1d5db', marginBottom: '20px' }}>
          Каждое поле получает уникальный ID для связи label и input:
        </p>

        <FormField label="Имя пользователя" />
        <FormField label="Email адрес" type="email" />
        <FormField label="Пароль" type="password" />

        <div style={{
          marginTop: '20px',
          padding: '12px',
          backgroundColor: '#065f46',
          color: 'white',
          borderRadius: '6px',
          fontSize: '14px'
        }}>
          ✅ Каждый ID уникален и стабилен между рендерами
        </div>
      </div>

      <div style={{
        backgroundColor: '#374151',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ color: '#f3f4f6', marginTop: 0 }}>🎯 Демо: Radio группа с общим базовым ID</h3>

        <MultiField label="Выберите вариант" />

        <div style={{
          marginTop: '15px',
          padding: '12px',
          backgroundColor: '#065f46',
          color: 'white',
          borderRadius: '6px',
          fontSize: '14px'
        }}>
          ✅ Все опции используют один базовый ID с суффиксами
        </div>
      </div>

      <div style={{
        backgroundColor: '#374151',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ color: '#f3f4f6', marginTop: 0 }}>🎯 Демо: ARIA атрибуты</h3>

        <AccessibleSection />

        <div style={{
          marginTop: '15px',
          padding: '12px',
          backgroundColor: '#065f46',
          color: 'white',
          borderRadius: '6px',
          fontSize: '14px'
        }}>
          ✅ useId идеален для aria-labelledby и aria-describedby
        </div>
      </div>

      <div style={{
        backgroundColor: '#374151',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ color: '#f3f4f6', marginTop: 0 }}>🎯 Демо: Множественные экземпляры</h3>

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
          {showMultiple ? 'Скрыть дубликаты' : 'Показать дубликаты компонентов'}
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: showMultiple ? 'repeat(2, 1fr)' : '1fr',
          gap: '20px'
        }}>
          <div style={{
            padding: '15px',
            backgroundColor: '#1f2937',
            borderRadius: '8px'
          }}>
            <h4 style={{ color: '#60a5fa', marginTop: 0 }}>Экземпляр 1</h4>
            <FormField label="Email" type="email" />
          </div>

          {showMultiple && (
            <div style={{
              padding: '15px',
              backgroundColor: '#1f2937',
              borderRadius: '8px'
            }}>
              <h4 style={{ color: '#60a5fa', marginTop: 0 }}>Экземпляр 2</h4>
              <FormField label="Email" type="email" />
            </div>
          )}
        </div>

        {showMultiple && (
          <div style={{
            marginTop: '15px',
            padding: '12px',
            backgroundColor: '#065f46',
            color: 'white',
            borderRadius: '6px',
            fontSize: '14px'
          }}>
            ✅ ID не конфликтуют даже при одинаковых компонентах
          </div>
        )}
      </div>

      <BadExample />

      <div style={{
        backgroundColor: '#065f46',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginTop: '20px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>✅ Когда использовать useId</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li><strong>Формы</strong> - связь label с input через htmlFor/id</li>
          <li><strong>Accessibility</strong> - aria-labelledby, aria-describedby</li>
          <li><strong>SSR приложения</strong> - стабильные ID между сервером и клиентом</li>
          <li><strong>Списки элементов</strong> - уникальные ID для каждого элемента</li>
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
{`import { useId } from 'react'

function FormField({ label }) {
  // Генерируем уникальный ID
  const id = useId()

  return (
    <div>
      <label htmlFor={id}>
        {label}
      </label>
      <input id={id} />
    </div>
  )
}

// Множественные связанные элементы
function RadioGroup() {
  const baseId = useId()

  return (
    <>
      <input
        type="radio"
        id={\`\${baseId}-option-1\`}
        name={baseId}
      />
      <label htmlFor={\`\${baseId}-option-1\`}>
        Вариант 1
      </label>

      <input
        type="radio"
        id={\`\${baseId}-option-2\`}
        name={baseId}
      />
      <label htmlFor={\`\${baseId}-option-2\`}>
        Вариант 2
      </label>
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
          <li>НЕ используйте для ключей в списках (используйте key prop)</li>
          <li>ID генерируется один раз при монтировании компонента</li>
          <li>Идеально для SSR - совпадает на сервере и клиенте</li>
          <li>Можно использовать префиксы/суффиксы для связанных элементов</li>
        </ul>
      </div>
    </div>
  )
}

export default UseIdDemo