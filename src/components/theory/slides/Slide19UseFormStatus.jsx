import { useState } from 'react'

function Slide19UseFormStatus() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: '📋 Что такое useFormStatus?',
      description: 'Получение статуса родительской формы',
      content: `**useFormStatus** - хук, который даёт доступ к статусу формы изнутри ДОЧЕРНЕГО компонента. Используется вместе с useActionState.

**Проблема:**
• У вас есть форма с useActionState
• Нужно показать loading в кнопке Submit
• Но кнопка - отдельный компонент
• Как передать isPending в кнопку?

**Решение:**
• useFormStatus читает контекст родительской формы
• Не нужно пробрасывать props
• Кнопка сама "знает" о статусе формы`,
      code: `// ❌ БЕЗ useFormStatus - пробрасываем props
function Form() {
  const [state, formAction, isPending] = useActionState(...)

  return (
    <form action={formAction}>
      <input name="email" />
      {/* Нужно пробрасывать isPending */}
      <SubmitButton isPending={isPending} />
    </form>
  )
}

function SubmitButton({ isPending }) {
  return (
    <button disabled={isPending}>
      {isPending ? 'Загрузка...' : 'Отправить'}
    </button>
  )
}

// ❌ Проблемы:
// - Props drilling
// - Кнопка не переиспользуемая
// - Нужно везде передавать isPending`
    },
    {
      title: '✨ Как работает useFormStatus?',
      description: 'Синтаксис и механика',
      content: `**Синтаксис:**
\`\`\`javascript
const { pending, data, method, action } = useFormStatus()
\`\`\`

**Возвращает:**
• \`pending\` - true во время отправки формы
• \`data\` - FormData, которая отправляется
• \`method\` - метод формы ('get' или 'post')
• \`action\` - функция action родительской формы

**⚠️ ВАЖНО:**
• Работает ТОЛЬКО внутри дочернего компонента формы
• НЕ работает в самой форме!
• Использует React Context под капотом`,
      code: `// ✅ С useFormStatus - магия!
function Form() {
  const [state, formAction] = useActionState(...)

  return (
    <form action={formAction}>
      <input name="email" />
      {/* Кнопка САМА узнаёт статус */}
      <SubmitButton />
    </form>
  )
}

// ✅ Дочерний компонент
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button disabled={pending}>
      {pending ? 'Загрузка...' : 'Отправить'}
    </button>
  )
}

// ✅ Преимущества:
// - Нет props drilling
// - Переиспользуемая кнопка
// - Работает с любой формой`
    },
    {
      title: '🎯 Пример: Универсальная Submit кнопка',
      description: 'Переиспользуемый компонент',
      content: `**Задача:**
Создать универсальную кнопку отправки, которая работает с любой формой.`,
      code: `// ✅ Универсальная кнопка
function SubmitButton({
  children,
  pendingText = 'Загрузка...',
  ...props
}) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        opacity: pending ? 0.6 : 1,
        cursor: pending ? 'not-allowed' : 'pointer'
      }}
      {...props}
    >
      {pending ? (
        <>
          <Spinner /> {pendingText}
        </>
      ) : (
        children
      )}
    </button>
  )
}

// ✅ Используем в разных формах
function LoginForm() {
  const [state, formAction] = useActionState(loginAction, {})

  return (
    <form action={formAction}>
      <input name="email" />
      <input name="password" />
      <SubmitButton pendingText="Вход...">
        Войти
      </SubmitButton>
    </form>
  )
}

function SignupForm() {
  const [state, formAction] = useActionState(signupAction, {})

  return (
    <form action={formAction}>
      <input name="email" />
      <input name="password" />
      <SubmitButton pendingText="Регистрация...">
        Зарегистрироваться
      </SubmitButton>
    </form>
  )
}

// 🎯 Одна кнопка - много форм!`
    },
    {
      title: '📊 Пример: Показ отправляемых данных',
      description: 'Использование data из useFormStatus',
      content: `**Задача:**
Показать пользователю, какие данные сейчас отправляются.`,
      code: `function FormDebugInfo() {
  const { pending, data, method } = useFormStatus()

  if (!pending) return null

  const entries = data ? Array.from(data.entries()) : []

  return (
    <div style={{
      background: '#f0f0f0',
      padding: '10px',
      borderRadius: '8px',
      marginTop: '10px'
    }}>
      <strong>🔄 Отправка данных ({method}):</strong>
      <ul>
        {entries.map(([key, value]) => (
          <li key={key}>
            <code>{key}</code>: {value.toString()}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ✅ Используем в форме
function Form() {
  const [state, formAction] = useActionState(
    async (prev, formData) => {
      await new Promise(r => setTimeout(r, 2000))
      return { success: true }
    },
    {}
  )

  return (
    <form action={formAction}>
      <input name="username" placeholder="Username" />
      <input name="email" placeholder="Email" />
      <input name="age" type="number" placeholder="Age" />

      <SubmitButton>Отправить</SubmitButton>

      {/* Показываем отправляемые данные */}
      <FormDebugInfo />
    </form>
  )
}

// 🎯 Отлично для дебага и пользовательского UX`
    },
    {
      title: '💪 Пример: Умная кнопка с прогрессом',
      description: 'Интеграция с data для продвинутого UI',
      content: `**Задача:**
Показывать разный текст в зависимости от того, какая форма отправляется.`,
      code: `function SmartSubmitButton() {
  const { pending, data, action } = useFormStatus()

  // Определяем тип действия по data
  const getActionType = () => {
    if (!data) return 'default'

    const actionType = data.get('_action')
    return actionType || 'default'
  }

  const actionType = getActionType()

  const texts = {
    default: {
      idle: 'Отправить',
      pending: 'Отправка...'
    },
    delete: {
      idle: 'Удалить',
      pending: 'Удаление...'
    },
    save: {
      idle: 'Сохранить',
      pending: 'Сохранение...'
    },
    publish: {
      idle: 'Опубликовать',
      pending: 'Публикация...'
    }
  }

  const text = texts[actionType] || texts.default

  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        background: pending
          ? '#ccc'
          : actionType === 'delete'
          ? '#dc3545'
          : '#007bff',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: pending ? 'not-allowed' : 'pointer'
      }}
    >
      {pending ? (
        <>
          <Spinner /> {text.pending}
        </>
      ) : (
        text.idle
      )}
    </button>
  }
}

// ✅ Используем
function PostEditor() {
  const [state, formAction] = useActionState(postAction, {})

  return (
    <form action={formAction}>
      <input name="title" />
      <textarea name="content" />

      {/* Скрытое поле для типа действия */}
      <input type="hidden" name="_action" value="save" />
      <SmartSubmitButton />
    </form>
  )
}`
    },
    {
      title: '🚀 Пример: Множественные кнопки',
      description: 'Разные действия в одной форме',
      content: `**Задача:**
Форма с несколькими кнопками (Сохранить, Опубликовать, Удалить).`,
      code: `function ActionButton({ action, children, variant = 'primary' }) {
  const { pending, data } = useFormStatus()

  const currentAction = data?.get('_action')
  const isThisButtonPending = pending && currentAction === action

  const colors = {
    primary: '#007bff',
    success: '#28a745',
    danger: '#dc3545'
  }

  return (
    <button
      type="submit"
      name="_action"
      value={action}
      disabled={pending}
      style={{
        background: isThisButtonPending ? '#ccc' : colors[variant],
        color: 'white',
        padding: '10px 20px',
        margin: '5px',
        border: 'none',
        borderRadius: '5px',
        opacity: pending && !isThisButtonPending ? 0.5 : 1
      }}
    >
      {isThisButtonPending ? <Spinner /> : null}
      {children}
    </button>
  )
}

// ✅ Форма с множественными действиями
function ArticleForm() {
  const [state, formAction] = useActionState(
    async (prev, formData) => {
      const action = formData.get('_action')
      const title = formData.get('title')
      const content = formData.get('content')

      switch (action) {
        case 'save':
          return await saveArticle({ title, content })
        case 'publish':
          return await publishArticle({ title, content })
        case 'delete':
          return await deleteArticle()
        default:
          return prev
      }
    },
    {}
  )

  return (
    <form action={formAction}>
      <input name="title" placeholder="Заголовок" />
      <textarea name="content" placeholder="Текст" />

      <div>
        <ActionButton action="save" variant="primary">
          💾 Сохранить черновик
        </ActionButton>

        <ActionButton action="publish" variant="success">
          🚀 Опубликовать
        </ActionButton>

        <ActionButton action="delete" variant="danger">
          🗑️ Удалить
        </ActionButton>
      </div>

      {state.message && <div>{state.message}</div>}
    </form>
  )
}

// 🎯 Каждая кнопка знает свой статус!`
    },
    {
      title: '⚠️ Когда НЕ работает useFormStatus',
      description: 'Важные ограничения',
      content: `**❌ НЕ работает когда:**

1️⃣ **Вызываете в самой форме**
   • useFormStatus работает только в ДОЧЕРНИХ компонентах
   • В родительской форме - используйте isPending

2️⃣ **Форма без action**
   • Если используете onSubmit - useFormStatus не работает
   • Нужен атрибут action="..."

3️⃣ **Нет useActionState**
   • useFormStatus работает только с form action
   • Обычный onSubmit не даст контекст

4️⃣ **Вложенные формы**
   • HTML не поддерживает вложенные формы
   • useFormStatus берёт БЛИЖАЙШУЮ форму`,
      code: `// ❌ НЕ работает: вызов в самой форме
function Form() {
  const { pending } = useFormStatus() // ❌ ОШИБКА!
  // pending будет всегда false

  return <form>...</form>
}

// ✅ Работает: вызов в дочернем компоненте
function Form() {
  return (
    <form action={...}>
      <SubmitButton /> {/* ✅ Здесь работает */}
    </form>
  )
}

// ❌ НЕ работает: onSubmit вместо action
function Form() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // ...
  }

  return (
    <form onSubmit={handleSubmit}>
      <SubmitButton /> {/* ❌ pending всегда false */}
    </form>
  )
}

// ✅ Работает: form action
function Form() {
  const [state, formAction] = useActionState(...)

  return (
    <form action={formAction}>
      <SubmitButton /> {/* ✅ Работает */}
    </form>
  )
}`
    },
    {
      title: '🎯 Когда использовать useFormStatus',
      description: 'Идеальные сценарии',
      content: `**✅ Используйте когда:**

1️⃣ **Переиспользуемые UI компоненты**
   • Универсальные кнопки Submit
   • Индикаторы прогресса
   • Сообщения "Сохранение..."

2️⃣ **Сложная структура формы**
   • Кнопка Submit глубоко в дереве
   • Не хотите пробрасывать props
   • Много вложенных компонентов

3️⃣ **Формы с useActionState**
   • Идеальная пара
   • Server Actions в Next.js
   • Progressive enhancement

4️⃣ **Дебаг и логирование**
   • Показ отправляемых данных
   • Мониторинг действий формы`,
      code: `// ✅ Идеальный кейс: UI Kit
// components/SubmitButton.jsx
export function SubmitButton({ children, ...props }) {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending} {...props}>
      {pending ? <Spinner /> : null}
      {children}
    </button>
  )
}

// components/FormStatus.jsx
export function FormStatus() {
  const { pending } = useFormStatus()

  if (!pending) return null

  return (
    <div style={{ color: '#007bff' }}>
      ⏳ Отправка данных...
    </div>
  )
}

// ✅ Используем везде
function AnyForm() {
  const [state, formAction] = useActionState(...)

  return (
    <form action={formAction}>
      {/* Любая структура */}
      <div>
        <div>
          <div>
            <SubmitButton>Отправить</SubmitButton>
            <FormStatus />
          </div>
        </div>
      </div>
    </form>
  )
}

// 🎯 Компоненты переиспользуемые
// 🎯 Нет props drilling
// 🎯 Работает с любой формой`
    },
    {
      title: '📊 Итоги: useFormStatus',
      description: 'Главное о хуке',
      content: `**Что такое useFormStatus?**
Хук для получения статуса родительской формы из дочернего компонента. Работает через React Context.

**Плюсы:**
✅ Нет props drilling - компонент сам "знает" статус
✅ Переиспользуемые UI компоненты (кнопки, индикаторы)
✅ Идеальная пара с useActionState
✅ Работает с Server Actions в Next.js
✅ Доступ к data, method, action

**Минусы:**
❌ Работает ТОЛЬКО в дочерних компонентах формы
❌ Не работает с onSubmit (только с action)
❌ Нужен useActionState для полноценной работы
❌ Не работает в vanilla React (нужен Next.js)

**Рекомендации:**
🎯 Создавайте переиспользуемые UI компоненты
🎯 Используйте с useActionState + Server Actions
🎯 Не вызывайте в родительской форме
🎯 Для сложных форм - отличный выбор`,
      code: `// 🎯 Идеальный паттерн: UI Kit
// lib/form-components.jsx
export function SubmitButton({ children, variant = 'primary' }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={\`btn btn-\${variant}\`}
    >
      {pending && <Spinner />}
      {children}
    </button>
  )
}

export function FormDebugger() {
  const { pending, data, method } = useFormStatus()

  if (process.env.NODE_ENV === 'production') return null

  return (
    <div className="debug">
      Status: {pending ? 'Pending' : 'Idle'}
      Method: {method}
      Data: {data ? Array.from(data.entries()).length : 0} fields
    </div>
  )
}

// ✅ Используем в любых формах
function MyForm() {
  const [state, formAction] = useActionState(myAction, {})

  return (
    <form action={formAction}>
      <input name="email" />
      <SubmitButton>Отправить</SubmitButton>
      <FormDebugger />
    </form>
  )
}

// Создайте свой UI Kit для форм! 🎨`
    }
  ]

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length)
  }

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length)
  }

  const step = steps[currentStep]

  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Заголовок */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '30px',
        borderRadius: '15px',
        marginBottom: '30px',
        color: 'white'
      }}>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '2.5em' }}>
          {step.title}
        </h2>
        <p style={{ margin: 0, fontSize: '1.3em', opacity: 0.9 }}>
          {step.description}
        </p>
      </div>

      {/* Контент */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '30px',
        marginBottom: '30px'
      }}>
        {/* Описание */}
        <div style={{
          background: '#f8f9fa',
          padding: '30px',
          borderRadius: '15px',
          lineHeight: '1.8'
        }}>
          <div style={{
            whiteSpace: 'pre-line',
            fontSize: '1.1em'
          }}>
            {step.content}
          </div>
        </div>

        {/* Код */}
        <div style={{
          background: '#1e1e1e',
          padding: '25px',
          borderRadius: '15px',
          color: '#d4d4d4',
          fontFamily: 'Monaco, Consolas, monospace',
          fontSize: '0.95em',
          lineHeight: '1.6',
          overflowX: 'auto',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: '#667eea',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '0.8em'
          }}>
            JavaScript
          </div>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            <code>{step.code}</code>
          </pre>
        </div>
      </div>

      {/* Навигация по шагам */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px'
      }}>
        <button
          onClick={prevStep}
          style={{
            padding: '12px 24px',
            fontSize: '1em',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          ← Предыдущий шаг
        </button>

        <div style={{
          fontSize: '1.1em',
          fontWeight: 'bold',
          color: '#667eea'
        }}>
          Шаг {currentStep + 1} из {steps.length}
        </div>

        <button
          onClick={nextStep}
          style={{
            padding: '12px 24px',
            fontSize: '1em',
            backgroundColor: '#764ba2',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Следующий шаг →
        </button>
      </div>
    </div>
  )
}

export default Slide19UseFormStatus