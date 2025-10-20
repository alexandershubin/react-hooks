import { useState } from 'react'

// Слайд 12: useId - генерация уникальных ID
function Slide12UseId() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: '🆔 Что такое useId?',
      description: 'Хук для генерации уникальных стабильных ID',
      content: `**useId** - это хук который генерирует уникальный стабильный ID для accessibility атрибутов.

**Зачем нужен:**
• Связать label с input через htmlFor
• Создать ARIA атрибуты (aria-labelledby, aria-describedby)
• Гарантировать одинаковый ID на сервере и клиенте (SSR)

**Как генерируется ID:**
• React генерирует автоматически на основе позиции в дереве
• Формат: ":r1:", ":r2:", ":r3:" и т.д.
• При SSR: ":R1:", ":R2:" (с заглавной R)
• Одинаковый при каждом рендере компонента

**Важно:**
useId НЕ принимает параметров - ID генерируется автоматически!`,
      code: `import { useId } from 'react'

function FormField({ label, type = 'text' }) {
  // React сгенерирует уникальный ID
  const id = useId()

  console.log(id) // ":r1:"

  return (
    <div>
      <label htmlFor={id}>
        {label}
      </label>
      <input id={id} type={type} />
    </div>
  )
}

function MyForm() {
  return (
    <form>
      <FormField label="Имя" />
      {/* id будет ":r1:" */}

      <FormField label="Email" type="email" />
      {/* id будет ":r2:" */}

      <FormField label="Пароль" type="password" />
      {/* id будет ":r3:" */}
    </form>
  )
}

// Результат в HTML:
// <label for=":r1:">Имя</label>
// <input id=":r1:" type="text" />
//
// <label for=":r2:">Email</label>
// <input id=":r2:" type="email" />
//
// <label for=":r3:">Пароль</label>
// <input id=":r3:" type="password" />`
    },
    {
      title: '🎯 Зачем нужен useId?',
      description: 'Проблема с ручной генерацией ID',
      content: `**Проблема БЕЗ useId:**

Раньше разработчики генерировали ID вручную:
• Счётчик: let counter = 0
• Math.random(): id-\${Math.random()}
• Date.now(): id-\${Date.now()}

**Что могло пойти не так:**

1. **SSR проблема** - ID на сервере и клиенте разные
2. **Коллизии** - два компонента могут получить одинаковый ID
3. **Условный рендеринг** - порядок может измениться

**useId решает все эти проблемы:**
✅ Одинаковый ID на сервере и клиенте
✅ Гарантированно уникальный
✅ Стабильный при ре-рендерах`,
      code: `// ❌ ПРОБЛЕМА: Ручная генерация
let counter = 0

function FormField({ label }) {
  const id = \`field-\${counter++}\`

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </div>
  )
}

// Server рендер:
// <FormField label="Name" /> → id = "field-0"
// <FormField label="Email" /> → id = "field-1"

// Client рендер (если порядок изменился):
// {showExtra && <FormField label="Extra" />} → id = "field-0"
// <FormField label="Name" /> → id = "field-1" ❌
// <FormField label="Email" /> → id = "field-2" ❌

// Hydration mismatch! ID не совпадают!

// ✅ РЕШЕНИЕ: useId
function FormField({ label }) {
  const id = useId() // React гарантирует совпадение

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </div>
  )
}

// Server: ":R1:", ":R2:"
// Client: ":R1:", ":R2:"
// Всегда совпадает! ✅`
    },
    {
      title: '♿ ARIA атрибуты',
      description: 'Использование для accessibility',
      content: `**useId идеально подходит для ARIA атрибутов:**

ARIA (Accessible Rich Internet Applications) помогает людям с ограниченными возможностями использовать веб-приложения.

**Основные ARIA атрибуты:**
• aria-labelledby - ID элемента который описывает текущий
• aria-describedby - ID элемента с дополнительным описанием
• aria-controls - ID элемента которым управляет текущий
• aria-expanded - показывает раскрыт ли элемент

**Пример: Комбобокс (select с автодополнением)**`,
      code: `function ComboBox({ label, options }) {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')

  // Генерируем уникальные ID для связи элементов
  const comboboxId = useId()
  const listboxId = useId()
  const labelId = useId()

  return (
    <div>
      {/* Label для скринридеров */}
      <label id={labelId}>{label}</label>

      {/* Input с ARIA атрибутами */}
      <input
        id={comboboxId}
        role="combobox"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        aria-expanded={isOpen}          // Раскрыт ли список
        aria-controls={listboxId}       // Управляет списком
        aria-labelledby={labelId}       // Описан label'ом
      />

      {/* Список опций */}
      {isOpen && (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={labelId}
        >
          {options
            .filter(opt => opt.includes(value))
            .map(option => (
              <li key={option} role="option">
                {option}
              </li>
            ))
          }
        </ul>
      )}
    </div>
  )
}

// Результат в HTML:
// <label id=":r1:">Выберите город</label>
// <input
//   id=":r2:"
//   aria-controls=":r3:"
//   aria-labelledby=":r1:"
//   aria-expanded="true"
// />
// <ul id=":r3:" aria-labelledby=":r1:">
//   <li>Москва</li>
//   <li>Санкт-Петербург</li>
// </ul>

// Скринридер теперь понимает связь между элементами! ✅`
    },
    {
      title: '📝 Форма с валидацией',
      description: 'Доступная форма с сообщениями об ошибках',
      content: `**Пример: Форма с aria-describedby для ошибок**

Когда у поля есть ошибка, скринридер должен озвучить её пользователю.

**Как это работает:**
1. Генерируем ID для поля
2. Генерируем ID для сообщения об ошибке
3. Связываем через aria-describedby
4. Добавляем aria-invalid для индикации ошибки`,
      code: `function AccessibleForm() {
  const nameId = useId()
  const emailId = useId()
  const errorId = useId()

  const [errors, setErrors] = useState({})

  const validate = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newErrors = {}

    if (!formData.get('name')) {
      newErrors.name = 'Имя обязательно'
    }
    if (!formData.get('email')) {
      newErrors.email = 'Email обязателен'
    }

    setErrors(newErrors)
  }

  return (
    <form onSubmit={validate}>
      {/* Поле имени */}
      <div>
        <label htmlFor={nameId}>Имя *</label>
        <input
          id={nameId}
          name="name"
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? \`\${errorId}-name\` : undefined}
        />
        {errors.name && (
          <div
            id={\`\${errorId}-name\`}
            role="alert"
            style={{ color: 'red' }}
          >
            ⚠️ {errors.name}
          </div>
        )}
      </div>

      {/* Поле email */}
      <div>
        <label htmlFor={emailId}>Email *</label>
        <input
          id={emailId}
          name="email"
          type="email"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? \`\${errorId}-email\` : undefined}
        />
        {errors.email && (
          <div
            id={\`\${errorId}-email\`}
            role="alert"
            style={{ color: 'red' }}
          >
            ⚠️ {errors.email}
          </div>
        )}
      </div>

      <button type="submit">Отправить</button>
    </form>
  )
}

// Когда есть ошибка:
// <input
//   id=":r1:"
//   aria-invalid="true"
//   aria-describedby=":r3:-name"
// />
// <div id=":r3:-name" role="alert">
//   ⚠️ Имя обязательно
// </div>

// Скринридер озвучит: "Имя, обязательное поле, ошибка: Имя обязательно" ✅`
    },
    {
      title: '🔢 Множественные ID',
      description: 'Генерация ID для списка элементов',
      content: `**Когда нужно несколько связанных ID:**

Генерируешь один базовый ID и добавляешь к нему суффиксы.

**Правило:**
• Один вызов useId() = один базовый ID
• Для вариаций добавляй суффиксы: \${baseId}-suffix

**Пример: Группа чекбоксов**`,
      code: `function CheckboxGroup({ title, items }) {
  const baseId = useId()
  const titleId = useId()

  return (
    <fieldset>
      <legend id={titleId}>{title}</legend>

      {items.map((item, index) => {
        // Добавляем суффикс к базовому ID
        const checkboxId = \`\${baseId}-\${index}\`

        return (
          <div key={index}>
            <input
              id={checkboxId}
              type="checkbox"
              name={item.value}
              aria-labelledby={titleId}
            />
            <label htmlFor={checkboxId}>
              {item.label}
            </label>
          </div>
        )
      })}
    </fieldset>
  )
}

// Использование:
<CheckboxGroup
  title="Выберите навыки"
  items={[
    { label: 'React', value: 'react' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'Node.js', value: 'node' }
  ]}
/>

// Результат:
// <legend id=":r1:">Выберите навыки</legend>
//
// <input id=":r2:-0" aria-labelledby=":r1:" />
// <label for=":r2:-0">React</label>
//
// <input id=":r2:-1" aria-labelledby=":r1:" />
// <label for=":r2:-1">TypeScript</label>
//
// <input id=":r2:-2" aria-labelledby=":r1:" />
// <label for=":r2:-2">Node.js</label>`
    },
    {
      title: '❌ Когда НЕ использовать useId',
      description: 'Типичные ошибки и антипаттерны',
      content: `**useId НЕ предназначен для:**

1. **Key в списках** ❌
   • key должен быть стабильным ID из данных
   • useId генерирует новый ID при каждом рендере списка

2. **CSS классы** ❌
   • Формат ID может измениться в будущих версиях React
   • Используй обычные строки для классов

3. **Уникальные ключи для данных** ❌
   • useId работает только при рендере
   • Не используй для сохранения в БД или localStorage

4. **Генерация случайных значений** ❌
   • useId не случайный - он детерминированный
   • Используй crypto.randomUUID() для случайных ID`,
      code: `// ❌ НЕПРАВИЛЬНО: key в списках
function TodoList({ todos }) {
  const id = useId()

  return todos.map(todo => (
    <div key={id}> {/* ❌ Все элементы получат одинаковый key! */}
      {todo.text}
    </div>
  ))
}

// ✅ ПРАВИЛЬНО: используй ID из данных
function TodoList({ todos }) {
  return todos.map(todo => (
    <div key={todo.id}> {/* ✅ Уникальный ID из данных */}
      {todo.text}
    </div>
  ))
}

// ❌ НЕПРАВИЛЬНО: CSS классы
function Component() {
  const id = useId()

  return (
    <div className={id}> {/* ❌ Формат ":r1:" - плохой класс */}
      <style>{\`
        .\${id} { /* ❌ Не работает с ":" в селекторе */}
          color: red;
        }
      \`}</style>
    </div>
  )
}

// ✅ ПРАВИЛЬНО: обычная строка
function Component() {
  return (
    <div className="my-component"> {/* ✅ */}
      <style>{\`
        .my-component {
          color: red;
        }
      \`}</style>
    </div>
  )
}

// ❌ НЕПРАВИЛЬНО: сохранение в БД
function createUser() {
  const id = useId() // ❌ useId только для рендера!

  fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ id }) // ❌
  })
}

// ✅ ПРАВИЛЬНО: генерация на сервере
function createUser() {
  fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      // ID генерирует сервер
    })
  })
}

// ❌ НЕПРАВИЛЬНО: случайные значения
function Component() {
  const randomId = useId() // ❌ Это НЕ случайное значение!

  return <div data-random={randomId} />
}

// ✅ ПРАВИЛЬНО: crypto API
function Component() {
  const [randomId] = useState(() => crypto.randomUUID())

  return <div data-random={randomId} />
}`
    },
    {
      title: '✅ Итоговые рекомендации',
      description: 'Когда и как использовать useId',
      content: `**Используй useId для:**

✅ **Accessibility (главное применение):**
   • htmlFor связь label + input
   • aria-labelledby, aria-describedby
   • aria-controls для интерактивных элементов
   • role атрибуты

✅ **Формы:**
   • Связь полей с label
   • Связь ошибок с полями
   • Связь подсказок с полями

✅ **Кастомные компоненты:**
   • Выпадающие списки (select, combobox)
   • Модальные окна
   • Табы и аккордеоны
   • Тултипы

**НЕ используй useId для:**

❌ key в списках
❌ CSS классов
❌ ID для сохранения в БД
❌ Случайных значений
❌ Генерации токенов

**Золотое правило:**
useId для связи элементов в DOM, больше ни для чего!`,
      code: `// ✅ Правильное использование - всё вместе
function AdvancedFormField({
  label,
  type = 'text',
  error,
  hint,
  required
}) {
  const fieldId = useId()
  const errorId = useId()
  const hintId = useId()

  // Собираем все ID для aria-describedby
  const describedBy = [
    hint ? hintId : null,
    error ? errorId : null
  ].filter(Boolean).join(' ')

  return (
    <div>
      {/* Label связан с input */}
      <label htmlFor={fieldId}>
        {label}
        {required && ' *'}
      </label>

      {/* Input со всеми ARIA атрибутами */}
      <input
        id={fieldId}
        type={type}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy || undefined}
      />

      {/* Подсказка */}
      {hint && (
        <div id={hintId} className="hint">
          💡 {hint}
        </div>
      )}

      {/* Ошибка */}
      {error && (
        <div id={errorId} role="alert" className="error">
          ⚠️ {error}
        </div>
      )}
    </div>
  )
}

// Использование:
<AdvancedFormField
  label="Email"
  type="email"
  required
  hint="Используйте рабочий email"
  error={emailError}
/>

// Результат - идеально доступная форма! ✅
// Скринридеры корректно озвучат все связи`
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
        🆔 useId - Генерация уникальных ID
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
              backgroundColor: activeStep === idx ? '#06b6d4' : '#f5f5f5',
              color: activeStep === idx ? 'white' : '#333',
              border: `2px solid ${activeStep === idx ? '#06b6d4' : '#ddd'}`,
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
        border: '3px solid #06b6d4',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
      }}>
        <h2 style={{
          color: '#06b6d4',
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
            <h3 style={{ color: '#06b6d4', fontSize: '1.4em' }}>
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
            <strong>useId для связи элементов в DOM (accessibility)</strong><br />
            НЕ используй для key, CSS классов или сохранения в БД!
          </p>
        </div>
      )}
    </div>
  )
}

export default Slide12UseId