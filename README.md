# React Hooks - Интерактивная презентация

Интерактивная презентация по базовым хукам React с живыми примерами кода.

## 🚀 Запуск проекта

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev
```

После запуска откройте http://localhost:3000 в браузере.

## 📖 Содержание презентации

### 1. useState Hook
- Управление локальным состоянием
- Примеры: счетчик, формы, списки задач
- Работа с различными типами данных

### 2. useEffect Hook  
- Выполнение побочных эффектов
- Примеры: API запросы, подписки, таймеры
- Правильная очистка ресурсов

### 3. useContext Hook
- Передача данных через контекст
- Примеры: темы, авторизация, настройки
- Избежание prop drilling

### 4. useReducer Hook
- Управление сложным состоянием
- Примеры: формы, счетчики с множественной логикой
- Альтернатива useState для сложных сценариев

### 5. useRef Hook
- Доступ к DOM элементам
- Хранение мутируемых значений между рендерами
- Примеры: управление фокусом, таймеры, предыдущие значения

### 6. useMemo и useCallback Hooks
- Оптимизация производительности
- Мемоизация вычислений и функций
- Примеры: тяжелые вычисления, предотвращение лишних рендеров

### 7. useDeferredValue Hook
- Отложенное обновление UI
- Примеры: поиск в больших списках, тяжелые вычисления
- Неблокирующий рендеринг

### 8. useTransition Hook
- Неблокирующие обновления состояния
- Примеры: переключение вкладок, фильтрация, навигация
- Индикатор isPending для отображения загрузки

### 9. useId Hook
- Генерация уникальных ID
- Примеры: формы, accessibility, SSR-безопасность
- Стабильные идентификаторы

### 10. useSyncExternalStore Hook
- Подписка на внешние источники данных
- Примеры: Browser APIs, библиотеки состояния, WebSocket
- Согласованность при конкурентных обновлениях

### 11. useInsertionEffect Hook
- Вставка стилей перед layout
- Примеры: CSS-in-JS библиотеки, динамические стили
- Оптимизация производительности

### 12. use Hook
- Универсальный хук для чтения ресурсов
- Примеры: Promise, Context
- Можно вызывать условно

### 13. useOptimistic Hook
- Оптимистичные обновления UI
- Примеры: чаты, комментарии, лайки
- Мгновенная обратная связь

### 14. useActionState Hook
- Управление состоянием форм
- Примеры: регистрация, логин, отправка данных
- Интеграция с Server Actions

### 15. useFormStatus Hook
- Статус родительской формы
- Примеры: кнопки submit, индикаторы загрузки
- Переиспользуемые UI компоненты

## 🎮 Управление презентацией

- **← →** : Переключение между слайдами
- **F** : Полноэкранный режим
- **Esc** : Выход из полного экрана
- **Клики по навигации** : Быстрый переход к разделу

## 🛠 Технологии

- React 19
- Vite 5 (быстрая сборка и dev-сервер)
- JavaScript (JSX)
- CSS

## 📁 Структура проекта

```
react_19/
├── index.html              # Главная страница
├── package.json            # Конфигурация проекта
├── README.md              # Документация
└── src/
    ├── main.jsx           # Точка входа
    ├── App.jsx            # Корневой компонент
    ├── index.css          # Глобальные стили
    └── components/        # React компоненты
        ├── Presentation.jsx         # Главный компонент
        ├── UseStateDemo.jsx         # Демо useState
        ├── UseEffectDemo.jsx        # Демо useEffect
        ├── UseContextDemo.jsx       # Демо useContext
        ├── UseReducerDemo.jsx       # Демо useReducer
        ├── UseRefDemo.jsx           # Демо useRef
        ├── UseMemoCallbackDemo.jsx  # Демо useMemo/useCallback
        ├── UseDeferredValueDemo.jsx # Демо useDeferredValue
        ├── UseTransitionDemo.jsx    # Демо useTransition
        ├── UseIdDemo.jsx            # Демо useId
        ├── UseSyncExternalStoreDemo.jsx # Демо useSyncExternalStore
        ├── UseInsertionEffectDemo.jsx   # Демо useInsertionEffect
        ├── UseDemo.jsx              # Демо use
        ├── UseOptimisticDemo.jsx    # Демо useOptimistic
        ├── UseActionStateDemo.jsx   # Демо useActionState
        └── UseFormStatusDemo.jsx    # Демо useFormStatus
```

## ✨ Особенности

- **Живые примеры**: Весь код исполняется в реальном времени
- **Интерактивность**: Можно взаимодействовать с демо
- **Подробные объяснения**: Каждый хук объясняется с примерами
- **Адаптивный дизайн**: Работает на всех устройствах
- **Keyboard shortcuts**: Удобное управление с клавиатуры

## 🎯 Цели обучения

После изучения этой презентации вы будете знать:

- Как использовать useState для управления состоянием
- Когда и как применять useEffect
- Как работать с useContext для передачи данных
- Как использовать useReducer для сложного состояния
- Как работать с useRef для доступа к DOM и хранения значений
- Как оптимизировать производительность с useMemo и useCallback
- Как использовать useDeferredValue для отложенного обновления UI
- Как применять useTransition для неблокирующих обновлений
- Как генерировать уникальные ID с useId
- Как подписываться на внешние источники с useSyncExternalStore
- Как вставлять стили с useInsertionEffect для CSS-in-JS библиотек
- Лучшие практики работы с хуками
- Типичные ошибки и как их избежать

## 🔧 Разработка

Проект использует Vite для быстрой разработки с горячей перезагрузкой модулей (HMR). Все компоненты написаны на React 19 с использованием JSX.

## 📚 Дополнительные ресурсы

- [Официальная документация React Hooks](https://react.dev/reference/react)
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/)
- [Hooks FAQ](https://react.dev/reference/react/hooks)

---

# 🧠 Глубокое погружение в useState

## Как работает useState

**useState** - это хук для управления локальным состоянием компонента:

```javascript
const [state, setState] = useState(initialValue);
```

### 🔧 Основные принципы

1. **Инициализация**: происходит только при первом рендере
2. **Возврат массива**: `[текущее значение, функция обновления]`
3. **Асинхронность**: `setState` не обновляет состояние мгновенно
4. **Перерендер**: каждый `setState` планирует новый рендер

### ⚠️ Подводные камни и особенности

#### 1. 🕐 Асинхронность setState

```javascript
const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(count + 1);
  console.log(count); // ❌ Выведет старое значение!
  
  // ✅ Правильно:
  setCount(prevCount => {
    console.log(prevCount); // Текущее значение
    return prevCount + 1;
  });
};
```

#### 2. 📦 Батчинг (группировка) обновлений

```javascript
const handleClick = () => {
  setCount(count + 1); // Все три вызова
  setCount(count + 1); // объединятся в один
  setCount(count + 1); // рендер
  // Результат: count увеличится только на 1!
  
  // ✅ Правильно:
  setCount(c => c + 1);
  setCount(c => c + 1);
  setCount(c => c + 1);
  // Результат: count увеличится на 3
};
```

#### 3. 🔄 Замыкания и устаревшие значения

```javascript
const [count, setCount] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setCount(count + 1); // ❌ count всегда будет 0!
  }, 1000);
  
  return () => clearInterval(timer);
}, []); // Пустой массив зависимостей

// ✅ Правильно:
useEffect(() => {
  const timer = setInterval(() => {
    setCount(c => c + 1); // Функциональное обновление
  }, 1000);
  
  return () => clearInterval(timer);
}, []);
```

#### 4. 🏗️ Сравнение объектов и массивов

```javascript
const [user, setUser] = useState({ name: 'John', age: 25 });

// ❌ Мутация - React не заметит изменения:
const updateAge = () => {
  user.age = 26;
  setUser(user); // Тот же объект!
};

// ✅ Правильно - новый объект:
const updateAge = () => {
  setUser({ ...user, age: 26 });
  // или
  setUser(prev => ({ ...prev, age: 26 }));
};
```

#### 5. ⚡ Ленивая инициализация

```javascript
// ❌ Функция выполняется при каждом рендере:
const [data, setData] = useState(expensiveCalculation());

// ✅ Функция выполняется только один раз:
const [data, setData] = useState(() => expensiveCalculation());
```

#### 6. 🚫 Условные хуки

```javascript
// ❌ Нельзя вызывать хуки условно:
if (condition) {
  const [state, setState] = useState(0);
}

// ✅ Правильно:
const [state, setState] = useState(0);
if (condition) {
  // используем state
}
```

#### 7. 🔍 Object.is сравнение

```javascript
const [count, setCount] = useState(0);

// React использует Object.is для сравнения:
setCount(0); // Если count уже 0, рендер не произойдет
setCount(NaN); // NaN === NaN в Object.is, рендер не произойдет

// Для принудительного рендера:
setCount(c => c); // Всегда вызовет рендер
```

#### 8. 📊 Производительность с большими объектами

```javascript
const [bigState, setBigState] = useState({
  users: [],
  posts: [],
  comments: [],
  // ... много данных
});

// ❌ При изменении одного поля пересоздается весь объект:
setBigState({ ...bigState, users: newUsers });

// ✅ Лучше разделить на несколько состояний:
const [users, setUsers] = useState([]);
const [posts, setPosts] = useState([]);
const [comments, setComments] = useState([]);
```

#### 9. 🔄 setState в useEffect

```javascript
const [data, setData] = useState(null);

// ❌ Бесконечный цикл:
useEffect(() => {
  if (!data) {
    setData('loaded');
  }
}); // Нет массива зависимостей!

// ✅ Правильно:
useEffect(() => {
  if (!data) {
    setData('loaded');
  }
}, []); // Пустой массив зависимостей
```

#### 10. 🔗 Обновление состояния на основе пропсов

```javascript
function Component({ userId }) {
  const [user, setUser] = useState(null);
  
  // ❌ Может не сработать, если userId изменился:
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, []); // Пропущена зависимость!
  
  // ✅ Правильно:
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // Включаем userId в зависимости
}
```

### 💡 Лучшие практики

1. **🔧 Используй функциональные обновления** для зависимых изменений
2. **📚 Разделяй связанное состояние** на логические части  
3. **🚀 Избегай глубоко вложенных объектов** в состоянии
4. **⚙️ Используй useReducer** для сложной логики состояния
5. **🎯 Оптимизируй** с помощью useMemo/useCallback при необходимости

> 💪 Эти знания помогут избежать багов и написать более производительный React код!

---

# 🌊 Глубокое погружение в useEffect

## Как работает useEffect

**useEffect** — это хук для выполнения побочных эффектов в функциональных компонентах. Он заменяет `componentDidMount`, `componentDidUpdate` и `componentWillUnmount` из классовых компонентов.

```javascript
useEffect(() => {
  // Побочный эффект
  return () => {
    // Функция очистки (cleanup)
  };
}, [dependencies]); // Массив зависимостей
```

### 🎯 Основные принципы

1. **Выполняется после рендера** — эффекты не блокируют обновление UI
2. **Порядок выполнения** — сначала cleanup, потом новый эффект
3. **Сравнение зависимостей** — React использует `Object.is` для сравнения
4. **Синхронизация** — эффект "синхронизирует" компонент с внешним миром

## ⚠️ Подводные камни и особенности

### 1. 🔄 Три типа эффектов по зависимостям

```javascript
// 1. Каждый рендер - ОПАСНО!
useEffect(() => {
  console.log('Каждый рендер!');
}); // Нет массива зависимостей

// 2. Только при монтировании/размонтировании
useEffect(() => {
  console.log('Монтирование');
  return () => console.log('Размонтирование');
}, []); // Пустой массив

// 3. При изменении зависимостей
useEffect(() => {
  console.log('count изменился:', count);
}, [count]); // Массив с зависимостями
```

### 2. 🚨 Бесконечные циклы

```javascript
// ❌ БЕСКОНЕЧНЫЙ ЦИКЛ - забыли зависимости
useEffect(() => {
  setData(fetchData()); // Вызывает рендер → эффект → рендер...
});

// ❌ БЕСКОНЕЧНЫЙ ЦИКЛ - объект как зависимость
const [user, setUser] = useState({});
useEffect(() => {
  setUser({ ...user, timestamp: Date.now() });
}, [user]); // user каждый раз новый объект!

