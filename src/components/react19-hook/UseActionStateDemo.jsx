import { useActionState, useState } from 'react'

// Имитация отправки формы
async function submitForm(prevState, formData) {
  const name = formData.get('name')
  const email = formData.get('email')

  await new Promise(resolve => setTimeout(resolve, 1500))

  if (!name || name.length < 3) {
    return {
      success: false,
      error: 'Имя должно содержать минимум 3 символа',
      timestamp: new Date().toLocaleTimeString()
    }
  }

  if (!email || !email.includes('@')) {
    return {
      success: false,
      error: 'Введите корректный email',
      timestamp: new Date().toLocaleTimeString()
    }
  }

  return {
    success: true,
    message: `Форма успешно отправлена! (${name})`,
    timestamp: new Date().toLocaleTimeString()
  }
}

// Счётчик с action
async function incrementAction(prevState, formData) {
  await new Promise(resolve => setTimeout(resolve, 500))
  return { count: prevState.count + 1 }
}

async function decrementAction(prevState, formData) {
  await new Promise(resolve => setTimeout(resolve, 500))
  return { count: prevState.count - 1 }
}

// Компонент формы регистрации
function RegistrationForm() {
  const [state, formAction, isPending] = useActionState(submitForm, {
    success: false,
    error: null,
    message: null
  })

  return (
    <div style={{
      padding: '15px',
      backgroundColor: '#1f2937',
      borderRadius: '8px'
    }}>
      <h4 style={{ color: '#60a5fa', marginTop: 0 }}>📝 Форма регистрации</h4>

      <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', color: '#f3f4f6', marginBottom: '5px' }}>
            Имя:
          </label>
          <input
            name="name"
            placeholder="Введите имя"
            disabled={isPending}
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
            Email:
          </label>
          <input
            name="email"
            type="email"
            placeholder="example@mail.com"
            disabled={isPending}
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

        <button
          type="submit"
          disabled={isPending}
          style={{
            padding: '12px',
            fontSize: '16px',
            backgroundColor: isPending ? '#6b7280' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: isPending ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {isPending ? '⏳ Отправка...' : 'Отправить'}
        </button>
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
          <div style={{ fontSize: '12px', marginTop: '5px', opacity: 0.8 }}>
            {state.timestamp}
          </div>
        </div>
      )}

      {state.success && state.message && (
        <div style={{
          marginTop: '15px',
          padding: '12px',
          backgroundColor: '#065f46',
          color: 'white',
          borderRadius: '6px'
        }}>
          ✅ {state.message}
          <div style={{ fontSize: '12px', marginTop: '5px', opacity: 0.8 }}>
            {state.timestamp}
          </div>
        </div>
      )}
    </div>
  )
}

