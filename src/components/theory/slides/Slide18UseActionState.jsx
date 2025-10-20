import { useState } from 'react'

function Slide18UseActionState() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: '🎬 Что такое useActionState?',
      description: 'Управление состоянием асинхронных действий',
      content: `**useActionState** - хук для управления состоянием форм и асинхронных действий. Это "официальный" способ работы с Server Actions в React 19.

**Проблема:**
• Отправка формы → нужно отслеживать loading, error, success
• Приходится писать кучу useState
• Сложно работать с прогрессивным улучшением

**Решение:**
• Один хук вместо 3-4 useState
• Автоматическая работа с формами
• Поддержка Server Actions из коробки
• Работает без JavaScript (progressive enhancement)`,
      code: `// ❌ БЕЗ useActionState - много кода
function Form() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await submitForm(formData)
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {loading && <Spinner />}
      {error && <Error message={error} />}
      {/* ... */}
    </form>
  )
}`
    },
    {
      title: '✨ Как работает useActionState?',
      description: 'Синтаксис и механика',
      content: `**Синтаксис:**
\`\`\`javascript
const [state, formAction, isPending] = useActionState(
  action,        // Функция-обработчик
  initialState   // Начальное состояние
)
\`\`\`

**Возвращает:**
• \`state\` - текущее состояние (результат или ошибка)
• \`formAction\` - функция для form action (работает без JS!)
• \`isPending\` - true во время выполнения

**Механика:**
1. При submit формы вызывается \`action(prevState, formData)\`
2. \`isPending\` становится true
3. Когда action завершается - \`state\` обновляется
4. \`isPending\` становится false`,
      code: `// ✅ С useActionState - просто и элегантно
function Form() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      try {
        const result = await submitForm(formData)
        return { success: true, data: result }
      } catch (error) {
        return { success: false, error: error.message }
      }
    },
    { success: null, data: null, error: null }
  )

  return (
    <form action={formAction}>
      {isPending && <Spinner />}
      {state.error && <Error message={state.error} />}
      {state.success && <Success data={state.data} />}
      <button disabled={isPending}>
        {isPending ? 'Отправка...' : 'Отправить'}
      </button>
    </form>
  )
}`
    },
    {
      title: '📝 Пример: Форма с валидацией',
      description: 'Валидация и обработка ошибок',
      content: `**Задача:**
Создать форму регистрации с валидацией на стороне сервера.`,
      code: `function SignupForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const email = formData.get('email')
      const password = formData.get('password')

      // Валидация
      if (!email || !email.includes('@')) {
        return {
          success: false,
          errors: { email: 'Неверный email' }
        }
      }

      if (password.length < 6) {
        return {
          success: false,
          errors: { password: 'Минимум 6 символов' }
        }
      }

      // Отправка на сервер
      try {
        const user = await registerUser({ email, password })
        return { success: true, user }
      } catch (error) {
        return {
          success: false,
          errors: { _form: error.message }
        }
      }
    },
    { success: null, errors: {} }
  )

  return (
    <form action={formAction}>
      <input name="email" type="email" required />
      {state.errors?.email && (
        <span style={{ color: 'red' }}>{state.errors.email}</span>
      )}

      <input name="password" type="password" required />
      {state.errors?.password && (
        <span style={{ color: 'red' }}>{state.errors.password}</span>
      )}

      {state.errors?._form && (
        <div style={{ color: 'red' }}>{state.errors._form}</div>
      )}

      {state.success && (
        <div>Добро пожаловать, {state.user.name}!</div>
      )}

      <button disabled={isPending}>
        {isPending ? '⏳ Регистрация...' : 'Зарегистрироваться'}
      </button>
    </form>
  )
}`
    },
    {
      title: '🚀 Пример: Server Actions (Next.js)',
      description: 'Работа с серверными действиями',
      content: `**Задача:**
Создать форму, которая работает БЕЗ JavaScript (progressive enhancement).`,
      code: `// ✅ Server Action (файл actions.js)
'use server'

export async function createPost(prevState, formData) {
  const title = formData.get('title')
  const content = formData.get('content')

  if (!title || title.length < 3) {
    return {
      success: false,
      error: 'Заголовок минимум 3 символа'
    }
  }

  try {
    const post = await db.posts.create({
      title,
      content,
      userId: getCurrentUserId()
    })

    revalidatePath('/posts') // Обновляем кеш
    return { success: true, post }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// ✅ Client Component
'use client'
import { useActionState } from 'react'
import { createPost } from './actions'

function CreatePostForm() {
  const [state, formAction, isPending] = useActionState(
    createPost,
    { success: null, error: null }
  )

  return (
    <form action={formAction}>
      <input name="title" required />
      <textarea name="content" required />

      {state.error && <div style={{ color: 'red' }}>
        {state.error}
      </div>}

      {state.success && <div style={{ color: 'green' }}>
        Пост создан! ID: {state.post.id}
      </div>}

      <button disabled={isPending}>
        {isPending ? 'Создание...' : 'Создать пост'}
      </button>
    </form>
  )
}

// 🎯 Работает БЕЗ JavaScript!
// Если JS отключен - форма отправится обычным POST`
    },
    {
      title: '🔄 Пример: Многошаговая форма',
      description: 'Использование prevState для шагов',
      content: `**Задача:**
Создать форму с несколькими шагами, где состояние накапливается.`,
      code: `function MultiStepForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const currentStep = prevState.step || 1

      if (currentStep === 1) {
        const name = formData.get('name')
        const email = formData.get('email')

        if (!name || !email) {
          return {
            ...prevState,
            errors: { step1: 'Заполните все поля' }
          }
        }

        return {
          step: 2,
          data: { name, email },
          errors: {}
        }
      }

      if (currentStep === 2) {
        const address = formData.get('address')
        const phone = formData.get('phone')

        if (!address || !phone) {
          return {
            ...prevState,
            errors: { step2: 'Заполните все поля' }
          }
        }

        // Финальная отправка
        try {
          const result = await submitOrder({
            ...prevState.data,
            address,
            phone
          })

          return {
            step: 3,
            success: true,
            orderId: result.id
          }
        } catch (error) {
          return {
            ...prevState,
            errors: { submit: error.message }
          }
        }
      }
    },
    { step: 1, data: {}, errors: {} }
  )

  return (
    <form action={formAction}>
      {state.step === 1 && (
        <>
          <h2>Шаг 1: Личные данные</h2>
          <input name="name" placeholder="Имя" required />
          <input name="email" type="email" placeholder="Email" required />
          {state.errors?.step1 && (
            <div style={{ color: 'red' }}>{state.errors.step1}</div>
          )}
        </>
      )}

      {state.step === 2 && (
        <>
          <h2>Шаг 2: Доставка</h2>
          <p>Имя: {state.data.name}</p>
          <input name="address" placeholder="Адрес" required />
          <input name="phone" placeholder="Телефон" required />
          {state.errors?.step2 && (
            <div style={{ color: 'red' }}>{state.errors.step2}</div>
          )}
        </>
      )}

      {state.step === 3 && (
        <div>
          <h2>✅ Заказ оформлен!</h2>
          <p>Номер заказа: {state.orderId}</p>
        </div>
      )}

      {state.step < 3 && (
        <button disabled={isPending}>
          {isPending ? 'Загрузка...' : 'Далее'}
        </button>
      )}
    </form>
  )
}`
    },
    {
      title: '⚡ useActionState + useOptimistic',
      description: 'Комбинация для идеального UX',
      content: `**Задача:**
Создать форму комментариев с оптимистичным UI.`,
      code: `function CommentForm({ postId, comments }) {
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newComment) => [...state, newComment]
  )

  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const text = formData.get('comment')

      // Оптимистично добавляем
      const tempComment = {
        id: 'temp-' + Date.now(),
        text,
        author: 'You',
        pending: true
      }
      addOptimisticComment(tempComment)

      try {
        const comment = await postComment(postId, text)
        return { success: true, comment }
      } catch (error) {
        return { success: false, error: error.message }
      }
    },
    { success: null, error: null }
  )

  return (
    <div>
      <div>
        {optimisticComments.map(comment => (
          <div
            key={comment.id}
            style={{ opacity: comment.pending ? 0.5 : 1 }}
          >
            <strong>{comment.author}:</strong> {comment.text}
            {comment.pending && ' ⏳'}
          </div>
        ))}
      </div>

      <form action={formAction}>
        <textarea name="comment" required />
        {state.error && (
          <div style={{ color: 'red' }}>{state.error}</div>
        )}
        <button disabled={isPending}>
          {isPending ? 'Отправка...' : 'Отправить'}
        </button>
      </form>
    </div>
  )
}

// 🎯 Комментарий появляется МГНОВЕННО
// 🎯 Автоматический откат при ошибке
// 🎯 Progressive enhancement из коробки`
    },
    {
      title: '⚠️ Когда НЕ использовать useActionState',
      description: 'Важные ограничения',
      content: `**❌ НЕ используйте когда:**

1️⃣ **Простые формы без асинхронности**
   • Если форма не отправляется на сервер
   • Локальная валидация - достаточно useState

2️⃣ **Сложная бизнес-логика**
   • Если нужна сложная оркестрация запросов
   • Лучше использовать React Query / SWR

3️⃣ **Не используете Server Actions**
   • В Vite/CRA нет Server Actions
   • Тогда useActionState избыточен

4️⃣ **Нужен детальный контроль**
   • Если нужно отменять запросы
   • Ретраи, кеширование - нужна библиотека`,
      code: `// ❌ ПЛОХО: простая форма без сервера
function LocalForm() {
  const [state, formAction] = useActionState(
    async (prev, formData) => {
      return { value: formData.get('name') }
    },
    { value: '' }
  )
  // Избыточно! useState проще
}

// ✅ ХОРОШО: простой useState
function LocalForm() {
  const [value, setValue] = useState('')
  return (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  )
}

// ❌ ПЛОХО: сложная логика
function ComplexForm() {
  const [state, formAction] = useActionState(async () => {
    // Последовательные запросы
    // Зависимости между запросами
    // Кеширование, ретраи...
    // useActionState не для этого!
  })
}

// ✅ ХОРОШО: React Query
function ComplexForm() {
  const mutation = useMutation({
    mutationFn: submitForm,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
    },
    retry: 3
  })
}`
    },
    {
      title: '🎯 Когда использовать useActionState',
      description: 'Идеальные сценарии',
      content: `**✅ Используйте когда:**

1️⃣ **Формы с Server Actions (Next.js)**
   • Progressive enhancement из коробки
   • Работает без JavaScript

2️⃣ **Простые асинхронные формы**
   • Логин, регистрация, создание поста
   • Не нужна сложная логика

3️⃣ **Нужна интеграция с useOptimistic**
   • Оптимистичные обновления + Server Actions
   • Идеальная комбинация

4️⃣ **Многошаговые формы**
   • prevState отлично подходит для шагов
   • Накопление данных между шагами`,
      code: `// ✅ Идеальный кейс: Server Action
'use server'
export async function login(prevState, formData) {
  const email = formData.get('email')
  const password = formData.get('password')

  const user = await authenticateUser(email, password)

  if (!user) {
    return { error: 'Неверный email или пароль' }
  }

  await createSession(user.id)
  redirect('/dashboard')
}

// Client
'use client'
function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    login,
    { error: null }
  )

  return (
    <form action={formAction}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      {state.error && <div>{state.error}</div>}
      <button disabled={isPending}>
        {isPending ? 'Вход...' : 'Войти'}
      </button>
    </form>
  )
}

// 🎯 Работает БЕЗ JavaScript!
// 🎯 Простая валидация и обработка ошибок
// 🎯 Автоматический loading state`
    },
    {
      title: '📊 Итоги: useActionState',
      description: 'Главное о хуке',
      content: `**Что такое useActionState?**
Хук для управления состоянием асинхронных действий (особенно Server Actions). Замена useState + useEffect для форм.

**Плюсы:**
✅ Один хук вместо 3-4 useState
✅ Автоматический loading state (isPending)
✅ Работает с Server Actions из коробки
✅ Progressive enhancement - работает без JS
✅ Доступ к prevState для многошаговых форм

**Минусы:**
❌ Только для Next.js с Server Actions (в полной мере)
❌ Нет отмены запросов, ретраев, кеширования
❌ Для сложной логики - лучше React Query

**Рекомендации:**
🎯 Используйте с Server Actions в Next.js
🎯 Комбинируйте с useOptimistic для лучшего UX
🎯 Для сложных форм - React Query / SWR
🎯 Для локальных форм - достаточно useState`,
      code: `// 🎯 Идеальный паттерн
'use server'
export async function serverAction(prevState, formData) {
  // Валидация
  const data = Object.fromEntries(formData)
  const errors = validate(data)
  if (errors) return { success: false, errors }

  // Действие
  try {
    const result = await performAction(data)
    revalidatePath('/items')
    return { success: true, result }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Client
function Form() {
  const [state, formAction, isPending] = useActionState(
    serverAction,
    { success: null }
  )

  return (
    <form action={formAction}>
      {/* inputs */}
      {state.errors && <Errors errors={state.errors} />}
      {state.success && <Success data={state.result} />}
      <button disabled={isPending}>Submit</button>
    </form>
  )
}`
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

export default Slide18UseActionState