import { useState } from 'react'

// Слайд 3: Жизненный цикл компонентов
function Slide3Lifecycle() {
  const [activeTab, setActiveTab] = useState('hooks') // 'hooks' или 'classes'
  const [highlightPhase, setHighlightPhase] = useState(null)

  const lifecyclePhases = [
    {
      id: 'mount',
      title: 'Mounting (Монтирование)',
      color: '#4caf50',
      bgColor: '#e8f5e9',
      description: 'Компонент создается и добавляется в DOM'
    },
    {
      id: 'update',
      title: 'Updating (Обновление)',
      color: '#2196f3',
      bgColor: '#e3f2fd',
      description: 'Компонент обновляется при изменении props или state'
    },
    {
      id: 'unmount',
      title: 'Unmounting (Размонтирование)',
      color: '#f44336',
      bgColor: '#ffebee',
      description: 'Компонент удаляется из DOM'
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
        🔄 Жизненный цикл компонентов
      </h1>

      {/* Переключатель между хуками и классами */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginBottom: '40px'
      }}>
        <button
          onClick={() => setActiveTab('hooks')}
          style={{
            padding: '15px 40px',
            fontSize: '1.2em',
            backgroundColor: activeTab === 'hooks' ? '#667eea' : '#e0e0e0',
            color: activeTab === 'hooks' ? 'white' : '#666',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            boxShadow: activeTab === 'hooks' ? '0 4px 12px rgba(102, 126, 234, 0.4)' : 'none'
          }}
        >
          🎣 С хуками (современный)
        </button>
        <button
          onClick={() => setActiveTab('classes')}
          style={{
            padding: '15px 40px',
            fontSize: '1.2em',
            backgroundColor: activeTab === 'classes' ? '#764ba2' : '#e0e0e0',
            color: activeTab === 'classes' ? 'white' : '#666',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            boxShadow: activeTab === 'classes' ? '0 4px 12px rgba(118, 75, 162, 0.4)' : 'none'
          }}
        >
          📦 С классами (legacy)
        </button>
      </div>

      {/* Фазы жизненного цикла */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {lifecyclePhases.map((phase) => (
          <div
            key={phase.id}
            onClick={() => setHighlightPhase(phase.id)}
            style={{
              background: phase.bgColor,
              border: `3px solid ${highlightPhase === phase.id ? phase.color : '#ddd'}`,
              borderRadius: '15px',
              padding: '20px',
              cursor: 'pointer',
              transform: highlightPhase === phase.id ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.3s ease',
              boxShadow: highlightPhase === phase.id ? `0 8px 20px ${phase.color}40` : '0 2px 5px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{ color: phase.color, marginTop: 0, fontSize: '1.3em' }}>
              {phase.title}
            </h3>
            <p style={{ fontSize: '1.05em', lineHeight: '1.6', margin: 0 }}>
              {phase.description}
            </p>
          </div>
        ))}
      </div>

      {/* Контент для хуков */}
      {activeTab === 'hooks' && (
        <div>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            padding: '30px',
            color: 'white',
            marginBottom: '30px'
          }}>
            <h2 style={{ marginTop: 0, fontSize: '2em' }}>
              🎣 Жизненный цикл с хуками
            </h2>
            <p style={{ fontSize: '1.2em', lineHeight: '1.8' }}>
              React Hooks (введены в версии 16.8) позволяют использовать состояние и другие возможности
              React в функциональных компонентах. Основной хук для управления жизненным циклом — <strong>useEffect</strong>.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '20px'
          }}>
            {/* Mounting */}
            <div style={{
              background: '#e8f5e9',
              border: '3px solid #4caf50',
              borderRadius: '15px',
              padding: '25px'
            }}>
              <h3 style={{ color: '#2e7d32', marginTop: 0, fontSize: '1.5em' }}>
                🟢 Mounting (Монтирование)
              </h3>
              <p style={{ fontSize: '1.1em', marginBottom: '15px' }}>
                Выполняется один раз при первом рендере компонента
              </p>
              <pre style={{
                background: '#263238',
                color: '#aed581',
                padding: '15px',
                borderRadius: '10px',
                fontSize: '0.95em',
                overflow: 'auto'
              }}>
{`useEffect(() => {
  // Код выполнится после первого рендера
  console.log('Компонент смонтирован')

  // Загрузка данных
  fetch('/api/data')
    .then(res => res.json())
    .then(data => setData(data))
}, []) // Пустой массив зависимостей = только при монтировании`}
              </pre>
            </div>

            {/* Updating */}
            <div style={{
              background: '#e3f2fd',
              border: '3px solid #2196f3',
              borderRadius: '15px',
              padding: '25px'
            }}>
              <h3 style={{ color: '#1565c0', marginTop: 0, fontSize: '1.5em' }}>
                🔵 Updating (Обновление)
              </h3>
              <p style={{ fontSize: '1.1em', marginBottom: '15px' }}>
                Выполняется при изменении указанных зависимостей
              </p>
              <pre style={{
                background: '#263238',
                color: '#80cbc4',
                padding: '15px',
                borderRadius: '10px',
                fontSize: '0.95em',
                overflow: 'auto'
              }}>
{`useEffect(() => {
  // Выполнится при первом рендере
  // И при каждом изменении count или name
  console.log('Компонент обновился')

  document.title = \`Счетчик: \${count}\`
}, [count, name]) // Массив зависимостей`}
              </pre>
            </div>

            {/* Unmounting */}
            <div style={{
              background: '#ffebee',
              border: '3px solid #f44336',
              borderRadius: '15px',
              padding: '25px'
            }}>
              <h3 style={{ color: '#c62828', marginTop: 0, fontSize: '1.5em' }}>
                🔴 Unmounting (Размонтирование)
              </h3>
              <p style={{ fontSize: '1.1em', marginBottom: '15px' }}>
                Cleanup-функция выполняется перед удалением компонента
              </p>
              <pre style={{
                background: '#263238',
                color: '#ffab91',
                padding: '15px',
                borderRadius: '10px',
                fontSize: '0.95em',
                overflow: 'auto'
              }}>
{`useEffect(() => {
  // Подписка на событие
  const timer = setInterval(() => {
    console.log('Tick')
  }, 1000)

  // Cleanup-функция (очистка)
  return () => {
    clearInterval(timer)
    console.log('Компонент размонтирован')
  }
}, [])`}
              </pre>
            </div>
          </div>

          {/* Полный пример */}
          <div style={{
            background: '#fff3e0',
            border: '3px solid #ff9800',
            borderRadius: '15px',
            padding: '25px',
            marginTop: '20px'
          }}>
            <h3 style={{ color: '#e65100', marginTop: 0, fontSize: '1.5em' }}>
              💡 Полный пример с хуками
            </h3>
            <pre style={{
              background: '#263238',
              color: '#ffcc80',
              padding: '15px',
              borderRadius: '10px',
              fontSize: '0.9em',
              overflow: 'auto'
            }}>
{`function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mounting + Updating (когда меняется userId)
    console.log('Загружаем данные пользователя:', userId)
    setLoading(true)

    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        setUser(data)
        setLoading(false)
      })

    // Cleanup (Unmounting или перед следующим эффектом)
    return () => {
      console.log('Отменяем запрос для:', userId)
    }
  }, [userId]) // Эффект зависит от userId

  if (loading) return <div>Загрузка...</div>
  return <div>Привет, {user.name}!</div>
}`}
            </pre>
          </div>
        </div>
      )}

      {/* Контент для классов */}
      {activeTab === 'classes' && (
        <div>
          <div style={{
            background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
            borderRadius: '20px',
            padding: '30px',
            color: 'white',
            marginBottom: '30px'
          }}>
            <h2 style={{ marginTop: 0, fontSize: '2em' }}>
              📦 Жизненный цикл с классами (до React 16.8)
            </h2>
            <p style={{ fontSize: '1.2em', lineHeight: '1.8' }}>
              В классовых компонентах использовались специальные методы жизненного цикла.
              Сейчас этот подход считается <strong>устаревшим (legacy)</strong>, но важно понимать его для работы со старым кодом.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '20px'
          }}>
            {/* Mounting */}
            <div style={{
              background: '#e8f5e9',
              border: '3px solid #4caf50',
              borderRadius: '15px',
              padding: '25px'
            }}>
              <h3 style={{ color: '#2e7d32', marginTop: 0, fontSize: '1.5em' }}>
                🟢 Mounting (Монтирование)
              </h3>
              <div style={{ marginBottom: '15px' }}>
                <strong style={{ fontSize: '1.1em' }}>Методы вызываются в порядке:</strong>
                <ol style={{ fontSize: '1.05em', lineHeight: '1.8' }}>
                  <li><code style={{ background: '#c8e6c9', padding: '3px 8px', borderRadius: '4px' }}>constructor()</code> — инициализация state</li>
                  <li><code style={{ background: '#c8e6c9', padding: '3px 8px', borderRadius: '4px' }}>static getDerivedStateFromProps()</code> — синхронизация state с props</li>
                  <li><code style={{ background: '#c8e6c9', padding: '3px 8px', borderRadius: '4px' }}>render()</code> — возвращает JSX</li>
                  <li><code style={{ background: '#c8e6c9', padding: '3px 8px', borderRadius: '4px' }}>componentDidMount()</code> — компонент добавлен в DOM</li>
                </ol>
              </div>
              <pre style={{
                background: '#263238',
                color: '#aed581',
                padding: '15px',
                borderRadius: '10px',
                fontSize: '0.9em',
                overflow: 'auto'
              }}>
{`class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = { user: null }
  }

  componentDidMount() {
    // Аналог useEffect(() => {}, [])
    fetch(\`/api/users/\${this.props.userId}\`)
      .then(res => res.json())
      .then(user => this.setState({ user }))
  }

  render() {
    return <div>{this.state.user?.name}</div>
  }
}`}
              </pre>
            </div>

            {/* Updating */}
            <div style={{
              background: '#e3f2fd',
              border: '3px solid #2196f3',
              borderRadius: '15px',
              padding: '25px'
            }}>
              <h3 style={{ color: '#1565c0', marginTop: 0, fontSize: '1.5em' }}>
                🔵 Updating (Обновление)
              </h3>
              <div style={{ marginBottom: '15px' }}>
                <strong style={{ fontSize: '1.1em' }}>Методы вызываются в порядке:</strong>
                <ol style={{ fontSize: '1.05em', lineHeight: '1.8' }}>
                  <li><code style={{ background: '#bbdefb', padding: '3px 8px', borderRadius: '4px' }}>static getDerivedStateFromProps()</code></li>
                  <li><code style={{ background: '#bbdefb', padding: '3px 8px', borderRadius: '4px' }}>shouldComponentUpdate()</code> — оптимизация ре-рендера</li>
                  <li><code style={{ background: '#bbdefb', padding: '3px 8px', borderRadius: '4px' }}>render()</code></li>
                  <li><code style={{ background: '#bbdefb', padding: '3px 8px', borderRadius: '4px' }}>getSnapshotBeforeUpdate()</code> — перед изменением DOM</li>
                  <li><code style={{ background: '#bbdefb', padding: '3px 8px', borderRadius: '4px' }}>componentDidUpdate()</code> — после обновления</li>
                </ol>
              </div>
              <pre style={{
                background: '#263238',
                color: '#80cbc4',
                padding: '15px',
                borderRadius: '10px',
                fontSize: '0.9em',
                overflow: 'auto'
              }}>
{`componentDidUpdate(prevProps, prevState) {
  // Аналог useEffect(() => {}, [userId])
  if (prevProps.userId !== this.props.userId) {
    fetch(\`/api/users/\${this.props.userId}\`)
      .then(res => res.json())
      .then(user => this.setState({ user }))
  }
}

shouldComponentUpdate(nextProps, nextState) {
  // Аналог React.memo или useMemo
  return nextProps.userId !== this.props.userId
}`}
              </pre>
            </div>

            {/* Unmounting */}
            <div style={{
              background: '#ffebee',
              border: '3px solid #f44336',
              borderRadius: '15px',
              padding: '25px'
            }}>
              <h3 style={{ color: '#c62828', marginTop: 0, fontSize: '1.5em' }}>
                🔴 Unmounting (Размонтирование)
              </h3>
              <div style={{ marginBottom: '15px' }}>
                <strong style={{ fontSize: '1.1em' }}>Единственный метод:</strong>
                <ul style={{ fontSize: '1.05em', lineHeight: '1.8' }}>
                  <li><code style={{ background: '#ffcdd2', padding: '3px 8px', borderRadius: '4px' }}>componentWillUnmount()</code> — очистка перед удалением</li>
                </ul>
              </div>
              <pre style={{
                background: '#263238',
                color: '#ffab91',
                padding: '15px',
                borderRadius: '10px',
                fontSize: '0.9em',
                overflow: 'auto'
              }}>
{`componentWillUnmount() {
  // Аналог cleanup-функции в useEffect
  clearInterval(this.timer)
  this.subscription.unsubscribe()
  console.log('Компонент удаляется')
}`}
              </pre>
            </div>
          </div>

          {/* Сравнение */}
          <div style={{
            background: '#fff3e0',
            border: '3px solid #ff9800',
            borderRadius: '15px',
            padding: '25px',
            marginTop: '20px'
          }}>
            <h3 style={{ color: '#e65100', marginTop: 0, fontSize: '1.5em' }}>
              ⚖️ Проблемы классового подхода
            </h3>
            <ul style={{ fontSize: '1.1em', lineHeight: '2' }}>
              <li>❌ Много boilerplate-кода (constructor, bind, this)</li>
              <li>❌ Сложность переиспользования логики (HOC, render props)</li>
              <li>❌ Связанная логика разбросана по разным методам</li>
              <li>❌ Путаница с <code>this</code></li>
              <li>✅ <strong>Хуки решают все эти проблемы!</strong></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Slide3Lifecycle