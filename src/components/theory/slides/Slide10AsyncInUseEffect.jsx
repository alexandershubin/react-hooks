import { useState } from 'react'

// Слайд 10: Почему нельзя async в useEffect
function Slide10AsyncInUseEffect() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: '❌ Проблема: async в useEffect',
      description: 'Что не так с async функцией напрямую?',
      content: `**Попытка использовать async напрямую:**

Многие разработчики пытаются сделать так:`,
      code: `// ❌ ОШИБКА! Так нельзя делать!
useEffect(async () => {
  const data = await fetch('/api/data')
  const json = await data.json()
  setData(json)
}, [])

// React выдаст предупреждение:
// ⚠️ Warning: useEffect must not return anything besides
// a function, which is used for clean-up.`,
      issue: `**Что не так?**

async функция ВСЕГДА возвращает Promise!

useEffect ожидает:
• либо ничего (undefined)
• либо cleanup функцию

А получает Promise - это некорректно!`
    },
    {
      title: '🔍 Почему это проблема?',
      description: 'Техническое объяснение',
      content: `**Как работает useEffect:**

1. React вызывает функцию эффекта
2. Запоминает возвращаемое значение
3. Если вернулась функция - это cleanup
4. При следующем эффекте или размонтировании вызывает cleanup

**Что происходит с async:**`,
      code: `// Что на самом деле происходит:
useEffect(async () => {
  // ...
}, [])

// Превращается в:
useEffect(() => {
  return new Promise(async (resolve) => {
    // ...
    resolve(undefined)
  })
}, [])

// React получает Promise вместо функции!
// React попытается вызвать Promise как функцию
// promise() // ❌ TypeError!`,
      issue: `**Последствия:**

1. React не может вызвать cleanup (это Promise, не функция)
2. Теряется механизм очистки
3. Возможны утечки памяти
4. Race conditions (состояние гонки)`
    },
    {
      title: '🐛 Race Condition',
      description: 'Состояние гонки без cleanup',
      content: `**Что такое Race Condition?**

Когда несколько асинхронных операций выполняются одновременно, результаты могут прийти в неправильном порядке.

**Сценарий проблемы:**

1. Пользователь выбирает User ID = 1
2. Начинается запрос для User 1
3. Пользователь меняет на User ID = 2
4. Начинается запрос для User 2
5. Запрос User 2 завершается первым ✅
6. Запрос User 1 завершается вторым ❌
7. На экране данные User 1, хотя выбран User 2!`,
      code: `// ❌ ПРОБЛЕМА: Race condition
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)

  useEffect(async () => {
    // Запрос для userId
    const response = await fetch(\`/api/users/\${userId}\`)
    const data = await response.json()
    setUser(data) // Установит того, кто пришёл последним!
  }, [userId])

  return <div>{user?.name}</div>
}

// Timeline проблемы:
// 0ms:   userId=1, запрос начат
// 100ms: userId=2, запрос начат (первый ещё не завершён!)
// 150ms: Ответ для userId=2 пришёл, setUser(user2) ✅
// 200ms: Ответ для userId=1 пришёл, setUser(user1) ❌
// Результат: показываем user1, но userId=2!`,
      issue: `**Почему без cleanup это хуже:**

Если бы был cleanup, мы могли бы:
• Отменить предыдущий запрос
• Игнорировать устаревшие ответы
• Избежать гонки`
    },
    {
      title: '✅ Решение 1: async внутри',
      description: 'Создать async функцию внутри эффекта',
      content: `**Правильный способ: async функция внутри useEffect**

Создаём async функцию ВНУТРИ и вызываем её:`,
      code: `// ✅ ПРАВИЛЬНО: async функция внутри
useEffect(() => {
  // Создаём async функцию
  const fetchData = async () => {
    try {
      const response = await fetch('/api/data')
      const json = await response.json()
      setData(json)
    } catch (error) {
      setError(error)
    }
  }

  // Вызываем её
  fetchData()

  // Можем вернуть cleanup функцию
  return () => {
    // Очистка
  }
}, [])

// useEffect возвращает функцию (cleanup), не Promise ✅`,
      issue: `**Почему это работает:**

1. useEffect получает обычную функцию
2. Внутри неё вызывается async функция
3. useEffect может вернуть cleanup
4. Всё корректно!`
    },
    {
      title: '✅ Решение 2: AbortController',
      description: 'Отмена запроса при размонтировании',
      content: `**Продвинутое решение: отмена запросов**

Используем AbortController для отмены устаревших запросов:`,
      code: `// ✅ ПРАВИЛЬНО: с отменой запроса
useEffect(() => {
  // Создаём контроллер для отмены
  const abortController = new AbortController()

  const fetchUser = async () => {
    try {
      const response = await fetch(
        \`/api/users/\${userId}\`,
        { signal: abortController.signal } // Передаём сигнал
      )
      const data = await response.json()
      setUser(data)
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Запрос отменён')
        return // Игнорируем отменённый запрос
      }
      setError(error)
    }
  }

  fetchUser()

  // Cleanup: отменяем запрос при размонтировании
  return () => {
    abortController.abort() // Отменяет fetch!
  }
}, [userId])

// Теперь при смене userId:
// 1. Старый эффект вызывает cleanup
// 2. abort() отменяет старый запрос
// 3. Новый эффект начинает новый запрос
// 4. Race condition решён! ✅`,
      issue: `**Преимущества:**

✅ Отменяет устаревшие запросы
✅ Нет race condition
✅ Экономит трафик
✅ Избегает утечек памяти`
    },
    {
      title: '✅ Решение 3: флаг cancelled',
      description: 'Игнорирование устаревших результатов',
      content: `**Альтернатива: флаг для игнорирования**

Если API не поддерживает отмену, используем флаг:`,
      code: `// ✅ ПРАВИЛЬНО: флаг cancelled
useEffect(() => {
  let cancelled = false // Флаг отмены

  const fetchUser = async () => {
    const response = await fetch(\`/api/users/\${userId}\`)
    const data = await response.json()

    // Проверяем флаг перед обновлением state
    if (!cancelled) {
      setUser(data) // Обновляем только если не отменено
    } else {
      console.log('Результат проигнорирован')
    }
  }

  fetchUser()

  // Cleanup: устанавливаем флаг
  return () => {
    cancelled = true // Помечаем как отменённый
  }
}, [userId])

// Что происходит:
// 1. userId=1: запрос начат, cancelled=false
// 2. userId=2: cleanup вызван, cancelled=true для userId=1
// 3. userId=2: новый запрос, cancelled=false
// 4. Ответ userId=1 приходит, но cancelled=true
//    → setUser НЕ вызывается ✅
// 5. Ответ userId=2 приходит, cancelled=false
//    → setUser вызывается ✅`,
      issue: `**Когда использовать:**

• Старые браузеры без AbortController
• API без поддержки отмены
• Простые случаи

**Минус:** Запрос всё равно выполняется (просто игнорируем результат)`
    },
    {
      title: '🎯 Полный пример',
      description: 'Все паттерны вместе',
      content: `**Продакшн-готовый код с обработкой всех случаев:**`,
      code: `function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Флаг для игнорирования
    let cancelled = false

    // Контроллер для отмены
    const abortController = new AbortController()

    const fetchUser = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          \`/api/users/\${userId}\`,
          {
            signal: abortController.signal,
            // Дополнительные опции
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        if (!response.ok) {
          throw new Error(\`HTTP \${response.status}\`)
        }

        const data = await response.json()

        // Двойная проверка!
        if (!cancelled) {
          setUser(data)
        }
      } catch (err) {
        // Игнорируем отменённые запросы
        if (err.name === 'AbortError') {
          console.log('Запрос отменён')
          return
        }

        // Проверяем cancelled перед установкой ошибки
        if (!cancelled) {
          setError(err.message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchUser()

    // Cleanup функция
    return () => {
      cancelled = true
      abortController.abort()
    }
  }, [userId]) // Зависимость: перезапускается при смене userId

  if (loading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка: {error}</div>
  if (!user) return null

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}`,
      issue: `**Что здесь сделано:**

✅ async функция внутри useEffect
✅ AbortController для отмены запроса
✅ Флаг cancelled для двойной защиты
✅ Обработка ошибок
✅ Loading и error состояния
✅ Проверка response.ok
✅ Cleanup функция
✅ Нет race condition!`
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
        ⚠️ Почему нельзя async в useEffect
      </h1>

      {/* Навигация */}
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
              backgroundColor: activeStep === idx ? '#f59e0b' : '#f5f5f5',
              color: activeStep === idx ? 'white' : '#333',
              border: `2px solid ${activeStep === idx ? '#f59e0b' : '#ddd'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: activeStep === idx ? 'bold' : 'normal',
              transition: 'all 0.3s ease',
              flex: '1 1 150px'
            }}
          >
            {idx === 0 ? '❌' : '✅'} Шаг {idx + 1}
          </button>
        ))}
      </div>

      {/* Текущий шаг */}
      <div style={{
        background: 'white',
        border: `3px solid ${activeStep === 0 || activeStep === 1 || activeStep === 2 ? '#ef4444' : '#10b981'}`,
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
      }}>
        <h2 style={{
          color: activeStep === 0 || activeStep === 1 || activeStep === 2 ? '#ef4444' : '#10b981',
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
            <h3 style={{
              color: activeStep === 0 || activeStep === 1 || activeStep === 2 ? '#ef4444' : '#10b981',
              fontSize: '1.4em'
            }}>
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
              marginBottom: '20px'
            }}>
              {steps[activeStep].code}
            </pre>
          </>
        )}

        {steps[activeStep].issue && (
          <div style={{
            background: activeStep === 0 || activeStep === 1 || activeStep === 2 ? '#fee2e2' : '#d1fae5',
            border: `2px solid ${activeStep === 0 || activeStep === 1 || activeStep === 2 ? '#ef4444' : '#10b981'}`,
            borderRadius: '10px',
            padding: '20px',
            fontSize: '1.1em',
            lineHeight: '1.8',
            whiteSpace: 'pre-line'
          }}>
            {steps[activeStep].issue}
          </div>
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

      {/* Итог */}
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
            <strong>Никогда не делайте useEffect async напрямую!</strong><br />
            Создавайте async функцию внутри и используйте cleanup для отмены запросов.
          </p>
        </div>
      )}
    </div>
  )
}

export default Slide10AsyncInUseEffect