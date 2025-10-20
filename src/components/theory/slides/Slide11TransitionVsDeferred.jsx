import { useState } from 'react'

// Слайд 11: useTransition vs useDeferredValue
function Slide11TransitionVsDeferred() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: '🤔 В чём разница?',
      description: 'Оба решают одну проблему, но по-разному',
      content: `Оба хука помогают сделать UI отзывчивым при тяжёлых обновлениях, но работают по-разному:

**useTransition:**
• Ты контролируешь **ОБНОВЛЕНИЕ** (когда вызываешь setState)
• "Я хочу отложить ЭТО конкретное обновление состояния"
• Оборачиваешь setState в startTransition()

**useDeferredValue:**
• Ты контролируешь **ЗНАЧЕНИЕ** (React сам его откладывает)
• "Сделай мне отложенную копию этого значения"
• Создаёшь отложенную версию значения

**Главное отличие:**
useTransition = контроль над действием (action)
useDeferredValue = контроль над данными (value)`,
      code: `// useTransition - контроль обновления
const [isPending, startTransition] = useTransition()

startTransition(() => {
  setState(newValue) // Откладываем ЭТО обновление
})

// useDeferredValue - контроль значения
const [value, setValue] = useState('')
const deferredValue = useDeferredValue(value)
// value - мгновенно
// deferredValue - с задержкой`
    },
    {
      title: '🔄 useTransition - контроль обновления',
      description: 'Оборачиваем setState в startTransition',
      content: `**Когда использовать:**
• У тебя ЕСТЬ доступ к месту где вызывается setState
• Ты сам делаешь тяжёлые вычисления
• Нужен флаг isPending для показа загрузки

**Как работает:**
1. Вызываешь startTransition(() => setState(...))
2. React помечает это обновление как низкоприоритетное
3. isPending = true пока обновление выполняется
4. Можешь показать спиннер или индикатор загрузки

**Плюсы:**
✅ Больше контроля (знаешь когда началось/закончилось)
✅ Встроенный isPending флаг
✅ Гибкость - можешь обернуть любое обновление

**Минусы:**
❌ Больше кода
❌ Нужно оборачивать каждое обновление вручную`,
      code: `function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isPending, startTransition] = useTransition()

  const handleSearch = (e) => {
    const value = e.target.value

    // Высокий приоритет - мгновенно
    setQuery(value)

    // Низкий приоритет - откладываем
    startTransition(() => {
      // Тяжёлые вычисления
      const filtered = hugeList.filter(item =>
        item.includes(value)
      )
      setResults(filtered)
    })
  }

  return (
    <>
      <input value={query} onChange={handleSearch} />
      {isPending && <Spinner />} {/* Показываем загрузку */}
      <Results items={results} />
    </>
  )
}

// Timeline:
// 0ms   - Ввод "a"
// 1ms   - setQuery('a') выполнен ✅ (инпут обновился)
// 1ms   - isPending = true
// 100ms - setResults выполнен ✅
// 100ms - isPending = false`
    },
    {
      title: '⏳ useDeferredValue - контроль значения',
      description: 'Создаём отложенную копию значения',
      content: `**Когда использовать:**
• У тебя НЕТ доступа к месту где вызывается setState
• Тяжёлые вычисления в дочернем компоненте
• Работаешь со сторонней библиотекой
• Нужна простота (меньше кода)

**Как работает:**
1. Создаёшь deferredValue = useDeferredValue(value)
2. React создаёт копию value которая обновляется с задержкой
3. value обновляется мгновенно
4. deferredValue обновляется в фоне (низкий приоритет)

**Плюсы:**
✅ Меньше кода
✅ Не нужно оборачивать setState
✅ Работает "магически"

**Минусы:**
❌ Нет встроенного isPending (но можно сравнить value !== deferredValue)
❌ Меньше контроля`,
      code: `function SearchPage() {
  const [query, setQuery] = useState('')

  // Создаём отложенную версию query
  const deferredQuery = useDeferredValue(query)

  const handleSearch = (e) => {
    setQuery(e.target.value) // Обычное обновление
  }

  return (
    <>
      {/* Инпут использует query - мгновенно */}
      <input value={query} onChange={handleSearch} />

      {/* Можно показать загрузку */}
      {query !== deferredQuery && <Spinner />}

      {/* Список использует deferredQuery - с задержкой */}
      <HeavyList searchQuery={deferredQuery} />
    </>
  )
}

function HeavyList({ searchQuery }) {
  // Тяжёлая фильтрация происходит здесь
  const results = useMemo(() =>
    hugeList.filter(item => item.includes(searchQuery))
  , [searchQuery])

  return <Results items={results} />
}

// Timeline:
// 0ms   - Ввод "a"
// 1ms   - setQuery('a') выполнен ✅
// 1ms   - query = 'a', deferredQuery = '' (старое)
// 100ms - deferredQuery = 'a' ✅ (список обновился)`
    },
    {
      title: '⚖️ Сравнение: useTransition',
      description: 'Переключение табов с useTransition',
      content: `**Пример: Переключение между тяжёлыми табами**

Представь что у тебя табы с тяжёлыми списками (5000 элементов каждый).

**Проблема без useTransition:**
• Клик на кнопку → UI зависает на 300мс
• Пользователь не видит что кнопка нажата
• Плохой UX ❌

**Решение с useTransition:**
• Клик на кнопку → кнопка реагирует мгновенно
• Старый контент остаётся видимым (можно сделать полупрозрачным)
• Новый контент рендерится в фоне
• Плавный переход! ✅`,
      code: `// БЕЗ useTransition
function Tabs() {
  const [tab, setTab] = useState('posts')

  return (
    <>
      <button onClick={() => setTab('posts')}>
        Посты
      </button>
      <button onClick={() => setTab('comments')}>
        Комментарии
      </button>

      {tab === 'posts' && <HeavyPostsList />}
      {tab === 'comments' && <HeavyCommentsList />}
    </>
  )
}
// ❌ При клике UI зависает на 300мс

// С useTransition ✅
function Tabs() {
  const [tab, setTab] = useState('posts')
  const [isPending, startTransition] = useTransition()

  const switchTab = (newTab) => {
    startTransition(() => {
      setTab(newTab)
    })
  }

  return (
    <>
      <button onClick={() => switchTab('posts')}>
        Посты
      </button>
      <button onClick={() => switchTab('comments')}>
        Комментарии
      </button>

      {/* Показываем загрузку */}
      <div style={{ opacity: isPending ? 0.5 : 1 }}>
        {tab === 'posts' && <HeavyPostsList />}
        {tab === 'comments' && <HeavyCommentsList />}
      </div>
    </>
  )
}
// ✅ Кнопка реагирует мгновенно
// ✅ Старый контент остаётся видимым
// ✅ Плавный переход!`
    },
    {
      title: '⚖️ Сравнение: useDeferredValue',
      description: 'Поиск с тяжёлым списком через useDeferredValue',
      content: `**Тот же пример с useDeferredValue:**

**Когда предпочесть useDeferredValue:**
• Тяжёлые вычисления в дочернем компоненте
• Работаешь со сторонней библиотекой (нет доступа к setState)
• Нужна простота

**Особенность:**
Не нужно оборачивать setState - просто создаёшь отложенную версию значения и передаёшь её дальше.`,
      code: `// С useDeferredValue ✅
function Search() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  return (
    <>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Индикатор загрузки */}
      {query !== deferredQuery && (
        <div>Обновление результатов...</div>
      )}

      {/* Передаём отложенное значение */}
      <HeavyList query={deferredQuery} />
    </>
  )
}

function HeavyList({ query }) {
  const results = useMemo(() => {
    // Тяжёлая фильтрация 5000 элементов
    return items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    )
  }, [query])

  return (
    <div>
      {results.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}

// ✅ Меньше кода
// ✅ Инпут отзывчивый
// ✅ Список обновляется в фоне`
    },
    {
      title: '📊 Когда что использовать?',
      description: 'Таблица сравнения и рекомендации',
      content: `**Простое правило выбора:**

1️⃣ **useTransition - если можешь обернуть setState:**
   • Навигация между страницами
   • Переключение табов
   • Применение фильтров
   • Нужен флаг isPending

2️⃣ **useDeferredValue - если работаешь со значением:**
   • Поиск с автодополнением
   • Живая фильтрация списка
   • Сторонние компоненты
   • Нужна простота

3️⃣ **Оба работают одинаково хорошо:**
   • Можно использовать любой
   • Выбирай что удобнее в конкретном случае`,
      code: `// useTransition - контроль action
function Example1() {
  const [state, setState] = useState(initial)
  const [isPending, startTransition] = useTransition()

  const handleAction = () => {
    startTransition(() => {
      setState(newValue) // Откладываем действие
    })
  }

  return <Button onClick={handleAction} />
}

// useDeferredValue - контроль value
function Example2() {
  const [value, setValue] = useState('')
  const deferredValue = useDeferredValue(value)

  return (
    <>
      <Input value={value} onChange={setValue} />
      <HeavyComponent value={deferredValue} />
    </>
  )
}

// Оба решают одну задачу:
// Сделать UI отзывчивым при тяжёлых обновлениях! ✅`
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
        🔀 useTransition vs useDeferredValue
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
              backgroundColor: activeStep === idx ? '#8b5cf6' : '#f5f5f5',
              color: activeStep === idx ? 'white' : '#333',
              border: `2px solid ${activeStep === idx ? '#8b5cf6' : '#ddd'}`,
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
        border: '3px solid #8b5cf6',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
      }}>
        <h2 style={{
          color: '#8b5cf6',
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
            <h3 style={{ color: '#8b5cf6', fontSize: '1.4em' }}>
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
            <strong>useTransition</strong> - когда можешь обернуть setState<br />
            <strong>useDeferredValue</strong> - когда работаешь со значением<br />
            Оба делают UI отзывчивым! 🚀
          </p>
        </div>
      )}
    </div>
  )
}

export default Slide11TransitionVsDeferred
