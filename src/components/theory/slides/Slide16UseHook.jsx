import { useState } from 'react'

// Слайд 16: use() - универсальный хук
function Slide16UseHook() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: '🎁 Что такое use()?',
      description: 'Первый хук который можно вызывать условно!',
      content: `**use()** - это новый универсальный хук в React 19, который может читать Promise и Context.

**Главная революционная особенность:**
Это ПЕРВЫЙ хук в истории React, который можно вызывать УСЛОВНО!

**Что может use():**
1. Читать Promise (с Suspense)
2. Читать Context (как useContext)
3. Вызываться в условиях (if)
4. Вызываться в циклах (map, for)

**Сигнатура:**
const value = use(resource)

• resource может быть Promise или Context
• Автоматически интегрируется с Suspense
• Упрощает асинхронную логику`,
      code: `import { use, Suspense, createContext } from 'react'

// ═══════════════════════════════════════
// 1. Чтение Promise (с Suspense)
// ═══════════════════════════════════════

const userPromise = fetch('/api/user').then(r => r.json())

function UserProfile() {
  // use() "разворачивает" Promise
  const user = use(userPromise)

  // Пока Promise pending - компонент приостановлен
  // Когда resolved - рендерится с данными

  return <div>{user.name}</div>
}

// Нужен Suspense!
<Suspense fallback={<div>Загрузка...</div>}>
  <UserProfile />
</Suspense>

// ═══════════════════════════════════════
// 2. Чтение Context (альтернатива useContext)
// ═══════════════════════════════════════

const ThemeContext = createContext('light')

function Button() {
  const theme = use(ThemeContext) // Работает как useContext
  return <button className={theme}>Click</button>
}

// ═══════════════════════════════════════
// 3. Условный вызов (ГЛАВНАЯ ФИЧА!)
// ═══════════════════════════════════════

function Component({ condition, userPromise }) {
  // ✅ МОЖНО вызывать условно!
  if (condition) {
    const user = use(userPromise)
    return <div>{user.name}</div>
  }

  return <div>Условие не выполнено</div>
}

// С другими хуками так НЕЛЬЗЯ:
if (condition) {
  const [state] = useState(0)      // ❌ Ошибка!
  const theme = useContext(Context) // ❌ Ошибка!
}`
    },
    {
      title: '🔄 Как работает use() с Promise',
      description: 'Интеграция с Suspense и Error Boundary',
      content: `**Механизм работы use() с Promise:**

1. **Компонент вызывает use(promise)**
   React проверяет статус Promise

2. **Promise pending (загружается)**
   → React "приостанавливает" компонент
   → Показывает Suspense fallback
   → Ждёт завершения Promise

3. **Promise resolved (успех)**
   → React возобновляет рендеринг
   → use() возвращает данные
   → Компонент рендерится с данными

4. **Promise rejected (ошибка)**
   → React выбрасывает ошибку
   → Error Boundary ловит ошибку
   → Показывается fallback ошибки

**Важно:**
use() требует Suspense ДЛЯ Promise (для Context не нужен)`,
      code: `import { use, Suspense } from 'react'

// Promise с данными
const userPromise = fetch('/api/user').then(r => r.json())

function UserProfile() {
  // Вызываем use()
  const user = use(userPromise)

  // Timeline:
  // 1. use(userPromise) вызван
  // 2. Promise pending → React приостанавливает
  // 3. Показывается Suspense fallback
  // 4. Promise resolved → данные готовы
  // 5. React продолжает рендер
  // 6. user = { name: 'John', email: '...' }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}

// Error Boundary для обработки ошибок
class ErrorBoundary extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <div>❌ Ошибка загрузки!</div>
    }
    return this.props.children
  }
}

// Полная обёртка
function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>⏳ Загрузка...</div>}>
        <UserProfile />
      </Suspense>
    </ErrorBoundary>
  )
}

// Что показывает пользователь:
// 1. "⏳ Загрузка..." (Suspense fallback)
// 2. "John" + email (успешная загрузка)
// Или: "❌ Ошибка загрузки!" (если ошибка)`
    },
    {
      title: '✅ Когда использовать use()',
      description: 'Подходящие сценарии применения',
      content: `**Используй use() когда:**

1. **Условная загрузка данных**
   Нужно загружать данные только при выполнении условия

2. **Загрузка в циклах**
   Загружаешь множество ресурсов динамически

3. **Упрощение асинхронной логики**
   Хочешь избавиться от useState + useEffect

4. **Работа с Suspense**
   Уже используешь Suspense в проекте

5. **Условное чтение Context**
   Нужно читать разные контексты в зависимости от условий`,
      code: `// ═══════════════════════════════════════
// 1. Условная загрузка
// ═══════════════════════════════════════

function UserProfile({ shouldLoad, userId }) {
  // Загружаем только если нужно
  if (shouldLoad) {
    const user = use(fetchUser(userId))
    return <div>{user.name}</div>
  }

  return <div>Профиль скрыт</div>
}

// ═══════════════════════════════════════
// 2. Загрузка в циклах
// ═══════════════════════════════════════

function CommentsList({ commentIds }) {
  return commentIds.map(id => {
    // Загружаем каждый комментарий отдельно
    const comment = use(fetchComment(id))
    return <Comment key={id} data={comment} />
  })
}

// ═══════════════════════════════════════
// 3. Упрощение асинхронной логики
// ═══════════════════════════════════════

// Было (useState + useEffect):
function OldWay() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUser()
      .then(data => {
        setUser(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [])

  if (loading) return <Spinner />
  if (error) return <Error />
  return <div>{user.name}</div>
}

// Стало (use):
function NewWay({ userPromise }) {
  const user = use(userPromise)
  return <div>{user.name}</div>
}

// ═══════════════════════════════════════
// 4. Условное чтение Context
// ═══════════════════════════════════════

function Component({ useSpecialTheme }) {
  if (useSpecialTheme) {
    const theme = use(SpecialThemeContext)
    return <div className={theme}>Special</div>
  }

  const defaultTheme = use(ThemeContext)
  return <div className={defaultTheme}>Default</div>
}

// С useContext так НЕЛЬЗЯ:
if (useSpecialTheme) {
  const theme = useContext(SpecialThemeContext) // ❌ Ошибка!
}`
    },
    {
      title: '❌ Когда НЕ использовать use()',
      description: 'Частые ошибки и антипаттерны',
      content: `**НЕ используй use() когда:**

1. **Нет Suspense для Promise**
   use() с Promise требует Suspense обёртку

2. **Создаёшь Promise в рендере**
   Promise должен быть стабильным (кешированным)

3. **Нет Error Boundary**
   Ошибки Promise нужно обрабатывать

4. **Для обычного state**
   Используй useState для локальных данных

5. **Нужен точный контроль загрузки**
   use() + Suspense - это декларативный подход`,
      code: `// ═══════════════════════════════════════
// ❌ 1. Без Suspense
// ═══════════════════════════════════════

function Bad() {
  const data = use(fetchData()) // ❌ Краш! Нет Suspense
  return <div>{data}</div>
}

// ✅ ПРАВИЛЬНО:
<Suspense fallback={<Spinner />}>
  <Good />
</Suspense>

// ═══════════════════════════════════════
// ❌ 2. Создание Promise в рендере
// ═══════════════════════════════════════

function Bad() {
  // ❌ Новый Promise каждый рендер = бесконечные запросы!
  const data = use(fetch('/api/data'))
  return <div>{data}</div>
}

// ✅ ПРАВИЛЬНО: Promise снаружи
const dataPromise = fetch('/api/data')

function Good() {
  const data = use(dataPromise)
  return <div>{data}</div>
}

// Или с кешем:
const cache = new Map()
function fetchData() {
  if (!cache.has('data')) {
    cache.set('data', fetch('/api/data').then(r => r.json()))
  }
  return cache.get('data')
}

function Good() {
  const data = use(fetchData()) // ✅ Promise кеширован
  return <div>{data}</div>
}

// ═══════════════════════════════════════
// ❌ 3. Без Error Boundary
// ═══════════════════════════════════════

function Bad() {
  const data = use(fetchData()) // ❌ Если ошибка - краш!
  return <div>{data}</div>
}

// ✅ ПРАВИЛЬНО:
<ErrorBoundary fallback={<Error />}>
  <Suspense fallback={<Loading />}>
    <Good />
  </Suspense>
</ErrorBoundary>

// ═══════════════════════════════════════
// ❌ 4. Для обычного state
// ═══════════════════════════════════════

function Bad() {
  const count = use(Promise.resolve(0)) // ❌ Зачем???
  return <div>{count}</div>
}

// ✅ ПРАВИЛЬНО:
function Good() {
  const [count, setCount] = useState(0)
  return <div>{count}</div>
}`
    },
    {
      title: '✅ Плюсы use()',
      description: 'Преимущества нового хука',
      content: `**Плюсы use():**

1. **Условный вызов**
   Первый хук который можно вызывать в if/циклах

2. **Простота асинхронного кода**
   Меньше boilerplate чем useState + useEffect

3. **Интеграция с Suspense**
   Автоматическое управление состоянием загрузки

4. **Универсальный API**
   Работает с Promise и Context одинаково

5. **Декларативность**
   Не нужно вручную управлять loading/error

6. **Композиция**
   Легко комбинировать с другими хуками`,
      code: `// ═══════════════════════════════════════
// Плюс 1: Условный вызов
// ═══════════════════════════════════════

function Component({ condition }) {
  // ✅ use() можно вызывать условно!
  if (condition) {
    const data = use(promise)
    return <div>{data}</div>
  }
  return null
}

// Другие хуки так НЕ могут:
if (condition) {
  const [state] = useState(0)      // ❌ Ошибка!
  const value = useContext(Ctx)    // ❌ Ошибка!
  const ref = useRef(null)         // ❌ Ошибка!
}

// ═══════════════════════════════════════
// Плюс 2: Простота асинхронного кода
// ═══════════════════════════════════════

// Было (17 строк):
function OldWay() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Spinner />
  if (error) return <Error />
  return <div>{data}</div>
}

// Стало (3 строки):
function NewWay({ dataPromise }) {
  const data = use(dataPromise)
  return <div>{data}</div>
}

// ═══════════════════════════════════════
// Плюс 3: Автоматический Suspense
// ═══════════════════════════════════════

<Suspense fallback={<Loading />}>
  <Component /> {/* use() внутри */}
</Suspense>

// React автоматически:
// • Показывает Loading пока данные грузятся
// • Переключает на контент когда готово
// • Обрабатывает concurrent updates

// ═══════════════════════════════════════
// Плюс 4: Универсальный API
// ═══════════════════════════════════════

const theme = use(ThemeContext)    // Context
const user = use(userPromise)      // Promise
const posts = use(postsPromise)    // Promise

// Один хук для разных типов ресурсов!

// ═══════════════════════════════════════
// Плюс 6: Композиция
// ═══════════════════════════════════════

function useUserWithPosts(userId) {
  // Комбинируем use() с другими хуками
  const user = use(fetchUser(userId))
  const posts = use(fetchPosts(userId))

  return { user, posts }
}

function Profile({ userId }) {
  const { user, posts } = useUserWithPosts(userId)
  return (
    <div>
      <h1>{user.name}</h1>
      {posts.map(post => <Post key={post.id} {...post} />)}
    </div>
  )
}`
    },
    {
      title: '❌ Минусы use()',
      description: 'Ограничения и недостатки',
      content: `**Минусы use():**

1. **Требует Suspense**
   Нужно оборачивать каждый компонент

2. **Нужен Error Boundary**
   Дополнительная обёртка для обработки ошибок

3. **Сложность с кешированием**
   Promise должен быть стабильным

4. **Waterfall проблема**
   Последовательная загрузка вместо параллельной

5. **Не подходит для императивной логики**
   Нет точного контроля над запросами

6. **Legacy код**
   Не работает без Suspense (нужна миграция)`,
      code: `// ═══════════════════════════════════════
// Минус 1: Требует Suspense
// ═══════════════════════════════════════

// Каждый компонент с use() нужно оборачивать
<Suspense fallback={<Loading />}>
  <Component1 /> {/* use() внутри */}
</Suspense>

<Suspense fallback={<Loading />}>
  <Component2 /> {/* use() внутри */}
</Suspense>

// Много boilerplate в разметке

// ═══════════════════════════════════════
// Минус 2: Error Boundary обязателен
// ═══════════════════════════════════════

<ErrorBoundary fallback={<Error />}>
  <Suspense fallback={<Loading />}>
    <Component /> {/* use() внутри */}
  </Suspense>
</ErrorBoundary>

// Без ErrorBoundary - вся страница крашнется

// ═══════════════════════════════════════
// Минус 3: Кеширование Promise
// ═══════════════════════════════════════

// ❌ Плохо: новый Promise каждый раз
function Bad() {
  const data = use(fetch('/api')) // Бесконечные запросы!
}

// ✅ Нужно кешировать вручную
const cache = new Map()
function fetchData(key) {
  if (!cache.has(key)) {
    cache.set(key, fetch(\`/api/\${key}\`).then(r => r.json()))
  }
  return cache.get(key)
}

// Дополнительная сложность!

// ═══════════════════════════════════════
// Минус 4: Waterfall
// ═══════════════════════════════════════

function Parent() {
  const user = use(fetchUser()) // Ждём user

  // Posts загружаются ТОЛЬКО после user ❌
  return <Child userId={user.id} />
}

function Child({ userId }) {
  const posts = use(fetchPosts(userId)) // Waterfall!
  return <Posts data={posts} />
}

// Лучше загружать параллельно:
const userPromise = fetchUser()
const postsPromise = fetchPosts()

function Parent() {
  const user = use(userPromise)
  return <Child postsPromise={postsPromise} />
}

// ═══════════════════════════════════════
// Минус 5: Нет императивного контроля
// ═══════════════════════════════════════

// Нельзя сделать:
function Component() {
  const data = use(promise)

  // ❌ Нет доступа к:
  // - Статусу загрузки (loading)
  // - Ошибке (error)
  // - Retry функции
  // - Cancel функции

  // Всё управляется декларативно через Suspense/ErrorBoundary
}

// С React Query больше контроля:
const { data, isLoading, error, refetch } = useQuery(...)
if (isLoading) return <Spinner />
if (error) return <Error onRetry={refetch} />`
    },
    {
      title: '📊 Сравнение подходов',
      description: 'use() vs useState+useEffect vs React Query',
      content: `

**Вывод:**
• use() - для простых случаев с Suspense
• useState+useEffect - для полного контроля
• React Query - для продакшена с кешем`,
      code: `// ═══════════════════════════════════════
// Подход 1: use() (React 19)
// ═══════════════════════════════════════

const userPromise = fetch('/api/user').then(r => r.json())

function Component() {
  const user = use(userPromise)
  return <div>{user.name}</div>
}

<Suspense fallback={<Loading />}>
  <Component />
</Suspense>

// Плюсы: Просто, декларативно
// Минусы: Нужен Suspense, нет retry

// ═══════════════════════════════════════
// Подход 2: useState + useEffect
// ═══════════════════════════════════════

function Component() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/user')
      .then(r => r.json())
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loading />
  if (error) return <Error onRetry={() => window.location.reload()} />
  return <div>{user.name}</div>
}

// Плюсы: Полный контроль
// Минусы: Много boilerplate

// ═══════════════════════════════════════
// Подход 3: React Query
// ═══════════════════════════════════════

import { useQuery } from '@tanstack/react-query'

function Component() {
  const { data: user, isLoading, error, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetch('/api/user').then(r => r.json())
  })

  if (isLoading) return <Loading />
  if (error) return <Error onRetry={refetch} />
  return <div>{user.name}</div>
}

// Плюсы: Авто-кеш, retry, оптимизация
// Минусы: Зависимость от библиотеки

// ═══════════════════════════════════════
// Когда что использовать?
// ═══════════════════════════════════════

// use() - если:
// • Простое приложение
// • Уже используешь Suspense
// • Не нужен кеш/retry

// useState+useEffect - если:
// • Нужен полный контроль
// • Legacy проект без Suspense
// • Сложная логика загрузки

// React Query - если:
// • Продакшн проект
// • Нужен кеш и оптимизация
// • Сложные запросы с зависимостями`
    },
    {
      title: '💡 Итоговые рекомендации',
      description: 'Когда и как использовать use()',
      content: `**Рекомендации по использованию use():**

**Используй use() для:**
✅ Условной загрузки данных
✅ Упрощения асинхронного кода
✅ Проектов с Suspense
✅ Простых случаев без кеша

**НЕ используй use() для:**
❌ Сложных запросов с кешем (React Query)
❌ Legacy кода без Suspense
❌ Когда нужен точный контроль
❌ Обычного локального state

**Золотое правило:**
use() - это эволюция useContext + упрощение Promise.
Главная фича = условный вызов!

**Миграция:**
1. Новые проекты - можно использовать
2. Существующие - постепенно с Suspense
3. Продакшн - добавь React Query`,
      code: `// ═══════════════════════════════════════
// Полный production-ready пример
// ═══════════════════════════════════════

import { use, Suspense } from 'react'

// Кеш для Promise
const cache = new Map()

function fetchUser(id) {
  const key = \`user-\${id}\`
  if (!cache.has(key)) {
    cache.set(
      key,
      fetch(\`/api/users/\${id}\`).then(r => r.json())
    )
  }
  return cache.get(key)
}

// Компонент с use()
function UserProfile({ userId, showPosts }) {
  const user = use(fetchUser(userId))

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>

      {/* Условная загрузка постов */}
      {showPosts && (
        <Suspense fallback={<div>Загрузка постов...</div>}>
          <UserPosts userId={userId} />
        </Suspense>
      )}
    </div>
  )
}

function UserPosts({ userId }) {
  const posts = use(fetchPosts(userId))
  return posts.map(post => <Post key={post.id} {...post} />)
}

// Error Boundary
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Ошибка загрузки</h2>
          <button onClick={() => window.location.reload()}>
            Повторить
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

// App с полной обёрткой
function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Загрузка профиля...</div>}>
        <UserProfile userId={1} showPosts={true} />
      </Suspense>
    </ErrorBoundary>
  )
}

// ✅ Готово к продакшену:
// • Кеш Promise
// • Error handling
// • Suspense для loading
// • Условная загрузка`
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
        🎁 use() - Универсальный хук
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
              backgroundColor: activeStep === idx ? '#3b82f6' : '#f5f5f5',
              color: activeStep === idx ? 'white' : '#333',
              border: `2px solid ${activeStep === idx ? '#3b82f6' : '#ddd'}`,
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
        border: '3px solid #3b82f6',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
      }}>
        <h2 style={{
          color: '#3b82f6',
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
            <h3 style={{ color: '#3b82f6', fontSize: '1.4em' }}>
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
          background: '#dbeafe',
          border: '3px solid #3b82f6',
          borderRadius: '15px',
          padding: '25px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#1e40af', marginTop: 0, fontSize: '1.5em' }}>
            🎯 Главная особенность use()
          </h3>
          <p style={{ fontSize: '1.2em', lineHeight: '1.8', margin: 0 }}>
            <strong>Первый хук который можно вызывать условно!</strong><br />
            Используй для упрощения асинхронного кода с Suspense.<br />
            Для продакшена с кешем - React Query всё ещё лучше.
          </p>
        </div>
      )}
    </div>
  )
}

export default Slide16UseHook
