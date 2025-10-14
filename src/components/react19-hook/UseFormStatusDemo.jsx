import { useActionState, useRef, createContext, useContext } from 'react'

// Создаём контекст для имитации useFormStatus
const FormStatusContext = createContext({ pending: false, data: null, method: null, action: null })

// Имитация useFormStatus (в React 19 это встроенный хук)
function useFormStatus() {
  return useContext(FormStatusContext)
}

// Компонент кнопки отправки
function SubmitButton() {
  const status = useFormStatus()

  return (
    <button
      type="submit"
      disabled={status.pending}
      style={{
        padding: '12px 24px',
        fontSize: '16px',
        backgroundColor: status.pending ? '#6b7280' : '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: status.pending ? 'not-allowed' : 'pointer',
        fontWeight: 'bold',
        transition: 'all 0.2s'
      }}
    >
      {status.pending ? '⏳ Отправка...' : '📤 Отправить'}
    </button>
  )
}

// Компонент индикатора загрузки
function LoadingIndicator() {
  const status = useFormStatus()

  if (!status.pending) return null

  return (
    <div style={{
      padding: '10px',
      backgroundColor: '#fef3c7',
      color: '#92400e',
      borderRadius: '6px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginTop: '10px'
    }}>
      <span style={{ animation: 'spin 1s linear infinite' }}>⏳</span>
      Форма отправляется, пожалуйста подождите...
    </div>
  )
}

// Компонент отключения полей
function DisabledFields({ children }) {
  const status = useFormStatus()

  return (
    <fieldset disabled={status.pending} style={{ border: 'none', padding: 0, margin: 0 }}>
      {children}
    </fieldset>
  )
}

// Action для формы логина
async function loginAction(prevState, formData) {
  const email = formData.get('email')
  const password = formData.get('password')

  await new Promise(resolve => setTimeout(resolve, 2000))

  if (!email || !email.includes('@')) {
    return { success: false, error: 'Некорректный email' }
  }

  if (!password || password.length < 6) {
    return { success: false, error: 'Пароль должен быть минимум 6 символов' }
  }

  return { success: true, message: `Добро пожаловать, ${email}!` }
}

// Форма логина
function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, {})

  return (
    <FormStatusContext.Provider value={{ pending: isPending }}>
      <div style={{
        padding: '20px',
        backgroundColor: '#1f2937',
        borderRadius: '8px'
      }}>
        <h4 style={{ color: '#60a5fa', marginTop: 0 }}>🔐 Форма входа</h4>

        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <DisabledFields>
            <div>
              <label style={{ display: 'block', color: '#f3f4f6', marginBottom: '5px' }}>
                Email:
              </label>
              <input
                name="email"
                type="email"
                placeholder="example@mail.com"
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '14px',
                  borderRadius: '6px',
                  border: '2px solid #60a5fa',
                  backgroundColor: '#374151',
                  color: '#f3f4f6',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#f3f4f6', marginBottom: '5px' }}>
                Пароль:
              </label>
              <input
                name="password"
                type="password"
                placeholder="Минимум 6 символов"
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '14px',
                  borderRadius: '6px',
                  border: '2px solid #60a5fa',
                  backgroundColor: '#374151',
                  color: '#f3f4f6',
                  outline: 'none'
                }}
              />
            </div>
          </DisabledFields>

          <SubmitButton />
          <LoadingIndicator />
        </form>

        {state.error && (
          <div style={{
            marginTop: '15px',
            padding: '12px',
            backgroundColor: '#7f1d1d',
            color: 'white',
            borderRadius: '6px'
          }}>
            ❌ {state.error}
          </div>
        )}

        {state.success && (
          <div style={{
            marginTop: '15px',
            padding: '12px',
            backgroundColor: '#065f46',
            color: 'white',
            borderRadius: '6px'
          }}>
            ✅ {state.message}
          </div>
        )}
      </div>
    </FormStatusContext.Provider>
  )
}

// Action для формы комментария
async function commentAction(prevState, formData) {
  const name = formData.get('name')
  const comment = formData.get('comment')

  await new Promise(resolve => setTimeout(resolve, 1500))

  if (!name) {
    return { success: false, error: 'Введите имя' }
  }

  if (!comment || comment.length < 10) {
    return { success: false, error: 'Комментарий должен быть минимум 10 символов' }
  }

  return {
    success: true,
    comment: { name, text: comment, timestamp: new Date().toLocaleTimeString() }
  }
}