// ✅ ПРАВИЛЬНО - стабильные зависимости
useEffect(() => {
  async function loadData() {
    const result = await fetchData(userId);
    setData(result);
  }
  loadData();
}, [userId]); // Только userId в зависимостях
```

### 3. 🕐 Устаревшие замыкания (Stale Closures)

```javascript
// ❌ ПРОБЛЕМА - count "заморожен" в замыкании
const [count, setCount] = useState(0);
useEffect(() => {
  const timer = setInterval(() => {
    setCount(count + 1); // count всегда 0!
  }, 1000);
  return () => clearInterval(timer);
}, []); // Пустой массив зависимостей

// ✅ РЕШЕНИЕ 1 - функциональное обновление
useEffect(() => {
  const timer = setInterval(() => {
    setCount(prev => prev + 1); // Получаем актуальное значение
  }, 1000);
  return () => clearInterval(timer);
}, []);

// ✅ РЕШЕНИЕ 2 - useRef для актуального значения
const countRef = useRef(count);
countRef.current = count;
useEffect(() => {
  const timer = setInterval(() => {
    setCount(countRef.current + 1);
  }, 1000);
  return () => clearInterval(timer);
}, []);
```

### 4. 💧 Утечки памяти

```javascript
// ❌ УТЕЧКА ПАМЯТИ - не очистили подписку
useEffect(() => {
  const subscription = api.subscribe(data => {
    setData(data);
  });
  // Забыли return cleanup функцию!
}, []);

// ✅ ПРАВИЛЬНО - всегда очищаем ресурсы
useEffect(() => {
  const subscription = api.subscribe(data => {
    setData(data);
  });
  
  return () => {
    subscription.unsubscribe(); // Очищаем подписку
  };
}, []);

// ✅ ПРАВИЛЬНО - очистка событий
useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

### 5. 🎭 Неправильные зависимости

```javascript
// ❌ ПРОБЛЕМА - пропущена зависимость
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, []); // userId отсутствует в зависимостях!
  
  return <div>{user?.name}</div>;
}

// ✅ ПРАВИЛЬНО - все используемые значения в зависимостях
useEffect(() => {
  fetchUser(userId).then(setUser);
}, [userId]);

// ❌ ПРОБЛЕМА - функция в зависимостях
const fetchUserData = () => {
  return api.getUser(userId);
};

useEffect(() => {
  fetchUserData().then(setUser);
}, [fetchUserData]); // fetchUserData создается каждый рендер!

// ✅ РЕШЕНИЕ - useCallback или перенос внутрь
useEffect(() => {
  const fetchUserData = () => api.getUser(userId);
  fetchUserData().then(setUser);
}, [userId]);
```

### 6. 🔀 Состояние гонки (Race Conditions)

```javascript
// ❌ ПРОБЛЕМА - состояние гонки
useEffect(() => {
  fetchUser(userId).then(user => {
    setUser(user); // Может прийти ответ для старого userId!
  });
}, [userId]);

// ✅ РЕШЕНИЕ 1 - флаг отмены
useEffect(() => {
  let cancelled = false;
  
  fetchUser(userId).then(user => {
    if (!cancelled) {
      setUser(user);
    }
  });
  
  return () => {
    cancelled = true;
  };
}, [userId]);

// ✅ РЕШЕНИЕ 2 - AbortController
useEffect(() => {
  const controller = new AbortController();
  
  fetchUser(userId, { signal: controller.signal })
    .then(user => setUser(user))
    .catch(err => {
      if (err.name !== 'AbortError') {
        console.error(err);
      }
    });
  
  return () => controller.abort();
}, [userId]);
```

### 7. 🎨 Проблемы с производительностью

```javascript
// ❌ ПРОБЛЕМА - создание нового объекта каждый рендер
const config = { timeout: 5000, retries: 3 };
useEffect(() => {
  initializeService(config);
}, [config]); // config всегда новый!

// ✅ РЕШЕНИЕ 1 - вынести константы
const CONFIG = { timeout: 5000, retries: 3 };
useEffect(() => {
  initializeService(CONFIG);
}, []); // CONFIG стабильный

// ✅ РЕШЕНИЕ 2 - useMemo для сложных объектов
const config = useMemo(() => ({
  timeout: timeout,
  retries: retryCount
}), [timeout, retryCount]);

useEffect(() => {
  initializeService(config);
}, [config]);
```

### 8. 📱 Условные эффекты

```javascript
// ❌ ПРОБЛЕМА - условный хук
if (shouldTrack) {
  useEffect(() => {
    analytics.track('page_view');
  }, []);
}

// ✅ РЕШЕНИЕ - условие внутри эффекта
useEffect(() => {
  if (shouldTrack) {
    analytics.track('page_view');
  }
}, [shouldTrack]);
```

### 9. 🔄 Эффекты и строгий режим (Strict Mode)

```javascript
// В Strict Mode эффекты выполняются дважды в разработке!
useEffect(() => {
  console.log('Эффект'); // Выведется 2 раза в dev режиме
  
  return () => {
    console.log('Очистка'); // Тоже 2 раза
  };
}, []);

// ✅ Пишите эффекты так, чтобы они были идемпотентными
useEffect(() => {
  const subscription = api.subscribe(handleData);
  return () => subscription.unsubscribe();
}, []); // Подписка/отписка безопасны при повторном вызове
```

### 10. ⚡ Оптимизация с помощью разделения эффектов

```javascript
// ❌ ПРОБЛЕМА - один большой эффект
useEffect(() => {
  // Логика для пользователя
  fetchUser(userId).then(setUser);
  
  // Логика для аналитики
  analytics.track('page_view', { userId, page });
  
  // Логика для подписок
  const sub = websocket.subscribe(userId);
  return () => sub.unsubscribe();
}, [userId, page]); // Слишком много зависимостей

// ✅ РЕШЕНИЕ - разделить на несколько эффектов
useEffect(() => {
  fetchUser(userId).then(setUser);
}, [userId]);

useEffect(() => {
  analytics.track('page_view', { userId, page });
}, [userId, page]);

useEffect(() => {
  const sub = websocket.subscribe(userId);
  return () => sub.unsubscribe();
}, [userId]);
```

## 💡 Лучшие практики

1. **🎯 Всегда указывайте зависимости** — используйте ESLint правило `exhaustive-deps`
2. **🔧 Используйте функциональные обновления** для избежания замыканий
3. **📚 Разделяйте эффекты** по логическим группам
4. **🧹 Очищайте ресурсы** в cleanup функции
5. **🚀 Избегайте объектов и функций** в зависимостях без useMemo/useCallback
6. **🏁 Обрабатывайте состояния гонки** для асинхронных операций
7. **🧪 Тестируйте в Strict Mode** для выявления проблем

> 🌟 Эти знания помогут писать надежные и производительные React приложения!

---

# 🔄 Глубокое погружение в useReducer

## Как работает useReducer

**useReducer** — это хук для управления сложным состоянием через reducer-функцию. Он особенно полезен когда следующее состояние зависит от предыдущего или когда логика обновления состояния сложная.

```javascript
const [state, dispatch] = useReducer(reducer, initialState);

// Reducer функция
function reducer(state, action) {
  switch (action.type) {
    case 'ACTION_TYPE':
      return { ...state, field: action.payload };
    default:
      return state;
  }
}
```

### 🎯 Основные принципы

1. **Чистая функция** — reducer должен быть чистой функцией без побочных эффектов
2. **Иммутабельность** — всегда возвращайте новый объект состояния
3. **Action объекты** — используйте объекты с полями `type` и `payload`
4. **Централизованная логика** — вся логика обновления в одном месте

## ⚠️ Подводные камни и особенности

### 1. 🎭 useReducer vs useState

```javascript
// ❌ Сложная логика с useState
const [user, setUser] = useState({ name: '', email: '', errors: {} });

const updateName = (name) => {
  setUser(prev => ({ ...prev, name }));
};

const updateEmail = (email) => {
  setUser(prev => ({ ...prev, email }));
};

const setError = (field, error) => {
  setUser(prev => ({
    ...prev,
    errors: { ...prev.errors, [field]: error }
  }));
};

// ✅ Чище с useReducer
const [user, dispatch] = useReducer(userReducer, initialUser);

const updateName = (name) => {
  dispatch({ type: 'SET_FIELD', field: 'name', value: name });
};

const updateEmail = (email) => {
  dispatch({ type: 'SET_FIELD', field: 'email', value: email });
};

const setError = (field, error) => {
  dispatch({ type: 'SET_ERROR', field, error });
};
```

### 2. 🏗️ Мутация состояния

```javascript
// ❌ ПРОБЛЕМА - мутация состояния
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      state.items.push(action.payload); // Мутация!
      return state; // React не заметит изменения
    default:
      return state;
  }
}

// ✅ ПРАВИЛЬНО - новый объект
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    default:
      return state;
  }
}
```

### 3. 🚫 Побочные эффекты в reducer

```javascript
// ❌ ПРОБЛЕМА - побочные эффекты в reducer
function reducer(state, action) {
  switch (action.type) {
    case 'SAVE':
      api.saveData(state); // Побочный эффект!
      console.log('Saved'); // Побочный эффект!
      return { ...state, saved: true };
    default:
      return state;
  }
}

// ✅ ПРАВИЛЬНО - побочные эффекты в useEffect
function reducer(state, action) {
  switch (action.type) {
    case 'SAVE':
      return { ...state, saved: true };
    default:
      return state;
  }
}

// В компоненте
useEffect(() => {
  if (state.saved) {
    api.saveData(state);
    console.log('Saved');
  }
}, [state.saved]);
```

### 4. 📦 Инициализация с функцией

```javascript
// ❌ Тяжелые вычисления при каждом рендере
const initialState = expensiveCalculation();
const [state, dispatch] = useReducer(reducer, initialState);

// ✅ ПРАВИЛЬНО - ленивая инициализация
function init(initialArg) {
  return expensiveCalculation(initialArg);
}

const [state, dispatch] = useReducer(reducer, initialArg, init);
```

### 5. 🎯 Action creators

```javascript
// ❌ ПРОБЛЕМА - легко ошибиться с типом
dispatch({ type: 'ADD_ITM', payload: item }); // Опечатка!
dispatch({ type: 'ADD_ITEM', item }); // Неправильная структура

// ✅ РЕШЕНИЕ - используйте action creators
const addItem = (item) => ({ type: 'ADD_ITEM', payload: item });
const removeItem = (id) => ({ type: 'REMOVE_ITEM', payload: id });

dispatch(addItem(newItem)); // Безопасно и читаемо
dispatch(removeItem(itemId));
```

### 6. 🔗 Reducer с async логикой

```javascript
// ❌ ПРОБЛЕМА - async в reducer не работает
async function reducer(state, action) {
  switch (action.type) {
    case 'FETCH':
      const data = await api.fetch(); // Не сработает!
      return { ...state, data };
    default:
      return state;
  }
}

// ✅ РЕШЕНИЕ - используйте useEffect
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

// В компоненте
useEffect(() => {
  dispatch({ type: 'FETCH_START' });
  api.fetch()
    .then(data => dispatch({ type: 'FETCH_SUCCESS', payload: data }))
    .catch(error => dispatch({ type: 'FETCH_ERROR', payload: error }));
}, []);
```

### 7. 🎨 Типизация actions

```javascript
// ❌ ПРОБЛЕМА - легко перепутать структуру action
dispatch({ type: 'UPDATE', value: 'test' }); // payload или value?
dispatch({ type: 'UPDATE', data: 'test' }); // Непоследовательно

// ✅ РЕШЕНИЕ - константы и типизация
const ACTIONS = {
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  RESET: 'RESET'
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.UPDATE:
      return { ...state, value: action.payload };
    case ACTIONS.DELETE:
      return { ...state, value: null };
    case ACTIONS.RESET:
      return initialState;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}
```

### 8. 🔄 Вложенные обновления

