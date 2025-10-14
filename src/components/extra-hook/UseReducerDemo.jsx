import { useReducer, useRef, useState } from 'react'

// Редьюсер для счетчика
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    case 'set':
      return { count: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

// Редьюсер для формы
const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error
        }
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: {}
      };
    case 'RESET':
      return {
        name: '',
        email: '',
        password: '',
        errors: {}
      };
    default:
      return state;
  }
};

// Редьюсер для todo списка
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.text,
          completed: false
        }]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id 
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id)
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.filter
      };
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };
    default:
      return state;
  }
};

function UseReducerDemo() {
  // Простой счетчик
  const [counter, dispatchCounter] = useReducer(counterReducer, { count: 0 });
  
  // Форма с валидацией
  const [form, dispatchForm] = useReducer(formReducer, {
    name: '',
    email: '',
    password: '',
    errors: {}
  });
  
  // Todo список с фильтрацией
  const [todoState, dispatchTodo] = useReducer(todoReducer, {
    todos: [],
    filter: 'all' // all, active, completed
  });
  
  // Для мониторинга действий
  const [actionLog, setActionLog] = useState([]);
  const actionCounters = useRef({});
  
  // Функция для логирования действий
  const logAction = (actionType, description) => {
    const timestamp = new Date().toLocaleTimeString();
    actionCounters.current[actionType] = (actionCounters.current[actionType] || 0) + 1;
    
    const logEntry = {
      id: Date.now() + Math.random(),
      timestamp,
      actionType,
      description,
      count: actionCounters.current[actionType]
    };
    
    setActionLog(prev => [logEntry, ...prev].slice(0, 10));
  };
  
  // Обработчики для счетчика
  const handleIncrement = () => {
    dispatchCounter({ type: 'increment' });
    logAction('increment', 'Увеличение счетчика на 1');
  };
  
  const handleDecrement = () => {
    dispatchCounter({ type: 'decrement' });
    logAction('decrement', 'Уменьшение счетчика на 1');
  };
  
  const handleReset = () => {
    dispatchCounter({ type: 'reset' });
    logAction('reset', 'Сброс счетчика к 0');
  };
  
  const handleSetValue = (value) => {
    dispatchCounter({ type: 'set', payload: value });
    logAction('set', `Установка значения: ${value}`);
  };
  
  // Обработчики для формы
  const handleFieldChange = (field, value) => {
    dispatchForm({ type: 'SET_FIELD', field, value });
    logAction('SET_FIELD', `Изменение поля ${field}: "${value}"`);
    
    // Простая валидация
    if (field === 'email' && value && !value.includes('@')) {
      dispatchForm({ type: 'SET_ERROR', field, error: 'Неверный формат email' });
    } else if (field === 'password' && value && value.length < 6) {
      dispatchForm({ type: 'SET_ERROR', field, error: 'Пароль должен быть минимум 6 символов' });
    } else {
      dispatchForm({ type: 'SET_ERROR', field, error: '' });
    }
  };
  
  const handleFormReset = () => {
    dispatchForm({ type: 'RESET' });
    logAction('RESET', 'Сброс формы');
  };
  
  // Обработчики для todo
  const [newTodo, setNewTodo] = useState('');
  
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatchTodo({ type: 'ADD_TODO', text: newTodo });
      logAction('ADD_TODO', `Добавлена задача: "${newTodo}"`);
      setNewTodo('');
    }
  };
  
  const handleToggleTodo = (id) => {
    dispatchTodo({ type: 'TOGGLE_TODO', id });
    logAction('TOGGLE_TODO', `Переключение статуса задачи #${id}`);
  };
  
  const handleDeleteTodo = (id) => {
    dispatchTodo({ type: 'DELETE_TODO', id });
    logAction('DELETE_TODO', `Удаление задачи #${id}`);
  };
  
  const handleFilterChange = (filter) => {
    dispatchTodo({ type: 'SET_FILTER', filter });
    logAction('SET_FILTER', `Фильтр изменен на: ${filter}`);
  };
  
  const handleClearCompleted = () => {
    dispatchTodo({ type: 'CLEAR_COMPLETED' });
    logAction('CLEAR_COMPLETED', 'Очистка выполненных задач');
  };
  
  // Фильтрация todo
  const filteredTodos = todoState.todos.filter(todo => {
    if (todoState.filter === 'active') return !todo.completed;
    if (todoState.filter === 'completed') return todo.completed;
    return true;
  });
  
  return (
    <div>
      {/* Фиксированная панель мониторинга */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#0f172a',
        color: '#f1f5f9',
        padding: '8px 16px',
        fontSize: '11px',
        fontFamily: 'monospace',
        borderBottom: '2px solid #334155',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        maxHeight: '100px',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', gap: '24px', maxWidth: '1400px', margin: '0 auto' }}>
          {/* Счетчики действий */}
          <div style={{ minWidth: '250px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#fbbf24' }}>
              🎯 useReducer Actions:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', fontSize: '10px' }}>
              {Object.entries(actionCounters.current).map(([action, count]) => (
                <span key={action} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {action}: <span style={{color: '#10b981'}}>{count}</span>
                </span>
              ))}
            </div>
          </div>
          
          {/* Лог действий */}
          <div style={{ flex: 1, minWidth: '400px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#fbbf24' }}>
              📝 Последние действия:
            </div>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1px', 
              maxHeight: '60px', 
              overflowY: 'auto' 
            }}>
              {actionLog.slice(0, 3).map(log => (
                <div key={log.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '10px',
                  padding: '1px 4px',
                  borderRadius: '3px',
                  backgroundColor: 'rgba(51, 65, 85, 0.4)'
                }}>
                  <span style={{ color: '#94a3b8' }}>{log.timestamp}</span>
                  <span style={{ 
                    color: '#3b82f6',
                    fontWeight: 'bold',
                    minWidth: '80px',
                    fontSize: '9px'
                  }}>
                    {log.actionType}
                  </span>
                  <span style={{ color: '#e2e8f0', flex: 1, fontSize: '9px' }}>
                    {log.description}
                  </span>
                  <span style={{ 
                    color: '#64748b',
                    fontSize: '8px',
                    minWidth: '20px',
                    textAlign: 'right'
                  }}>
                    #{log.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Отступ для фиксированной панели */}
      <div style={{ paddingTop: '110px' }}>
        <h2>🎯 useReducer Hook</h2>
        <p><strong>Назначение:</strong> Управление сложным состоянием через reducer функции</p>
        
        <div className="code-block">
{`const [state, dispatch] = useReducer(reducer, initialState);

// Reducer функция
function reducer(state, action) {
  switch (action.type) {
    case 'ACTION_TYPE':
      return { ...state, /* изменения */ };
    default:
      return state;
  }
}`}
        </div>

        {/* Пример 1: Простой счетчик */}
        <div className="demo-container">
          <h3>1. Простой счетчик с useReducer</h3>
          <div className="interactive-demo">
            <div className="counter">{counter.count}</div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button className="btn" onClick={handleIncrement}>
                +1
              </button>
              <button className="btn" onClick={handleDecrement}>
                -1
              </button>
              <button className="btn" onClick={handleReset}>
                Сброс
              </button>
              <button className="btn" onClick={() => handleSetValue(10)}>
                Установить 10
              </button>
              <button className="btn" onClick={() => handleSetValue(100)}>
                Установить 100
              </button>
            </div>
          </div>
          <div className="code-block">
{`const counterReducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    case 'set':
      return { count: action.payload };
    default:
      throw new Error(\`Unknown action: \${action.type}\`);
  }
};

const [counter, dispatch] = useReducer(counterReducer, { count: 0 });
dispatch({ type: 'increment' }); // Увеличить
dispatch({ type: 'set', payload: 10 }); // Установить значение`}
          </div>
        </div>

        {/* Пример 2: Форма с валидацией */}
        <div className="demo-container">
          <h3>2. Форма с валидацией</h3>
          <div className="interactive-demo">
            <div style={{ display: 'grid', gap: '15px', maxWidth: '400px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Имя:
                </label>
                <input
                  className="input-demo"
                  type="text"
                  value={form.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  placeholder="Введите имя"
                  style={{ width: '100%' }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Email:
                </label>
                <input
                  className="input-demo"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  placeholder="Введите email"
                  style={{ width: '100%' }}
                />
                {form.errors.email && (
                  <p style={{ color: '#ef4444', fontSize: '12px', margin: '3px 0 0 0' }}>
                    {form.errors.email}
                  </p>
                )}
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Пароль:
                </label>
                <input
                  className="input-demo"
                  type="password"
                  value={form.password}
                  onChange={(e) => handleFieldChange('password', e.target.value)}
                  placeholder="Введите пароль"
                  style={{ width: '100%' }}
                />
                {form.errors.password && (
                  <p style={{ color: '#ef4444', fontSize: '12px', margin: '3px 0 0 0' }}>
                    {form.errors.password}
                  </p>
                )}
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn" onClick={handleFormReset}>
                  Очистить форму
                </button>
                <button 
                  className="btn" 
                  disabled={Object.values(form.errors).some(error => error)}
                  style={{ 
                    opacity: Object.values(form.errors).some(error => error) ? 0.5 : 1 
                  }}
                >
                  Отправить
                </button>
              </div>
            </div>
            
            <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 10px 0' }}>Текущее состояние формы:</h4>
              <pre style={{ fontSize: '12px', margin: 0 }}>
                {JSON.stringify(form, null, 2)}
              </pre>
            </div>
          </div>
          <div className="code-block">
{`const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error }
      };
    case 'RESET':
      return { name: '', email: '', password: '', errors: {} };
    default:
      return state;
  }
};

// Использование
dispatch({ type: 'SET_FIELD', field: 'email', value: 'user@example.com' });
dispatch({ type: 'SET_ERROR', field: 'email', error: 'Неверный формат' });`}
          </div>
        </div>

        {/* Пример 3: Todo список */}
        <div className="demo-container">
          <h3>3. Todo список с фильтрацией</h3>
          <div className="interactive-demo">
            {/* Добавление новой задачи */}
            <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
              <input
                className="input-demo"
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Новая задача"
                onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
                style={{ flex: 1 }}
              />
              <button className="btn" onClick={handleAddTodo}>
                Добавить
              </button>
            </div>
            
            {/* Фильтры */}
            <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
              {['all', 'active', 'completed'].map(filter => (
                <button
                  key={filter}
                  className="btn"
                  onClick={() => handleFilterChange(filter)}
                  style={{
                    backgroundColor: todoState.filter === filter ? '#3b82f6' : '#e5e7eb',
                    color: todoState.filter === filter ? 'white' : '#374151'
                  }}
                >
                  {filter === 'all' ? 'Все' : filter === 'active' ? 'Активные' : 'Выполненные'}
                </button>
              ))}
              <button className="btn" onClick={handleClearCompleted}>
                Очистить выполненные
              </button>
            </div>
            
            {/* Список задач */}
            <div style={{ minHeight: '100px' }}>
              {filteredTodos.length === 0 ? (
                <p style={{ color: '#6b7280', fontStyle: 'italic' }}>
                  {todoState.filter === 'all' ? 'Задач пока нет' : 
                   todoState.filter === 'active' ? 'Нет активных задач' : 
                   'Нет выполненных задач'}
                </p>
              ) : (
                filteredTodos.map(todo => (
                  <div key={todo.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px',
                    borderRadius: '4px',
                    backgroundColor: todo.completed ? '#f0f9ff' : '#ffffff',
                    border: '1px solid #e5e7eb',
                    marginBottom: '5px'
                  }}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(todo.id)}
                    />
                    <span style={{
                      flex: 1,
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed ? '#6b7280' : '#374151'
                    }}>
                      {todo.text}
                    </span>
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        fontSize: '16px'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
            
            {/* Статистика */}
            <div style={{ marginTop: '15px', fontSize: '14px', color: '#6b7280' }}>
              Всего: {todoState.todos.length} | 
              Активных: {todoState.todos.filter(t => !t.completed).length} | 
              Выполненных: {todoState.todos.filter(t => t.completed).length}
            </div>
          </div>
          <div className="code-block">
{`const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.text,
          completed: false
        }]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id 
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'SET_FILTER':
      return { ...state, filter: action.filter };
    default:
      return state;
  }
};

// Использование
dispatch({ type: 'ADD_TODO', text: 'Изучить useReducer' });
dispatch({ type: 'TOGGLE_TODO', id: todoId });`}
          </div>
        </div>

        <div className="info-box blue">
          <h4 className="mt-0">💡 Когда использовать useReducer:</h4>
          <ul className="text-sm space-y-1">
            <li><strong>Сложное состояние:</strong> объекты с множественными полями</li>
            <li><strong>Связанные обновления:</strong> когда изменение одного поля влияет на другие</li>
            <li><strong>Предсказуемость:</strong> все изменения централизованы в reducer</li>
            <li><strong>Тестируемость:</strong> reducer - это чистая функция</li>
            <li><strong>Производительность:</strong> избегание создания новых функций-обработчиков</li>
          </ul>
        </div>

        <div className="info-box yellow">
          <h4 className="mt-0">⚠️ useReducer vs useState:</h4>
          <ul className="text-sm space-y-1">
            <li><strong>useState:</strong> простые значения, независимые обновления</li>
            <li><strong>useReducer:</strong> сложные объекты, связанная логика обновлений</li>
            <li><strong>Переход:</strong> если useState становится слишком сложным</li>
            <li><strong>Redux паттерн:</strong> useReducer следует тем же принципам</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UseReducerDemo