import { useState, useTransition } from 'react'

// Компонент с тяжелым рендерингом
function HeavyList({ filter }) {
  const items = []
  for (let i = 1; i <= 8000; i++) {
    if (filter === '' || i.toString().includes(filter)) {
      items.push(i)
    }
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
      gap: '8px',
      marginTop: '15px'
    }}>
      {items.slice(0, 200).map(item => (
        <div
          key={item}
          style={{
            padding: '10px',
            backgroundColor: '#374151',
            color: '#f3f4f6',
            borderRadius: '4px',
            textAlign: 'center',
            fontSize: '14px'
          }}
        >
          {item}
        </div>
      ))}
      {items.length > 200 && (
        <div style={{
          gridColumn: '1 / -1',
          padding: '10px',
          backgroundColor: '#1f2937',
          color: '#9ca3af',
          borderRadius: '4px',
          textAlign: 'center',
          fontSize: '14px'
        }}>
          ...и еще {items.length - 200} элементов (всего {items.length})
        </div>
      )}
    </div>
  )
}

// Вкладки для демонстрации
function TabContent({ tab }) {
  const content = {
    about: {
      title: 'О проекте',
      text: 'React 19 включает множество новых возможностей для оптимизации производительности приложений.'
    },
    posts: {
      title: 'Посты',
      text: 'Здесь могут быть тысячи постов, которые нужно отрендерить...'
    },
    contact: {
      title: 'Контакты',
      text: 'Свяжитесь с нами через форму обратной связи.'
    }
  }

  const { title, text } = content[tab]

  // Имитация тяжелого рендеринга
  const items = []
  for (let i = 0; i < 500; i++) {
    items.push(`${title} - Элемент ${i + 1}`)
  }

  return (
    <div>
      <h3 style={{ color: '#f3f4f6', marginTop: 0 }}>{title}</h3>
      <p style={{ color: '#d1d5db' }}>{text}</p>
      <div style={{ marginTop: '15px', maxHeight: '200px', overflowY: 'auto' }}>
        {items.slice(0, 50).map((item, index) => (
          <div
            key={index}
            style={{
              padding: '8px',
              margin: '4px 0',
              backgroundColor: '#374151',
              color: '#f3f4f6',
              borderRadius: '4px',
              fontSize: '13px'
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

function UseTransitionDemo() {
  const [filter, setFilter] = useState('')
  const [tab, setTab] = useState('about')
  const [isPending, startTransition] = useTransition()
  const [withoutTransition, setWithoutTransition] = useState(false)

  const handleFilterChange = (value) => {
    setFilter(value)
    if (!withoutTransition) {
      startTransition(() => {
        // Тяжелое обновление обернуто в transition
      })
    }
  }

  const handleTabChange = (newTab) => {
    if (!withoutTransition) {
      startTransition(() => {
        setTab(newTab)
      })
    } else {
      setTab(newTab)
    }
  }

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h2 style={{ color: '#f3f4f6', marginBottom: '10px' }}>
        useTransition - Неблокирующие обновления
      </h2>

      <div style={{
        backgroundColor: '#1e40af',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>💡 Что делает useTransition?</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Помечает обновления состояния как неблокирующие (низкоприоритетные)</li>
          <li>Позволяет прервать обновление для более важных задач</li>
          <li>Предоставляет индикатор isPending для отображения загрузки</li>
          <li>Улучшает отзывчивость интерфейса при тяжелых операциях</li>
        </ul>
      </div>

      <div style={{
        backgroundColor: '#374151',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#f3f4f6', margin: 0 }}>🎯 Демо 1: Фильтрация списка</h3>
          <label style={{ color: '#f3f4f6', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={withoutTransition}
              onChange={(e) => setWithoutTransition(e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
            Без useTransition (медленно)
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            color: '#f3f4f6',
            marginBottom: '8px',
            fontWeight: 'bold'
          }}>
            Фильтр чисел:
          </label>
          <input
            type="text"
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
            placeholder="Введите число для фильтрации..."
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              borderRadius: '6px',
              border: `2px solid ${isPending ? '#fbbf24' : '#60a5fa'}`,
              backgroundColor: '#1f2937',
              color: '#f3f4f6',
              outline: 'none'
            }}
          />
          {isPending && (
            <div style={{
              marginTop: '8px',
              padding: '8px',
              backgroundColor: '#fef3c7',
              color: '#92400e',
              borderRadius: '4px',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ animation: 'spin 1s linear infinite' }}>⏳</span>
              Фильтрация... Ввод остается быстрым!
            </div>
          )}
        </div>

        <HeavyList filter={filter} />
      </div>

      <div style={{
        backgroundColor: '#374151',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ color: '#f3f4f6', marginTop: 0 }}>🎯 Демо 2: Переключение вкладок</h3>

        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          borderBottom: '2px solid #4b5563',
          paddingBottom: '10px'
        }}>
          {['about', 'posts', 'contact'].map((tabName) => (
            <button
              key={tabName}
              onClick={() => handleTabChange(tabName)}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                backgroundColor: tab === tabName ? '#3b82f6' : '#1f2937',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                opacity: isPending && tab !== tabName ? 0.5 : 1
              }}
            >
              {tabName === 'about' && '📖 О проекте'}
              {tabName === 'posts' && '📝 Посты'}
              {tabName === 'contact' && '📧 Контакты'}
            </button>
          ))}
        </div>

        {isPending && (
          <div style={{
            padding: '12px',
            backgroundColor: '#fef3c7',
            color: '#92400e',
            borderRadius: '6px',
            marginBottom: '15px',
            fontSize: '14px'
          }}>
            ⏳ Загрузка контента вкладки...
          </div>
        )}

        <div style={{
          backgroundColor: '#1f2937',
          padding: '20px',
          borderRadius: '6px',
          opacity: isPending ? 0.6 : 1,
          transition: 'opacity 0.2s'
        }}>
          <TabContent tab={tab} />
        </div>
      </div>

      <div style={{
        backgroundColor: '#065f46',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>✅ Когда использовать useTransition</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li><strong>Переключение вкладок</strong> - плавные переходы</li>
          <li><strong>Фильтрация/поиск</strong> - приоритет вводу пользователя</li>
          <li><strong>Навигация</strong> - неблокирующие переходы</li>
          <li><strong>Сортировка больших списков</strong> - сохранение отзывчивости</li>
        </ul>
      </div>

      <div style={{
        backgroundColor: '#1f2937',
        padding: '15px',
        borderRadius: '8px',
        color: '#f3f4f6'
      }}>
        <h3 style={{ marginTop: 0 }}>📝 Пример кода</h3>
        <pre style={{
          backgroundColor: '#111827',
          padding: '15px',
          borderRadius: '6px',
          overflow: 'auto',
          fontSize: '13px'
        }}>
{`import { useState, useTransition } from 'react'

function TabContainer() {
  const [tab, setTab] = useState('home')
  const [isPending, startTransition] = useTransition()

  const handleTabChange = (newTab) => {
    // Оборачиваем тяжелое обновление
    startTransition(() => {
      setTab(newTab)
    })
  }

  return (
    <div>
      <button onClick={() => handleTabChange('home')}>
        Главная
      </button>
      <button onClick={() => handleTabChange('posts')}>
        Посты
      </button>

      {isPending && <div>Загрузка...</div>}

      <div style={{ opacity: isPending ? 0.5 : 1 }}>
        <TabContent tab={tab} />
      </div>
    </div>
  )
}`}
        </pre>
      </div>

      <div style={{
        backgroundColor: '#7c2d12',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>⚠️ Важные моменты</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>useTransition vs useDeferredValue: transition для действий пользователя</li>
          <li>Transitions могут быть прерваны новыми обновлениями</li>
          <li>isPending полезен для показа индикаторов загрузки</li>
          <li>Не используйте для критических обновлений (платежи, формы)</li>
        </ul>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default UseTransitionDemo