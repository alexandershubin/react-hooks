import { useState } from 'react'

// Слайд 2: Как работает React
function Slide2HowItWorks() {
  const [highlightStep, setHighlightStep] = useState(0)

  const steps = [
    { title: '1. Изменение данных', desc: 'Пользователь взаимодействует с UI или происходит событие' },
    { title: '2. Создание Virtual DOM', desc: 'React создает новое виртуальное представление DOM-дерева' },
    { title: '3. Reconciliation', desc: 'Сравнивает новый Virtual DOM с предыдущей версией' },
    { title: '4. Применение изменений', desc: 'Обновляет только изменившиеся части реального DOM' }
  ]

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{
        fontSize: '3em',
        textAlign: 'center',
        color: '#61dafb',
        marginBottom: '40px'
      }}>
        ⚙️ Как работает React?
      </h1>

      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px',
        padding: '30px',
        color: 'white',
        marginBottom: '30px'
      }}>
        <h2 style={{ marginTop: 0, fontSize: '2em' }}>🎭 Virtual DOM (Виртуальный DOM)</h2>
        <p style={{ fontSize: '1.2em', lineHeight: '1.8' }}>
          React использует концепцию виртуального DOM — легковесную копию реального DOM в памяти.
          Это позволяет React оптимизировать обновления интерфейса и делать их максимально быстрыми.
        </p>
      </div>

      <div style={{
        background: '#f5f5f5',
        borderRadius: '15px',
        padding: '30px',
        marginBottom: '30px'
      }}>
        <h3 style={{ textAlign: 'center', color: '#333', fontSize: '1.8em', marginBottom: '30px' }}>
          🔄 Процесс работы React
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {steps.map((step, index) => (
            <div
              key={index}
              onClick={() => setHighlightStep(index)}
              style={{
                background: highlightStep === index ? '#61dafb' : 'white',
                color: highlightStep === index ? 'white' : '#333',
                border: highlightStep === index ? '3px solid #21569c' : '3px solid #ddd',
                borderRadius: '15px',
                padding: '20px',
                cursor: 'pointer',
                transform: highlightStep === index ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.3s ease',
                boxShadow: highlightStep === index ? '0 8px 20px rgba(97, 218, 251, 0.3)' : '0 2px 5px rgba(0,0,0,0.1)'
              }}
            >
              <h4 style={{ marginTop: 0, fontSize: '1.3em' }}>{step.title}</h4>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', margin: 0 }}>{step.desc}</p>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666', fontSize: '0.95em' }}>
          💡 Нажмите на карточку, чтобы выделить этап
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: '#e8eaf6',
          border: '3px solid #3f51b5',
          borderRadius: '15px',
          padding: '25px'
        }}>
          <h3 style={{ color: '#1a237e', marginTop: 0, fontSize: '1.5em' }}>
            🧱 Компоненты
          </h3>
          <p style={{ fontSize: '1.1em', lineHeight: '1.6', marginBottom: '15px' }}>
            React-приложение состоит из компонентов — независимых блоков кода:
          </p>
          <div style={{ background: 'white', padding: '15px', borderRadius: '10px', marginBottom: '10px' }}>
            <strong style={{ color: '#3f51b5' }}>Функциональные компоненты</strong> (современный подход)
            <pre style={{
              background: '#263238',
              color: '#aed581',
              padding: '10px',
              borderRadius: '5px',
              fontSize: '0.9em',
              overflow: 'auto',
              marginTop: '10px'
            }}>
{`function Welcome({ name }) {
  return <h1>Привет, {name}!</h1>
}`}
            </pre>
          </div>
          <div style={{ background: 'white', padding: '15px', borderRadius: '10px' }}>
            <strong style={{ color: '#3f51b5' }}>Классовые компоненты</strong> (legacy)
            <pre style={{
              background: '#263238',
              color: '#ffab91',
              padding: '10px',
              borderRadius: '5px',
              fontSize: '0.9em',
              overflow: 'auto',
              marginTop: '10px'
            }}>
{`class Welcome extends React.Component {
  render() {
    return <h1>Привет!</h1>
  }
}`}
            </pre>
          </div>
        </div>

        <div style={{
          background: '#fce4ec',
          border: '3px solid #e91e63',
          borderRadius: '15px',
          padding: '25px'
        }}>
          <h3 style={{ color: '#880e4f', marginTop: 0, fontSize: '1.5em' }}>
            ✨ JSX
          </h3>
          <p style={{ fontSize: '1.1em', lineHeight: '1.6', marginBottom: '15px' }}>
            Синтаксическое расширение JavaScript, позволяющее писать HTML-подобный код:
          </p>
          <pre style={{
            background: '#263238',
            color: '#80cbc4',
            padding: '15px',
            borderRadius: '10px',
            fontSize: '0.95em',
            overflow: 'auto'
          }}>
{`const element = (
  <div>
    <h1>Hello, world!</h1>
    <p>Это JSX!</p>
  </div>
)`}
          </pre>
          <div style={{
            background: 'white',
            padding: '15px',
            borderRadius: '10px',
            marginTop: '15px'
          }}>
            <strong style={{ color: '#e91e63' }}>JSX компилируется в:</strong>
            <pre style={{
              background: '#263238',
              color: '#ffcc80',
              padding: '10px',
              borderRadius: '5px',
              fontSize: '0.85em',
              overflow: 'auto',
              marginTop: '10px'
            }}>
{`React.createElement(
  'div',
  null,
  React.createElement('h1', null, 'Hello!')
)`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slide2HowItWorks