```javascript
// ❌ ПРОБЛЕМА - сложные вложенные обновления
function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_USER_ADDRESS_CITY':
      return {
        ...state,
        user: {
          ...state.user,
          address: {
            ...state.user.address,
            city: action.payload
          }
        }
      };
    default:
      return state;
  }
}

// ✅ РЕШЕНИЕ - используйте библиотеку immer или разделите состояние
import produce from 'immer';

function reducer(state, action) {
  return produce(state, draft => {
    switch (action.type) {
      case 'UPDATE_USER_ADDRESS_CITY':
        draft.user.address.city = action.payload;
        break;
    }
  });
}
```

### 9. 📊 Reducer композиция

```javascript
// ✅ Разделяйте сложные reducers на подредьюсеры
function userReducer(state, action) {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    default:
      return state;
  }
}

function errorsReducer(state, action) {
  switch (action.type) {
    case 'SET_ERROR':
      return { ...state, [action.field]: action.error };
    case 'CLEAR_ERRORS':
      return {};
    default:
      return state;
  }
}

function mainReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    errors: errorsReducer(state.errors, action)
  };
}
```

### 10. 🎪 useReducer с Context

```javascript
// ✅ Комбинирование useReducer с Context для глобального состояния
const StateContext = React.createContext();
const DispatchContext = React.createContext();

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

// В дочерних компонентах
function ChildComponent() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return <button onClick={() => dispatch(addItem('test'))}>Add</button>;
}
```

## 💡 Лучшие практики

1. **🎯 Используйте useReducer** когда состояние сложное или связанное
2. **🔧 Создавайте action creators** для безопасности типов
3. **📚 Разделяйте большие reducers** на подредьюсеры
4. **🚀 Используйте константы** для типов actions
5. **⚙️ Всегда обрабатывайте default case** в switch
6. **🧪 Тестируйте reducers отдельно** — они чистые функции
7. **📖 Документируйте actions** и их payload структуру

> 💪 useReducer делает управление сложным состоянием предсказуемым и тестируемым!

---

# 🎯 Глубокое погружение в useRef

## Как работает useRef

**useRef** — это хук для создания мутируемой ссылки, которая сохраняется между рендерами и не вызывает повторный рендер при изменении.

```javascript
const ref = useRef(initialValue);
ref.current = newValue; // Не вызывает рендер!
```

### 🎯 Основные принципы

1. **Мутируемость** — `ref.current` можно изменять напрямую
2. **Персистентность** — значение сохраняется между рендерами
3. **Не вызывает рендер** — изменение ref не триггерит перерисовку
4. **Два основных use case** — доступ к DOM и хранение значений

## ⚠️ Подводные камни и особенности

### 1. 🎨 useRef для DOM vs для значений

```javascript
// Use case 1: Доступ к DOM элементу
function InputComponent() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // Прямой доступ к DOM
  };

  return <input ref={inputRef} />;
}

// Use case 2: Хранение мутируемого значения
function Timer() {
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      console.log('tick');
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);
}
```

### 2. 🚨 Ref не вызывает рендер

```javascript
// ❌ ПРОБЛЕМА - изменение ref не обновит UI
function Counter() {
  const countRef = useRef(0);

  const increment = () => {
    countRef.current += 1;
    // UI НЕ обновится!
  };

  return <div>{countRef.current}</div>; // Всегда будет 0
}

// ✅ ПРАВИЛЬНО - используйте useState для UI
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(c => c + 1); // UI обновится
  };

  return <div>{count}</div>;
}

// ✅ Но ref полезен для значений, не влияющих на UI
function Counter() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1; // Считаем рендеры без их вызова
  });

  return (
    <div>
      <div>Count: {count}</div>
      <div>Renders: {renderCount.current}</div>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
}
```

### 3. 🕐 Сохранение предыдущего значения

```javascript
// ✅ Классический паттерн для хранения предыдущего значения
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// Использование
function Component({ count }) {
  const prevCount = usePrevious(count);

  return (
    <div>
      <div>Текущее: {count}</div>
      <div>Предыдущее: {prevCount}</div>
      <div>Изменение: {count - (prevCount || 0)}</div>
    </div>
  );
}
```

### 4. 💧 Callback ref для сложных случаев

```javascript
// ❌ ПРОБЛЕМА - useRef не работает с условным рендером
function Component({ show }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      // Может не сработать при изменении show
      ref.current.focus();
    }
  }, [show]);

  return show && <input ref={ref} />;
}

// ✅ РЕШЕНИЕ - callback ref
function Component({ show }) {
  const [inputElement, setInputElement] = useState(null);

  useEffect(() => {
    if (inputElement) {
      inputElement.focus();
    }
  }, [inputElement]);

  return show && <input ref={setInputElement} />;
}
```

### 5. 🎯 Ref в замыканиях

```javascript
// ❌ ПРОБЛЕМА - устаревшее значение в замыкании
function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(count); // Всегда будет 0!
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Пустой массив зависимостей

  return <button onClick={() => setCount(c => c + 1)}>+</button>;
}

// ✅ РЕШЕНИЕ - используйте ref для актуального значения
function Component() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);

  useEffect(() => {
    countRef.current = count; // Обновляем ref при каждом изменении
  }, [count]);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(countRef.current); // Актуальное значение!
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <button onClick={() => setCount(c => c + 1)}>+</button>;
}
```

### 6. 🔄 forwardRef для передачи ref

```javascript
// ❌ ПРОБЛЕМА - ref на функциональный компонент не работает
function Input({ ref }) { // ref не передастся!
  return <input ref={ref} />;
}

// ✅ РЕШЕНИЕ - используйте forwardRef
const Input = React.forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

// Использование
function Parent() {
  const inputRef = useRef(null);

  return (
    <>
      <Input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>
        Focus Input
      </button>
    </>
  );
}
```

### 7. 🎪 useImperativeHandle для кастомного ref API

```javascript
// ✅ Предоставление кастомного API через ref
const FancyInput = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = '';
    },
    getValue: () => {
      return inputRef.current.value;
    }
  }));

  return <input ref={inputRef} {...props} />;
});

// Использование
function Parent() {
  const inputRef = useRef();

  return (
    <>
      <FancyInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
      <button onClick={() => inputRef.current.clear()}>Clear</button>
      <button onClick={() => alert(inputRef.current.getValue())}>
        Get Value
      </button>
    </>
  );
}
```

### 8. 📊 Ref для хранения таймеров и интервалов

```javascript
// ✅ Правильное управление таймерами
function Component() {
  const [count, setCount] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) return; // Уже запущен

    timerRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopTimer(); // Очистка при размонтировании
  }, []);

  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}
```

### 9. 🎭 Множественные refs

```javascript
// ✅ Управление массивом refs
function ItemList({ items }) {
  const itemRefs = useRef([]);

  useEffect(() => {
    // Сброс массива при изменении items
    itemRefs.current = itemRefs.current.slice(0, items.length);
  }, [items]);

  const focusItem = (index) => {
    itemRefs.current[index]?.focus();
  };

  return (
    <div>
      {items.map((item, index) => (
        <input
          key={item.id}
          ref={el => itemRefs.current[index] = el}
          defaultValue={item.name}
        />
      ))}
      <button onClick={() => focusItem(0)}>Focus First</button>
    </div>
  );
}
```

### 10. ⚠️ Ref и строгий режим (Strict Mode)

```javascript
// ⚠️ В Strict Mode компоненты монтируются дважды
function Component() {
  const mountCount = useRef(0);

  useEffect(() => {
    mountCount.current += 1;
    console.log('Mounted:', mountCount.current);
    // В dev mode: Mounted: 1, затем Mounted: 2
  }, []);

  // ✅ Это нормально - ref сохраняется между ре-монтированиями
}
```

## 💡 Лучшие практики

1. **🎯 Используйте useRef для DOM** — прямой доступ к элементам
2. **🔧 Используйте useRef для мутируемых значений** — таймеры, предыдущие значения
3. **📚 НЕ используйте ref для UI состояния** — используйте useState
4. **🚀 Очищайте таймеры и интервалы** в cleanup функции
5. **⚙️ Используйте forwardRef** для передачи ref в компоненты
6. **🧪 Используйте useImperativeHandle** для кастомного API
7. **📖 Помните о callback refs** для сложных случаев

> 🎯 useRef — мощный инструмент для работы с DOM и хранения мутируемых значений!

---

# ⚡ Глубокое погружение в useMemo и useCallback

## Как работают useMemo и useCallback

**useMemo** и **useCallback** — это хуки для оптимизации производительности через мемоизацию вычислений и функций.

```javascript
// useMemo - мемоизирует результат вычислений
const memoizedValue = useMemo(() => expensiveCalculation(a, b), [a, b]);

// useCallback - мемоизирует функцию
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// useCallback эквивалентен useMemo для функций
const memoizedCallback = useMemo(() => {
  return () => doSomething(a, b);
}, [a, b]);
```

### 🎯 Основные принципы

1. **Мемоизация** — сохранение результата вычислений
2. **Зависимости** — пересчёт только при изменении зависимостей
3. **Оптимизация** — используйте только когда это действительно нужно
4. **Ссылочное равенство** — сохранение ссылки на объект/функцию

## ⚠️ Подводные камни и особенности

### 1. 🎭 Когда НЕ нужно использовать

```javascript
// ❌ Излишняя оптимизация - простые вычисления
function Component({ a, b }) {
  const sum = useMemo(() => a + b, [a, b]); // Не нужно!
  const double = useMemo(() => a * 2, [a]); // Не нужно!

  return <div>{sum + double}</div>;
}

// ✅ Простые вычисления лучше делать напрямую
function Component({ a, b }) {
  const sum = a + b; // Быстрее чем useMemo
  const double = a * 2;

  return <div>{sum + double}</div>;
}

// ✅ useMemo нужен для тяжёлых вычислений
function Component({ items }) {
  const expensiveResult = useMemo(() => {
    return items
      .filter(item => item.active)
      .map(item => complexTransformation(item))
      .reduce((acc, val) => acc + val.score, 0);
  }, [items]);

  return <div>{expensiveResult}</div>;
}
```

### 2. 🚨 Ссылочное равенство и ре-рендеры

```javascript
// ❌ ПРОБЛЕМА - новый объект при каждом рендере
function Parent() {
  const [count, setCount] = useState(0);
  const config = { theme: 'dark', size: 'large' }; // Новый объект!

  return <Child config={config} />; // Child ре-рендерится каждый раз
}

const Child = React.memo(({ config }) => {
  console.log('Child rendered');
  return <div>{config.theme}</div>;
});

// ✅ РЕШЕНИЕ - useMemo для объектов
function Parent() {
  const [count, setCount] = useState(0);
  const config = useMemo(
    () => ({ theme: 'dark', size: 'large' }),
    [] // Создаётся один раз
  );

  return <Child config={config} />; // Child не ре-рендерится
}
```

### 3. 🎯 useCallback для событий

```javascript
// ❌ ПРОБЛЕМА - новая функция при каждом рендере
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = () => { // Новая функция!
    console.log('clicked');
  };

  return <Child onClick={handleClick} />; // Child ре-рендерится
}

const Child = React.memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click</button>;
});

// ✅ РЕШЕНИЕ - useCallback
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []); // Функция создаётся один раз

  return <Child onClick={handleClick} />; // Child не ре-рендерится
}
```

### 4. 💧 Зависимости в useMemo/useCallback

```javascript
// ❌ ПРОБЛЕМА - устаревшие значения в замыкании
function Component() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  const addItem = useCallback(() => {
    setItems([...items, count]); // items всегда пустой!
  }, []); // Пустой массив зависимостей

  return <button onClick={addItem}>Add</button>;
}

// ✅ РЕШЕНИЕ 1 - правильные зависимости
function Component() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  const addItem = useCallback(() => {
    setItems([...items, count]);
  }, [items, count]); // Включаем зависимости

  return <button onClick={addItem}>Add</button>;
}

// ✅ РЕШЕНИЕ 2 - функциональное обновление (лучше)
function Component() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  const addItem = useCallback(() => {
    setItems(prev => [...prev, count]);
  }, [count]); // Только count в зависимостях

  return <button onClick={addItem}>Add</button>;
}
```

### 5. 🔄 useMemo для зависимостей useEffect

