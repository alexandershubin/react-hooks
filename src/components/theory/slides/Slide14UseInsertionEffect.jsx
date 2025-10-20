import { useState } from 'react'

// Слайд 14: useInsertionEffect - эффект для CSS-in-JS
function Slide14UseInsertionEffect() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: '💅 Что такое useInsertionEffect?',
      description: 'Специальный хук для CSS-in-JS библиотек',
      content: `**useInsertionEffect** - это специализированный хук для инъекции стилей в DOM ПЕРЕД любыми DOM мутациями.

**Для кого этот хук:**
• Авторы CSS-in-JS библиотек (styled-components, emotion, stitches)
• 99.9% разработчикам этот хук НЕ нужен!

**Зачем нужен:**
Решает проблему производительности при динамической генерации CSS.

**Сигнатура:**
useInsertionEffect(setup, dependencies?)

Работает как useEffect, но выполняется РАНЬШЕ:
1. useInsertionEffect ⚡ (РАНЬШЕ ВСЕХ)
2. useLayoutEffect
3. useEffect

**Важно:**
• НЕ имеет доступа к refs (выполняется до создания DOM)
• НЕ может обновлять state
• Только для инъекции стилей!`,
      code: `import { useInsertionEffect } from 'react'

// ⚠️ Обычным разработчикам НЕ нужен этот хук!
// Это для авторов CSS-in-JS библиотек

function useCSS(rule) {
  useInsertionEffect(() => {
    // Инъекция CSS в DOM
    const styleElement = document.createElement('style')
    styleElement.textContent = rule
    document.head.appendChild(styleElement)

    // Cleanup
    return () => {
      document.head.removeChild(styleElement)
    }
  })
}

// Использование (в CSS-in-JS библиотеке)
function Button({ children }) {
  // Стили вставляются ПЕРЕД рендером
  useCSS('.my-button { background: blue; color: white; }')

  return <button className="my-button">{children}</button>
}

// Timeline выполнения:
// 1. useInsertionEffect - вставляет <style> в <head>
// 2. React создаёт <button> в DOM
// 3. Браузер рендерит кнопку со стилями ✅
// (НЕТ FOUC - Flash of Unstyled Content)`
    },
    {
      title: '⚡ Порядок выполнения хуков',
      description: 'useInsertionEffect vs useLayoutEffect vs useEffect',
      content: `**Порядок выполнения эффектов:**

1️⃣ **useInsertionEffect** - САМЫЙ РАННИЙ
   • Выполняется ПЕРЕД любыми DOM мутациями
   • НЕТ доступа к DOM (refs не работают)
   • Только для инъекции <style>

2️⃣ **useLayoutEffect** - ПЕРЕД PAINT
   • Выполняется ПОСЛЕ DOM мутаций, НО до paint
   • Есть доступ к DOM (refs работают)
   • Для измерения/изменения layout

3️⃣ **useEffect** - ПОСЛЕ PAINT
   • Выполняется ПОСЛЕ paint (не блокирует экран)
   • Есть доступ к DOM
   • Для большинства side effects

**Важное отличие:**
useInsertionEffect выполняется ДО того как React создаст DOM элементы!`,
      code: `function Component() {
  const ref = useRef(null)

  useInsertionEffect(() => {
    console.log('1. useInsertionEffect')
    console.log(ref.current) // ❌ null - DOM ещё нет!

    // ✅ Можно: вставить <style> в <head>
    const style = document.createElement('style')
    style.textContent = '.my-class { color: red; }'
    document.head.appendChild(style)

    return () => document.head.removeChild(style)
  })

  useLayoutEffect(() => {
    console.log('2. useLayoutEffect')
    console.log(ref.current) // ✅ <div> - DOM уже есть!

    // ✅ Можно: измерить размеры
    const { width } = ref.current.getBoundingClientRect()
    console.log('Width:', width)
  })

  useEffect(() => {
    console.log('3. useEffect')
    console.log(ref.current) // ✅ <div> - DOM есть, экран обновлён

    // ✅ Можно: запросы, подписки, setTimeout
    fetch('/api/data')
  })

  console.log('0. Render')
  return <div ref={ref}>Content</div>
}

// Вывод в консоль:
// 0. Render
// 1. useInsertionEffect
// (React создаёт DOM)
// 2. useLayoutEffect
// (Браузер рисует экран)
// 3. useEffect

// ⚠️ useInsertionEffect выполняется ДО создания DOM!`
    },
    {
      title: '🎨 Проблема: FOUC',
      description: 'Flash of Unstyled Content без useInsertionEffect',
      content: `**FOUC (Flash of Unstyled Content)** - это когда пользователь видит элемент БЕЗ стилей на долю секунды.

**Как возникает FOUC в CSS-in-JS:**

1. React рендерит компонент
2. Создаёт <button> в DOM
3. Браузер показывает кнопку БЕЗ стилей (FOUC!) ❌
4. useLayoutEffect вставляет <style>
5. Браузер перерисовывает со стилями

**useInsertionEffect решает это:**

1. useInsertionEffect вставляет <style> в <head>
2. React создаёт <button> в DOM
3. Браузер сразу показывает кнопку СО стилями ✅
4. НЕТ FOUC!`,
      code: `// ❌ БЕЗ useInsertionEffect - может быть FOUC
function ButtonBad() {
  useLayoutEffect(() => {
    // Вставляем стили ПОСЛЕ создания DOM
    const style = document.createElement('style')
    style.textContent = \`
      .button-bad {
        background: blue;
        color: white;
        padding: 10px 20px;
      }
    \`
    document.head.appendChild(style)
  }, [])

  return <button className="button-bad">Click</button>
}

// Проблема:
// 1. React создаёт <button> без стилей
// 2. Браузер показывает некрасивую кнопку ❌
// 3. useLayoutEffect добавляет стили
// 4. Браузер перерисовывает
// = Пользователь видит "моргание"

// ✅ С useInsertionEffect - НЕТ FOUC
function ButtonGood() {
  useInsertionEffect(() => {
    // Вставляем стили ДО создания DOM
    const style = document.createElement('style')
    style.textContent = \`
      .button-good {
        background: blue;
        color: white;
        padding: 10px 20px;
      }
    \`
    document.head.appendChild(style)

    return () => document.head.removeChild(style)
  }, [])

  return <button className="button-good">Click</button>
}

// Решение:
// 1. useInsertionEffect добавляет стили в <head>
// 2. React создаёт <button> (стили уже есть!)
// 3. Браузер сразу показывает красивую кнопку ✅
// = Никакого "моргания"!`
    },
    {
      title: '💅 Пример: Упрощённый styled-components',
      description: 'Как работают CSS-in-JS библиотеки',
      content: `**Создаём упрощённую версию styled-components**

Посмотрим как CSS-in-JS библиотеки используют useInsertionEffect под капотом.`,
      code: `import { useInsertionEffect } from 'react'

// Счётчик для уникальных имён классов
let counter = 0

// Упрощённая версия styled()
function styled(tag) {
  return (styles) => {
    // Возвращаем компонент
    return function StyledComponent(props) {
      // Генерируем уникальное имя класса
      const className = \`styled-\${counter++}\`

      // Вставляем стили ПЕРЕД рендером
      useInsertionEffect(() => {
        const styleElement = document.createElement('style')
        styleElement.textContent = \`
          .\${className} {
            \${styles}
          }
        \`
        document.head.appendChild(styleElement)

        return () => {
          document.head.removeChild(styleElement)
        }
      }, [])

      // Рендерим элемент с классом
      return <tag {...props} className={className} />
    }
  }
}

// Использование (как в styled-components)
const Button = styled('button')\`
  background: #667eea;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #764ba2;
  }
\`

const Title = styled('h1')\`
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
\`

// Использование
function App() {
  return (
    <div>
      <Title>Hello World</Title>
      <Button>Click me</Button>
    </div>
  )
}

// Результат в <head>:
// <style>.styled-0 { font-size: 2em; color: #333; ... }</style>
// <style>.styled-1 { background: #667eea; ... }</style>

// ✅ Стили вставлены ДО создания элементов
// ✅ Нет FOUC
// ✅ Нет дублирования стилей`
    },
    {
      title: '🔥 Пример: Dynamic Styles',
      description: 'Динамические стили на основе props',
      content: `**Генерация стилей на основе props компонента**

CSS-in-JS позволяет создавать стили динамически на основе props.`,
      code: `import { useInsertionEffect, useMemo } from 'react'

// Генератор уникальных ID
let styleId = 0

function useDynamicStyle(cssGenerator, deps) {
  // Генерируем уникальный класс (один раз)
  const className = useMemo(() => \`dynamic-\${styleId++}\`, [])

  // Вставляем/обновляем стили
  useInsertionEffect(() => {
    const css = cssGenerator()
    const styleElement = document.createElement('style')
    styleElement.setAttribute('data-class', className)
    styleElement.textContent = \`
      .\${className} {
        \${css}
      }
    \`
    document.head.appendChild(styleElement)

    return () => {
      document.head.removeChild(styleElement)
    }
  }, deps)

  return className
}

// Кнопка с динамическими стилями
function DynamicButton({ color, size, children }) {
  const className = useDynamicStyle(() => \`
    background: \${color};
    color: white;
    padding: \${size === 'large' ? '15px 30px' : '10px 20px'};
    font-size: \${size === 'large' ? '1.2em' : '1em'};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      opacity: 0.8;
      transform: scale(1.05);
    }
  \`, [color, size])

  return <button className={className}>{children}</button>
}

// Использование
function App() {
  const [color, setColor] = useState('#667eea')

  return (
    <div>
      <DynamicButton color={color} size="large">
        Большая кнопка
      </DynamicButton>

      <DynamicButton color="#10b981" size="small">
        Маленькая кнопка
      </DynamicButton>

      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
    </div>
  )
}

// При изменении color:
// 1. useInsertionEffect удаляет старый <style>
// 2. Создаёт новый <style> с новым цветом
// 3. React обновляет кнопку
// 4. Браузер показывает с новым цветом ✅
// Всё без FOUC!`
    },
    {
      title: '⚠️ Ограничения useInsertionEffect',
      description: 'Что можно и чего нельзя делать',
      content: `**Что НЕЛЬЗЯ делать в useInsertionEffect:**

1. ❌ Читать или изменять DOM
   • DOM ещё не создан!
   • refs.current = null

2. ❌ Обновлять state
   • setState не сработает корректно
   • Может вызвать бесконечный цикл

3. ❌ Делать side effects
   • Запросы к API
   • Подписки на события
   • localStorage

**Что МОЖНО делать:**

✅ Вставлять <style> в <head>
✅ Читать props и state (без изменений)
✅ Cleanup (удалять <style>)

**Правило:**
Если не пишешь CSS-in-JS библиотеку - НЕ используй этот хук!`,
      code: `function Component({ color }) {
  const ref = useRef(null)
  const [count, setCount] = useState(0)

  useInsertionEffect(() => {
    // ✅ МОЖНО: Вставить стили
    const style = document.createElement('style')
    style.textContent = \`.my-class { color: \${color}; }\`
    document.head.appendChild(style)

    // ✅ МОЖНО: Читать props
    console.log('Color:', color)

    // ✅ МОЖНО: Cleanup
    return () => {
      document.head.removeChild(style)
    }

    // ❌ НЕЛЬЗЯ: Читать DOM
    // console.log(ref.current) // null! DOM ещё нет

    // ❌ НЕЛЬЗЯ: Обновлять state
    // setCount(count + 1) // Может вызвать бесконечный цикл!

    // ❌ НЕЛЬЗЯ: Side effects
    // fetch('/api/data') // Используй useEffect!

    // ❌ НЕЛЬЗЯ: Работать с DOM
    // document.body.style.background = 'red' // Используй useLayoutEffect!
  }, [color])

  return <div ref={ref}>Count: {count}</div>
}

// Золотое правило:
// useInsertionEffect ТОЛЬКО для <style> тегов!
// Для всего остального используй useEffect или useLayoutEffect`
    },
    {
      title: '❌ Когда НЕ использовать',
      description: 'useInsertionEffect не нужен обычным разработчикам',
      content: `**99.9% разработчикам этот хук НЕ нужен!**

**НЕ используй useInsertionEffect если:**

1. ❌ Ты НЕ пишешь CSS-in-JS библиотеку
2. ❌ Используешь готовую библиотеку (styled-components, emotion)
   • Они уже используют useInsertionEffect внутри!
3. ❌ Нужны обычные side effects
   • Используй useEffect
4. ❌ Нужно работать с DOM/layout
   • Используй useLayoutEffect
5. ❌ Используешь обычный CSS/SCSS/CSS modules
   • Вообще не нужны хуки для стилей

**Используй ТОЛЬКО если:**

✅ Пишешь свою CSS-in-JS библиотеку
✅ Создаёшь фреймворк для динамических стилей
✅ Нужна инъекция <style> ДО создания DOM

**Для обычных задач:**
• Стили → CSS modules / Tailwind / обычный CSS
• Side effects → useEffect
• DOM манипуляции → useLayoutEffect
• State → useState / useReducer`,
      code: `// ❌ НЕПРАВИЛЬНО: Обычный разработчик использует useInsertionEffect
function MyComponent() {
  useInsertionEffect(() => {
    // Пытаемся добавить инлайн стили
    const style = document.createElement('style')
    style.textContent = '.my-button { background: blue; }'
    document.head.appendChild(style)
  }, [])

  return <button className="my-button">Click</button>
}

// ✅ ПРАВИЛЬНО: Используй CSS modules
import styles from './MyComponent.module.css'

function MyComponent() {
  return <button className={styles.button}>Click</button>
}

// ✅ ПРАВИЛЬНО: Используй styled-components
import styled from 'styled-components'

const Button = styled.button\`
  background: blue;
  color: white;
\`

function MyComponent() {
  return <Button>Click</Button>
}
// styled-components использует useInsertionEffect внутри! ✅

// ✅ ПРАВИЛЬНО: Используй Tailwind
function MyComponent() {
  return (
    <button className="bg-blue-500 text-white px-4 py-2">
      Click
    </button>
  )
}

// ✅ ПРАВИЛЬНО: Для side effects используй useEffect
function MyComponent() {
  useEffect(() => {
    // Запросы, подписки, и т.д.
    fetch('/api/data')
  }, [])
}

// Вывод:
// useInsertionEffect - это внутренний механизм для библиотек
// Обычные разработчики его НЕ используют!`
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
        💅 useInsertionEffect
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
              backgroundColor: activeStep === idx ? '#f59e0b' : '#f5f5f5',
              color: activeStep === idx ? 'white' : '#333',
              border: `2px solid ${activeStep === idx ? '#f59e0b' : '#ddd'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: activeStep === idx ? 'bold' : 'normal',
              transition: 'all 0.3s ease',
              flex: '1 1 180px'
            }}
          >
            Шаг {idx + 1}
          </button>
        ))}
      </div>

      {/* Текущий шаг */}
      <div style={{
        background: 'white',
        border: '3px solid #f59e0b',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
      }}>
        <h2 style={{
          color: '#f59e0b',
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
            <h3 style={{ color: '#f59e0b', fontSize: '1.4em' }}>
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
          background: '#fee2e2',
          border: '3px solid #ef4444',
          borderRadius: '15px',
          padding: '25px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#dc2626', marginTop: 0, fontSize: '1.5em' }}>
            ⚠️ Важное предупреждение
          </h3>
          <p style={{ fontSize: '1.2em', lineHeight: '1.8', margin: 0 }}>
            <strong>99.9% разработчикам этот хук НЕ нужен!</strong><br />
            Используй только если пишешь CSS-in-JS библиотеку.<br />
            Для обычных задач используй useEffect или useLayoutEffect.
          </p>
        </div>
      )}
    </div>
  )
}

export default Slide14UseInsertionEffect