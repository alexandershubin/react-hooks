import { useOptimistic, useState, useTransition } from 'react'

// Имитация API запроса
async function sendMessage(message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Имитируем успех в 80% случаев
      if (Math.random() > 0.2) {
        resolve({ id: Date.now(), text: message, status: 'sent' })
      } else {
        reject(new Error('Ошибка отправки сообщения'))
      }
    }, 1500)
  })
}

// Имитация лайка
async function toggleLike(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 1000)
  })
}

// Компонент сообщений
function MessageList() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Привет! Как дела?', status: 'sent' },
    { id: 2, text: 'Всё отлично, спасибо!', status: 'sent' }
  ])
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [...state, newMessage]
  )
  const [isPending, startTransition] = useTransition()

  const handleSend = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const messageText = formData.get('message')

    if (!messageText) return

    const optimisticMessage = {
      id: Date.now(),
      text: messageText,
      status: 'sending'
    }

    e.target.reset()

    startTransition(async () => {
      addOptimisticMessage(optimisticMessage)

      try {
        const sentMessage = await sendMessage(messageText)
        setMessages(prev => [...prev, sentMessage])
      } catch (error) {
        console.error(error)
        alert('Не удалось отправить сообщение')
      }
    })
  }

  return (
    <div style={{
      padding: '15px',
      backgroundColor: '#1f2937',
      borderRadius: '8px'
    }}>
      <h4 style={{ color: '#60a5fa', marginTop: 0 }}>💬 Чат с оптимистичными обновлениями</h4>

      <div style={{
        maxHeight: '300px',
        overflowY: 'auto',
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: '#111827',
        borderRadius: '6px'
      }}>
        {optimisticMessages.map((msg) => (
          <div
            key={msg.id}
            style={{
              padding: '10px',
              marginBottom: '8px',
              backgroundColor: msg.status === 'sending' ? '#fef3c7' : '#374151',
              color: msg.status === 'sending' ? '#92400e' : '#f3f4f6',
              borderRadius: '6px',
              opacity: msg.status === 'sending' ? 0.7 : 1,
              transition: 'all 0.3s'
            }}
          >
            <div style={{ fontSize: '14px' }}>{msg.text}</div>
            {msg.status === 'sending' && (
              <div style={{ fontSize: '12px', marginTop: '5px', fontStyle: 'italic' }}>
                ⏳ Отправка...
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px' }}>
        <input
          name="message"
          placeholder="Введите сообщение..."
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
          disabled={isPending}
          style={{
            padding: '10px 20px',
            fontSize: '14px',
            backgroundColor: isPending ? '#6b7280' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: isPending ? 'not-allowed' : 'pointer'
          }}
        >
          Отправить
        </button>
      </form>
    </div>
  )
}

// Компонент со счётчиком лайков
function LikeButton() {
  const [likes, setLikes] = useState(42)
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (state, amount) => state + amount
  )
  const [isPending, startTransition] = useTransition()

  const handleLike = () => {
    startTransition(async () => {
      addOptimisticLike(1)

      try {
        await toggleLike('post-1')
        setLikes(prev => prev + 1)
      } catch (error) {
        console.error(error)
      }
    })
  }

  return (
    <div style={{
      padding: '15px',
      backgroundColor: '#1f2937',
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <h4 style={{ color: '#60a5fa', marginTop: 0 }}>❤️ Лайки с оптимистичным обновлением</h4>

      <div style={{
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#ef4444',
        margin: '20px 0'
      }}>
        {optimisticLikes}
      </div>

      <button
        onClick={handleLike}
        disabled={isPending}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: isPending ? '#6b7280' : '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: isPending ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s'
        }}
      >
        {isPending ? '⏳ Обработка...' : '❤️ Лайк'}
      </button>

      <p style={{ color: '#9ca3af', fontSize: '14px', marginTop: '10px' }}>
        Счётчик обновляется мгновенно!
      </p>
    </div>
  )
}

// Компонент списка задач
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Изучить useOptimistic', completed: false },
    { id: 2, text: 'Создать демо приложение', completed: false }
  ])
  const [optimisticTodos, updateOptimisticTodos] = useOptimistic(
    todos,
    (state, { id, completed }) => {
      return state.map(todo =>
        todo.id === id ? { ...todo, completed } : todo
      )
    }
  )
  const [isPending, startTransition] = useTransition()

  const handleToggle = (id, completed) => {
    startTransition(async () => {
      updateOptimisticTodos({ id, completed: !completed })

      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000))
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      )
    })
  }

  return (
    <div style={{
      padding: '15px',
      backgroundColor: '#1f2937',
      borderRadius: '8px'
    }}>
      <h4 style={{ color: '#60a5fa', marginTop: 0 }}>✅ Список задач</h4>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {optimisticTodos.map((todo) => (
          <div
            key={todo.id}
            style={{
              padding: '12px',
              backgroundColor: '#374151',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              opacity: isPending ? 0.7 : 1,
              transition: 'all 0.3s'
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id, todo.completed)}
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer'
              }}
            />
            <span
              style={{
                color: '#f3f4f6',
                textDecoration: todo.completed ? 'line-through' : 'none',
                opacity: todo.completed ? 0.6 : 1,
                fontSize: '14px'
              }}
            >
              {todo.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function UseOptimisticDemo() {
  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h2 style={{ color: '#f3f4f6', marginBottom: '10px' }}>
        useOptimistic - Оптимистичные обновления UI
      </h2>

      <div style={{
        backgroundColor: '#1e40af',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>💡 Что делает useOptimistic?</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Показывает оптимистичное состояние во время асинхронной операции</li>
          <li>UI обновляется мгновенно, не дожидаясь сервера</li>
          <li>Автоматически откатывается при ошибке</li>
          <li>Улучшает воспринимаемую производительность приложения</li>
        </ul>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
      }}>
        <LikeButton />
        <TodoList />
      </div>

      <div style={{
        marginBottom: '20px'
      }}>
        <MessageList />
      </div>

      <div style={{
        backgroundColor: '#065f46',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>✅ Когда использовать useOptimistic</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li><strong>Отправка сообщений</strong> - чаты, комментарии, посты</li>
          <li><strong>Лайки и реакции</strong> - мгновенная обратная связь</li>
          <li><strong>Редактирование</strong> - обновление данных в формах</li>
          <li><strong>Добавление в корзину</strong> - e-commerce приложения</li>
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
{`import { useOptimistic, useTransition } from 'react'

function LikeButton({ initialLikes }) {
  const [likes, setLikes] = useState(initialLikes)

  // Создаём оптимистичное состояние
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (currentLikes, amount) => currentLikes + amount
  )

  const [isPending, startTransition] = useTransition()

  const handleLike = () => {
    startTransition(async () => {
      // Мгновенно обновляем UI
      addOptimisticLike(1)

      // Отправляем запрос на сервер
      const result = await fetch('/api/like', {
        method: 'POST'
      })

      // Обновляем реальное состояние
      const data = await result.json()
      setLikes(data.likes)
    })
  }

  return (
    <button onClick={handleLike} disabled={isPending}>
      ❤️ {optimisticLikes}
    </button>
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
          <li>useOptimistic должен использоваться с useTransition</li>
          <li>Оптимистичное состояние автоматически сбрасывается после завершения</li>
          <li>Не используйте для критических операций (платежи, удаление)</li>
          <li>Обрабатывайте ошибки для отката изменений</li>
        </ul>
      </div>

      <div style={{
        backgroundColor: '#1e3a8a',
        color: 'white',
        padding: '15px',
        borderRadius: '8px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>🎯 Преимущества оптимистичных обновлений</h3>
        <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
          <div style={{ marginBottom: '10px' }}>
            <strong>⚡ Мгновенная обратная связь:</strong> Пользователь видит результат сразу
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>🚀 Лучший UX:</strong> Приложение кажется быстрее
          </div>
          <div>
            <strong>💪 Надёжность:</strong> Автоматический откат при ошибках
          </div>
        </div>
      </div>
    </div>
  )
}

export default UseOptimisticDemo