```javascript
// ❌ ПРОБЛЕМА - useEffect срабатывает при каждом рендере
function Component({ userId }) {
  const options = { timeout: 5000, retry: 3 };

  useEffect(() => {
    fetchUser(userId, options);
  }, [userId, options]); // options каждый раз новый!
}

// ✅ РЕШЕНИЕ - useMemo для стабильности
function Component({ userId }) {
  const options = useMemo(
    () => ({ timeout: 5000, retry: 3 }),
    [] // Стабильный объект
  );

  useEffect(() => {
    fetchUser(userId, options);
  }, [userId, options]); // Срабатывает только при изменении userId
}
```

### 6. 🎨 Избыточная мемоизация

```javascript
// ❌ ПРОБЛЕМА - слишком много useMemo/useCallback
function Component({ data }) {
  const value1 = useMemo(() => data.a, [data.a]);
  const value2 = useMemo(() => data.b, [data.b]);
  const value3 = useMemo(() => data.c, [data.c]);

  const fn1 = useCallback(() => console.log(value1), [value1]);
  const fn2 = useCallback(() => console.log(value2), [value2]);
  const fn3 = useCallback(() => console.log(value3), [value3]);

  // Код становится сложнее без реальной пользы
}

// ✅ ПРАВИЛО - используйте только когда измеримо улучшает производительность
function Component({ data }) {
  // Простые значения не нуждаются в мемоизации
  const value1 = data.a;
  const value2 = data.b;

  // Мемоизируйте только тяжёлые вычисления
  const expensiveValue = useMemo(() => {
    return heavyCalculation(data);
  }, [data]);

  // Мемоизируйте функции только для дочерних React.memo компонентов
  const handleSubmit = useCallback(() => {
    submitData(expensiveValue);
  }, [expensiveValue]);

  return <MemoizedChild onSubmit={handleSubmit} />;
}
```

### 7. 📊 React.memo vs useMemo

```javascript
// React.memo - мемоизирует весь компонент
const Child = React.memo(({ value }) => {
  console.log('Child rendered');
  return <div>{value}</div>;
});

// useMemo - мемоизирует результат вычислений
function Parent() {
  const [count, setCount] = useState(0);

  const child = useMemo(() => {
    return <div>{count}</div>; // Не обязательно!
  }, [count]);

  return child;
}

// ✅ ПРАВИЛЬНО - используйте React.memo для компонентов
function Parent() {
  const [count, setCount] = useState(0);
  const [unrelated, setUnrelated] = useState(0);

  return (
    <>
      <Child value={count} /> {/* Ре-рендерится только при изменении count */}
      <button onClick={() => setUnrelated(u => u + 1)}>
        Update Unrelated
      </button>
    </>
  );
}

const Child = React.memo(({ value }) => {
  console.log('Child rendered');
  return <div>{value}</div>;
});
```

### 8. 🎪 useMemo для контекста

```javascript
// ❌ ПРОБЛЕМА - все подписчики ре-рендерятся
function Provider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  const value = { user, setUser, theme, setTheme }; // Новый объект!

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}

// ✅ РЕШЕНИЕ - useMemo для стабильности
function Provider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  const value = useMemo(
    () => ({ user, setUser, theme, setTheme }),
    [user, theme] // setUser и setTheme стабильны
  );

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}

// ✅ ЕЩЁ ЛУЧШЕ - разделите контексты
function Provider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  const userValue = useMemo(() => ({ user, setUser }), [user]);
  const themeValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <UserContext.Provider value={userValue}>
      <ThemeContext.Provider value={themeValue}>
        {children}
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}
```

### 9. ⚡ Производительность мемоизации

```javascript
// ⚠️ useMemo/useCallback имеют свою стоимость
// Используйте только когда измеримо помогает

// ❌ Не оптимизирует - примитивы быстро сравниваются
const value = useMemo(() => props.value, [props.value]);

// ❌ Не оптимизирует - создание функции быстрее мемоизации
const fn = useCallback(() => {}, []);

// ✅ Оптимизирует - тяжёлые вычисления
const result = useMemo(() => {
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += complexCalculation(data[i]);
  }
  return sum;
}, [data]);

// ✅ Оптимизирует - предотвращает ре-рендер дочернего компонента
const handleClick = useCallback(() => {
  doSomething();
}, []);

return <ExpensiveMemoizedChild onClick={handleClick} />;
```

### 10. 🔍 Отладка зависимостей

```javascript
// ✅ Хук для отладки зависимостей
function useWhyDidYouUpdate(name, props) {
  const previousProps = useRef();

  useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      const changes = {};

      allKeys.forEach(key => {
        if (previousProps.current[key] !== props[key]) {
          changes[key] = {
            from: previousProps.current[key],
            to: props[key]
          };
        }
      });

      if (Object.keys(changes).length) {
        console.log('[why-did-you-update]', name, changes);
      }
    }

    previousProps.current = props;
  });
}

// Использование
function Component({ value, onClick }) {
  useWhyDidYouUpdate('Component', { value, onClick });
  return <div>{value}</div>;
}
```

## 💡 Лучшие практики

1. **🎯 Измеряйте перед оптимизацией** — используйте React DevTools Profiler
2. **🔧 useMemo для тяжёлых вычислений** — не для простых операций
3. **📚 useCallback для стабильных функций** — особенно для React.memo компонентов
4. **🚀 Включайте все зависимости** — используйте ESLint правило exhaustive-deps
5. **⚙️ Разделяйте контексты** — для уменьшения ре-рендеров
6. **🧪 React.memo для компонентов** — useMemo для значений
7. **📖 Не переоптимизируйте** — читаемость важнее преждевременной оптимизации

> ⚡ useMemo и useCallback — инструменты точечной оптимизации, не панацея!

---

**🎉 Теперь вы знаете все одиннадцать хуков React 19!**

---

# 🚀 Глубокое погружение в useDeferredValue

## Как работает useDeferredValue

**useDeferredValue** — это хук для отложения обновления части UI, позволяя более важным обновлениям (например, ввод пользователя) выполняться с приоритетом.

```javascript
const deferredValue = useDeferredValue(value);
```

### 🎯 Основные принципы

1. **Низкий приоритет** — отложенное значение обновляется с низким приоритетом
2. **Неблокирующее обновление** — срочные обновления не блокируются
3. **isStale проверка** — можно определить, устарело ли значение
4. **Concurrent rendering** — работает только в React 18+

## ⚠️ Подводные камни и особенности

### 1. 🎭 useDeferredValue vs useTransition

```javascript
// useDeferredValue - для отложения значения
function Component({ searchQuery }) {
  const deferredQuery = useDeferredValue(searchQuery);

  return <SlowList query={deferredQuery} />;
}

// useTransition - для отложения действия
function Component() {
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    startTransition(() => {
      setSearchQuery(e.target.value);
    });
  };

  return <input onChange={handleChange} />;
}
```

### 2. ⚡ Работа с React.memo

```javascript
// ❌ ПРОБЛЕМА - компонент не оптимизирован
function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  // Ре-рендерится при каждом изменении query
  return <ExpensiveList query={deferredQuery} />;
}

// ✅ РЕШЕНИЕ - используйте React.memo
const ExpensiveList = React.memo(({ query }) => {
  const items = useMemo(() => {
    return data.filter(item => item.name.includes(query));
  }, [query]);

  return items.map(item => <Item key={item.id} {...item} />);
});

function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  return <ExpensiveList query={deferredQuery} />;
}
```

### 3. 🔄 Определение устаревания значения

```javascript
function Component({ value }) {
  const deferredValue = useDeferredValue(value);
  const isStale = value !== deferredValue;

  return (
    <div style={{ opacity: isStale ? 0.5 : 1 }}>
      {isStale && <Spinner />}
      <SlowComponent value={deferredValue} />
    </div>
  );
}
```

## 💡 Лучшие практики

1. **🎯 Используйте для поиска/фильтрации** — отложите обновление больших списков
2. **🔧 Комбинируйте с React.memo** — для максимальной эффективности
3. **📚 Показывайте индикатор** — используйте isStale для feedback
4. **🚀 Не используйте для критических данных** — только для UI оптимизации

> 💪 useDeferredValue делает UI отзывчивым при тяжёлых вычислениях!

---

# 🎨 Глубокое погружение в useTransition

## Как работает useTransition

**useTransition** — это хук для пометки обновлений состояния как неблокирующих (низкоприоритетных), с индикатором загрузки.

```javascript
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setState(newValue); // Низкоприоритетное обновление
});
```

### 🎯 Основные принципы

1. **isPending** — индикатор выполнения transition
2. **Прерываемость** — transitions могут быть прерваны более важными обновлениями
3. **Батчинг** — все обновления в startTransition группируются
4. **Concurrent rendering** — работает только в React 18+

## ⚠️ Подводные камни и особенности

### 1. 🎭 useTransition vs useDeferredValue

```javascript
// useTransition - контролируете начало transition
function TabContainer() {
  const [tab, setTab] = useState('home');
  const [isPending, startTransition] = useTransition();

  const selectTab = (newTab) => {
    startTransition(() => {
      setTab(newTab); // Управляете обновлением
    });
  };

  return (
    <>
      {isPending && <Spinner />}
      <Tabs onSelect={selectTab} />
      <TabContent tab={tab} />
    </>
  );
}

// useDeferredValue - получаете отложенное значение
function TabContainer({ selectedTab }) {
  const deferredTab = useDeferredValue(selectedTab);

  return <TabContent tab={deferredTab} />;
}
```

### 2. 🚨 Асинхронные операции в transition

```javascript
// ❌ ПРОБЛЕМА - async функции не работают
startTransition(async () => {
  await fetchData(); // Не сработает!
  setState(data);
});

// ✅ РЕШЕНИЕ - сначала fetch, потом transition
async function handleClick() {
  const data = await fetchData();

  startTransition(() => {
    setState(data);
  });
}
```

### 3. ⚡ Вложенные transitions

```javascript
// ✅ Вложенные transitions работают корректно
function Component() {
  const [isPending, startTransition] = useTransition();

  const handleUpdate = () => {
    startTransition(() => {
      setState1(value1);

      // Внутренний transition
      startTransition(() => {
        setState2(value2);
      });
    });
  };
}
```

## 💡 Лучшие практики

1. **🎯 Используйте для навигации** — плавные переходы между страницами
2. **🔧 Показывайте isPending** — дайте пользователю feedback
3. **📚 Группируйте связанные обновления** — в один startTransition
4. **🚀 Не используйте для форм** — только для некритичных обновлений

> 🎨 useTransition делает приложение отзывчивым при тяжёлых обновлениях!

---

# 🆔 Глубокое погружение в useId

## Как работает useId

**useId** — это хук для генерации уникальных ID, стабильных между рендерами и безопасных для SSR.

```javascript
const id = useId();
```

### 🎯 Основные принципы

1. **Уникальность** — ID уникален в пределах компонента
2. **Стабильность** — не изменяется между рендерами
3. **SSR-безопасность** — одинаковый ID на сервере и клиенте
4. **Не для key** — используйте для accessibility, не для списков

## ⚠️ Подводные камни и особенности

### 1. 🎭 useId vs Math.random()

```javascript
// ❌ ПРОБЛЕМА - ID меняется при каждом рендере
function Component() {
  const id = `field-${Math.random()}`;
  return <input id={id} />;
}

// ✅ РЕШЕНИЕ - useId стабилен
function Component() {
  const id = useId();
  return <input id={id} />;
}
```

### 2. 🔄 Множественные элементы с одним useId

```javascript
// ✅ Базовый ID с суффиксами
function RadioGroup() {
  const id = useId();

  return (
    <>
      <input type="radio" id={`${id}-option-1`} name={id} />
      <label htmlFor={`${id}-option-1`}>Option 1</label>

      <input type="radio" id={`${id}-option-2`} name={id} />
      <label htmlFor={`${id}-option-2`}>Option 2</label>
    </>
  );
}
```

### 3. ⚠️ Не используйте для key prop

