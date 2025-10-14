import { useRef, useState, useEffect, useCallback } from 'react'

function UseRefDemo() {
  // Основные состояния
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  // Мониторинг
  const [refLog, setRefLog] = useState([]);
  const componentRenderCount = useRef(0);
  componentRenderCount.current += 1;
  
  // Различные useRef примеры
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const messagesEndRef = useRef(null);
  const intervalRef = useRef(null);
  const previousCountRef = useRef(0);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const lastClickTimeRef = useRef(0);
  
  // Функция для логирования использования ref
  const logRefUsage = (refType, description, action) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = {
      id: Date.now() + Math.random(),
      timestamp,
      refType,
      description,
      action,
      render: componentRenderCount.current
    };
    
    setRefLog(prev => [logEntry, ...prev].slice(0, 12));
  };

  // Пример 1: Управление фокусом
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      console.log('🎯 useRef: Установка фокуса на input');
      logRefUsage('DOM', 'Установка фокуса на input', 'focus()');
    }
  };

  const selectAllText = () => {
    if (inputRef.current) {
      inputRef.current.select();
      console.log('🎯 useRef: Выделение всего текста в input');
      logRefUsage('DOM', 'Выделение всего текста в input', 'select()');
    }
  };

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setName('');
      inputRef.current.focus();
      console.log('🎯 useRef: Очистка и фокус на input');
      logRefUsage('DOM', 'Очистка и фокус на input', 'value = ""');
    }
  };

  // Пример 2: Работа с файлами
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      console.log('🎯 useRef: Программный клик по file input');
      logRefUsage('DOM', 'Программный клик по file input', 'click()');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`🎯 useRef: Выбран файл: ${file.name}`);
      logRefUsage('DOM', `Выбран файл: ${file.name}`, 'file selected');
    }
  };


  // Пример 4: Canvas рисование
  const drawOnCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      
      // Очистка canvas
      ctx.clearRect(0, 0, 300, 150);
      
      // Рисование
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(50, 50, 100, 50);
      
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(200, 75, 30, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.fillStyle = '#10b981';
      ctx.fillText(`Рендер #${componentRenderCount.current}`, 10, 20);
      
      console.log('🎯 useRef: Рисование на canvas');
      logRefUsage('DOM', 'Рисование на canvas', 'draw');
    }
  };

  // Пример 5: Хранение значений между рендерами
  useEffect(() => {
    previousCountRef.current = count;
    // Убираем logRefUsage чтобы избежать ререндеров
    console.log(`🎯 useRef: Сохранение предыдущего count: ${count}`);
  });

  const getPreviousCount = () => {
    return previousCountRef.current;
  };

  // Пример 6: Таймер с useRef
  const startTimer = () => {
    if (!isTimerRunning) {
      intervalRef.current = setInterval(() => {
        setCount(prev => prev + 1);
      }, 1000);
      setIsTimerRunning(true);
      console.log('🎯 useRef: Запуск таймера');
      logRefUsage('Timer', 'Запуск таймера', 'setInterval');
    }
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsTimerRunning(false);
      console.log('🎯 useRef: Остановка таймера');
      logRefUsage('Timer', 'Остановка таймера', 'clearInterval');
    }
  };

  // Пример 7: Автоскролл
  const addMessage = () => {
    const newMessage = `Сообщение #${messages.length + 1} в ${new Date().toLocaleTimeString()}`;
    setMessages(prev => [...prev, newMessage]);
    console.log('🎯 useRef: Добавление сообщения');
    logRefUsage('DOM', 'Добавление сообщения', 'scroll to bottom');
  };

  // Автоскролл к последнему сообщению
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Пример 8: Измерения элементов
  const measureCanvas = () => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      console.log(`🎯 useRef: Размеры canvas: ${rect.width}x${rect.height}`);
      logRefUsage('DOM', `Размеры canvas: ${rect.width}x${rect.height}`, 'getBoundingClientRect');
      alert(`Canvas размеры: ${rect.width}px x ${rect.height}px`);
    }
  };

  // Пример 9: Отслеживание мыши без рендера
  const handleMouseMove = useCallback((e) => {
    mousePositionRef.current = { x: e.clientX, y: e.clientY };
    // НЕ вызываем setState, поэтому рендер не происходит
  }, []);

  const showMousePosition = () => {
    const pos = mousePositionRef.current;
    console.log(`🎯 useRef: Позиция мыши: ${pos.x}, ${pos.y}`);
    logRefUsage('Value', `Позиция мыши: ${pos.x}, ${pos.y}`, 'read');
    alert(`Текущая позиция мыши: ${pos.x}, ${pos.y}`);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Пример 10: Предотвращение лишних вызовов
  const handleExpensiveOperation = () => {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTimeRef.current;
    
    if (timeSinceLastClick < 1000) {
      console.log(`🎯 useRef: Блокировка: ${timeSinceLastClick}ms`);
      logRefUsage('Value', `Блокировка: ${timeSinceLastClick}ms`, 'throttle');
      alert('Слишком быстро! Подождите секунду.');
      return;
    }
    
    lastClickTimeRef.current = now;
    console.log('🎯 useRef: Выполнение дорогой операции');
    logRefUsage('Value', 'Выполнение дорогой операции', 'execute');
    alert('Дорогая операция выполнена!');
  };

  // Cleanup при размонтировании
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div>
      {/* Фиксированная панель мониторинга */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#0c1119',
        color: '#f8fafc',
        padding: '8px 16px',
        fontSize: '11px',
        fontFamily: 'monospace',
        borderBottom: '2px solid #1e293b',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        maxHeight: '100px',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', gap: '20px', maxWidth: '1400px', margin: '0 auto' }}>
          {/* Статистика */}
          <div style={{ minWidth: '200px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#fbbf24' }}>
              🎯 useRef мониторинг:
            </div>
            <div style={{ fontSize: '10px', display: 'grid', gap: '1px' }}>
              <div>Рендеров: <span style={{color: '#ef4444'}}>{componentRenderCount.current}</span></div>
              <div>Count: <span style={{color: '#3b82f6'}}>{count}</span> (prev: {getPreviousCount()})</div>
              <div>Таймер: <span style={{color: isTimerRunning ? '#10b981' : '#6b7280'}}>{isTimerRunning ? 'Запущен' : 'Остановлен'}</span></div>
              <div>Сообщений: <span style={{color: '#8b5cf6'}}>{messages.length}</span></div>
            </div>
          </div>
          
          {/* Лог использования ref */}
          <div style={{ flex: 1, minWidth: '500px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#fbbf24' }}>
              📝 Использование ref:
            </div>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1px', 
              maxHeight: '60px', 
              overflowY: 'auto' 
            }}>
              {refLog.slice(0, 3).map(log => (
                <div key={log.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '9px',
                  padding: '1px 3px',
                  borderRadius: '2px',
                  backgroundColor: 'rgba(30, 41, 59, 0.4)'
                }}>
                  <span style={{ color: '#94a3b8' }}>{log.timestamp}</span>
                  <span style={{ 
                    color: log.refType === 'DOM' ? '#3b82f6' : 
                          log.refType === 'Timer' ? '#10b981' : '#f59e0b',
                    fontWeight: 'bold',
                    minWidth: '40px',
                    fontSize: '8px'
                  }}>
                    {log.refType}
                  </span>
                  <span style={{ color: '#e2e8f0', flex: 1, fontSize: '8px' }}>
                    {log.description}
                  </span>
                  <span style={{ 
                    color: '#64748b',
                    fontSize: '8px',
                    minWidth: '30px',
                    textAlign: 'right'
                  }}>
                    R#{log.render}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Отступ для фиксированной панели */}
      <div style={{ paddingTop: '110px' }}>
        <h2>🎯 useRef Hook</h2>
        <p><strong>Назначение:</strong> Создание мутабельных ссылок и доступ к DOM элементам</p>
        
        <div className="code-block">
{`const ref = useRef(initialValue);

// Для DOM элементов
const inputRef = useRef(null);
<input ref={inputRef} />
inputRef.current.focus();

// Для хранения значений
const countRef = useRef(0);
countRef.current = newValue;`}
        </div>

        {/* Пример 1: Управление DOM элементами */}
        <div className="demo-container">
          <h3>1. Управление DOM элементами</h3>
          <div className="interactive-demo">
            <div style={{ marginBottom: '15px' }}>
              <input
                ref={inputRef}
                className="input-demo"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Введите текст..."
                style={{ width: '300px', marginRight: '10px' }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button className="btn" onClick={focusInput}>
                Установить фокус
              </button>
              <button className="btn" onClick={selectAllText}>
                Выделить всё
              </button>
              <button className="btn" onClick={clearInput}>
                Очистить
              </button>
            </div>
          </div>
          <div className="code-block">
{`const inputRef = useRef(null);

const focusInput = () => {
  if (inputRef.current) {
    inputRef.current.focus();
  }
};

<input ref={inputRef} type="text" />
<button onClick={focusInput}>Фокус</button>`}
          </div>
        </div>

        {/* Пример 2: Работа с файлами */}
        <div className="demo-container">
          <h3>2. Программное управление input[type="file"]</h3>
          <div className="interactive-demo">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              accept="image/*"
            />
            <button className="btn" onClick={triggerFileInput}>
              📁 Выбрать файл
            </button>
            <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '10px' }}>
              Скрытый input активируется программно через ref.current.click()
            </p>
          </div>
          <div className="code-block">
{`const fileInputRef = useRef(null);

const triggerFileInput = () => {
  fileInputRef.current.click();
};

<input 
  ref={fileInputRef}
  type="file" 
  style={{ display: 'none' }}
  onChange={handleFileChange}
/>
<button onClick={triggerFileInput}>Выбрать файл</button>`}
          </div>
        </div>

        {/* Пример 3: Canvas рисование */}
        <div className="demo-container">
          <h3>3. Работа с Canvas</h3>
          <div className="interactive-demo">
            <canvas
              ref={canvasRef}
              width={300}
              height={150}
              style={{ 
                border: '2px solid #e5e7eb', 
                borderRadius: '6px', 
                backgroundColor: '#f9fafb',
                marginBottom: '10px'
              }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn" onClick={drawOnCanvas}>
                🎨 Рисовать
              </button>
              <button className="btn" onClick={measureCanvas}>
                📏 Измерить
              </button>
            </div>
          </div>
          <div className="code-block">
{`const canvasRef = useRef(null);

const drawOnCanvas = () => {
  const ctx = canvasRef.current.getContext('2d');
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(50, 50, 100, 50);
};

<canvas ref={canvasRef} width={300} height={150} />`}
          </div>
        </div>

        {/* Пример 4: Таймер с ref */}
        <div className="demo-container">
          <h3>4. Управление таймерами</h3>
          <div className="interactive-demo">
            <div style={{ marginBottom: '15px' }}>
              <div className="counter">{count}</div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                Предыдущее значение: {getPreviousCount()}
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                className="btn" 
                onClick={startTimer}
                disabled={isTimerRunning}
              >
                ▶️ Запустить таймер
              </button>
              <button 
                className="btn" 
                onClick={stopTimer}
                disabled={!isTimerRunning}
              >
                ⏸️ Остановить таймер
              </button>
              <button 
                className="btn" 
                onClick={() => setCount(0)}
              >
                🔄 Сбросить
              </button>
            </div>
          </div>
          <div className="code-block">
{`const intervalRef = useRef(null);
const previousCountRef = useRef(0);

const startTimer = () => {
  intervalRef.current = setInterval(() => {
    setCount(prev => prev + 1);
  }, 1000);
};

const stopTimer = () => {
  clearInterval(intervalRef.current);
  intervalRef.current = null;
};

// Сохранение предыдущего значения
useEffect(() => {
  previousCountRef.current = count;
});`}
          </div>
        </div>

        {/* Пример 5: Автоскролл сообщений */}
        <div className="demo-container">
          <h3>5. Автоскролл списка сообщений</h3>
          <div className="interactive-demo">
            <button className="btn" onClick={addMessage} style={{ marginBottom: '10px' }}>
              💬 Добавить сообщение
            </button>
            
            <div style={{
              height: '150px',
              overflowY: 'auto',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              padding: '10px',
              backgroundColor: '#f9fafb'
            }}>
              {messages.map((message, index) => (
                <div key={index} style={{ 
                  padding: '5px 0', 
                  borderBottom: index < messages.length - 1 ? '1px solid #e5e7eb' : 'none',
                  fontSize: '14px'
                }}>
                  {message}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="code-block">
{`const messagesEndRef = useRef(null);

// Автоскролл при добавлении сообщений
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]);

<div className="messages-container">
  {messages.map(message => <div key={message.id}>{message.text}</div>)}
  <div ref={messagesEndRef} /> {/* Якорь для скролла */}
</div>`}
          </div>
        </div>

        {/* Пример 6: Отслеживание без рендера */}
        <div className="demo-container">
          <h3>6. Отслеживание значений без рендера</h3>
          <div className="interactive-demo">
            <div style={{ marginBottom: '15px' }}>
              <button className="btn" onClick={showMousePosition}>
                🖱️ Показать позицию мыши
              </button>
              <button className="btn" onClick={handleExpensiveOperation}>
                ⚡ Дорогая операция (throttled)
              </button>
            </div>
            
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              <p>Двигайте мышью, позиция сохраняется в ref без перерендера</p>
              <p>Кнопка "Дорогая операция" защищена от спама (throttling)</p>
            </div>
          </div>
          <div className="code-block">
{`const mousePositionRef = useRef({ x: 0, y: 0 });
const lastClickTimeRef = useRef(0);

// Отслеживание мыши без рендера
const handleMouseMove = useCallback((e) => {
  mousePositionRef.current = { x: e.clientX, y: e.clientY };
  // НЕ вызываем setState!
}, []);

// Throttling с помощью ref
const handleClick = () => {
  const now = Date.now();
  if (now - lastClickTimeRef.current < 1000) {
    return; // Блокируем частые клики
  }
  lastClickTimeRef.current = now;
  // Выполняем действие
};`}
          </div>
        </div>

        <div className="info-box blue">
          <h4 className="mt-0">🎯 Основные случаи использования useRef:</h4>
          <ul className="text-sm space-y-1">
            <li><strong>Доступ к DOM:</strong> фокус, скролл, измерения элементов</li>
            <li><strong>Хранение значений:</strong> которые не должны вызывать рендер</li>
            <li><strong>Сохранение между рендерами:</strong> предыдущие значения, таймеры</li>
            <li><strong>Мутабельные данные:</strong> счетчики, флаги, кэш</li>
            <li><strong>Интеграция с библиотеками:</strong> третьими сторонними</li>
          </ul>
        </div>

        <div className="info-box yellow">
          <h4 className="mt-0">⚠️ Важные особенности useRef:</h4>
          <ul className="text-sm space-y-1">
            <li><strong>Не вызывает рендер:</strong> изменение .current не запускает рендер</li>
            <li><strong>Мутабельный:</strong> можно изменять .current напрямую</li>
            <li><strong>Стабильная ссылка:</strong> объект ref не меняется между рендерами</li>
            <li><strong>Инициализация:</strong> происходит только один раз</li>
            <li><strong>Cleanup:</strong> нужно вручную очищать таймеры и подписки</li>
          </ul>
        </div>

        <div className="info-box green">
          <h4 className="mt-0">✅ Лучшие практики:</h4>
          <ul className="text-sm space-y-1">
            <li><strong>Проверяйте ref.current:</strong> на null перед использованием</li>
            <li><strong>Очищайте ресурсы:</strong> в useEffect cleanup</li>
            <li><strong>Не злоупотребляйте:</strong> используйте state для UI состояния</li>
            <li><strong>Типизация:</strong> используйте правильные типы в TypeScript</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UseRefDemo