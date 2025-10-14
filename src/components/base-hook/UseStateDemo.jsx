import {useState, useRef, useEffect} from 'react'

function UseStateDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Для демонстрации оптимизации с useRef
  const [optimizedName, setOptimizedName] = useState('');
  const optimizedInputRef = useRef(null);

  // Счетчик рендеров
  const renderCount = useRef(0);
  const [lastUpdate, setLastUpdate] = useState('');
  const [stateHistory, setStateHistory] = useState([]);

  // Увеличиваем счетчик при каждом рендере
  renderCount.current += 1;

  // Функция для логирования изменений состояния
  const logStateChange = (field, oldValue, newValue) => {
    const timestamp = new Date().toLocaleTimeString();
    const change = {
      timestamp,
      field,
      oldValue,
      newValue,
      renderNumber: renderCount.current
    };
    setStateHistory(prev => [change, ...prev].slice(0, 10)); // Храним последние 10 изменений
    setLastUpdate(`${field} изменено в ${timestamp}`);
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      const oldTodos = [...todos];
      const newTodos = [...todos, {id: Date.now(), text: newTodo, completed: false}];
      logStateChange('todos', `${oldTodos.length} задач`, `${newTodos.length} задач`);
      setTodos(newTodos);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    );
    logStateChange('todos', 'статус задачи изменен', 'статус обновлен');
    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const oldTodos = [...todos];
    const newTodos = todos.filter(todo => todo.id !== id);
    logStateChange('todos', `${oldTodos.length} задач`, `${newTodos.length} задач`);
    setTodos(newTodos);
  };

  // Обновленные функции с логированием
  const handleCountChange = (newCount) => {
    logStateChange('count', count, newCount);
    setCount(newCount);
  };

  const handleNameChange = (newName) => {
    logStateChange('name', name, newName);
    setName(newName);
  };

  const handleVisibilityChange = () => {
    logStateChange('isVisible', isVisible, !isVisible);
    setIsVisible(!isVisible);
  };

  // Функции для демонстрации оптимизации с useRef
  const handleOptimizedSubmit = () => {
    const inputValue = optimizedInputRef.current.value;
    logStateChange('optimizedName', optimizedName, inputValue);
    setOptimizedName(inputValue);
  };

  const clearOptimizedInput = () => {
    optimizedInputRef.current.value = '';
    logStateChange('optimizedName', optimizedName, '');
    setOptimizedName('');
  };

  return (
    <div>
      {/* Фиксированная панель мониторинга */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#1f2937',
        color: '#10b981',
        padding: '8px 16px',
        fontSize: '12px',
        fontFamily: 'monospace',
        borderBottom: '2px solid #374151',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span>count: <span style={{color: '#fbbf24'}}>{count}</span></span>
            <span>name: <span style={{color: '#fbbf24'}}>"{name}"</span></span>
            <span>isVisible: <span style={{color: '#fbbf24'}}>{isVisible.toString()}</span></span>
            <span>todos: <span style={{color: '#fbbf24'}}>[{todos.length}]</span></span>
            <span>optimizedName: <span style={{color: '#fbbf24'}}>"{optimizedName}"</span></span>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span>Рендеров: <span style={{color: '#ef4444'}}>{renderCount.current}</span></span>
            <span style={{ fontSize: '10px', color: '#9ca3af' }}>{lastUpdate || 'Пока изменений нет'}</span>
          </div>
        </div>
      </div>

      {/* Отступ для фиксированной панели */}
      <div style={{ paddingTop: '50px' }}>
        <h2>🎯 useState Hook</h2>
        <p><strong>Назначение:</strong> Управление локальным состоянием компонента</p>

      <div className="code-block">
        {`const [state, setState] = useState(initialValue);`}
      </div>

      {/* Пример 1: Простой счетчик */}
      <div className="demo-container">
        <h3>1. Простой счетчик</h3>
        <div className="interactive-demo">
          <div className="counter">{count}</div>
          <button className="btn" onClick={() => handleCountChange(count + 1)}>
            Увеличить
          </button>
          <button className="btn" onClick={() => handleCountChange(count - 1)}>
            Уменьшить
          </button>
          <button className="btn" onClick={() => handleCountChange(0)}>
            Сбросить
          </button>
        </div>
        <div className="code-block">
          {`const [count, setCount] = useState(0);

<button onClick={() => setCount(count + 1)}>
    Увеличить
</button>`}
        </div>
      </div>

      {/* Пример 2: Работа с текстом */}
      <div className="demo-container">
        <h3>2. Управление текстом</h3>
        <div className="interactive-demo">
          <input
            className="input-demo"
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Введите ваше имя"
          />
          <p>Привет, <strong>{name || 'гость'}</strong>!</p>
        </div>
        <div className="code-block">
          {`const [name, setName] = useState('');

<input 
    value={name}
    onChange={(e) => setName(e.target.value)}
/>`}
        </div>
      </div>

      {/* Пример 3: Булево состояние */}
      <div className="demo-container">
        <h3>3. Переключение видимости</h3>
        <div className="interactive-demo">
          <button className="btn" onClick={handleVisibilityChange}>
            {isVisible ? 'Скрыть' : 'Показать'} блок
          </button>
          {isVisible && (
            <div className="bg-blue-100 border-2 border-blue-400 rounded-lg p-6 my-4">
              🎉 Этот блок можно скрывать и показывать!
            </div>
          )}
        </div>
        <div className="code-block">
          {`const [isVisible, setIsVisible] = useState(true);

{isVisible && <div>Контент</div>}`}
        </div>
      </div>

      {/* Пример 4: Сложное состояние (массив) */}
      <div className="demo-container">
        <h3>4. Список задач (массив в состоянии)</h3>
        <div className="interactive-demo">
          <div className="flex gap-3 mb-4">
            <input
              className="input-demo"
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Новая задача"
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <button className="btn" onClick={addTodo}>
              Добавить
            </button>
          </div>

          <div className="space-y-2">
            {todos.map(todo => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-4 h-4"
                />
                <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                                    {todo.text}
                                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="todo-delete-btn"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {todos.length === 0 && (
            <p className="text-gray-500 italic text-center py-4">
              Список задач пуст
            </p>
          )}
        </div>
        <div className="code-block">
          {`const [todos, setTodos] = useState([]);

// Добавление
setTodos([...todos, newTodo]);

// Обновление
setTodos(todos.map(todo => 
    todo.id === id ? {...todo, completed: !todo.completed} : todo
));

// Удаление  
setTodos(todos.filter(todo => todo.id !== id));`}
        </div>
      </div>

      {/* Пример 5: Оптимизация с useRef */}
      <div className="demo-container">
        <h3>5. Оптимизация рендеров с useRef</h3>
        <div className="interactive-demo">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Контролируемый инпут (много рендеров) */}
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <h4 className="text-red-700 mb-3">❌ Контролируемый инпут (много рендеров)</h4>
              <input
                className="input-demo w-full mb-2"
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Каждый символ = рендер"
              />
              <p className="text-sm text-red-600">
                Текущее значение: <strong>{name}</strong>
              </p>
              <p className="text-xs text-red-500">
                💡 Каждое нажатие клавиши вызывает перерендер!
              </p>
            </div>

            {/* Неконтролируемый инпут с useRef (меньше рендеров) */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <h4 className="text-green-700 mb-3">✅ useRef инпут (меньше рендеров)</h4>
              <input
                ref={optimizedInputRef}
                className="input-demo w-full mb-2"
                type="text"
                placeholder="Рендер только при отправке"
              />
              <div className="flex gap-2 mb-2">
                <button className="btn text-sm" onClick={handleOptimizedSubmit}>
                  Отправить
                </button>
                <button className="btn text-sm" onClick={clearOptimizedInput}>
                  Очистить
                </button>
              </div>
              <p className="text-sm text-green-600">
                Сохраненное значение: <strong>{optimizedName}</strong>
              </p>
              <p className="text-xs text-green-500">
                💡 Рендер только при нажатии кнопки!
              </p>
            </div>
          </div>
        </div>
        <div className="code-block">
          {`// Контролируемый инпут - много рендеров
const [name, setName] = useState('');
<input 
    value={name}
    onChange={(e) => setName(e.target.value)} // Рендер на каждый символ
/>

// useRef инпут - меньше рендеров
const inputRef = useRef(null);
const [savedValue, setSavedValue] = useState('');

const handleSubmit = () => {
    setSavedValue(inputRef.current.value); // Рендер только при отправке
};

<input ref={inputRef} />
<button onClick={handleSubmit}>Отправить</button>`}
        </div>
        <div className="info-box blue">
          <h4 className="mt-0">⚡ Когда использовать useRef для оптимизации:</h4>
          <ul className="text-sm space-y-1">
            <li><strong>Неконтролируемые формы:</strong> когда значение нужно только при отправке</li>
            <li><strong>Поиск с задержкой:</strong> накапливать ввод, отправлять с debounce</li>
            <li><strong>Фокус и выделение:</strong> управление DOM элементами напрямую</li>
            <li><strong>Измерения:</strong> получение размеров элементов без рендера</li>
          </ul>
        </div>
      </div>

      {/* Панель мониторинга состояния */}
      <div className="demo-container">
        <h3>🔍 Мониторинг состояния компонента</h3>
        <div className="bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-cyan-300 mb-2">📊 Текущее состояние:</h4>
              <div className="space-y-1">
                <div>count: <span className="text-yellow-300">{count}</span></div>
                <div>name: <span className="text-yellow-300">"{name}"</span></div>
                <div>isVisible: <span className="text-yellow-300">{isVisible.toString()}</span></div>
                <div>todos: <span className="text-yellow-300">[{todos.length} элементов]</span></div>
                <div>newTodo: <span className="text-yellow-300">"{newTodo}"</span></div>
                <div>optimizedName: <span className="text-yellow-300">"{optimizedName}"</span></div>
              </div>
            </div>
            <div>
              <h4 className="text-cyan-300 mb-2">🔄 Статистика рендеров:</h4>
              <div className="space-y-1">
                <div>Всего рендеров: <span className="text-red-300">{renderCount.current}</span></div>
                <div>Последнее обновление:</div>
                <div className="text-xs text-gray-400">{lastUpdate || 'Пока изменений нет'}</div>
              </div>
            </div>
          </div>

          {stateHistory.length > 0 && (
            <div className="mt-4">
              <h4 className="text-cyan-300 mb-2">📝 История изменений (последние 5):</h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {stateHistory.slice(0, 5).map((change, index) => (
                  <div key={index} className="text-xs border-l-2 border-blue-500 pl-2">
                    <span className="text-gray-400">{change.timestamp}</span> -
                    <span className="text-white"> {change.field}</span>:
                    <span className="text-red-300"> {change.oldValue}</span> →
                    <span className="text-green-300"> {change.newValue}</span>
                    <span className="text-gray-500"> (рендер #{change.renderNumber})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 mb-2">
            <strong>Что показывает мониторинг:</strong>
          </p>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• <strong>Текущее состояние</strong> - актуальные значения всех state переменных</li>
            <li>• <strong>Счетчик рендеров</strong> - сколько раз компонент перерисовывался</li>
            <li>• <strong>История изменений</strong> - какие значения менялись и когда</li>
            <li>• <strong>Время изменений</strong> - когда произошло каждое изменение</li>
          </ul>
        </div>
      </div>

        <div className="info-box yellow">
          <h4 className="mt-0">💡 Ключевые моменты useState:</h4>
          <ul className="text-sm space-y-1">
            <li><strong>Инициализация:</strong> useState(initialValue) - значение при первом рендере</li>
            <li><strong>Возврат:</strong> [текущее значение, функция обновления]</li>
            <li><strong>Обновление:</strong> setState(newValue) или setState(prev =&gt; newValue)</li>
            <li><strong>Асинхронность:</strong> setState не изменяет состояние мгновенно</li>
            <li><strong>Перерендер:</strong> каждый setState вызывает новый рендер компонента</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UseStateDemo
