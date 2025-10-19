// Слайд 1: Что такое React
function Slide1WhatIsReact() {
  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{
        fontSize: '3em',
        textAlign: 'center',
        color: '#61dafb',
        marginBottom: '40px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
      }}>
        ⚛️ React - Что это?
      </h1>

      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px',
        padding: '30px',
        color: 'white',
        marginBottom: '30px',
        fontSize: '1.3em',
        lineHeight: '1.8',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }}>
        <strong>React</strong> — это JavaScript-библиотека для создания пользовательских интерфейсов,
        разработанная компанией <strong>Meta (Facebook)</strong> в <strong>2013 году</strong>.
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: '#e3f2fd',
          border: '3px solid #2196f3',
          borderRadius: '15px',
          padding: '25px'
        }}>
          <h3 style={{ color: '#1976d2', marginTop: 0, fontSize: '1.5em' }}>
            📚 Библиотека, а не фреймворк
          </h3>
          <p style={{ fontSize: '1.1em', lineHeight: '1.6' }}>
            React решает только задачу построения UI, не навязывая решения для роутинга,
            управления состоянием и других аспектов приложения
          </p>
        </div>

        <div style={{
          background: '#f3e5f5',
          border: '3px solid #9c27b0',
          borderRadius: '15px',
          padding: '25px'
        }}>
          <h3 style={{ color: '#7b1fa2', marginTop: 0, fontSize: '1.5em' }}>
            📝 Декларативный подход
          </h3>
          <p style={{ fontSize: '1.1em', lineHeight: '1.6' }}>
            Вы описываете, как должен выглядеть интерфейс, а React заботится о том,
            как это реализовать
          </p>
        </div>

        <div style={{
          background: '#e8f5e9',
          border: '3px solid #4caf50',
          borderRadius: '15px',
          padding: '25px'
        }}>
          <h3 style={{ color: '#388e3c', marginTop: 0, fontSize: '1.5em' }}>
            🧩 Компонентная архитектура
          </h3>
          <p style={{ fontSize: '1.1em', lineHeight: '1.6' }}>
            UI разбивается на независимые, переиспользуемые компоненты, которые можно
            комбинировать как LEGO
          </p>
        </div>

        <div style={{
          background: '#fff3e0',
          border: '3px solid #ff9800',
          borderRadius: '15px',
          padding: '25px'
        }}>
          <h3 style={{ color: '#f57c00', marginTop: 0, fontSize: '1.5em' }}>
            ➡️ Однонаправленный поток данных
          </h3>
          <p style={{ fontSize: '1.1em', lineHeight: '1.6' }}>
            Данные передаются от родительских компонентов к дочерним через props,
            что упрощает отладку
          </p>
        </div>
      </div>

      <div style={{
        background: '#fff9c4',
        border: '2px solid #fbc02d',
        borderRadius: '15px',
        padding: '25px'
      }}>
        <h3 style={{ color: '#f57f17', marginTop: 0, fontSize: '1.4em' }}>
          💡 Зачем нужен React?
        </h3>
        <ul style={{ fontSize: '1.1em', lineHeight: '2' }}>
          <li>✅ Упрощает создание интерактивных пользовательских интерфейсов</li>
          <li>✅ Повышает производительность благодаря Virtual DOM</li>
          <li>✅ Делает код более предсказуемым и легким для отладки</li>
          <li>✅ Огромная экосистема библиотек и инструментов</li>
          <li>✅ Большое сообщество разработчиков и обширная документация</li>
        </ul>
      </div>
    </div>
  )
}

export default Slide1WhatIsReact