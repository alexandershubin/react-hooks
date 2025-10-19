import { useState } from 'react'

// Слайд 5: Теория работы базовых хуков
function Slide5BasicHooksTheory() {
  const [selectedHook, setSelectedHook] = useState('useState')

  const hooks = {
    useState: {
      title: 'useState - Управление состоянием',
      icon: '📊',
      color: '#2196f3',
      bgColor: '#e3f2fd',
      sections: [
        {
          title: '🎯 Что делает?',
          content: 'useState позволяет добавить состояние (state) в функциональный компонент. Состояние сохраняется между рендерами и при его изменении компонент перерисовывается.'
        },
        {
          title: '🔧 Как работает?',
          content: `React хранит состояние компонента в специальной структуре данных, связанной с позицией хука в коде. При вызове useState React:

1. При первом рендере: создаёт новую ячейку состояния и сохраняет начальное значение
2. При последующих рендерах: возвращает текущее значение из ячейки
3. При вызове setter функции: обновляет значение и планирует ре-рендер`
        },
        {
          title: '📝 Синтаксис',
          code: `const [state, setState] = useState(initialValue)

// state - текущее значение
// setState - функция для обновления
// initialValue - начальное значение`
        },
        {
          title: '⚙️ Как создаётся?',
          content: `При первом вызове useState:

• React выделяет память для хранения значения
• Создаёт setter функцию, привязанную к этой ячейке памяти
• Запоминает порядковый номер хука в компоненте
• Возвращает массив [значение, setter]`
        },
        {
          title: '🔄 Обновление состояния',
          code: `// Прямое значение
setState(newValue)

// Функциональное обновление (безопаснее)
setState(prevState => prevState + 1)

// Батчинг: React объединяет несколько setState
setState(1)
setState(2)  // Только это значение будет применено`
        },
        {
          title: '🔒 Иммутабельность состояния',
          content: `Иммутабельность означает, что нельзя изменять существующие объекты напрямую. React сравнивает состояния по ссылкам (reference equality), а не по содержимому.`,
          code: `// ❌ НЕПРАВИЛЬНО - мутация (изменение напрямую)
const [user, setUser] = useState({ name: 'John', age: 30 })
user.age = 31        // Изменяем объект напрямую
setUser(user)        // React НЕ увидит изменений!
                     // Причина: ссылка осталась та же

// ✅ ПРАВИЛЬНО - иммутабельность (новый объект)
setUser({ ...user, age: 31 })  // Новая ссылка
setUser(prev => ({ ...prev, age: 31 }))  // Ещё безопаснее

// Примеры для массивов:
const [items, setItems] = useState([1, 2, 3])

// ❌ items.push(4); setItems(items)
// ✅ setItems([...items, 4])
// ✅ setItems(items.concat(4))
// ✅ setItems(prev => [...prev, 4])

// Для вложенных объектов копируем все уровни:
setUser({
  ...user,
  address: {
    ...user.address,
    city: 'New York'
  }
})`
        },
        {
          title: '⚠️ Важные правила',
          list: [
            'Порядок вызова хуков должен быть одинаковым при каждом рендере',
            'Не вызывайте useState внутри условий или циклов',
            'Setter функция не мерджит объекты автоматически (в отличие от this.setState)',
            'Обновление состояния асинхронно - новое значение доступно только после ре-рендера',
            'Используйте функциональное обновление когда новое значение зависит от предыдущего'
          ]
        }
      ]
    },
    useEffect: {
      title: 'useEffect - Побочные эффекты',
      icon: '⚡',
      color: '#ff6b6b',
      bgColor: '#ffe3e3',
      sections: [
        {
          title: '🎯 Что делает?',
          content: 'useEffect позволяет выполнять побочные эффекты (side effects) в функциональных компонентах: работа с DOM, подписки, запросы к API, таймеры и т.д.'
        },
        {
          title: '🔧 Как работает?',
          content: `useEffect выполняется ПОСЛЕ того, как React:

1. Отрендерил компонент и обновил DOM
2. Браузер отрисовал изменения на экране
3. Затем запускает эффект

Это делает эффект неблокирующим для визуального обновления.`
        },
        {
          title: '📝 Синтаксис',
          code: `useEffect(() => {
  // Код эффекта (выполняется после рендера)

  return () => {
    // Cleanup функция (очистка)
    // Выполняется перед следующим эффектом
    // или перед размонтированием
  }
}, [dependencies]) // Массив зависимостей`
        },
        {
          title: '⚙️ Массив зависимостей',
          content: `Массив зависимостей определяет, когда эффект будет выполняться:`,
          code: `// Без массива - выполняется после каждого рендера
useEffect(() => { /* ... */ })

// Пустой массив [] - только при монтировании
useEffect(() => { /* ... */ }, [])

// С зависимостями - при изменении зависимостей
useEffect(() => { /* ... */ }, [count, name])`
        },
        {
          title: '🔄 Жизненный цикл эффекта',
          content: `1. Компонент рендерится
2. React обновляет DOM
3. Браузер отрисовывает изменения
4. React запускает cleanup предыдущего эффекта (если есть)
5. React запускает новый эффект`
        },
        {
          title: '⚠️ Важные правила',
          list: [
            'Эффекты выполняются асинхронно после рендера',
            'Cleanup функция выполняется перед каждым новым эффектом',
            'Всегда указывайте все используемые значения в массиве зависимостей',
            'Не используйте async функцию напрямую в useEffect',
            'Избегайте бесконечных циклов (эффект обновляет состояние, которое в зависимостях)'
          ]
        }
      ]
    },
    useContext: {
      title: 'useContext - Доступ к контексту',
      icon: '🔄',
      color: '#10b981',
      bgColor: '#d1fae5',
      sections: [
        {
          title: '🎯 Что делает?',
          content: 'useContext позволяет получить доступ к значению контекста без использования Context.Consumer. Это решает проблему "prop drilling" - передачи данных через множество уровней компонентов.'
        },
        {
          title: '🔧 Как работает?',
          content: `useContext ищет ближайший Provider в дереве компонентов:

1. Компонент вызывает useContext(MyContext)
2. React ищет вверх по дереву ближайший <MyContext.Provider>
3. Возвращает значение из value этого Provider
4. При изменении value все компоненты с useContext перерендериваются`
        },
        {
          title: '📝 Создание и использование',
          code: `// 1. Создание контекста
const ThemeContext = createContext('light')

// 2. Provider - предоставляет значение
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  )
}

// 3. useContext - получает значение
function Toolbar() {
  const theme = useContext(ThemeContext)
  return <div className={theme}>...</div>
}`
        },
        {
          title: '⚙️ Как создаётся контекст?',
          content: `createContext создаёт объект контекста:`,
          code: `const MyContext = createContext(defaultValue)

// MyContext содержит:
// • Provider - компонент для передачи значения
// • Consumer - альтернативный способ чтения (legacy)
// • defaultValue - используется если Provider не найден`
        },
        {
          title: '🔄 Обновление контекста',
          content: `Когда значение в Provider меняется:

1. React сравнивает новое значение со старым (Object.is)
2. Если значение изменилось - помечает все компоненты с useContext
3. Запускает ре-рендер этих компонентов
4. Пропускает промежуточные компоненты (оптимизация)`
        },
        {
          title: '⚠️ Важные правила',
          list: [
            'useContext всегда читает значение из ближайшего Provider',
            'Если Provider не найден, используется defaultValue из createContext',
            'Изменение value в Provider ре-рендерит ВСЕ компоненты с useContext',
            'Для оптимизации разделяйте контекст на несколько отдельных',
            'Можно комбинировать с useMemo для оптимизации объектов в value',
            'Context не заменяет state management библиотеки для сложных сценариев'
          ]
        }
      ]
    }
  }

  const currentHook = hooks[selectedHook]

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{
        fontSize: '3em',
        textAlign: 'center',
        color: '#61dafb',
        marginBottom: '40px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
      }}>
        🎓 Теория базовых хуков
      </h1>

      {/* Переключатель хуков */}
      <div style={{
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        marginBottom: '40px'
      }}>
        {Object.keys(hooks).map((key) => {
          const hook = hooks[key]
          return (
            <button
              key={key}
              onClick={() => setSelectedHook(key)}
              style={{
                padding: '15px 30px',
                fontSize: '1.2em',
                backgroundColor: selectedHook === key ? hook.color : '#f5f5f5',
                color: selectedHook === key ? 'white' : '#666',
                border: `2px solid ${hook.color}`,
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: selectedHook === key ? `0 4px 12px ${hook.color}60` : '0 2px 6px rgba(0,0,0,0.1)'
              }}
            >
              <span style={{ fontSize: '1.3em' }}>{hook.icon}</span>
              {key}
            </button>
          )
        })}
      </div>

      {/* Заголовок текущего хука */}
      <div style={{
        background: `linear-gradient(135deg, ${currentHook.color} 0%, ${currentHook.color}dd 100%)`,
        padding: '30px',
        borderRadius: '20px',
        color: 'white',
        marginBottom: '30px',
        boxShadow: `0 8px 24px ${currentHook.color}40`
      }}>
        <h2 style={{
          margin: 0,
          fontSize: '2.5em',
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <span style={{ fontSize: '1.2em' }}>{currentHook.icon}</span>
          {currentHook.title}
        </h2>
      </div>

      {/* Секции с информацией */}
      <div style={{
        display: 'grid',
        gap: '20px'
      }}>
        {currentHook.sections.map((section, idx) => (
          <div
            key={idx}
            style={{
              background: 'white',
              border: `3px solid ${currentHook.color}`,
              borderRadius: '15px',
              padding: '25px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{
              color: currentHook.color,
              marginTop: 0,
              fontSize: '1.6em',
              marginBottom: '15px'
            }}>
              {section.title}
            </h3>

            {section.content && (
              <p style={{
                fontSize: '1.15em',
                lineHeight: '1.8',
                color: '#333',
                margin: '0 0 15px 0',
                whiteSpace: 'pre-line'
              }}>
                {section.content}
              </p>
            )}

            {section.code && (
              <pre style={{
                background: '#263238',
                color: '#aed581',
                padding: '20px',
                borderRadius: '10px',
                fontSize: '0.95em',
                overflow: 'auto',
                margin: section.content ? '15px 0 0 0' : '0',
                lineHeight: '1.6'
              }}>
                {section.code}
              </pre>
            )}

            {section.list && (
              <ul style={{
                fontSize: '1.1em',
                lineHeight: '2',
                margin: 0,
                paddingLeft: '25px'
              }}>
                {section.list.map((item, i) => (
                  <li key={i} style={{ marginBottom: '8px' }}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Итоговая карточка */}
      <div style={{
        marginTop: '40px',
        background: currentHook.bgColor,
        border: `3px solid ${currentHook.color}`,
        borderRadius: '15px',
        padding: '25px',
        textAlign: 'center'
      }}>
        <h3 style={{
          color: currentHook.color,
          marginTop: 0,
          fontSize: '1.5em'
        }}>
          💡 Главное о {selectedHook}
        </h3>
        <p style={{
          fontSize: '1.2em',
          lineHeight: '1.8',
          margin: 0,
          color: '#333'
        }}>
          {selectedHook === 'useState' &&
            'useState - это основа управления состоянием. Каждый вызов создаёт независимую ячейку памяти, значение которой сохраняется между рендерами.'}
          {selectedHook === 'useEffect' &&
            'useEffect - это мост между React и внешним миром. Он выполняется ПОСЛЕ рендера, не блокируя отрисовку UI.'}
          {selectedHook === 'useContext' &&
            'useContext - это телепорт для данных. Позволяет передавать данные глубоко в дерево компонентов без prop drilling.'}
        </p>
      </div>
    </div>
  )
}

export default Slide5BasicHooksTheory