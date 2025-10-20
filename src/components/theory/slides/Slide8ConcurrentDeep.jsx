import { useState } from 'react'

// Слайд 8: Как работает Concurrent Rendering
function Slide8ConcurrentDeep() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: '🎯 Проблема: Блокирующий рендеринг',
      description: 'В React 17 и ранее рендеринг был синхронным и блокирующим',
      content: `Когда React начинает рендерить компонент, он ДОЛЖЕН закончить всю работу до того, как браузер сможет обновить экран.

**Что происходит:**
1. Пользователь печатает в инпут → setState вызывается
2. React начинает рендерить все компоненты
3. Если рендеринг медленный (большой список) - браузер "зависает"
4. UI не отвечает на действия пользователя
5. Только после завершения рендера браузер обновляет экран

**Проблема:** Пользователь видит "подвисание" интерфейса`,
      code: `// React 17 - всё блокируется
function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const handleChange = (e) => {
    setQuery(e.target.value)
    // Это блокирует весь UI! ❌
    const filtered = hugeList.filter(item =>
      item.includes(e.target.value)
    )
    setResults(filtered) // Может занять 500мс!
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      {/* Пользователь не видит свой ввод
          пока не отрендерятся results! */}
      <ResultsList items={results} /> {/* 10000 элементов */}
    </>
  )
}`
    },
    {
      title: '⚡ Решение: Concurrent Rendering',
      description: 'React может прерывать и возобновлять рендеринг',
      content: `Concurrent Rendering позволяет React работать над несколькими обновлениями одновременно и приоритизировать их.

**Как это работает:**
1. React рендерит в памяти (не блокируя браузер)
2. React может "остановиться" и отдать управление браузеру
3. Браузер обрабатывает события пользователя
4. React продолжает рендеринг с того же места

**Магия:** React использует Time Slicing - разбивает работу на маленькие кусочки и выполняет их между кадрами браузера (60 FPS = ~16мс на кадр)`,
      code: `// React 18 - работа разбита на части
function Frame1() {
  // React рендерит первые 100 элементов
  render(items[0...100])
}

function Frame2() {
  // Браузер обновляет экран
  // Обрабатывает клики/ввод пользователя
}

function Frame3() {
  // React продолжает рендерить
  render(items[100...200])
}

// Цикл продолжается пока всё не отрендерится
// НО: UI остаётся отзывчивым! ✅`
    },
    {
      title: '🎯 Приоритеты обновлений',
      description: 'React различает срочные и несрочные обновления',
      content: `React 18 вводит концепцию приоритетов:

**Высокий приоритет (срочные):**
• Ввод текста в инпут
• Клики по кнопкам
• Скроллинг
• Анимации
→ Должны обрабатываться мгновенно!

**Низкий приоритет (несрочные):**
• Обновление списка результатов
• Фоновая синхронизация
• Аналитика
→ Могут подождать

**Механизм:** React использует внутреннюю очередь с приоритетами (Scheduler)`,
      code: `// Внутренний механизм (упрощённо)
const priorityQueue = {
  immediate: [], // Срочные (клики, ввод)
  normal: [],    // Обычные
  low: [],       // Низкие (transitions)
}

function scheduleUpdate(update, priority) {
  priorityQueue[priority].push(update)

  if (priority === 'immediate') {
    // Выполнить прямо сейчас!
    performWork(update)
  } else {
    // Выполнить когда будет время
    requestIdleCallback(() => performWork(update))
  }
}`
    },
    {
      title: '🔀 useTransition: Как это работает',
      description: 'Помечаем обновления как низкоприоритетные',
      content: `useTransition возвращает [isPending, startTransition]

**Что происходит внутри:**

1. Вызываете startTransition(() => setState(...))
2. React помечает это обновление как "transition" (низкий приоритет)
3. React начинает рендерить в фоне
4. Если приходит срочное обновление - React прерывает transition
5. После срочного обновления - возобновляет transition
6. isPending = true пока transition выполняется

**Важно:** Transition может быть прерван и даже отменён!`,
      code: `function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isPending, startTransition] = useTransition()

  const handleChange = (e) => {
    // Срочное обновление (высокий приоритет)
    setQuery(e.target.value) // Мгновенно! ⚡

    // Несрочное обновление (низкий приоритет)
    startTransition(() => {
      const filtered = hugeList.filter(item =>
        item.includes(e.target.value)
      )
      setResults(filtered) // Может подождать
    })
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />} {/* Показываем загрузку */}
      <ResultsList items={results} />
    </>
  )
}

// Результат:
// ✅ Инпут отзывчивый (query обновляется мгновенно)
// ✅ Список обновляется в фоне
// ✅ UI не зависает!`
    },
    {
      title: '🧠 Под капотом: Fiber архитектура',
      description: 'Как React хранит и обрабатывает обновления',
      content: `React использует структуру данных "Fiber" - это единица работы.

**Что такое Fiber:**
• Каждый компонент представлен Fiber узлом
• Fiber хранит: props, state, effects, priority
• Fiber'ы связаны в дерево (parent, child, sibling)

**Как работает рендеринг:**
1. React создаёт "work-in-progress" дерево (копия текущего)
2. Обрабатывает по одному Fiber за раз
3. После каждого Fiber - проверяет: "есть ли срочная работа?"
4. Если да - останавливается и обрабатывает срочное
5. Потом продолжает с того же места

**Time Slicing:** React работает ~5мс, потом отдаёт управление браузеру`,
      code: `// Упрощённая структура Fiber
const fiber = {
  type: Component,        // Тип компонента
  props: { name: 'John' },
  state: { count: 0 },

  // Связи в дереве
  parent: parentFiber,
  child: childFiber,
  sibling: siblingFiber,

  // Приоритет
  lanes: 0b0001, // Битовая маска приоритетов

  // Эффекты для выполнения
  effectTag: 'Update',

  // Ссылка на DOM
  stateNode: divElement
}

// Цикл работы (workLoop)
function workLoop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }

  if (nextUnitOfWork) {
    // Есть ещё работа - запланировать на следующий кадр
    requestIdleCallback(workLoop)
  } else {
    // Всё готово - применить изменения к DOM
    commitRoot()
  }
}`
    },
    {
      title: '🎛️ Кто контролирует Concurrent?',
      description: 'Автоматика vs Ваш контроль',
      content: `**Concurrent Rendering работает частично автоматически, частично под вашим контролем:**

**Что React делает АВТОМАТИЧЕСКИ:**
• Automatic Batching - группирует обновления состояния
• Time Slicing - разбивает работу на части по ~5мс
• Fiber Architecture - вся внутренняя механика
• Scheduler - управление очередью приоритетов

**Что контролируете ВЫ:**
• useTransition - помечаете обновления как низкоприоритетные
• useDeferredValue - откладываете обновление значения
• Suspense - управляете асинхронной загрузкой

**Важно:** Без использования этих хуков React всё равно использует Concurrent Rendering, но все обновления будут одинакового приоритета!`,
      code: `// 1️⃣ useTransition - контроль приоритетов
const [isPending, startTransition] = useTransition()

setQuery(value) // ✅ Срочное (автоматически)

startTransition(() => {
  setResults(heavy()) // ✅ Несрочное (ВЫ решаете)
})

// 2️⃣ useDeferredValue - отложенное значение
const [query, setQuery] = useState('')
const deferredQuery = useDeferredValue(query)
// query - мгновенно
// deferredQuery - с задержкой

// 3️⃣ Suspense - контроль загрузки
<Suspense fallback={<Spinner />}>
  <AsyncComponent /> {/* React управляет загрузкой */}
</Suspense>

// БЕЗ этих хуков:
// React всё равно использует Concurrent,
// но НЕ знает какие обновления важнее!`
    },
    {
      title: '🎨 Practical Example',
      description: 'Полный рабочий пример с объяснениями',
      content: `Реальный пример: поиск в большом списке с отзывчивым UI`,
      code: `function ProductSearch() {
  const [query, setQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [isPending, startTransition] = useTransition()

  const handleSearch = (e) => {
    const value = e.target.value

    // ШАГ 1: Срочное обновление (высокий приоритет)
    // React обработает это НЕМЕДЛЕННО
    setQuery(value)
    // Пользователь видит свой ввод мгновенно! ⚡

    // ШАГ 2: Несрочное обновление (низкий приоритет)
    startTransition(() => {
      // Эта функция выполнится в фоне
      // React может её прервать если нужно

      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase())
      )
      // Предположим это занимает 300мс для 10000 товаров

      setFilteredProducts(filtered)
      // React применит это обновление когда сможет
    })

    // isPending будет true пока transition выполняется
  }

  return (
    <div>
      <input
        value={query}
        onChange={handleSearch}
        placeholder="Поиск товаров..."
        // ✅ Инпут всегда отзывчивый!
      />

      {isPending && (
        <div>🔄 Обновление результатов...</div>
      )}

      <ProductList products={filteredProducts} />
      {/* Список обновляется плавно, не блокируя UI */}
    </div>
  )
}

// Что происходит в timeline:
// 0ms   - Пользователь печатает "a"
// 1ms   - setQuery('a') выполнен, экран обновлён ✅
// 2ms   - startTransition начинает фильтрацию
// 50ms  - Пользователь печатает "ab"
// 51ms  - setQuery('ab') выполнен (прерывает transition) ✅
// 52ms  - Старая transition отменена, новая начата
// 352ms - Новая transition завершена, список обновлён ✅`
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
        ⚡ Как работает Concurrent Rendering
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
              backgroundColor: activeStep === idx ? '#2196f3' : '#f5f5f5',
              color: activeStep === idx ? 'white' : '#333',
              border: `2px solid ${activeStep === idx ? '#2196f3' : '#ddd'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: activeStep === idx ? 'bold' : 'normal',
              transition: 'all 0.3s ease',
              flex: '1 1 200px'
            }}
          >
            Шаг {idx + 1}
          </button>
        ))}
      </div>

      {/* Текущий шаг */}
      <div style={{
        background: 'white',
        border: '3px solid #2196f3',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
      }}>
        <h2 style={{
          color: '#2196f3',
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
            <h3 style={{ color: '#2196f3', fontSize: '1.4em' }}>
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
    </div>
  )
}

export default Slide8ConcurrentDeep