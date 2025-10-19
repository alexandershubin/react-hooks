import { useState } from 'react'

// Слайд 4: Все хуки React
function Slide4AllHooks({ goToMainSlide }) {
  const [hoveredHook, setHoveredHook] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

  // Маппинг хуков на индексы слайдов в главной презентации
  const hookToSlideIndex = {
    'useState': 3,
    'useEffect': 4,
    'useContext': 5,
    'useReducer': 7,
    'useMemo': 8,
    'useCallback': 8,
    'useRef': 9,
    'useDeferredValue': 11,
    'useTransition': 12,
    'useId': 13,
    'useSyncExternalStore': 14,
    'useInsertionEffect': 15,
    'use': 17,
    'useOptimistic': 18,
    'useActionState': 19,
    'useFormStatus': 20
  }

  const handleHookClick = (hookName, e) => {
    e.stopPropagation()
    const slideIndex = hookToSlideIndex[hookName]
    if (slideIndex && goToMainSlide) {
      goToMainSlide(slideIndex)
    }
  }

  const hooksCategories = [
    {
      id: 'basic',
      title: '🎯 Базовые хуки',
      color: '#2196f3',
      bgColor: '#e3f2fd',
      gradient: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
      description: 'Основа React Hooks, используется в большинстве компонентов',
      hooks: [
        {
          name: 'useState',
          icon: '📊',
          desc: 'Управление локальным состоянием',
          example: 'const [count, setCount] = useState(0)'
        },
        {
          name: 'useEffect',
          icon: '⚡',
          desc: 'Побочные эффекты и жизненный цикл',
          example: 'useEffect(() => { /* effect */ }, [deps])'
        },
        {
          name: 'useContext',
          icon: '🔄',
          desc: 'Доступ к контексту без вложенности',
          example: 'const value = useContext(MyContext)'
        }
      ]
    },
    {
      id: 'additional',
      title: '⚡ Дополнительные хуки',
      color: '#ff6b6b',
      bgColor: '#ffe3e3',
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
      description: 'Специализированные хуки для оптимизации и сложной логики',
      hooks: [
        {
          name: 'useReducer',
          icon: '🔧',
          desc: 'Управление сложным состоянием',
          example: 'const [state, dispatch] = useReducer(reducer, init)'
        },
        {
          name: 'useCallback',
          icon: '📦',
          desc: 'Мемоизация функций',
          example: 'const fn = useCallback(() => {}, [deps])'
        },
        {
          name: 'useMemo',
          icon: '💾',
          desc: 'Мемоизация вычисленных значений',
          example: 'const value = useMemo(() => compute(), [deps])'
        },
        {
          name: 'useRef',
          icon: '🎯',
          desc: 'Ссылки на DOM и хранение значений',
          example: 'const ref = useRef(initialValue)'
        },
        {
          name: 'useImperativeHandle',
          icon: '🔌',
          desc: 'Кастомизация ref для родителя',
          example: 'useImperativeHandle(ref, () => ({...}))'
        },
        {
          name: 'useLayoutEffect',
          icon: '🎨',
          desc: 'Синхронный эффект перед отрисовкой',
          example: 'useLayoutEffect(() => { /* effect */ })'
        },
        {
          name: 'useDebugValue',
          icon: '🐛',
          desc: 'Отладочная информация для DevTools',
          example: 'useDebugValue(value, format)'
        }
      ]
    },
    {
      id: 'react18',
      title: '🚀 React 18+ хуки',
      color: '#10b981',
      bgColor: '#d1fae5',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      description: 'Новые хуки для Concurrent Rendering и улучшения UX',
      hooks: [
        {
          name: 'useTransition',
          icon: '🔀',
          desc: 'Неблокирующие обновления UI',
          example: 'const [isPending, startTransition] = useTransition()'
        },
        {
          name: 'useDeferredValue',
          icon: '⏱️',
          desc: 'Отложенное значение для оптимизации',
          example: 'const deferred = useDeferredValue(value)'
        },
        {
          name: 'useId',
          icon: '🆔',
          desc: 'Генерация уникальных ID для SSR',
          example: 'const id = useId()'
        },
        {
          name: 'useSyncExternalStore',
          icon: '🔗',
          desc: 'Подписка на внешние хранилища',
          example: 'const state = useSyncExternalStore(subscribe, getSnapshot)'
        },
        {
          name: 'useInsertionEffect',
          icon: '💉',
          desc: 'Вставка стилей перед layout',
          example: 'useInsertionEffect(() => { /* CSS */ })'
        }
      ]
    },
    {
      id: 'react19',
      title: '💎 React 19+ хуки',
      color: '#a855f7',
      bgColor: '#f3e8ff',
      gradient: 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%)',
      description: 'Самые современные хуки для форм и асинхронной работы',
      hooks: [
        {
          name: 'use',
          icon: '🎁',
          desc: 'Универсальный хук для Promise и Context',
          example: 'const data = use(promise)'
        },
        {
          name: 'useOptimistic',
          icon: '✨',
          desc: 'Оптимистичные обновления UI',
          example: 'const [optimistic, addOptimistic] = useOptimistic(state)'
        },
        {
          name: 'useActionState',
          icon: '📝',
          desc: 'Управление состоянием форм и действий',
          example: 'const [state, action, isPending] = useActionState(fn, init)'
        },
        {
          name: 'useFormStatus',
          icon: '📋',
          desc: 'Статус родительской формы',
          example: 'const { pending, data } = useFormStatus()'
        }
      ]
    }
  ]

  const totalHooks = hooksCategories.reduce((sum, cat) => sum + cat.hooks.length, 0)

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{
        fontSize: '3em',
        textAlign: 'center',
        color: '#61dafb',
        marginBottom: '20px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
      }}>
        🎣 Все хуки React
      </h1>

      <div style={{
        textAlign: 'center',
        fontSize: '1.3em',
        marginBottom: '20px',
        padding: '15px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '15px',
        color: 'white'
      }}>
        <strong>{totalHooks} хуков</strong> для создания современных React-приложений
      </div>

      <div style={{
        textAlign: 'center',
        fontSize: '1.1em',
        marginBottom: '30px',
        padding: '12px',
        background: '#e3f2fd',
        border: '2px solid #2196f3',
        borderRadius: '10px',
        color: '#1565c0',
        fontWeight: 'bold'
      }}>
        💡 Наведите на хук чтобы увидеть пример, нажмите чтобы перейти к демо!
      </div>

      {/* Категории хуков */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        marginBottom: '30px'
      }}>
        {hooksCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
            style={{
              background: 'white',
              border: `3px solid ${category.color}`,
              borderRadius: '20px',
              padding: '0',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: selectedCategory === category.id ? 'scale(1.02)' : 'scale(1)',
              boxShadow: selectedCategory === category.id
                ? `0 10px 30px ${category.color}60`
                : '0 4px 12px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}
          >
            {/* Заголовок категории */}
            <div style={{
              background: category.gradient,
              padding: '20px',
              color: 'white'
            }}>
              <h2 style={{
                margin: 0,
                fontSize: '1.8em',
                marginBottom: '10px'
              }}>
                {category.title}
              </h2>
              <p style={{
                margin: 0,
                fontSize: '1em',
                opacity: 0.9,
                lineHeight: '1.5'
              }}>
                {category.description}
              </p>
              <div style={{
                marginTop: '15px',
                fontSize: '2em',
                fontWeight: 'bold',
                opacity: 0.8
              }}>
                {category.hooks.length} {category.hooks.length === 1 ? 'хук' : 'хуков'}
              </div>
            </div>

            {/* Список хуков */}
            <div style={{ padding: '20px' }}>
              {category.hooks.map((hook, idx) => {
                const hasDemo = hookToSlideIndex[hook.name]
                return (
                  <div
                    key={hook.name}
                    onClick={(e) => hasDemo && handleHookClick(hook.name, e)}
                    onMouseEnter={() => setHoveredHook(`${category.id}-${hook.name}`)}
                    onMouseLeave={() => setHoveredHook(null)}
                    style={{
                      background: hoveredHook === `${category.id}-${hook.name}` ? category.bgColor : '#f8f9fa',
                      border: `2px solid ${hoveredHook === `${category.id}-${hook.name}` ? category.color : '#e9ecef'}`,
                      borderRadius: '12px',
                      padding: '15px',
                      marginBottom: idx < category.hooks.length - 1 ? '12px' : '0',
                      transition: 'all 0.2s ease',
                      transform: hoveredHook === `${category.id}-${hook.name}` ? 'translateX(5px)' : 'translateX(0)',
                      cursor: hasDemo ? 'pointer' : 'default',
                      position: 'relative'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <span style={{ fontSize: '1.8em', marginRight: '10px' }}>
                        {hook.icon}
                      </span>
                      <code style={{
                        fontSize: '1.3em',
                        fontWeight: 'bold',
                        color: category.color,
                        fontFamily: 'monospace'
                      }}>
                        {hook.name}
                      </code>
                    </div>
                    <p style={{
                      margin: '0 0 10px 0',
                      fontSize: '1em',
                      color: '#555',
                      lineHeight: '1.5'
                    }}>
                      {hook.desc}
                    </p>
                    {hoveredHook === `${category.id}-${hook.name}` && (
                      <pre style={{
                        margin: 0,
                        padding: '10px',
                        background: '#263238',
                        color: '#aed581',
                        borderRadius: '6px',
                        fontSize: '0.85em',
                        overflow: 'auto',
                        animation: 'fadeIn 0.3s ease'
                      }}>
                        {hook.example}
                      </pre>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Полезная информация */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginTop: '40px'
      }}>
        <div style={{
          background: '#fff9c4',
          border: '3px solid #fbc02d',
          borderRadius: '15px',
          padding: '25px'
        }}>
          <h3 style={{ color: '#f57f17', marginTop: 0, fontSize: '1.5em' }}>
            📚 Правила хуков
          </h3>
          <ul style={{ fontSize: '1.1em', lineHeight: '2', margin: 0 }}>
            <li>✅ Вызывайте хуки только на верхнем уровне</li>
            <li>✅ Вызывайте хуки только из React-функций</li>
            <li>✅ Не вызывайте хуки в циклах или условиях</li>
            <li>✅ Имена кастомных хуков начинаются с "use"</li>
          </ul>
        </div>

        <div style={{
          background: '#e8f5e9',
          border: '3px solid #4caf50',
          borderRadius: '15px',
          padding: '25px'
        }}>
          <h3 style={{ color: '#2e7d32', marginTop: 0, fontSize: '1.5em' }}>
            💡 Кастомные хуки
          </h3>
          <p style={{ fontSize: '1.1em', lineHeight: '1.8', margin: 0 }}>
            Вы можете создавать свои собственные хуки, комбинируя встроенные!
            Это позволяет переиспользовать логику между компонентами.
          </p>
          <pre style={{
            marginTop: '15px',
            marginBottom: 0,
            padding: '12px',
            background: '#263238',
            color: '#aed581',
            borderRadius: '8px',
            fontSize: '0.9em',
            overflow: 'auto'
          }}>
{`function useCustomHook() {
  const [state, setState] = useState()
  useEffect(() => { /* ... */ }, [])
  return state
}`}
          </pre>
        </div>
      </div>

      {/* Анимация */}
      <style>
{`@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
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

export default Slide4AllHooks