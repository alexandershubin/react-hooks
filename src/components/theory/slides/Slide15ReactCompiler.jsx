import { useState } from 'react'

// Слайд 15: React Compiler - автоматическая оптимизация
function Slide15ReactCompiler() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: '🔮 Что такое React Compiler?',
      description: 'Автоматическая оптимизация без useMemo/memo',
      content: `**React Compiler** - это инструмент который автоматически оптимизирует ваш React код, добавляя мемоизацию там где нужно.

**Главная идея:**
Вместо того чтобы вручную оборачивать всё в useMemo/useCallback/memo, компилятор делает это за вас на этапе сборки!

**Что делает компилятор:**
• Анализирует код на этапе сборки (build time)
• Находит места где нужна оптимизация
• Автоматически добавляет мемоизацию
• Генерирует оптимизированный код

**Важно понимать:**
React Compiler в React 19 - это ОПЦИОНАЛЬНЫЙ инструмент!
Просто установка React 19 НЕ включает компилятор автоматически.`,
      code: `// БЕЗ компилятора - нужно вручную
function Component() {
  const [count, setCount] = useState(0)

  // ❌ Создаётся каждый раз
  const config = { theme: 'dark', count }

  // ✅ Вручную оборачиваем
  const memoConfig = useMemo(() => ({
    theme: 'dark',
    count
  }), [count])

  return <Child config={memoConfig} />
}

// С компилятором - автоматически!
function Component() {
  const [count, setCount] = useState(0)

  // Компилятор САМ добавит мемоизацию! ✅
  const config = { theme: 'dark', count }

  return <Child config={config} />
}

// Компилятор превратит в:
// const config = useMemo(() => ({
//   theme: 'dark',
//   count
// }), [count])

// Вы пишете меньше кода, получаете оптимизацию!`
    },
    {
      title: '⚠️ Важно: Компилятор НЕ включён по умолчанию!',
      description: 'Установка React 19 НЕ активирует компилятор',
      content: `**Распространённое заблуждение:**
"Я установил React 19, значит компилятор работает!"

❌ **ЭТО НЕПРАВДА!**

**Что происходит на самом деле:**

1. Устанавливаете React 19:
   npm install react@19 react-dom@19

2. Компилятор НЕ включён ❌
   Ваш код работает как обычно
   useMemo/memo всё ещё нужны!

3. Компилятор - это отдельный пакет:
   babel-plugin-react-compiler

**Почему так:**
• Компилятор пока экспериментальный
• Может сломать существующий код
• Нужна дополнительная настройка
• React команда не хочет ломать существующие проекты`,
      code: `// ❌ НЕПРАВИЛЬНОЕ понимание:
// "Установил React 19 → компилятор работает"

npm install react@19
// → Компилятор НЕ активен!

// ❌ Этот код всё ещё НЕ оптимизирован:
function Component() {
  const config = { theme: 'dark' } // Создаётся каждый раз
  return <Child config={config} />
}

// ✅ ПРАВИЛЬНОЕ понимание:
// "React 19 установлен, но компилятор нужно включить вручную"

// Шаг 1: Установить React 19
npm install react@19 react-dom@19

// Шаг 2: Установить компилятор (ОТДЕЛЬНО!)
npm install --save-dev babel-plugin-react-compiler

// Шаг 3: Настроить сборку (babel/webpack/vite)
// vite.config.js:
export default {
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler']
      }
    })
  ]
}

// Только ПОСЛЕ настройки компилятор заработает!`
    },
    {
      title: '🛠️ Как включить React Compiler',
      description: 'Пошаговая инструкция по настройке',
      content: `**Шаги для включения компилятора:**

**Шаг 1: Установите React 19**
Нужна минимум версия 19.0.0

**Шаг 2: Установите компилятор**
babel-plugin-react-compiler - отдельный пакет

**Шаг 3: Настройте сборщик**
Babel, Webpack, Vite или другой

**Шаг 4: Проверьте работу**
Посмотрите вывод сборки

**Статус компилятора (2025):**
• Экспериментальный (beta)
• Работает, но может быть нестабилен
• Рекомендуется для тестирования, не продакшена`,
      code: `// ═══════════════════════════════════════
// Настройка для VITE
// ═══════════════════════════════════════

// 1. Установка
npm install react@19 react-dom@19
npm install --save-dev babel-plugin-react-compiler

// 2. vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['babel-plugin-react-compiler', {
            // Опции
            runtimeModule: 'react-compiler-runtime'
          }]
        ]
      }
    })
  ]
})

// ═══════════════════════════════════════
// Настройка для WEBPACK
// ═══════════════════════════════════════

// babel.config.js
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      // Опции компилятора
    }]
  ]
}

// ═══════════════════════════════════════
// Настройка для NEXT.JS
// ═══════════════════════════════════════

// next.config.js
module.exports = {
  experimental: {
    reactCompiler: true // Включить компилятор
  }
}

// ═══════════════════════════════════════
// Проверка работы
// ═══════════════════════════════════════

npm run build

// Вывод если компилятор работает:
// ✓ React Compiler optimized 45 components
// ✓ 120 optimizations applied`
    },
    {
      title: '🎯 Что оптимизирует компилятор',
      description: 'Автоматическая мемоизация различных паттернов',
      content: `**Компилятор автоматически оптимизирует:**

1. **Объекты и массивы**
   Добавляет useMemo автоматически

2. **Функции (колбэки)**
   Добавляет useCallback автоматически

3. **Компоненты**
   Добавляет memo автоматически

4. **JSX элементы**
   Мемоизирует повторяющиеся элементы

5. **Вычисления**
   Кеширует тяжёлые операции

**Важно:**
Компилятор анализирует зависимости и добавляет мемоизацию только там где это нужно!`,
      code: `// ═══════════════════════════════════════
// 1. Объекты - автоматический useMemo
// ═══════════════════════════════════════

// Вы пишете:
function Component({ userId }) {
  const config = {
    id: userId,
    theme: 'dark',
    settings: { lang: 'ru' }
  }
  return <Child config={config} />
}

// Компилятор превращает в:
const config = useMemo(() => ({
  id: userId,
  theme: 'dark',
  settings: { lang: 'ru' }
}), [userId])

// ═══════════════════════════════════════
// 2. Функции - автоматический useCallback
// ═══════════════════════════════════════

// Вы пишете:
function Component({ onSave }) {
  const handleClick = () => {
    console.log('Clicked')
    onSave()
  }
  return <Button onClick={handleClick} />
}

// Компилятор превращает в:
const handleClick = useCallback(() => {
  console.log('Clicked')
  onSave()
}, [onSave])

// ═══════════════════════════════════════
// 3. Компоненты - автоматический memo
// ═══════════════════════════════════════

// Вы пишете:
function ExpensiveList({ items }) {
  return items.map(item => <div key={item.id}>{item.name}</div>)
}

// Компилятор превращает в:
const ExpensiveList = memo(function ExpensiveList({ items }) {
  return items.map(item => <div key={item.id}>{item.name}</div>)
})

// ═══════════════════════════════════════
// 4. Вычисления - кеширование
// ═══════════════════════════════════════

// Вы пишете:
function Component({ numbers }) {
  const sum = numbers.reduce((a, b) => a + b, 0)
  const avg = sum / numbers.length
  return <div>Среднее: {avg}</div>
}

// Компилятор превращает в:
const sum = useMemo(() =>
  numbers.reduce((a, b) => a + b, 0)
, [numbers])
const avg = useMemo(() => sum / numbers.length, [sum, numbers.length])`
    },
    {
      title: '✅ Можно ли убрать useMemo/memo?',
      description: 'Зависит от того, включён ли компилятор',
      content: `**Ответ: ЗАВИСИТ!**

**Если компилятор НЕ включён (по умолчанию):**
❌ НЕТ! Продолжай использовать useMemo/memo/useCallback
Код без оптимизации будет медленным

**Если компилятор включён и протестирован:**
✅ ДА! Можно постепенно убирать ручные оптимизации
Компилятор сделает это автоматически

**Рекомендация для 2025:**
• Продолжай использовать useMemo/memo вручную
• Компилятор пока экспериментальный
• Дождись стабильной версии
• Протестируй на небольших проектах сначала`,
      code: `// ═══════════════════════════════════════
// Компилятор НЕ включён (стандарт)
// ═══════════════════════════════════════

function Component() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  // ❌ БЕЗ оптимизации - создаётся каждый раз!
  const user = { name, count }
  const handleClick = () => setCount(c => c + 1)

  return (
    <>
      <ExpensiveChild user={user} onClick={handleClick} />
      {/* ExpensiveChild ре-рендерится ВСЕГДА! */}
    </>
  )
}

// ✅ С ручной оптимизацией
function Component() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  const user = useMemo(() => ({ name, count }), [name, count])
  const handleClick = useCallback(() => setCount(c => c + 1), [])

  return (
    <>
      <ExpensiveChild user={user} onClick={handleClick} />
      {/* ExpensiveChild ре-рендерится только при изменении user */}
    </>
  )
}

// ═══════════════════════════════════════
// Компилятор ВКЛЮЧЁН
// ═══════════════════════════════════════

function Component() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  // ✅ Компилятор САМ оптимизирует!
  const user = { name, count }
  const handleClick = () => setCount(c => c + 1)

  return (
    <>
      <ExpensiveChild user={user} onClick={handleClick} />
      {/* Компилятор добавил мемоизацию автоматически! */}
    </>
  )
}

// Вывод: Пиши чистый код, компилятор оптимизирует!`
    },
    {
      title: '⚠️ Ограничения и проблемы',
      description: 'Что может пойти не так',
      content: `**Проблемы с React Compiler:**

1. **Экспериментальный статус**
   • Может сломаться в будущих версиях
   • Баги и неожиданное поведение

2. **Не все паттерны поддерживаются**
   • Некоторые сложные случаи не оптимизируются
   • Нужны fallback к ручной оптимизации

3. **Увеличение времени сборки**
   • Анализ кода занимает время
   • Может замедлить dev сборку

4. **Размер бандла может увеличиться**
   • Добавляется runtime код компилятора
   • Может быть больше чем ручная оптимизация

5. **Сложность отладки**
   • Сгенерированный код отличается от написанного
   • Труднее понять что происходит`,
      code: `// ═══════════════════════════════════════
// Случаи когда компилятор НЕ поможет
// ═══════════════════════════════════════

// 1. Динамические зависимости
function Component({ data }) {
  // Компилятор может не понять зависимости
  const processed = processComplexData(data)

  // ✅ Лучше явно указать:
  const processed = useMemo(() =>
    processComplexData(data)
  , [data])
}

// 2. Внешние мутации
let externalValue = 0

function Component() {
  // Компилятор не отследит изменения
  const value = externalValue

  // ❌ Компилятор не добавит оптимизацию
  return <div>{value}</div>
}

// 3. Рефы
function Component() {
  const ref = useRef(null)

  // Компилятор может не оптимизировать
  const getValue = () => ref.current?.value

  // ✅ Лучше явно:
  const getValue = useCallback(() =>
    ref.current?.value
  , [])
}

// ═══════════════════════════════════════
// Размер бандла
// ═══════════════════════════════════════

// БЕЗ компилятора:
// bundle.js: 150 KB

// С компилятором:
// bundle.js: 155 KB (добавлен runtime)
// Но: меньше ре-рендеров, быстрее работа

// Вывод: Trade-off между размером и производительностью`
    },
    {
      title: '📊 Когда использовать компилятор',
      description: 'Рекомендации для разных сценариев',
      content: `**Используй компилятор:**

✅ **Новый проект**
   • Нет legacy кода
   • Можно экспериментировать
   • Легко откатиться

✅ **Прототипы и MVP**
   • Быстрая разработка
   • Меньше ручной оптимизации
   • Фокус на функциональность

✅ **Обучение**
   • Изучаешь React 19
   • Понимаешь как работает оптимизация
   • Сравниваешь с ручным подходом

**НЕ используй компилятор:**

❌ **Продакшн проект (2025)**
   • Компилятор пока экспериментальный
   • Риск багов
   • Сложность отладки

❌ **Большая кодовая база**
   • Много legacy кода
   • Сложно протестировать всё
   • Риск сломать существующую оптимизацию

❌ **Критичные приложения**
   • Банки, медицина, финансы
   • Стабильность важнее новых фич
   • Проверенные решения предпочтительнее`,
      code: `// ═══════════════════════════════════════
// Сценарий 1: Новый проект
// ═══════════════════════════════════════

// ✅ Включаем компилятор
export default {
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler']
      }
    })
  ]
}

// Пишем чистый код без оптимизаций
function NewFeature({ data }) {
  const processed = processData(data)
  const handleClick = () => save(processed)

  return <UI data={processed} onClick={handleClick} />
}

// Компилятор оптимизирует автоматически! ✅

// ═══════════════════════════════════════
// Сценарий 2: Продакшн проект
// ═══════════════════════════════════════

// ❌ Компилятор НЕ включаем
// ✅ Используем проверенные оптимизации

function ProductionFeature({ data }) {
  const processed = useMemo(() =>
    processData(data)
  , [data])

  const handleClick = useCallback(() =>
    save(processed)
  , [processed])

  return <UI data={processed} onClick={handleClick} />
}

// Стабильно, предсказуемо, работает! ✅

// ═══════════════════════════════════════
// Гибридный подход
// ═══════════════════════════════════════

// Включи компилятор для НОВЫХ компонентов
// Оставь ручные оптимизации для СТАРЫХ

// new-components/ → компилятор
// legacy/ → ручные useMemo/memo`
    },
    {
      title: '💡 Итоговые рекомендации',
      description: 'Что делать прямо сейчас',
      content: `**Для большинства разработчиков в 2025:**

1. **Установили React 19?**
   → Компилятор НЕ включён по умолчанию
   → Продолжай использовать useMemo/memo/useCallback

2. **Хочешь попробовать компилятор?**
   → Протестируй на небольшом pet-проекте
   → НЕ включай в продакшене
   → Изучи как он работает

3. **Работаешь над продакшн проектом?**
   → Используй проверенные оптимизации
   → Дождись стабильной версии компилятора
   → Следи за новостями от React команды

4. **Когда можно убрать useMemo?**
   → Когда компилятор станет стабильным
   → Когда протестируешь на своём проекте
   → Когда React команда официально рекомендует

**Временная шкала (прогноз):**
• 2025 Q1-Q2: Компилятор экспериментальный
• 2025 Q3-Q4: Возможно beta/stable
• 2026+: Массовое использование`,
      code: `// ═══════════════════════════════════════
// Рекомендуемый подход (2025)
// ═══════════════════════════════════════

// package.json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
  // Компилятор НЕ устанавливаем
}

// Компоненты - с ручной оптимизацией
function MyComponent({ data, onAction }) {
  // ✅ Продолжаем использовать useMemo
  const processed = useMemo(() =>
    expensiveOperation(data)
  , [data])

  // ✅ Продолжаем использовать useCallback
  const handleClick = useCallback(() => {
    onAction(processed)
  }, [onAction, processed])

  // ✅ Продолжаем использовать memo
  return <MemoizedChild data={processed} onClick={handleClick} />
}

const MemoizedChild = memo(Child)

// ═══════════════════════════════════════
// Когда компилятор станет стабильным
// ═══════════════════════════════════════

// package.json (будущее)
{
  "devDependencies": {
    "babel-plugin-react-compiler": "^1.0.0" // Стабильная версия
  }
}

// Компоненты - чистый код
function MyComponent({ data, onAction }) {
  // Компилятор оптимизирует автоматически
  const processed = expensiveOperation(data)
  const handleClick = () => onAction(processed)

  return <Child data={processed} onClick={handleClick} />
}

// Меньше кода, автоматическая оптимизация! ✅`
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
        🔮 React Compiler
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
            💡 Главное правило (2025)
          </h3>
          <p style={{ fontSize: '1.2em', lineHeight: '1.8', margin: 0 }}>
            <strong>Продолжай использовать useMemo/memo/useCallback!</strong><br />
            React Compiler пока экспериментальный и НЕ включён по умолчанию.<br />
            Дождись стабильной версии для продакшена.
          </p>
        </div>
      )}
    </div>
  )
}

export default Slide15ReactCompiler