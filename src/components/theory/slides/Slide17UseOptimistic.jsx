import { useState } from 'react'

function Slide17UseOptimistic() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: '🎯 Что такое useOptimistic?',
      description: 'Оптимистичные обновления UI',
      content: `**useOptimistic** - хук для создания "оптимистичного" UI, который мгновенно показывает результат действия до получения ответа от сервера.

**Проблема:**
• Пользователь нажимает "Лайк" → ждёт 2 секунды → видит результат
• UI "замораживается" или показывает лоадеры
• Плохой UX

**Решение:**
• Показываем результат мгновенно (оптимистично)
• Если запрос упал - откатываем изменения
• UI кажется молниеносным`,
      code: `// ❌ БЕЗ useOptimistic - медленно
const [likes, setLikes] = useState(0)
const [loading, setLoading] = useState(false)

async function handleLike() {
  setLoading(true) // Показываем лоадер
  const newLikes = await likePost() // Ждём 2 сек
  setLikes(newLikes) // Только потом обновляем
  setLoading(false)
}

return <button disabled={loading}>
  {loading ? 'Загрузка...' : \`❤️ \${likes}\`}
</button>`
    },
    {
      title: '✨ Как работает useOptimistic?',
      description: 'Синтаксис и механика',
      content: `**Синтаксис:**
\`\`\`javascript
const [optimisticState, addOptimistic] = useOptimistic(
  state,           // Реальное состояние
  updateFn         // Как обновить оптимистично
)
\`\`\`

**Механика:**
1. \`optimisticState\` - состояние, которое рендерим
2. \`addOptimistic(value)\` - мгновенно обновляет UI
3. Когда \`state\` меняется - \`optimisticState\` синхронизируется
4. Если запрос упал - откат автоматический`,
      code: `// ✅ С useOptimistic - мгновенно
const [likes, setLikes] = useState(0)
const [optimisticLikes, addOptimisticLike] = useOptimistic(
  likes,
  (currentLikes, newLike) => currentLikes + newLike
)

async function handleLike() {
  addOptimisticLike(1) // ⚡ Мгновенно +1

  try {
    const newLikes = await likePost() // Ждём ответ
    setLikes(newLikes) // Синхронизируем с сервером
  } catch {
    // Автоматический откат к \`likes\`
  }
}

return <button>❤️ {optimisticLikes}</button>`
    },
    {
      title: '💬 Пример: Оптимистичные комментарии',
      description: 'Добавление комментариев без ожидания',
      content: `**Задача:**
Пользователь отправляет комментарий. Мы показываем его мгновенно с пометкой "Отправка...", а когда сервер ответит - заменяем на настоящий.`,
      code: `function Comments() {
  const [comments, setComments] = useState([
    { id: 1, text: 'Привет!', status: 'sent' }
  ])

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newComment) => [
      ...state,
      { ...newComment, status: 'sending' } // Помечаем
    ]
  )

  async function sendComment(text) {
    const tempComment = { id: Date.now(), text }
    addOptimisticComment(tempComment) // ⚡ Мгновенно

    const savedComment = await postComment(text) // 2 сек
    setComments(prev => [...prev, savedComment]) // Реальный
  }

  return optimisticComments.map(c => (
    <div key={c.id} style={{
      opacity: c.status === 'sending' ? 0.5 : 1
    }}>
      {c.text} {c.status === 'sending' && '⏳'}
    </div>
  ))
}`
    },
    {
      title: '👍 Пример: Оптимистичные лайки',
      description: 'Мгновенная реакция на клик',
      content: `**Задача:**
Лайк должен срабатывать мгновенно, даже если сервер отвечает 2 секунды.`,
      code: `function Post({ postId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes)
  const [liked, setLiked] = useState(false)

  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (current, amount) => current + amount
  )

  async function toggleLike() {
    const delta = liked ? -1 : 1
    addOptimisticLike(delta) // ⚡ Мгновенно
    setLiked(!liked) // Мгновенно меняем цвет

    try {
      const newLikes = await fetch(\`/api/like/\${postId}\`, {
        method: liked ? 'DELETE' : 'POST'
      }).then(r => r.json())

      setLikes(newLikes) // Синхронизируем
    } catch (error) {
      // Откат произойдёт автоматически!
      setLiked(!liked) // Только меняем цвет обратно
    }
  }

  return (
    <button onClick={toggleLike}>
      {liked ? '❤️' : '🤍'} {optimisticLikes}
    </button>
  )
}`
    },
    {
      title: '📝 Пример: Оптимистичный TODO',
      description: 'Добавление задач без задержек',
      content: `**Задача:**
Добавление TODO должно быть мгновенным, но нужен откат при ошибке.`,
      code: `function TodoList() {
  const [todos, setTodos] = useState([])
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  )

  async function addTodo(text) {
    const tempTodo = {
      id: 'temp-' + Date.now(),
      text,
      completed: false,
      optimistic: true // Помечаем
    }

    addOptimisticTodo(tempTodo) // ⚡ Мгновенно

    try {
      const saved = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ text })
      }).then(r => r.json())

      setTodos(prev => [...prev, saved]) // Реальный
    } catch (error) {
      alert('Ошибка! Попробуйте снова')
      // Откат автоматический
    }
  }

  return optimisticTodos.map(todo => (
    <div key={todo.id} style={{
      opacity: todo.optimistic ? 0.5 : 1
    }}>
      {todo.text}
    </div>
  ))
}`
    },
    {
      title: '⚠️ Когда НЕ использовать useOptimistic',
      description: 'Важные ограничения',
      content: `**❌ НЕ используйте когда:**

1️⃣ **Критичные операции**
   • Платежи, переводы денег
   • Удаление аккаунта
   • Отправка юридических документов

2️⃣ **Сложная валидация на сервере**
   • Если сервер может отклонить с разными причинами
   • Откат + показ ошибки хуже чем честный лоадер

3️⃣ **Нет Suspense/Error Boundary**
   • useOptimistic не ловит ошибки
   • Нужна обработка вручную

4️⃣ **Зависимые действия**
   • Если следующее действие зависит от ID с сервера`,
      code: `// ❌ ПЛОХО: оптимизм для платежа
function PaymentButton() {
  const [paid, setPaid] = useState(false)
  const [optimisticPaid, addOptimistic] = useOptimistic(
    paid,
    () => true
  )

  function handlePay() {
    addOptimistic() // ❌ Показываем "Оплачено"
    // Но что если карта заблокирована?
    // Пользователь уже увидел "Успех"!
  }
}

// ✅ ХОРОШО: честный лоадер
function PaymentButton() {
  const [paying, setPaying] = useState(false)

  async function handlePay() {
    setPaying(true)
    const result = await processPayment()
    if (result.success) {
      // Только по факту успеха
    }
  }
}`
    },
    {
      title: '🎯 Когда использовать useOptimistic',
      description: 'Идеальные сценарии',
      content: `**✅ Используйте когда:**

1️⃣ **Лайки, реакции, голосования**
   • Откат не критичен
   • Высокая частота действий

2️⃣ **Комментарии, сообщения**
   • Пользователь видит свой текст мгновенно
   • При ошибке можно показать "Не отправлено"

3️⃣ **TODO, заметки, черновики**
   • Локальные изменения
   • Синхронизация в фоне

4️⃣ **Подписки, избранное**
   • Простые toggle действия
   • Откат понятен пользователю`,
      code: `// ✅ Идеальный кейс
function LikeButton({ postId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes)
  const [optimisticLikes, addOptimistic] = useOptimistic(
    likes,
    (current, delta) => current + delta
  )

  async function handleLike() {
    addOptimistic(1) // Мгновенно
    const newLikes = await likePost(postId)
    setLikes(newLikes) // Синхронизация
  }

  return <button onClick={handleLike}>
    ❤️ {optimisticLikes}
  </button>
}

// ✅ Хорошо: откат очевиден и не критичен
// ✅ Хорошо: высокая частота использования
// ✅ Хорошо: улучшает UX без рисков`
    },
    {
      title: '📊 Итоги: useOptimistic',
      description: 'Главное о хуке',
      content: `**Что такое useOptimistic?**
Хук для мгновенного обновления UI до получения ответа от сервера с автоматическим откатом при ошибке.

**Плюсы:**
✅ Молниеносный UI - никаких задержек
✅ Автоматический откат при ошибке
✅ Простой API - легко использовать
✅ Идеально для лайков, комментариев, TODO

**Минусы:**
❌ Не для критичных операций (платежи)
❌ Нужна обработка ошибок вручную
❌ Может сбить с толку при сложных откатах

**Рекомендации:**
🎯 Используйте для частых некритичных действий
🎯 Добавляйте визуальную индикацию (opacity, иконки)
🎯 Не забывайте про обработку ошибок
🎯 Тестируйте на медленном интернете`,
      code: `// 🎯 Идеальный паттерн
function OptimisticAction() {
  const [data, setData] = useState(initial)
  const [optimisticData, addOptimistic] = useOptimistic(
    data,
    (state, update) => ({ ...state, ...update })
  )

  async function handleAction(update) {
    addOptimistic(update) // Мгновенно

    try {
      const result = await serverAction(update)
      setData(result) // Синхронизация
    } catch (error) {
      toast.error('Ошибка! Попробуйте снова')
      // Откат автоматический
    }
  }

  return <UI data={optimisticData} onAction={handleAction} />
}

// Используйте для улучшения UX! 🚀`
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

export default Slide17UseOptimistic