```javascript
// ❌ ПРОБЛЕМА - useId не для списков
function List({ items }) {
  return items.map(item => {
    const id = useId(); // НЕ ДЕЛАЙТЕ ТАК!
    return <li key={id}>{item}</li>;
  });
}

// ✅ РЕШЕНИЕ - используйте стабильный ключ
function List({ items }) {
  return items.map(item => (
    <li key={item.id}>{item}</li>
  ));
}
```

## 💡 Лучшие практики

1. **🎯 Используйте для accessibility** — aria-labelledby, aria-describedby
2. **🔧 Используйте для форм** — связь label и input
3. **📚 Добавляйте префиксы** — для связанных элементов
4. **🚀 Не используйте для key** — только для ID атрибутов

> 🆔 useId обеспечивает уникальные и стабильные идентификаторы!

---

# 🔌 Глубокое погружение в useSyncExternalStore

## Как работает useSyncExternalStore

**useSyncExternalStore** — это хук для подписки на внешние хранилища данных с гарантией согласованности.

```javascript
const value = useSyncExternalStore(
  subscribe,    // Функция подписки
  getSnapshot,  // Получение текущего значения
  getServerSnapshot // Для SSR (опционально)
);
```

### 🎯 Основные принципы

1. **Подписка** — subscribe вызывается при монтировании
2. **Снапшоты** — getSnapshot должен возвращать неизменяемое значение
3. **Согласованность** — React гарантирует согласованность при конкурентном рендеринге
4. **SSR поддержка** — getServerSnapshot для серверного рендеринга

## ⚠️ Подводные камни и особенности

### 1. 🎭 Правильная реализация subscribe

```javascript
// ❌ ПРОБЛЕМА - не возвращает cleanup
const store = {
  subscribe(listener) {
    window.addEventListener('storage', listener);
    // Забыли return!
  }
};

// ✅ РЕШЕНИЕ - возвращаем функцию отписки
const store = {
  subscribe(listener) {
    window.addEventListener('storage', listener);
    return () => {
      window.removeEventListener('storage', listener);
    };
  }
};
```

### 2. 🔄 Неизменяемость getSnapshot

```javascript
// ❌ ПРОБЛЕМА - возвращает новый объект каждый раз
const store = {
  getSnapshot() {
    return { value: window.innerWidth }; // Новый объект!
  }
};

// ✅ РЕШЕНИЕ - возвращайте стабильное значение
const store = {
  value: window.innerWidth,

  getSnapshot() {
    return this.value; // Стабильное значение
  },

  subscribe(listener) {
    const handler = () => {
      this.value = window.innerWidth;
      listener();
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }
};
```

### 3. ⚡ SSR и getServerSnapshot

```javascript
// ✅ Правильная поддержка SSR
function useWindowWidth() {
  return useSyncExternalStore(
    (listener) => {
      window.addEventListener('resize', listener);
      return () => window.removeEventListener('resize', listener);
    },
    () => window.innerWidth,
    () => 1024 // Значение по умолчанию для SSR
  );
}
```

## 💡 Лучшие практики

1. **🎯 Используйте для Browser APIs** — navigator.onLine, matchMedia
2. **🔧 Используйте для сторонних библиотек** — Redux, MobX, Zustand
3. **📚 Всегда возвращайте cleanup** — из subscribe функции
4. **🚀 Кэшируйте снапшоты** — для производительности

> 🔌 useSyncExternalStore безопасно интегрирует внешние данные!

---

# 💉 Глубокое погружение в useInsertionEffect

## Как работает useInsertionEffect

**useInsertionEffect** — это хук для вставки стилей в DOM перед любыми layout эффектами. Предназначен для авторов CSS-in-JS библиотек.

```javascript
useInsertionEffect(() => {
  // Вставка стилей
  const styleTag = document.createElement('style');
  styleTag.textContent = css;
  document.head.appendChild(styleTag);

  return () => {
    // Cleanup
  };
}, [dependencies]);
```

### 🎯 Основные принципы

1. **Порядок выполнения** — до useLayoutEffect и useEffect
2. **Только для стилей** — не используйте для другой логики
3. **Для библиотек** — обычные приложения должны использовать useEffect
4. **Оптимизация** — предотвращает layout thrashing

## ⚠️ Подводные камни и особенности

### 1. 🎭 Порядок выполнения хуков

```javascript
function Component() {
  useInsertionEffect(() => {
    console.log('1. useInsertionEffect'); // Первый
  });

  useLayoutEffect(() => {
    console.log('2. useLayoutEffect'); // Второй
  });

  useEffect(() => {
    console.log('3. useEffect'); // Третий
  });
}
```

### 2. ⚠️ Ограничения

```javascript
// ❌ ПРОБЛЕМА - нельзя обновлять состояние
useInsertionEffect(() => {
  setState(value); // Не работает!
});

// ❌ ПРОБЛЕМА - нет доступа к refs
useInsertionEffect(() => {
  console.log(ref.current); // undefined!
});

// ✅ РЕШЕНИЕ - только вставка стилей
useInsertionEffect(() => {
  const style = document.createElement('style');
  style.textContent = `.class { color: red; }`;
  document.head.appendChild(style);

  return () => style.remove();
});
```

### 3. 🎨 Пример CSS-in-JS библиотеки

```javascript
// ✅ Реализация простой CSS-in-JS библиотеки
function useCSS(css) {
  const id = useId();

  useInsertionEffect(() => {
    let styleTag = document.getElementById(id);

    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = id;
      document.head.appendChild(styleTag);
    }

    styleTag.textContent = css;

    return () => {
      styleTag.remove();
    };
  }, [css, id]);

  return id;
}

// Использование
function Button() {
  useCSS(`
    .my-button {
      background: blue;
      padding: 10px;
    }
  `);

  return <button className="my-button">Click</button>;
}
```

## 💡 Лучшие практики

1. **🎯 Только для авторов библиотек** — не для обычных приложений
2. **🔧 Используйте для CSS** — не для другой логики
3. **📚 Очищайте ресурсы** — удаляйте style tags в cleanup
4. **🚀 Не обновляйте состояние** — только DOM манипуляции

> 💉 useInsertionEffect оптимизирует вставку динамических стилей!

---

# 12. use Hook 📦

## Что такое use()?

**use()** — это универсальный хук для чтения ресурсов (Promise, Context). Это единственный хук в React, который можно вызывать условно!

```javascript
import { use, Suspense } from 'react';

// Чтение Promise
function DataComponent({ dataPromise }) {
  const data = use(dataPromise);
  return <div>{data.message}</div>;
}

// Чтение Context
function ThemedButton() {
  const theme = use(ThemeContext);
  return <button className={theme}>Click</button>;
}

// Условное использование (уникально!)
function Component({ shouldLoad }) {
  if (shouldLoad) {
    const data = use(fetchData()); // ✅ Можно вызывать условно!
    return <div>{data}</div>;
  }
  return <div>No data</div>;
}
```

## Как работает use()

**use()** читает значение ресурса (Promise или Context):

```javascript
// 1. С Promise — приостанавливает рендер до разрешения
function UserProfile({ userPromise }) {
  const user = use(userPromise); // Suspense boundaries will catch this
  return <div>Hello, {user.name}!</div>;
}

// 2. С Context — читает текущее значение
function StatusBar() {
  const status = use(StatusContext);
  return <div>Status: {status}</div>;
}

// 3. Использование с Suspense
function App() {
  const userPromise = fetchUser('123');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}
```

## Основные принципы

1. **Универсальность** — один API для разных ресурсов
2. **Условность** — можно вызывать в if, циклах
3. **Suspense** — автоматическая интеграция для Promise
4. **Стабильность** — Promise должен быть стабильным

## Подводные камни и особенности

### 1. ❌ Создание Promise в рендере

```javascript
// ❌ ПЛОХО: Promise создаётся каждый рендер
function Component() {
  const data = use(fetch('/api/data')); // Бесконечные запросы!
  return <div>{data}</div>;
}

// ✅ ХОРОШО: Стабильный Promise
function Component() {
  const [dataPromise] = useState(() => fetch('/api/data'));
  const data = use(dataPromise);
  return <div>{data}</div>;
}

// ✅ ИЛИ: Promise из props
function Component({ dataPromise }) {
  const data = use(dataPromise);
  return <div>{data}</div>;
}
```

### 2. ❌ Забыли Suspense границу

```javascript
// ❌ ПЛОХО: нет Suspense
function App() {
  return <DataComponent dataPromise={fetchData()} />; // Error!
}

// ✅ ХОРОШО: с Suspense
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <DataComponent dataPromise={fetchData()} />
    </Suspense>
  );
}
```

### 3. ❌ Неправильная обработка ошибок

```javascript
// ❌ ПЛОХО: try-catch не поможет
function Component({ dataPromise }) {
  try {
    const data = use(dataPromise);
    return <div>{data}</div>;
  } catch (error) {
    return <div>Error</div>; // Не сработает!
  }
}

// ✅ ХОРОШО: ErrorBoundary
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Error occurred</div>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <Component dataPromise={fetchData()} />
      </Suspense>
    </ErrorBoundary>
  );
}
```

### 4. ❌ Условный вызов с useContext

```javascript
// ❌ ПЛОХО: useContext нельзя вызывать условно
function Component({ shouldShow }) {
  if (shouldShow) {
    const theme = useContext(ThemeContext); // Ошибка правил хуков!
  }
}

// ✅ ХОРОШО: use() можно вызывать условно
function Component({ shouldShow }) {
  if (shouldShow) {
    const theme = use(ThemeContext); // ✅ Работает!
    return <div className={theme}>Content</div>;
  }
  return null;
}
```

### 5. ❌ Использование rejected Promise

```javascript
// ❌ ПЛОХО: Promise уже rejected
const rejectedPromise = Promise.reject('Error');

function Component() {
  const data = use(rejectedPromise); // Выбросит ошибку сразу!
}

// ✅ ХОРОШО: создавайте Promise в компоненте
function Component() {
  const [dataPromise] = useState(() =>
    fetch('/api/data')
      .then(res => res.json())
      .catch(err => ({ error: err.message }))
  );

  const data = use(dataPromise);

  if (data.error) {
    return <div>Error: {data.error}</div>;
  }

  return <div>{data.message}</div>;
}
```

### 6. ❌ Смешивание use() с useState для одних данных

```javascript
// ❌ ПЛОХО: дублирование состояния
function Component({ dataPromise }) {
  const [data, setData] = useState(null);
  const promiseData = use(dataPromise);

  useEffect(() => {
    setData(promiseData); // Зачем?
  }, [promiseData]);

  return <div>{data}</div>;
}

// ✅ ХОРОШО: используйте напрямую
function Component({ dataPromise }) {
  const data = use(dataPromise);
  return <div>{data}</div>;
}
```

### 7. ❌ Вложенные use() без оптимизации

```javascript
// ❌ ПЛОХО: последовательная загрузка
function Component() {
  const user = use(fetchUser());
  const posts = use(fetchUserPosts(user.id)); // Ждёт user
  const comments = use(fetchPostComments(posts[0].id)); // Ждёт posts

  return <div>...</div>;
}

// ✅ ХОРОШО: параллельная загрузка
function Component() {
  const userPromise = useMemo(() => fetchUser(), []);
  const user = use(userPromise);

  const postsPromise = useMemo(() => fetchUserPosts(user.id), [user.id]);
  const posts = use(postsPromise);

  return <div>...</div>;
}

// ✅ ЕЩЁ ЛУЧШЕ: Promise.all
function Component() {
  const [user, posts, comments] = use(
    Promise.all([
      fetchUser(),
      fetchPosts(),
      fetchComments()
    ])
  );

  return <div>...</div>;
}
```

### 8. ❌ Использование в циклах без ключей

```javascript
// ❌ ПЛОХО: нестабильные Promise
function List({ ids }) {
  return (
    <div>
      {ids.map(id => {
        const data = use(fetch(`/api/${id}`)); // Новый Promise каждый рендер!
        return <div key={id}>{data}</div>;
      })}
    </div>
  );
}

// ✅ ХОРОШО: отдельный компонент
function ListItem({ id, dataPromise }) {
  const data = use(dataPromise);
  return <div>{data}</div>;
}

function List({ ids }) {
  const promises = useMemo(
    () => ids.map(id => fetch(`/api/${id}`)),
    [ids]
  );

  return (
    <div>
      {ids.map((id, index) => (
        <Suspense key={id} fallback={<Loading />}>
          <ListItem id={id} dataPromise={promises[index]} />
        </Suspense>
      ))}
    </div>
  );
}
```

