import { useState } from 'react'

// Слайд 7: Что нового в React 19
function Slide7React19Features() {
  const [selectedFeature, setSelectedFeature] = useState(null)

  const features = [
    {
      id: 'react-compiler',
      title: '🔮 React Compiler',
      subtitle: 'Автоматическая оптимизация',
      icon: '⚡',
      color: '#8b5cf6',
      bgColor: '#f3e8ff',
      description: 'Компилятор автоматически оптимизирует ваш код, добавляя мемоизацию без useMemo/useCallback.',
      details: [
        'Автоматически мемоизирует компоненты и вычисления',
        'Не нужно вручную оборачивать в useMemo/useCallback/memo',
        'Анализирует код на этапе сборки',
        'Генерирует оптимальный код для React',
        'Сейчас в экспериментальной стадии (опционально)'
      ],
      example: `// Раньше приходилось делать вручную:
const MemoizedComponent = memo(Component)
const memoizedValue = useMemo(() => compute(), [deps])
const memoizedCallback = useCallback(() => {}, [deps])

// С React Compiler всё автоматически:
function Component({ data }) {
  const result = expensiveComputation(data)
  // Компилятор сам мемоизирует!
  return <div>{result}</div>
}`
    },
    {
      id: 'actions',
      title: '📝 Actions',
      subtitle: 'Новая модель работы с формами',
      icon: '🎯',
      color: '#ec4899',
      bgColor: '#fce7f3',
      description: 'Асинхронные функции для обработки отправки данных с автоматическим управлением состоянием.',
      details: [
        'Автоматическое управление pending состоянием',
        'Оптимистичные обновления из коробки',
        'Обработка ошибок встроена',
        'Интеграция с формами через action prop',
        'Работает с useActionState и useFormStatus'
      ],
      example: `// Новый способ работы с формами
function AddTodoForm() {
  const [state, submitAction, isPending] = useActionState(
    async (prevState, formData) => {
      const title = formData.get('title')
      await addTodo(title)
      return { success: true }
    },
    { success: false }
  )

  return (
    <form action={submitAction}>
      <input name="title" />
      <button disabled={isPending}>
        {isPending ? 'Добавление...' : 'Добавить'}
      </button>
    </form>
  )
}`
    },
    {
      id: 'use-hook',
      title: '🎁 use() Hook',
      subtitle: 'Универсальный хук для ресурсов',
      icon: '🔓',
      color: '#3b82f6',
      bgColor: '#dbeafe',
      description: 'Универсальный хук для чтения Promise и Context, можно вызывать условно!',
      details: [
        'Читает Promise и Context одинаково',
        'Можно использовать в условиях и циклах (!)',
        'Интеграция с Suspense для Promise',
        'Упрощает асинхронную логику',
        'Первый хук, который можно вызывать условно'
      ],
      example: `// Чтение Promise с Suspense
function UserProfile({ userPromise }) {
  const user = use(userPromise) // Suspense автоматически!
  return <div>{user.name}</div>
}

// Чтение Context
function Component() {
  const theme = use(ThemeContext)
  return <div className={theme}>...</div>
}

// Условный вызов! (раньше было нельзя)
function ConditionalHook({ condition }) {
  if (condition) {
    const value = use(somePromise) // ✅ Работает!
    return <div>{value}</div>
  }
  return null
}`
    },
    {
      id: 'server-components',
      title: '🌐 Server Components',
      subtitle: 'Компоненты на сервере',
      icon: '☁️',
      color: '#10b981',
      bgColor: '#d1fae5',
      description: 'Компоненты, которые рендерятся только на сервере, уменьшая размер бандла.',
      details: [
        'Код выполняется только на сервере',
        'Прямой доступ к базе данных и файловой системе',
        'Нулевой JavaScript на клиенте для этих компонентов',
        'Автоматическая сериализация данных',
        'Комбинируются с Client Components'
      ],
      example: `// Server Component (по умолчанию в Next.js App Router)
async function UserList() {
  // Запрос к БД напрямую!
  const users = await db.users.findMany()

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

// Client Component (нужна интерактивность)
'use client'
function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}`
    },
    {
      id: 'server-actions',
      title: '⚙️ Server Actions',
      subtitle: 'Серверные функции из компонентов',
      icon: '🔧',
      color: '#f59e0b',
      bgColor: '#fef3c7',
      description: 'Вызов серверных функций напрямую из клиентских компонентов.',
      details: [
        'Функции, выполняющиеся на сервере',
        'Безопасный доступ к серверным ресурсам',
        'Автоматическая сериализация данных',
        'Прогрессивное улучшение (работают без JS)',
        'Интеграция с формами через action'
      ],
      example: `// Server Action
'use server'
async function createUser(formData) {
  const name = formData.get('name')
  const user = await db.users.create({ name })
  revalidatePath('/users')
  return user
}

// Использование в Client Component
'use client'
function UserForm() {
  return (
    <form action={createUser}>
      <input name="name" />
      <button type="submit">Создать</button>
    </form>
  )
}`
    },
    {
      id: 'document-metadata',
      title: '📄 Document Metadata',
      subtitle: 'Встроенное управление метаданными',
      icon: '🏷️',
      color: '#ef4444',
      bgColor: '#fee2e2',
      description: 'Нативная поддержка <title>, <meta>, <link> прямо в компонентах.',
      details: [
        'Можно использовать <title> и <meta> в компонентах',
        'React автоматически поднимает их в <head>',
        'Не нужны библиотеки типа react-helmet',
        'Работает с Server Components',
        'Автоматическое дедублирование метатегов'
      ],
      example: `// Теперь можно писать прямо в компонентах!
function BlogPost({ post }) {
  return (
    <>
      <title>{post.title} - My Blog</title>
      <meta name="description" content={post.excerpt} />
      <meta property="og:image" content={post.image} />

      <article>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </article>
    </>
  )
}

// React автоматически переместит title и meta в <head>!`
    },
    {
      id: 'asset-loading',
      title: '📦 Asset Loading',
      subtitle: 'Улучшенная загрузка ресурсов',
      icon: '🎨',
      color: '#06b6d4',
      bgColor: '#cffafe',
      description: 'Новые API для приоритизации загрузки стилей, шрифтов и скриптов.',
      details: [
        'preload(), prefetch(), preconnect() API',
        'Автоматическое управление приоритетами',
        'Интеграция с Suspense',
        'Оптимизация Critical CSS',
        'Умная загрузка ресурсов'
      ],
      example: `// Preload критичных ресурсов
import { preload, prefetch } from 'react-dom'

function App() {
  // Загрузить заранее
  preload('/font.woff2', { as: 'font' })
  preload('/critical.css', { as: 'style' })

  // Prefetch для следующей страницы
  prefetch('/next-page-bundle.js')

  return <div>...</div>
}

// Или в JSX
<link rel="preload" href="/font.woff2" as="font" />`
    },
    {
      id: 'new-hooks',
      title: '🎣 Новые хуки',
      subtitle: 'React 19 Hooks',
      icon: '✨',
      color: '#a855f7',
      bgColor: '#f3e8ff',
      description: 'React 19 добавил 4 новых хука для работы с формами и состоянием.',
      details: [
        'use() - универсальный хук для Promise/Context',
        'useOptimistic() - оптимистичные обновления UI',
        'useActionState() - состояние форм и действий',
        'useFormStatus() - статус родительской формы'
      ],
      example: `// useOptimistic - мгновенный UI
function Comments({ comments, addComment }) {
  const [optimisticComments, addOptimistic] = useOptimistic(
    comments,
    (state, newComment) => [...state, newComment]
  )

  return (
    <>
      {optimisticComments.map(c => <Comment {...c} />)}
      <form action={async (formData) => {
        const comment = { text: formData.get('text') }
        addOptimistic(comment) // Мгновенно в UI!
        await addComment(comment) // Реальный запрос
      }}>
        <input name="text" />
        <button>Отправить</button>
      </form>
    </>
  )
}`
    }
  ]

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{
        fontSize: '3em',
        textAlign: 'center',
        color: '#61dafb',
        marginBottom: '20px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
      }}>
        💎 Что нового в React 19
      </h1>

      <div style={{
        textAlign: 'center',
        fontSize: '1.2em',
        marginBottom: '40px',
        padding: '20px',
        background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
        borderRadius: '15px',
        color: 'white'
      }}>
        <strong>React 19</strong> выходит в 2024-2025 году и приносит революционные изменения в разработку
      </div>

      {/* Сетка с фичами */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {features.map((feature) => (
          <div
            key={feature.id}
            onClick={() => setSelectedFeature(selectedFeature === feature.id ? null : feature.id)}
            style={{
              background: feature.bgColor,
              border: `3px solid ${feature.color}`,
              borderRadius: '15px',
              padding: '25px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: selectedFeature === feature.id ? 'scale(1.05)' : 'scale(1)',
              boxShadow: selectedFeature === feature.id
                ? `0 10px 30px ${feature.color}60`
                : '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{
              fontSize: '3em',
              textAlign: 'center',
              marginBottom: '15px'
            }}>
              {feature.icon}
            </div>
            <h3 style={{
              color: feature.color,
              marginTop: 0,
              fontSize: '1.4em',
              textAlign: 'center',
              marginBottom: '5px'
            }}>
              {feature.title}
            </h3>
            <p style={{
              textAlign: 'center',
              fontSize: '0.9em',
              color: '#666',
              marginTop: 0,
              marginBottom: '15px',
              fontStyle: 'italic'
            }}>
              {feature.subtitle}
            </p>
            <p style={{
              fontSize: '1.05em',
              lineHeight: '1.6',
              margin: 0,
              textAlign: 'center'
            }}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Детальная информация о выбранной фиче */}
      {selectedFeature && (
        <div
          style={{
            background: 'white',
            border: `3px solid ${features.find(f => f.id === selectedFeature).color}`,
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          {(() => {
            const feature = features.find(f => f.id === selectedFeature)
            return (
              <>
                <h2 style={{
                  color: feature.color,
                  marginTop: 0,
                  fontSize: '2em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <span style={{ fontSize: '1.3em' }}>{feature.icon}</span>
                  {feature.title}
                </h2>

                <h3 style={{ color: feature.color, fontSize: '1.4em' }}>
                  📋 Ключевые особенности:
                </h3>
                <ul style={{ fontSize: '1.15em', lineHeight: '2', marginBottom: '25px' }}>
                  {feature.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>

                <h3 style={{ color: feature.color, fontSize: '1.4em' }}>
                  💻 Пример кода:
                </h3>
                <pre style={{
                  background: '#263238',
                  color: '#aed581',
                  padding: '20px',
                  borderRadius: '10px',
                  fontSize: '0.95em',
                  overflow: 'auto',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {feature.example}
                </pre>
              </>
            )
          })()}
        </div>
      )}

      {/* Итоговая информация */}
      {!selectedFeature && (
        <div style={{
          background: '#fff9c4',
          border: '3px solid #fbc02d',
          borderRadius: '15px',
          padding: '25px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#f57f17', marginTop: 0, fontSize: '1.5em' }}>
            💡 Нажмите на карточку, чтобы узнать подробности!
          </h3>
          <p style={{ fontSize: '1.1em', lineHeight: '1.8', margin: 0 }}>
            React 19 фокусируется на упрощении разработки, улучшении производительности и новых паттернах работы с сервером
          </p>
        </div>
      )}

      <style>
{`@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`}
      </style>
    </div>
  )
}

export default Slide7React19Features