// Счётчик с useActionState
function CounterWithActions() {
  const [state, incrementFormAction, isIncrementing] = useActionState(
    incrementAction,
    { count: 0 }
  )
  const [decrementState, decrementFormAction, isDecrementing] = useActionState(
    decrementAction,
    { count: 0 }
  )

  // Синхронизируем состояния
  const count = state.count + decrementState.count

  return (
    <div style={{
      padding: '15px',
      backgroundColor: '#1f2937',
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <h4 style={{ color: '#60a5fa', marginTop: 0 }}>🔢 Счётчик с Actions</h4>

      <div style={{
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#3b82f6',
        margin: '20px 0'
      }}>
        {count}
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <form action={decrementFormAction}>
          <button
            type="submit"
            disabled={isDecrementing}
            style={{
              padding: '12px 24px',
              fontSize: '18px',
              backgroundColor: isDecrementing ? '#6b7280' : '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: isDecrementing ? 'not-allowed' : 'pointer'
            }}
          >
            {isDecrementing ? '⏳' : '-'}
          </button>
        </form>

        <form action={incrementFormAction}>
          <button
            type="submit"
            disabled={isIncrementing}
            style={{
              padding: '12px 24px',
              fontSize: '18px',
              backgroundColor: isIncrementing ? '#6b7280' : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: isIncrementing ? 'not-allowed' : 'pointer'
            }}
          >
            {isIncrementing ? '⏳' : '+'}
          </button>
        </form>
      </div>

      <p style={{ color: '#9ca3af', fontSize: '14px', marginTop: '15px' }}>
        Каждое действие имеет задержку 500мс
      </p>
    </div>
  )
}

// Todo список с actions
function TodoListWithActions() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Изучить useActionState' },
    { id: 2, text: 'Создать форму' }
  ])

  const addTodoAction = async (prevState, formData) => {
    const text = formData.get('todo')
    if (!text) return prevState

    await new Promise(resolve => setTimeout(resolve, 500))

    const newTodo = { id: Date.now(), text }
    setTodos(prev => [...prev, newTodo])

    return { message: 'Задача добавлена!', timestamp: Date.now() }
  }

  const [addState, addFormAction, isAdding] = useActionState(addTodoAction, {})

  const handleDelete = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  return (
    <div style={{
      padding: '15px',
      backgroundColor: '#1f2937',
      borderRadius: '8px'
    }}>
      <h4 style={{ color: '#60a5fa', marginTop: 0 }}>✅ Todo список</h4>

      <form action={addFormAction} style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            name="todo"
            placeholder="Новая задача..."
            disabled={isAdding}
            style={{
              flex: 1,
              padding: '10px',
              fontSize: '14px',
              borderRadius: '6px',
              border: '2px solid #60a5fa',
              backgroundColor: '#374151',
              color: '#f3f4f6',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            disabled={isAdding}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              backgroundColor: isAdding ? '#6b7280' : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: isAdding ? 'not-allowed' : 'pointer'
            }}
          >
            {isAdding ? '⏳' : 'Добавить'}
          </button>
        </div>
      </form>

      {addState.message && (
        <div style={{
          padding: '8px',
          backgroundColor: '#065f46',
          color: 'white',
          borderRadius: '6px',
          marginBottom: '10px',
          fontSize: '14px'
        }}>
          ✅ {addState.message}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {todos.map(todo => (
          <div
            key={todo.id}
            style={{
              padding: '10px',
              backgroundColor: '#374151',
              borderRadius: '6px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span style={{ color: '#f3f4f6', fontSize: '14px' }}>
              {todo.text}
            </span>
            <button
              onClick={() => handleDelete(todo.id)}
              style={{
                padding: '4px 12px',
                fontSize: '12px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function UseActionStateDemo() {
  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h2 style={{ color: '#f3f4f6', marginBottom: '10px' }}>
        useActionState - Управление состоянием форм
      </h2>

      <div style={{
        backgroundColor: '#1e40af',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>💡 Что делает useActionState?</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Управляет состоянием формы и её отправкой</li>
          <li>Предоставляет isPending для индикации загрузки</li>
          <li>Возвращает результат предыдущего action</li>
          <li>Отлично работает с Server Actions</li>
        </ul>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
      }}>
        <CounterWithActions />
        <TodoListWithActions />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <RegistrationForm />
      </div>

      <div style={{
        backgroundColor: '#065f46',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>✅ Когда использовать useActionState</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li><strong>Формы</strong> - регистрация, логин, создание записей</li>
          <li><strong>Server Actions</strong> - взаимодействие с сервером</li>
          <li><strong>Валидация</strong> - обработка ошибок и успешных ответов</li>
          <li><strong>Прогрессивное улучшение</strong> - работает без JavaScript</li>
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
{`import { useActionState } from 'react'

// Action функция
async function submitForm(prevState, formData) {
  const name = formData.get('name')

  // Валидация
  if (!name) {
    return { error: 'Имя обязательно' }
  }

  // Отправка на сервер
  const response = await fetch('/api/submit', {
    method: 'POST',
    body: formData
  })

  if (!response.ok) {
    return { error: 'Ошибка сервера' }
  }

  return { success: true, message: 'Успешно!' }
}

// Компонент
function Form() {
  const [state, formAction, isPending] = useActionState(
    submitForm,
    { error: null } // Начальное состояние
  )

  return (
    <form action={formAction}>
      <input name="name" disabled={isPending} />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Отправка...' : 'Отправить'}
      </button>
      {state.error && <p>{state.error}</p>}
      {state.success && <p>{state.message}</p>}
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
          <li>Action функция получает prevState и formData</li>
          <li>Возвращаемое значение становится новым state</li>
          <li>isPending автоматически управляется</li>
          <li>Работает с нативными формами (прогрессивное улучшение)</li>
        </ul>
      </div>

      <div style={{
        backgroundColor: '#1e3a8a',
        color: 'white',
        padding: '15px',
        borderRadius: '8px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>🆚 useActionState vs useState</h3>
        <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
          <div style={{ marginBottom: '10px' }}>
            <strong>useActionState:</strong> Для форм и серверных действий
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>useState:</strong> Для локального состояния компонента
          </div>
          <div>
            <strong>useActionState + Server Actions:</strong> Идеальная комбинация!
          </div>
        </div>
      </div>
    </div>
  )
}

export default UseActionStateDemo