### 9. ❌ Неправильная типизация с TypeScript

```typescript
// ❌ ПЛОХО: any
function Component({ dataPromise }: { dataPromise: Promise<any> }) {
  const data = use(dataPromise); // data: any
  return <div>{data.message}</div>;
}

// ✅ ХОРОШО: типизированный Promise
interface User {
  id: string;
  name: string;
}

function Component({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise); // user: User
  return <div>{user.name}</div>;
}

// ✅ ХОРОШО: Context с типами
const ThemeContext = createContext<'light' | 'dark'>('light');

function ThemedButton() {
  const theme = use(ThemeContext); // theme: 'light' | 'dark'
  return <button className={theme}>Click</button>;
}
```

### 10. ❌ Забыли про race conditions

```javascript
// ❌ ПЛОХО: race conditions
function SearchResults({ query }) {
  const results = use(fetch(`/api/search?q=${query}`));
  return <div>{results.map(r => <div key={r.id}>{r.title}</div>)}</div>;
}

// ✅ ХОРОШО: контроль запросов
function SearchResults({ query }) {
  const resultsPromise = useMemo(() => {
    const controller = new AbortController();

    return fetch(`/api/search?q=${query}`, {
      signal: controller.signal
    }).then(res => res.json());
  }, [query]);

  const results = use(resultsPromise);
  return <div>{results.map(r => <div key={r.id}>{r.title}</div>)}</div>;
}
```

## 💡 Лучшие практики

1. **🎯 Используйте для Server Components** — идеален для RSC
2. **🔧 Стабильные Promise** — создавайте вне рендера или мемоизируйте
3. **📚 Suspense границы** — всегда оборачивайте компоненты
4. **🚀 ErrorBoundary** — обрабатывайте ошибки правильно
5. **⚡ Параллельная загрузка** — используйте Promise.all
6. **🎨 Условная логика** — используйте уникальную возможность use()

> 📦 use() — это будущее работы с асинхронными данными в React!

---

# 13. useOptimistic Hook ⚡

## Что такое useOptimistic()?

**useOptimistic()** — хук для оптимистичных обновлений UI. Показывает предполагаемый результат мгновенно, пока сервер обрабатывает запрос.

```javascript
import { useOptimistic, useTransition } from 'react';

function LikeButton({ initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (currentLikes, amount) => currentLikes + amount
  );
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    startTransition(async () => {
      // UI обновляется мгновенно
      addOptimisticLike(1);

      // Отправляем на сервер
      const result = await fetch('/api/like', { method: 'POST' });
      const data = await result.json();

      // Обновляем реальное состояние
      setLikes(data.likes);
    });
  };

  return (
    <button onClick={handleLike} disabled={isPending}>
      ❤️ {optimisticLikes}
    </button>
  );
}
```

## Как работает useOptimistic()

**useOptimistic()** создаёт оптимистичное состояние на время асинхронной операции:

```javascript
const [optimisticState, addOptimistic] = useOptimistic(
  actualState,
  (currentState, optimisticValue) => {
    // Функция для обновления состояния
    return newState;
  }
);

// 1. Вызываете addOptimistic() — UI обновляется мгновенно
// 2. Выполняется async операция
// 3. Обновляете actualState — optimisticState автоматически синхронизируется
```

## Основные принципы

1. **Мгновенная обратная связь** — UI обновляется без задержки
2. **Автоматический откат** — при изменении actualState
3. **useTransition** — обязательно использовать вместе
4. **Оптимизм** — предполагаем успех операции

## Подводные камни и особенности

### 1. ❌ Забыли useTransition

```javascript
// ❌ ПЛОХО: без useTransition
function Component() {
  const [messages, setMessages] = useState([]);
  const [optimisticMessages, addOptimistic] = useOptimistic(
    messages,
    (state, msg) => [...state, msg]
  );

  const handleSend = async (text) => {
    addOptimistic({ text, status: 'sending' }); // Не сработает правильно!

    const sent = await sendMessage(text);
    setMessages(prev => [...prev, sent]);
  };

  return <div>...</div>;
}

// ✅ ХОРОШО: с useTransition
function Component() {
  const [messages, setMessages] = useState([]);
  const [optimisticMessages, addOptimistic] = useOptimistic(
    messages,
    (state, msg) => [...state, msg]
  );
  const [isPending, startTransition] = useTransition();

  const handleSend = async (text) => {
    startTransition(async () => {
      addOptimistic({ text, status: 'sending' });

      const sent = await sendMessage(text);
      setMessages(prev => [...prev, sent]);
    });
  };

  return <div>...</div>;
}
```

### 2. ❌ Не обновляете actualState

```javascript
// ❌ ПЛОХО: только оптимистичное обновление
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [optimisticTodos, updateOptimistic] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );

  const addTodo = (text) => {
    startTransition(async () => {
      updateOptimistic({ id: Date.now(), text });
      await fetch('/api/todos', { method: 'POST', body: JSON.stringify({ text }) });
      // ❌ Забыли обновить todos! Оптимистичное состояние не зафиксируется
    });
  };

  return <div>{optimisticTodos.map(...)}</div>;
}

// ✅ ХОРОШО: обновляем actualState
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [optimisticTodos, updateOptimistic] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );

  const addTodo = (text) => {
    startTransition(async () => {
      const tempTodo = { id: Date.now(), text };
      updateOptimistic(tempTodo);

      const response = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ text })
      });
      const savedTodo = await response.json();

      setTodos(prev => [...prev, savedTodo]); // ✅ Обновляем реальное состояние
    });
  };

  return <div>{optimisticTodos.map(...)}</div>;
}
```

### 3. ❌ Использование для критических операций

```javascript
// ❌ ПЛОХО: оптимизм для платежей
function PaymentButton({ amount }) {
  const [balance, setBalance] = useState(1000);
  const [optimisticBalance, updateBalance] = useOptimistic(
    balance,
    (current, change) => current - change
  );

  const handlePayment = () => {
    startTransition(async () => {
      updateBalance(amount); // Показываем списание сразу

      // Что если платёж не пройдёт?
      await processPayment(amount);
      setBalance(prev => prev - amount);
    });
  };

  return <div>Balance: {optimisticBalance}</div>; // ❌ Опасно!
}

// ✅ ХОРОШО: без оптимизма для критических операций
function PaymentButton({ amount }) {
  const [balance, setBalance] = useState(1000);
  const [isPending, setIsPending] = useState(false);

  const handlePayment = async () => {
    setIsPending(true);

    try {
      const result = await processPayment(amount);

      if (result.success) {
        setBalance(result.newBalance); // Обновляем только после подтверждения
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      Balance: {balance}
      {isPending && <span>Processing...</span>}
    </div>
  );
}
```

### 4. ❌ Неправильная обработка ошибок

```javascript
// ❌ ПЛОХО: нет обработки ошибок
function CommentForm() {
  const [comments, setComments] = useState([]);
  const [optimisticComments, addOptimistic] = useOptimistic(
    comments,
    (state, comment) => [...state, comment]
  );

  const handleSubmit = (text) => {
    startTransition(async () => {
      addOptimistic({ id: Date.now(), text, status: 'pending' });

      await sendComment(text); // Может выбросить ошибку!
      setComments(prev => [...prev, { id: Date.now(), text }]);
    });
  };

  // Если ошибка — оптимистичный комментарий останется!
}

// ✅ ХОРОШО: обработка ошибок
function CommentForm() {
  const [comments, setComments] = useState([]);
  const [optimisticComments, addOptimistic] = useOptimistic(
    comments,
    (state, comment) => [...state, comment]
  );
  const [error, setError] = useState(null);

  const handleSubmit = (text) => {
    startTransition(async () => {
      const tempComment = { id: Date.now(), text, status: 'pending' };
      addOptimistic(tempComment);

      try {
        const savedComment = await sendComment(text);
        setComments(prev => [...prev, savedComment]);
        setError(null);
      } catch (err) {
        setError(err.message);
        // optimisticComments автоматически откатится к comments
        // так как мы не обновили comments
      }
    });
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {optimisticComments.map(comment => (
        <div key={comment.id}>{comment.text}</div>
      ))}
    </div>
  );
}
```

### 5. ❌ Сложная логика обновления

```javascript
// ❌ ПЛОХО: сложная логика в updateFn
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [optimisticTodos, updateOptimistic] = useOptimistic(
    todos,
    (state, action) => {
      // ❌ Слишком сложно!
      if (action.type === 'add') {
        return [...state, action.todo];
      } else if (action.type === 'toggle') {
        return state.map(todo =>
          todo.id === action.id
            ? { ...todo, completed: !todo.completed }
            : todo
        );
      } else if (action.type === 'delete') {
        return state.filter(todo => todo.id !== action.id);
      }
      return state;
    }
  );

  // Трудно отследить, что происходит
}

// ✅ ХОРОШО: простая логика, несколько useOptimistic
function TodoList() {
  const [todos, setTodos] = useState([]);

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, todo) => [...state, todo]
  );

  const [toggledTodos, toggleOptimistic] = useOptimistic(
    optimisticTodos,
    (state, id) => state.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );

  // Чёткое разделение логики
}
```

### 6. ❌ Не показываете статус pending

```javascript
// ❌ ПЛОХО: нет индикации загрузки
function MessageList() {
  const [messages, setMessages] = useState([]);
  const [optimisticMessages, addOptimistic] = useOptimistic(
    messages,
    (state, msg) => [...state, msg]
  );

  return (
    <div>
      {optimisticMessages.map(msg => (
        <div key={msg.id}>
          {msg.text}
          {/* ❌ Нет индикации, что сообщение отправляется */}
        </div>
      ))}
    </div>
  );
}

// ✅ ХОРОШО: показываем статус
function MessageList() {
  const [messages, setMessages] = useState([]);
  const [optimisticMessages, addOptimistic] = useOptimistic(
    messages,
    (state, msg) => [...state, msg]
  );

  return (
    <div>
      {optimisticMessages.map(msg => (
        <div
          key={msg.id}
          style={{
            opacity: msg.status === 'pending' ? 0.5 : 1,
            backgroundColor: msg.status === 'pending' ? '#fef3c7' : 'transparent'
          }}
        >
          {msg.text}
          {msg.status === 'pending' && <span>⏳ Отправка...</span>}
        </div>
      ))}
    </div>
  );
}
```

### 7. ❌ Дублирование состояния

```javascript
// ❌ ПЛОХО: дублирование
function LikeButton() {
  const [likes, setLikes] = useState(42);
  const [displayLikes, setDisplayLikes] = useState(42); // ❌ Дубликат!
  const [optimisticLikes, addOptimistic] = useOptimistic(
    likes,
    (current, amount) => current + amount
  );

  const handleLike = () => {
    startTransition(async () => {
      setDisplayLikes(prev => prev + 1); // ❌ Зачем?
      addOptimistic(1);

      const result = await toggleLike();
      setLikes(result.likes);
    });
  };

  return <div>{displayLikes}</div>; // ❌ Используем не то состояние!
}

// ✅ ХОРОШО: одно состояние
function LikeButton() {
  const [likes, setLikes] = useState(42);
  const [optimisticLikes, addOptimistic] = useOptimistic(
    likes,
    (current, amount) => current + amount
  );

  const handleLike = () => {
    startTransition(async () => {
      addOptimistic(1);

      const result = await toggleLike();
      setLikes(result.likes);
    });
  };

  return <div>{optimisticLikes}</div>; // ✅ Правильно!
}
```

### 8. ❌ Использование без необходимости

```javascript
// ❌ ПЛОХО: оптимизм для быстрых операций
function Counter() {
  const [count, setCount] = useState(0);
  const [optimisticCount, addOptimistic] = useOptimistic(
    count,
    (current, amount) => current + amount
  );

  const increment = () => {
    startTransition(async () => {
      addOptimistic(1);
      // ❌ Зачем? Операция мгновенная!
      setCount(prev => prev + 1);
    });
  };

  return <div>{optimisticCount}</div>;
}

// ✅ ХОРОШО: обычный useState для синхронных операций
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev => prev + 1); // Мгновенно!
  };

  return <div>{count}</div>;
}
```

