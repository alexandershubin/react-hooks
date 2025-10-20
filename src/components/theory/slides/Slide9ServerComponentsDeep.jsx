import { useState } from 'react'

// Слайд 9: Как работают Server Components
function Slide9ServerComponentsDeep() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: '🤔 Проблема: Весь React на клиенте',
      description: 'Традиционный подход: весь код выполняется в браузере',
      content: `**Как работает классический React:**

1. Сервер отправляет HTML (пустой или с SSR)
2. Браузер загружает весь JavaScript бандл
3. React "гидрирует" (hydrate) приложение
4. Все компоненты выполняются на клиенте
5. Все данные загружаются через API

**Проблемы:**
• Большой размер бандла (весь код React + библиотеки)
• Медленная загрузка на слабых устройствах
• Нужны отдельные API endpoints
• Дублирование логики (сервер + клиент)
• Waterfall запросов (компонент → запрос → данные)`,
      code: `// Классический Client Component
'use client' // или без этого в React 17
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    // Запрос 1: загрузка пользователя
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(setUser)

    // Запрос 2: загрузка постов
    fetch(\`/api/users/\${userId}/posts\`)
      .then(res => res.json())
      .then(setPosts)
  }, [userId])

  if (!user) return <Spinner />

  return (
    <div>
      <h1>{user.name}</h1>
      {posts.map(post => <Post key={post.id} {...post} />)}
    </div>
  )
}

// Проблемы:
// ❌ Весь код Post компонента в бандле
// ❌ 2 отдельных запроса к API
// ❌ Waterfall: сначала компонент, потом данные
// ❌ Нужен отдельный API endpoint`
    },
    {
      title: '🌐 Решение: Server Components',
      description: 'Компоненты выполняются на сервере',
      content: `**React Server Components (RSC):**

Компонент выполняется на сервере, рендерит в специальный формат и отправляет результат браузеру.

**Ключевое отличие:**
• Server Component рендерится на сервере → результат → клиент
• Client Component рендерится на клиенте (как обычно)
• Можно комбинировать оба типа!

**Что может Server Component:**
✅ Прямой доступ к БД
✅ Читать файлы с сервера
✅ Использовать секретные ключи (не попадут в клиент!)
✅ Тяжёлые зависимости остаются на сервере

**Что НЕ может:**
❌ useState, useEffect - нет интерактивности
❌ Обработчики событий (onClick и т.д.)
❌ Browser APIs (window, document)`,
      code: `// Server Component (по умолчанию в Next.js App Router)
async function UserProfile({ userId }) {
  // ✅ Прямой доступ к БД на сервере!
  const user = await db.users.findUnique({
    where: { id: userId },
    include: { posts: true } // Одним запросом!
  })

  return (
    <div>
      <h1>{user.name}</h1>
      {user.posts.map(post => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  )
}

// Преимущества:
// ✅ Код db и библиотек НЕ попадёт в бандл клиента
// ✅ 1 запрос к БД вместо 2 к API
// ✅ Нет waterfall - данные сразу
// ✅ Нет loading state - данные уже есть`
    },
    {
      title: '🔄 Как это работает: Сериализация',
      description: 'React преобразует компоненты в специальный формат',
      content: `**Процесс рендеринга Server Component:**

1. **Сервер выполняет компонент**
   - Вызывает функцию компонента
   - Загружает данные из БД
   - Выполняет всю логику

2. **Сериализация в RSC Wire Format**
   - Не HTML! Специальный формат React
   - Содержит: тип элемента, props, дочерние элементы
   - Компактнее чем HTML

3. **Отправка клиенту**
   - Стримится частями (можно!)
   - Клиент получает описание дерева

4. **Клиент восстанавливает дерево**
   - React на клиенте читает формат
   - Строит виртуальное дерево
   - Рендерит в DOM`,
      code: `// Server Component
function UserCard({ userId }) {
  const user = await db.users.findOne(userId)
  return <div className="card">{user.name}</div>
}

// Сериализуется в RSC Wire Format (упрощённо):
/*
{
  type: "div",
  props: { className: "card" },
  children: [
    { type: "text", value: "John Doe" }
  ]
}
*/

// Отправляется клиенту как поток:
/*
M1:{"id":"./UserCard.js","chunks":[],"name":""}
J0:["$","div",null,{"className":"card","children":"John Doe"}]
*/

// Клиент восстанавливает:
const element = React.createElement(
  'div',
  { className: 'card' },
  'John Doe'
)

// И рендерит в DOM:
// <div class="card">John Doe</div>`
    },
    {
      title: '🔀 Композиция: Server + Client',
      description: 'Комбинирование серверных и клиентских компонентов',
      content: `**Правила композиции:**

1. Server Component может импортировать Server Component ✅
2. Server Component может импортировать Client Component ✅
3. Client Component НЕ может импортировать Server Component ❌
   (но может получить его как children!)

**Почему такие правила?**
• Server Component выполняется на сервере
• Client Component выполняется в браузере
• Нельзя "вызвать" серверный код из браузера
• Но можно передать результат как prop!

**Паттерн: Composition**
Передавайте Server Component как children/prop в Client Component`,
      code: `// ✅ ПРАВИЛЬНО: Server → Server
// ServerPage.jsx (Server Component)
import ServerSidebar from './ServerSidebar' // Server

export default function Page() {
  return <ServerSidebar />
}

// ✅ ПРАВИЛЬНО: Server → Client
// ServerPage.jsx (Server Component)
import ClientButton from './ClientButton' // Client

export default function Page() {
  return <ClientButton onClick={...} /> {/* ❌ onClick не работает! */}
}

// ❌ НЕПРАВИЛЬНО: Client → Server
'use client'
import ServerData from './ServerData' // ❌ Ошибка!

// ✅ ПРАВИЛЬНО: Composition pattern
// ServerPage.jsx (Server)
import ClientLayout from './ClientLayout'
import ServerData from './ServerData'

export default function Page() {
  return (
    <ClientLayout>
      {/* Передаём Server Component как children */}
      <ServerData />
    </ClientLayout>
  )
}

// ClientLayout.jsx (Client)
'use client'
export default function ClientLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && children} {/* Server Component здесь! */}
    </div>
  )
}`
    },
    {
      title: '⚙️ Server Actions: Как работают',
      description: 'Вызов серверных функций из клиента',
      content: `**Server Action** - это функция с директивой 'use server'

**Как это работает:**

1. **Определение на сервере**
   - Функция помечена 'use server'
   - React создаёт уникальный ID для функции

2. **Генерация endpoint**
   - React автоматически создаёт HTTP endpoint
   - Клиент получает "ссылку" на эту функцию

3. **Вызов с клиента**
   - Клиент вызывает функцию как обычно
   - React автоматически делает POST запрос
   - Данные сериализуются и отправляются

4. **Выполнение на сервере**
   - Сервер получает запрос
   - Выполняет функцию
   - Возвращает результат

5. **Результат на клиенте**
   - Автоматическая десериализация
   - React обновляет UI`,
      code: `// 1. Определение Server Action
'use server'
export async function createTodo(formData) {
  const title = formData.get('title')

  // Выполняется на сервере!
  const todo = await db.todos.create({
    data: { title }
  })

  // Можем делать редирект
  redirect('/todos')

  return todo
}

// 2. React генерирует (под капотом):
// POST /actions/createTodo_abc123
// Клиент получает ссылку: createTodo_abc123

// 3. Использование в Client Component
'use client'
import { createTodo } from './actions'

export default function TodoForm() {
  return (
    <form action={createTodo}>
      {/* При submit React автоматически: */}
      {/* 1. Собирает FormData */}
      {/* 2. POST /actions/createTodo_abc123 */}
      {/* 3. Ждёт ответа */}
      {/* 4. Обновляет страницу */}
      <input name="title" />
      <button type="submit">Add</button>
    </form>
  )
}

// 4. Работает даже БЕЗ JavaScript! (прогрессивное улучшение)
// Если JS отключен - обычная форма с POST запросом`
    },
    {
      title: '🎯 Practical Example',
      description: 'Реальный пример: страница блога',
      content: `Комбинируем Server Components, Client Components и Server Actions`,
      code: `// app/blog/[slug]/page.jsx - Server Component
import { ClientComments } from './ClientComments'
import { likePost } from './actions'

export default async function BlogPost({ params }) {
  // ✅ Прямой доступ к БД
  const post = await db.posts.findUnique({
    where: { slug: params.slug },
    include: { author: true, comments: true }
  })

  return (
    <article>
      <h1>{post.title}</h1>
      <p>By {post.author.name}</p>

      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* Server Action для лайков */}
      <form action={likePost}>
        <input type="hidden" name="postId" value={post.id} />
        <button type="submit">
          ❤️ {post.likes}
        </button>
      </form>

      {/* Client Component для интерактивных комментариев */}
      <ClientComments comments={post.comments} postId={post.id} />
    </article>
  )
}

// ClientComments.jsx - Client Component
'use client'
import { useState } from 'react'
import { addComment } from './actions'

export function ClientComments({ comments: initialComments, postId }) {
  const [comments, setComments] = useState(initialComments)

  return (
    <div>
      <h2>Comments</h2>
      {comments.map(c => <Comment key={c.id} {...c} />)}

      <form action={async (formData) => {
        // Оптимистичное обновление
        const text = formData.get('text')
        setComments([...comments, { text, pending: true }])

        // Server Action
        const newComment = await addComment(formData)

        // Обновляем после ответа
        setComments(prev =>
          prev.filter(c => !c.pending).concat(newComment)
        )
      }}>
        <input name="text" />
        <input type="hidden" name="postId" value={postId} />
        <button>Add Comment</button>
      </form>
    </div>
  )
}

// actions.js - Server Actions
'use server'
export async function likePost(formData) {
  const postId = formData.get('postId')
  await db.posts.update({
    where: { id: postId },
    data: { likes: { increment: 1 } }
  })
  revalidatePath(\`/blog/\${postId}\`)
}

export async function addComment(formData) {
  const postId = formData.get('postId')
  const text = formData.get('text')

  const comment = await db.comments.create({
    data: { postId, text }
  })

  revalidatePath(\`/blog/\${postId}\`)
  return comment
}

// Итог:
// ✅ БД код только на сервере
// ✅ Маленький бандл (нет prisma на клиенте)
// ✅ Безопасно (секреты БД не утекут)
// ✅ Быстро (данные сразу, нет waterfall)
// ✅ Интерактивно (Client Components где нужно)`
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
        🌐 Как работают Server Components
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
              backgroundColor: activeStep === idx ? '#10b981' : '#f5f5f5',
              color: activeStep === idx ? 'white' : '#333',
              border: `2px solid ${activeStep === idx ? '#10b981' : '#ddd'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: activeStep === idx ? 'bold' : 'normal',
              transition: 'all 0.3s ease',
              flex: '1 1 200px'
            }}
          >
            Шаг {idx + 1}
          </button>
        ))}
      </div>

      {/* Текущий шаг */}
      <div style={{
        background: 'white',
        border: '3px solid #10b981',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
      }}>
        <h2 style={{
          color: '#10b981',
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
            <h3 style={{ color: '#10b981', fontSize: '1.4em' }}>
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
    </div>
  )
}

export default Slide9ServerComponentsDeep