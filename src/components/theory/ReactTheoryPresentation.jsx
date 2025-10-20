import { useState } from 'react'
import Slide1WhatIsReact from './slides/Slide1WhatIsReact.jsx'
import Slide2HowItWorks from './slides/Slide2HowItWorks.jsx'
import Slide3Lifecycle from './slides/Slide3Lifecycle.jsx'
import Slide4AllHooks from './slides/Slide4AllHooks.jsx'
import Slide5BasicHooksTheory from './slides/Slide5BasicHooksTheory.jsx'
import Slide6React18Features from './slides/Slide6React18Features.jsx'
import Slide7React19Features from './slides/Slide7React19Features.jsx'
import Slide8ConcurrentDeep from './slides/Slide8ConcurrentDeep.jsx'
import Slide9ServerComponentsDeep from './slides/Slide9ServerComponentsDeep.jsx'
import Slide10AsyncInUseEffect from './slides/Slide10AsyncInUseEffect.jsx'
import Slide11TransitionVsDeferred from './slides/Slide11TransitionVsDeferred.jsx'
import Slide12UseId from './slides/Slide12UseId.jsx'
import Slide13UseSyncExternalStore from './slides/Slide13UseSyncExternalStore.jsx'
import Slide14UseInsertionEffect from './slides/Slide14UseInsertionEffect.jsx'
import Slide15ReactCompiler from './slides/Slide15ReactCompiler.jsx'
import Slide16UseHook from './slides/Slide16UseHook.jsx'
import Slide17UseOptimistic from './slides/Slide17UseOptimistic.jsx'
import Slide18UseActionState from './slides/Slide18UseActionState.jsx'
import Slide19UseFormStatus from './slides/Slide19UseFormStatus.jsx'

// Главный компонент презентации
function ReactTheoryPresentation({ goToSlide }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    { component: <Slide1WhatIsReact />, title: 'Что такое React?' },
    { component: <Slide2HowItWorks />, title: 'Как работает React?' },
    { component: <Slide3Lifecycle />, title: 'Жизненный цикл компонентов' },
    { component: <Slide4AllHooks goToMainSlide={goToSlide} />, title: 'Все хуки React' },
    { component: <Slide5BasicHooksTheory />, title: 'Теория базовых хуков' },
    { component: <Slide10AsyncInUseEffect />, title: 'Почему нельзя async в useEffect' },
    { component: <Slide6React18Features />, title: 'Что нового в React 18' },
    { component: <Slide8ConcurrentDeep />, title: 'Как работает Concurrent Rendering' },
    { component: <Slide11TransitionVsDeferred />, title: 'useTransition vs useDeferredValue' },
    { component: <Slide12UseId />, title: 'useId - генерация уникальных ID' },
    { component: <Slide13UseSyncExternalStore />, title: 'useSyncExternalStore - внешние источники' },
    { component: <Slide14UseInsertionEffect />, title: 'useInsertionEffect - CSS-in-JS' },
    { component: <Slide9ServerComponentsDeep />, title: 'Как работают Server Components' },
    { component: <Slide7React19Features />, title: 'Что нового в React 19' },
    { component: <Slide15ReactCompiler />, title: 'React Compiler - автоматическая оптимизация' },
    { component: <Slide16UseHook />, title: 'use() - универсальный хук' },
    { component: <Slide17UseOptimistic />, title: 'useOptimistic - оптимистичные обновления' },
    { component: <Slide18UseActionState />, title: 'useActionState - состояние действий' },
    { component: <Slide19UseFormStatus />, title: 'useFormStatus - статус формы' }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #1a1a2e 0%, #16213e 100%)',
      color: '#333'
    }}>
      {/* Заголовок презентации */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
        textAlign: 'center',
        color: 'white',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0, fontSize: '2em' }}>
          ⚛️ React - Теория и основы
        </h1>
        <p style={{ margin: '10px 0 0 0', fontSize: '1.1em', opacity: 0.9 }}>
          {slides[currentSlide].title}
        </p>
      </div>

      {/* Контейнер слайда */}
      <div style={{
        background: 'white',
        margin: '20px',
        borderRadius: '20px',
        minHeight: 'calc(100vh - 240px)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
      }}>
        {slides[currentSlide].component}
      </div>

      {/* Навигация */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        background: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(10px)'
      }}>
        <button
          onClick={prevSlide}
          style={{
            padding: '15px 30px',
            fontSize: '1.1em',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          ← Назад
        </button>

        <div style={{ color: 'white', fontSize: '1.2em', fontWeight: 'bold' }}>
          Слайд {currentSlide + 1} из {slides.length}
        </div>

        <button
          onClick={nextSlide}
          style={{
            padding: '15px 30px',
            fontSize: '1.1em',
            backgroundColor: '#764ba2',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          Далее →
        </button>
      </div>
    </div>
  )
}

export default ReactTheoryPresentation