### 9. ❌ Мутация состояния

```javascript
// ❌ ПЛОХО: мутация
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [optimisticTodos, updateOptimistic] = useOptimistic(
    todos,
    (state, todo) => {
      state.push(todo); // ❌ Мутация!
      return state;
    }
  );
}

// ✅ ХОРОШО: иммутабельность
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [optimisticTodos, updateOptimistic] = useOptimistic(
    todos,
    (state, todo) => [...state, todo] // ✅ Новый массив
  );
}
```

### 10. ❌ Неправильный порядок обновлений

```javascript
// ❌ ПЛОХО: обновляем state до оптимистичного
function Component() {
  const [items, setItems] = useState([]);
  const [optimisticItems, addOptimistic] = useOptimistic(
    items,
    (state, item) => [...state, item]
  );

  const addItem = (item) => {
    startTransition(async () => {
      setItems(prev => [...prev, item]); // ❌ Сначала реальное состояние
      addOptimistic(item); // Не сработает как ожидается

      await saveItem(item);
    });
  };
}

// ✅ ХОРОШО: сначала оптимистичное, потом реальное
function Component() {
  const [items, setItems] = useState([]);
  const [optimisticItems, addOptimistic] = useOptimistic(
    items,
    (state, item) => [...state, item]
  );

  const addItem = (item) => {
    startTransition(async () => {
      addOptimistic(item); // ✅ Сначала оптимистичное

      const saved = await saveItem(item);
      setItems(prev => [...prev, saved]); // ✅ Потом реальное
    });
  };
}
```

## 💡 Лучшие практики

1. **🎯 Для некритичных операций** — лайки, комментарии, добавление в корзину
2. **🔧 Всегда с useTransition** — обязательная пара
3. **📚 Обрабатывайте ошибки** — откатывайте при неудаче
4. **🚀 Показывайте статус** — индикация pending состояния
5. **⚡ Простая логика** — не усложняйте updateFn
6. **🎨 Визуальные отличия** — помечайте оптимистичные элементы

> ⚡ useOptimistic делает ваше приложение мгновенно отзывчивым!

---

# 14. useActionState Hook 📋

## Что такое useActionState()?

**useActionState()** — хук для управления состоянием форм и серверных действий (Server Actions). Заменяет useFormState из React 18.

```javascript
import { useActionState } from 'react';

async function submitForm(prevState, formData) {
  const email = formData.get('email');

  if (!email) {
    return { error: 'Email обязателен' };
  }

  const response = await fetch('/api/submit', {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    return { error: 'Ошибка сервера' };
  }

  return { success: true, message: 'Форма отправлена!' };
}

function Form() {
  const [state, formAction, isPending] = useActionState(
    submitForm,
    { error: null } // Начальное состояние
  );

  return (
    <form action={formAction}>
      <input name="email" disabled={isPending} />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Отправка...' : 'Отправить'}
      </button>
      {state.error && <p>{state.error}</p>}
      {state.success && <p>{state.message}</p>}
    </form>
  );
}
```

## Как работает useActionState()

**useActionState()** принимает action функцию и возвращает состояние, обёрнутый action и флаг pending:

```javascript
const [state, formAction, isPending] = useActionState(actionFn, initialState);

// state — результат последнего вызова actionFn
// formAction — функция для передачи в action атрибут формы
// isPending — true во время выполнения action

// Action функция получает:
async function actionFn(previousState, formData) {
  // previousState — предыдущее значение state
  // formData — данные из формы

  // Возвращаемое значение становится новым state
  return newState;
}
```

## Основные принципы

1. **Прогрессивное улучшение** — работает без JavaScript
2. **Автоматический pending** — не нужно управлять вручную
3. **FormData API** — нативная работа с формами
4. **Server Actions** — идеально для RSC

## Подводные камни и особенности

### 1. ❌ Не используете FormData

```javascript
// ❌ ПЛОХО: ручной сбор данных
async function submitAction(prevState, formData) {
  const email = document.querySelector('[name="email"]').value; // ❌ Плохо!
  const password = document.querySelector('[name="password"]').value;

  return { email, password };
}

function Form() {
  const [state, formAction] = useActionState(submitAction, {});

  return (
    <form action={formAction}>
      <input name="email" />
      <input name="password" />
      <button type="submit">Submit</button>
    </form>
  );
}

// ✅ ХОРОШО: используйте FormData
async function submitAction(prevState, formData) {
  const email = formData.get('email'); // ✅ Правильно!
  const password = formData.get('password');

  return { email, password };
}
```

### 2. ❌ Забыли вернуть новое состояние

```javascript
// ❌ ПЛОХО: ничего не возвращаем
async function loginAction(prevState, formData) {
  const email = formData.get('email');

  if (!email) {
    console.log('Error'); // ❌ Логирование не обновит state!
  }

  await fetch('/api/login', { method: 'POST', body: formData });
  // ❌ Ничего не вернули — state не обновится!
}

// ✅ ХОРОШО: возвращаем новое состояние
async function loginAction(prevState, formData) {
  const email = formData.get('email');

  if (!email) {
    return { error: 'Email обязателен' }; // ✅ Возвращаем ошибку
  }

  const response = await fetch('/api/login', {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    return { error: 'Ошибка входа' };
  }

  return { success: true, message: 'Вы вошли!' }; // ✅ Возвращаем успех
}
```

### 3. ❌ Не обрабатываете isPending

```javascript
// ❌ ПЛОХО: нет индикации загрузки
function Form() {
  const [state, formAction, isPending] = useActionState(submitAction, {});

  return (
    <form action={formAction}>
      <input name="email" />
      {/* ❌ Нет disabled, можно отправить форму много раз */}
      <button type="submit">Submit</button>
    </form>
  );
}

// ✅ ХОРОШО: используем isPending
function Form() {
  const [state, formAction, isPending] = useActionState(submitAction, {});

  return (
    <form action={formAction}>
      <input name="email" disabled={isPending} /> {/* ✅ Блокируем ввод */}
      <button type="submit" disabled={isPending}>
        {isPending ? '⏳ Отправка...' : 'Отправить'} {/* ✅ Показываем статус */}
      </button>
    </form>
  );
}
```

### 4. ❌ Синхронный action

```javascript
// ❌ ПЛОХО: синхронный action (зачем useActionState?)
function countAction(prevState, formData) {
  return { count: prevState.count + 1 }; // Синхронная операция
}

function Counter() {
  const [state, formAction, isPending] = useActionState(
    countAction,
    { count: 0 }
  );

  return (
    <form action={formAction}>
      <div>{state.count}</div>
      <button type="submit">Increment</button>
    </form>
  );
}

// ✅ ХОРОШО: используйте useState для синхронных операций
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}

// ✅ useActionState для async операций
async function saveCountAction(prevState, formData) {
  const newCount = prevState.count + 1;

  await fetch('/api/count', {
    method: 'POST',
    body: JSON.stringify({ count: newCount })
  });

  return { count: newCount };
}
```

### 5. ❌ Неправильная валидация

```javascript
// ❌ ПЛОХО: валидация только на клиенте
function Form() {
  const [state, formAction, isPending] = useActionState(submitAction, {});

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    if (!email.includes('@')) {
      alert('Неверный email'); // ❌ Только клиентская валидация
      return;
    }

    formAction(new FormData(e.target));
  };

  return <form onSubmit={handleSubmit}>...</form>;
}

// ✅ ХОРОШО: валидация в action (работает без JS)
async function submitAction(prevState, formData) {
  const email = formData.get('email');

  // ✅ Серверная валидация
  if (!email || !email.includes('@')) {
    return { error: 'Неверный email' };
  }

  const response = await fetch('/api/submit', {
    method: 'POST',
    body: formData
  });

  return { success: true };
}

function Form() {
  const [state, formAction, isPending] = useActionState(submitAction, {});

  return (
    <form action={formAction}>
      <input name="email" />
      <button type="submit">Submit</button>
      {state.error && <p>{state.error}</p>}
    </form>
  );
}
```

### 6. ❌ Не используете prevState

```javascript
// ❌ ПЛОХО: игнорируем prevState
async function addTodoAction(prevState, formData) {
  const text = formData.get('todo');

  // ❌ Не используем prevState.todos!
  const response = await fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify({ text })
  });

  const newTodo = await response.json();

  return { todos: [newTodo] }; // ❌ Потеряли старые todos!
}

// ✅ ХОРОШО: используем prevState
async function addTodoAction(prevState, formData) {
  const text = formData.get('todo');

  const response = await fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify({ text })
  });

  const newTodo = await response.json();

  return {
    todos: [...prevState.todos, newTodo] // ✅ Сохраняем старые
  };
}
```

### 7. ❌ Множественные отправки

```javascript
// ❌ ПЛОХО: можно отправить несколько раз
function Form() {
  const [state, formAction, isPending] = useActionState(submitAction, {});

  return (
    <form action={formAction}>
      <input name="email" />
      <button type="submit">Submit</button>
      <button type="submit">Submit Again</button> {/* ❌ Две кнопки! */}
    </form>
  );
}

// ✅ ХОРОШО: одна кнопка, блокируем при pending
function Form() {
  const [state, formAction, isPending] = useActionState(submitAction, {});

  return (
    <form action={formAction}>
      <input name="email" disabled={isPending} />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Отправка...' : 'Submit'}
      </button>
    </form>
  );
}
```

### 8. ❌ Потеря данных формы после ошибки

```javascript
// ❌ ПЛОХО: форма очищается после ошибки
async function submitAction(prevState, formData) {
  const name = formData.get('name');
  const email = formData.get('email');

  if (!name) {
    return { error: 'Имя обязательно' };
  }

  // После возврата ошибки форма сбрасывается (если использовать reset())
}

function Form() {
  const [state, formAction, isPending] = useActionState(submitAction, {});
  const formRef = useRef(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset(); // ❌ Очищаем и при ошибке!
    }
  }, [state]);

  return <form ref={formRef} action={formAction}>...</form>;
}

// ✅ ХОРОШО: очищаем только при успехе
function Form() {
  const [state, formAction, isPending] = useActionState(submitAction, {});
  const formRef = useRef(null);

  useEffect(() => {
    if (state.success && !state.error) { // ✅ Только при успехе
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input name="name" defaultValue={state.name} /> {/* Сохраняем значение */}
      <input name="email" defaultValue={state.email} />
      <button type="submit">Submit</button>
      {state.error && <p>{state.error}</p>}
    </form>
  );
}
```

### 9. ❌ Неправильная работа с файлами

```javascript
// ❌ ПЛОХО: не обрабатываем файлы правильно
async function uploadAction(prevState, formData) {
  const file = formData.get('file');

  // ❌ Отправляем как JSON
  await fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ file }) // ❌ Файл нельзя сериализовать!
  });
}

// ✅ ХОРОШО: отправляем FormData напрямую
async function uploadAction(prevState, formData) {
  const file = formData.get('file');

  if (!file || file.size === 0) {
    return { error: 'Файл не выбран' };
  }

  // ✅ Отправляем FormData с файлом
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData // FormData поддерживает файлы
  });

  if (!response.ok) {
    return { error: 'Ошибка загрузки' };
  }

  const result = await response.json();
  return { success: true, fileUrl: result.url };
}
```

### 10. ❌ Не используете permalink

```javascript
// ❌ ПЛОХО: нет permalink после отправки
async function createPostAction(prevState, formData) {
  const title = formData.get('title');

  const response = await fetch('/api/posts', {
    method: 'POST',
    body: formData
  });

  const post = await response.json();

  return { success: true, postId: post.id }; // ❌ Не перенаправляем
}

function CreatePost() {
  const [state, formAction, isPending] = useActionState(createPostAction, {});

  return (
    <form action={formAction}>
      <input name="title" />
      <button type="submit">Create</button>
      {state.success && <p>Post created!</p>} {/* ❌ Остаёмся на форме */}
    </form>
  );
}

// ✅ ХОРОШО: используем permalink атрибут или navigate
async function createPostAction(prevState, formData) {
  const title = formData.get('title');

  const response = await fetch('/api/posts', {
    method: 'POST',
    body: formData
  });

  const post = await response.json();

  return { success: true, permalink: `/posts/${post.id}` }; // ✅ Permalink
}

function CreatePost() {
  const [state, formAction, isPending] = useActionState(
    createPostAction,
    {},
    `/posts/new` // permalink для действия
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (state.success && state.permalink) {
      navigate(state.permalink); // ✅ Перенаправляем
    }
  }, [state, navigate]);

  return (
    <form action={formAction}>
      <input name="title" />
      <button type="submit">Create</button>
    </form>
  );
}
```