// Форма комментариев
function CommentForm() {
  const [state, formAction, isPending] = useActionState(commentAction, { comments: [] })
  const formRef = useRef(null)

  return (
    <FormStatusContext.Provider value={{ pending: isPending }}>
      <div style={{
        padding: '20px',
        backgroundColor: '#1f2937',
        borderRadius: '8px'
      }}>
        <h4 style={{ color: '#60a5fa', marginTop: 0 }}>💬 Оставить комментарий</h4>

        <form
          ref={formRef}
          action={async (formData) => {
            await formAction(formData)
            if (!state.error) {
              formRef.current?.reset()
            }
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
        >
          <DisabledFields>
            <div>
              <label style={{ display: 'block', color: '#f3f4f6', marginBottom: '5px' }}>
                Ваше имя:
              </label>
              <input
                name="name"
                placeholder="Иван Иванов"
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '14px',
                  borderRadius: '6px',
                  border: '2px solid #60a5fa',
                  backgroundColor: '#374151',
                  color: '#f3f4f6',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#f3f4f6', marginBottom: '5px' }}>
                Комментарий:
              </label>
              <textarea
                name="comment"
                rows={4}
                placeholder="Напишите ваш комментарий..."
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '14px',
                  borderRadius: '6px',
                  border: '2px solid #60a5fa',
                  backgroundColor: '#374151',
                  color: '#f3f4f6',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          </DisabledFields>

          <SubmitButton />
          <LoadingIndicator />
        </form>

        {state.error && (
          <div style={{
            marginTop: '15px',
            padding: '12px',
            backgroundColor: '#7f1d1d',
            color: 'white',
            borderRadius: '6px'
          }}>
            ❌ {state.error}
          </div>
        )}

        {state.success && state.comment && (
          <div style={{
            marginTop: '15px',
            padding: '12px',
            backgroundColor: '#065f46',
            color: 'white',
            borderRadius: '6px'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
              ✅ Комментарий добавлен!
            </div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>
              {state.comment.name}: {state.comment.text}
            </div>
            <div style={{ fontSize: '12px', marginTop: '5px', opacity: 0.7 }}>
              {state.comment.timestamp}
            </div>
          </div>
        )}
      </div>
    </FormStatusContext.Provider>
  )
}

function UseFormStatusDemo() {
  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h2 style={{ color: '#f3f4f6', marginBottom: '10px' }}>
        useFormStatus - Статус формы для дочерних компонентов
      </h2>

      <div style={{
        backgroundColor: '#1e40af',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>💡 Что делает useFormStatus?</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Предоставляет информацию о статусе родительской формы</li>
          <li>Работает только внутри дочерних компонентов формы</li>
          <li>Возвращает pending, data, method, action</li>
          <li>Идеален для создания переиспользуемых UI компонентов</li>
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
        <p style={{ margin: 0, fontSize: '14px' }}>
          В этой демо мы имитируем useFormStatus через Context, так как настоящий useFormStatus
          работает только с Server Components в React 19. В реальном приложении с Server Actions
          этот хук работает "из коробки" без дополнительной настройки.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
      }}>
        <LoginForm />
        <CommentForm />
      </div>

      <div style={{
        backgroundColor: '#065f46',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>✅ Когда использовать useFormStatus</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li><strong>Кнопки Submit</strong> - отображение состояния загрузки</li>
          <li><strong>Индикаторы</strong> - показ прогресса отправки</li>
          <li><strong>Отключение полей</strong> - disabled во время отправки</li>
          <li><strong>Переиспользуемые компоненты</strong> - универсальные UI элементы</li>
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
{`import { useFormStatus } from 'react-dom'

// Переиспользуемая кнопка Submit
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Отправка...' : 'Отправить'}
    </button>
  )
}

// Индикатор загрузки
function LoadingIndicator() {
  const { pending } = useFormStatus()

  if (!pending) return null

  return <div>⏳ Загрузка...</div>
}

// Форма
function Form() {
  async function submitAction(formData) {
    'use server'
    // Server Action
    await saveToDatabase(formData)
  }

  return (
    <form action={submitAction}>
      <input name="email" />

      {/* Компоненты автоматически узнают о pending */}
      <SubmitButton />
      <LoadingIndicator />
    </form>
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
          <li>useFormStatus работает только в дочерних компонентах формы</li>
          <li>Не вызывайте его на том же уровне, где находится форма</li>
          <li>Идеален для создания библиотек UI компонентов</li>
          <li>Лучше всего работает с Server Actions</li>
        </ul>
      </div>

      <div style={{
        backgroundColor: '#1e3a8a',
        color: 'white',
        padding: '15px',
        borderRadius: '8px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>🎯 Возвращаемые значения</h3>
        <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
          <div style={{ marginBottom: '10px' }}>
            <strong>pending:</strong> boolean - форма в процессе отправки
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>data:</strong> FormData - данные, отправляемые формой
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>method:</strong> 'get' | 'post' - HTTP метод
          </div>
          <div>
            <strong>action:</strong> string | function - URL или функция action
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default UseFormStatusDemo