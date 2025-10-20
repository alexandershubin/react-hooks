import { useState } from 'react'

// Слайд 6: Что нового в React 18
function Slide6React18Features() {
  const [selectedFeature, setSelectedFeature] = useState(null)

  const features = [
    {
      id: 'concurrent',
      title: '⚡ Concurrent Rendering',
      subtitle: 'Конкурентный рендеринг',
      icon: '🚀',
      color: '#2196f3',
      bgColor: '#e3f2fd',
      description: 'React может прерывать, приостанавливать и возобновлять рендеринг компонентов, делая UI более отзывчивым.',
      details: [
        'React может работать над несколькими обновлениями одновременно',
        'Может прервать менее важную работу для обработки критичных обновлений',
        'Позволяет приоритизировать обновления (срочные vs несрочные)',
        'Улучшает производительность на медленных устройствах'
      ],
      example: `// Раньше все обновления были синхронными
setState(newValue) // Блокирует UI

// Теперь можно пометить обновления как transition
startTransition(() => {
  setState(newValue) // Не блокирует UI!
})`
    },
    {
      id: 'automatic-batching',
      title: '📦 Automatic Batching',
      subtitle: 'Автоматическая группировка',
      icon: '🎯',
      color: '#ff6b6b',
      bgColor: '#ffe3e3',
      description: 'React автоматически группирует несколько обновлений состояния в один ре-рендер для повышения производительности.',
      details: [
        'В React 17: батчинг только в обработчиках событий React',
        'В React 18: батчинг везде (промисы, setTimeout, нативные события)',
        'Меньше ре-рендеров = лучше производительность',
        'Работает автоматически, не требует изменений в коде'
      ],
      example: `// React 17: 2 ре-рендера
setTimeout(() => {
  setCount(c => c + 1)  // Ре-рендер
  setFlag(f => !f)      // Ре-рендер
}, 1000)

// React 18: 1 ре-рендер! 🎉
setTimeout(() => {
  setCount(c => c + 1)
  setFlag(f => !f)
  // Оба обновления батчатся!
}, 1000)`
    },
    {
      id: 'transitions',
      title: '🔀 Transitions API',
      subtitle: 'API переходов',
      icon: '⏱️',
      color: '#10b981',
      bgColor: '#d1fae5',
      description: 'Разделение обновлений на срочные и несрочные для более плавного UX.',
      details: [
        'useTransition() - помечает обновления как неприоритетные',
        'Срочные обновления (ввод текста) выполняются сразу',
        'Несрочные (фильтрация списка) могут быть отложены',
        'isPending индикатор для показа загрузки'
      ],
      example: `function SearchResults() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isPending, startTransition] = useTransition()

  const handleChange = (e) => {
    setQuery(e.target.value) // Срочное обновление

    startTransition(() => {
      // Несрочное обновление
      setResults(filterHugeList(e.target.value))
    })
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <List items={results} />
    </>
  )
}`
    },
    {
      id: 'suspense',
      title: '⏳ Suspense на сервере',
      subtitle: 'Server-Side Suspense',
      icon: '🌐',
      color: '#a855f7',
      bgColor: '#f3e8ff',
      description: 'Suspense теперь работает на сервере с SSR и Streaming HTML.',
      details: [
        'Streaming SSR - сервер отправляет HTML частями',
        'Selective Hydration - приоритизация интерактивных частей',
        'Компоненты могут загружаться асинхронно',
        'Улучшенное время до первого взаимодействия (TTI)'
      ],
      example: `// Сервер отправляет HTML частями
<Suspense fallback={<Spinner />}>
  <Comments /> {/* Загружается асинхронно */}
</Suspense>

// Streaming SSR
import { renderToPipeableStream } from 'react-dom/server'

renderToPipeableStream(<App />, {
  onShellReady() {
    // Отправляем начальный HTML
    res.pipe(response)
  }
})`
    },
    {
      id: 'new-hooks',
      title: '🎣 Новые хуки',
      subtitle: 'React 18 Hooks',
      icon: '✨',
      color: '#f59e0b',
      bgColor: '#fef3c7',
      description: 'React 18 добавил 5 новых хуков для продвинутых сценариев.',
      details: [
        'useId() - генерация уникальных ID для SSR',
        'useTransition() - неблокирующие обновления',
        'useDeferredValue() - отложенные значения',
        'useSyncExternalStore() - подписка на внешние хранилища',
        'useInsertionEffect() - вставка CSS до layout'
      ],
      example: `// useId - уникальные ID для SSR
const id = useId()
<label htmlFor={id}>Name</label>
<input id={id} />

// useDeferredValue - отложенное значение
const deferredQuery = useDeferredValue(query)

// useSyncExternalStore - внешние хранилища
const width = useSyncExternalStore(
  subscribe,
  () => window.innerWidth
)`
    },
    {
      id: 'strict-mode',
      title: '🔍 Строгий режим',
      subtitle: 'Улучшенный StrictMode',
      icon: '⚠️',
      color: '#dc2626',
      bgColor: '#fee2e2',
      description: 'StrictMode помогает найти проблемы с Concurrent Rendering.',
      details: [
        'Намеренно монтирует/размонтирует компоненты дважды',
        'Проверяет правильность cleanup функций',
        'Выявляет побочные эффекты в рендере',
        'Помогает подготовиться к Concurrent Features'
      ],
      example: `// В StrictMode компоненты монтируются дважды
useEffect(() => {
  console.log('Монтирование')

  return () => {
    console.log('Размонтирование')
  }
}, [])

// В режиме разработки увидите:
// 1. Монтирование
// 2. Размонтирование (!)
// 3. Монтирование`
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
        🚀 Что нового в React 18
      </h1>

      <div style={{
        textAlign: 'center',
        fontSize: '1.2em',
        marginBottom: '40px',
        padding: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '15px',
        color: 'white'
      }}>
        <strong>React 18</strong> вышел в марте 2022 года и принёс революционные изменения в производительность и UX
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
            React 18 фокусируется на улучшении производительности и пользовательского опыта через Concurrent Rendering
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

export default Slide6React18Features