## 💡 Лучшие практики

1. **🎯 Для форм с Server Actions** — идеальная пара
2. **🔧 Валидация в action** — работает без JavaScript
3. **📚 Используйте FormData** — нативный API
4. **🚀 Блокируйте при isPending** — предотвращайте множественные отправки
5. **⚡ Очищайте только при успехе** — сохраняйте данные при ошибке
6. **🎨 Permalink** — перенаправляйте после успешной отправки

> 📋 useActionState — это современный способ работы с формами в React!

---

# 15. useFormStatus Hook 🔄

## Что такое useFormStatus()?

**useFormStatus()** — хук для получения информации о статусе родительской формы. Работает только в дочерних компонентах формы!

```javascript
import { useFormStatus } from 'react-dom';

// Переиспользуемая кнопка Submit
function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? '⏳ Отправка...' : '📤 Отправить'}
    </button>
  );
}

// Форма
function LoginForm() {
  async function loginAction(formData) {
    'use server';
    await authenticateUser(formData);
  }

  return (
    <form action={loginAction}>
      <input name="email" />
      <input name="password" />

      {/* Кнопка автоматически знает о pending */}
      <SubmitButton />
    </form>
  );
}
```

## Как работает useFormStatus()

**useFormStatus()** возвращает информацию о ближайшей родительской форме:

```javascript
const { pending, data, method, action } = useFormStatus();

// pending: boolean — форма в процессе отправки
// data: FormData | null — данные, отправляемые формой
// method: 'get' | 'post' — HTTP метод
// action: string | function — URL или функция action
```

**ВАЖНО:** useFormStatus работает только в дочерних компонентах, не на уровне формы!

## Основные принципы

1. **Дочерние компоненты** — работает только внутри формы
2. **Автоматическое обновление** — следит за статусом родителя
3. **Переиспользуемость** — создавайте универсальные UI компоненты
4. **Server Actions** — лучше всего работает с RSC

## Подводные камни и особенности

### 1. ❌ Вызов на уровне формы

```javascript
// ❌ ПЛОХО: useFormStatus на уровне формы
function LoginForm() {
  const { pending } = useFormStatus(); // ❌ Вернёт false всегда!

  async function loginAction(formData) {
    'use server';
    await authenticateUser(formData);
  }

  return (
    <form action={loginAction}>
      <input name="email" disabled={pending} /> {/* Не сработает! */}
      <button type="submit" disabled={pending}>Submit</button>
    </form>
  );
}

// ✅ ХОРОШО: в дочернем компоненте
function SubmitButton() {
  const { pending } = useFormStatus(); // ✅ Работает!
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Отправка...' : 'Submit'}
    </button>
  );
}

function LoginForm() {
  async function loginAction(formData) {
    'use server';
    await authenticateUser(formData);
  }

  return (
    <form action={loginAction}>
      <input name="email" />
      <SubmitButton /> {/* ✅ Отдельный компонент */}
    </form>
  );
}
```

### 2. ❌ Отключение полей без fieldset

```javascript
// ❌ ПЛОХО: отключаем каждое поле вручную
function FormFields() {
  const { pending } = useFormStatus();

  return (
    <>
      <input name="name" disabled={pending} />
      <input name="email" disabled={pending} />
      <input name="phone" disabled={pending} />
      <textarea name="message" disabled={pending} />
      {/* ❌ Много повторений */}
    </>
  );
}

// ✅ ХОРОШО: используем fieldset
function FormFields() {
  const { pending } = useFormStatus();

  return (
    <fieldset disabled={pending}> {/* ✅ Одна строка */}
      <input name="name" />
      <input name="email" />
      <input name="phone" />
      <textarea name="message" />
    </fieldset>
  );
}
```

### 3. ❌ Не показываете индикатор загрузки

```javascript
// ❌ ПЛОХО: нет индикатора
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      Submit {/* ❌ Непонятно, что происходит */}
    </button>
  );
}

// ✅ ХОРОШО: с индикатором
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? '⏳ Отправка...' : '📤 Отправить'}
    </button>
  );
}

// ✅ ЕЩЁ ЛУЧШЕ: отдельный индикатор
function LoadingIndicator() {
  const { pending } = useFormStatus();

  if (!pending) return null;

  return (
    <div className="loading">
      ⏳ Форма отправляется, пожалуйста подождите...
    </div>
  );
}

function Form() {
  return (
    <form action={submitAction}>
      <input name="email" />
      <SubmitButton />
      <LoadingIndicator /> {/* ✅ Дополнительная обратная связь */}
    </form>
  );
}
```

### 4. ❌ Использование вне Server Actions

```javascript
// ❌ ПЛОХО: с обычным onSubmit (useFormStatus не работает)
function Form() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await fetch('/api/submit', { method: 'POST', body: formData });
  };

  return (
    <form onSubmit={handleSubmit}>
      <SubmitButton /> {/* ❌ pending всегда false */}
    </form>
  );
}

// ✅ ХОРОШО: с useActionState (имитация для клиента)
function Form() {
  const [state, formAction, isPending] = useActionState(submitAction, {});

  return (
    <FormStatusContext.Provider value={{ pending: isPending }}>
      <form action={formAction}>
        <SubmitButton /> {/* ✅ Работает через Context */}
      </form>
    </FormStatusContext.Provider>
  );
}

// ✅ ЛУЧШЕ: Server Actions (нативная поддержка)
function Form() {
  async function submitAction(formData) {
    'use server';
    await saveData(formData);
  }

  return (
    <form action={submitAction}>
      <SubmitButton /> {/* ✅ Работает из коробки */}
    </form>
  );
}
```

### 5. ❌ Дублирование логики

```javascript
// ❌ ПЛОХО: дублируем логику для каждой кнопки
function Form() {
  return (
    <form action={submitAction}>
      <input name="email" />

      <SubmitButtonPrimary />
      <SubmitButtonSecondary />
      <CancelButton />
      {/* ❌ Каждая кнопка повторяет логику pending */}
    </form>
  );
}

function SubmitButtonPrimary() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="btn-primary">
      {pending ? 'Отправка...' : 'Submit'}
    </button>
  );
}

function SubmitButtonSecondary() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="btn-secondary">
      {pending ? 'Отправка...' : 'Save Draft'}
    </button>
  );
}

// ✅ ХОРОШО: переиспользуемый компонент
function FormButton({ children, variant = 'primary', loadingText = 'Loading...' }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`btn-${variant}`}
    >
      {pending ? loadingText : children}
    </button>
  );
}

function Form() {
  return (
    <form action={submitAction}>
      <input name="email" />

      <FormButton variant="primary" loadingText="Отправка...">
        Submit
      </FormButton>
      <FormButton variant="secondary" loadingText="Сохранение...">
        Save Draft
      </FormButton>
    </form>
  );
}
```

### 6. ❌ Не используете data из useFormStatus

```javascript
// ❌ ПЛОХО: игнорируем data
function SubmitButton() {
  const { pending } = useFormStatus();
  // ❌ data может быть полезен!

  return <button type="submit" disabled={pending}>Submit</button>;
}

// ✅ ХОРОШО: показываем, что отправляется
function SubmitButton() {
  const { pending, data } = useFormStatus();

  if (pending && data) {
    const email = data.get('email');
    return (
      <button type="submit" disabled>
        Отправка для {email}...
      </button>
    );
  }

  return <button type="submit">Submit</button>;
}
```

### 7. ❌ Множественные формы без разделения

```javascript
// ❌ ПЛОХО: общие компоненты для разных форм
function Page() {
  return (
    <div>
      <form action={loginAction}>
        <input name="email" />
        <SubmitButton /> {/* ❌ Какая форма pending? */}
      </form>

      <form action={registerAction}>
        <input name="name" />
        <SubmitButton /> {/* ❌ Одинаковые кнопки */}
      </form>
    </div>
  );
}

// ✅ ХОРОШО: разные компоненты
function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Вход...' : 'Войти'}
    </button>
  );
}

function RegisterButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Регистрация...' : 'Зарегистрироваться'}
    </button>
  );
}

function Page() {
  return (
    <div>
      <form action={loginAction}>
        <input name="email" />
        <LoginButton /> {/* ✅ Чёткое разделение */}
      </form>

      <form action={registerAction}>
        <input name="name" />
        <RegisterButton />
      </form>
    </div>
  );
}
```

### 8. ❌ Не обрабатываете method

```javascript
// ❌ ПЛОХО: игнорируем method
function FormDebug() {
  const { pending, data } = useFormStatus();
  // ❌ method может показать, как отправляется форма

  return pending ? <div>Отправка...</div> : null;
}

// ✅ ХОРОШО: показываем полную информацию
function FormDebug() {
  const { pending, data, method, action } = useFormStatus();

  if (!pending) return null;

  return (
    <div className="debug">
      <p>Метод: {method}</p>
      <p>Action: {typeof action === 'function' ? 'Server Action' : action}</p>
      <p>Данные: {data ? Array.from(data.keys()).join(', ') : 'none'}</p>
    </div>
  );
}
```

### 9. ❌ Вложенные формы

```javascript
// ❌ ПЛОХО: вложенные формы (невалидно!)
function Page() {
  return (
    <form action={outerAction}>
      <input name="outer" />

      <form action={innerAction}> {/* ❌ Невалидный HTML! */}
        <input name="inner" />
        <SubmitButton /> {/* Какую форму отправит? */}
      </form>

      <SubmitButton />
    </form>
  );
}

// ✅ ХОРОШО: отдельные формы
function Page() {
  return (
    <div>
      <form action={firstAction}>
        <input name="first" />
        <FirstSubmitButton />
      </form>

      <form action={secondAction}>
        <input name="second" />
        <SecondSubmitButton />
      </form>
    </div>
  );
}
```

### 10. ❌ Не тестируете без Server Actions

```javascript
// ❌ ПЛОХО: нет фолбэка для клиентской среды
function SubmitButton() {
  const { pending } = useFormStatus();
  // ❌ pending всегда false без Server Actions

  return <button type="submit" disabled={pending}>Submit</button>;
}

// ✅ ХОРОШО: Context для имитации в dev
const FormStatusContext = createContext({ pending: false });

function useFormStatusWithFallback() {
  // Пытаемся использовать нативный useFormStatus
  try {
    return useFormStatus();
  } catch {
    // Фолбэк на Context для локальной разработки
    return useContext(FormStatusContext);
  }
}

function SubmitButton() {
  const { pending } = useFormStatusWithFallback();
  return <button type="submit" disabled={pending}>Submit</button>;
}

// Обёртка формы для dev-режима
function DevForm({ children, action }) {
  const [state, formAction, isPending] = useActionState(action, {});

  return (
    <FormStatusContext.Provider value={{ pending: isPending }}>
      <form action={formAction}>
        {children}
      </form>
    </FormStatusContext.Provider>
  );
}
```

## 💡 Лучшие практики

1. **🎯 Только для дочерних компонентов** — не вызывайте на уровне формы
2. **🔧 Переиспользуемые кнопки** — создавайте UI библиотеки
3. **📚 Используйте fieldset** — для отключения всех полей сразу
4. **🚀 Индикаторы загрузки** — показывайте pending визуально
5. **⚡ С Server Actions** — лучше всего работает в RSC
6. **🎨 Разные кнопки** — разделяйте логику для разных форм

> 🔄 useFormStatus делает переиспользуемые формы проще!

---

**🎉 Теперь вы освоили все 15 хуков React 19 и готовы создавать высокопроизводительные приложения!**

