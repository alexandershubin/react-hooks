import { useState, useMemo, useCallback, useRef, useEffect } from 'react'

// Компонент для демонстрации React.memo
const ExpensiveChild = ({ items, onItemClick, theme }) => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  
  console.log('ExpensiveChild рендерится:', renderCount.current);
  
  return (
    <div style={{
      padding: '10px',
      border: '2px solid',
      borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
      backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
      color: theme === 'dark' ? '#f3f4f6' : '#374151',
      borderRadius: '6px',
      marginTop: '10px'
    }}>
      <h4 style={{ margin: '0 0 10px 0' }}>
        🔄 Дочерний компонент (рендеров: {renderCount.current})
      </h4>
      <div style={{ fontSize: '12px', marginBottom: '10px' }}>
        Количество элементов: {items.length}
      </div>
      {items.slice(0, 3).map(item => (
        <button
          key={item.id}
          onClick={() => onItemClick(item.id)}
          style={{
            margin: '2px',
            padding: '4px 8px',
            fontSize: '12px',
            backgroundColor: theme === 'dark' ? '#374151' : '#f3f4f6',
            color: theme === 'dark' ? '#f3f4f6' : '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {item.name}
        </button>
      ))}
      {items.length > 3 && (
        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '5px' }}>
          ...и еще {items.length - 3} элементов
        </div>
      )}
    </div>
  );
};

// Функция для имитации тяжелых вычислений
const expensiveCalculation = (num) => {
  console.log('🔴 Выполняется дорогое вычисление...');
  let result = 0;
  for (let i = 0; i < num * 100000; i++) {
    result += i;
  }
  return result;
};

// Функция для фильтрации (тяжелая операция)
const filterItems = (items, searchTerm) => {
  console.log('🔴 Выполняется фильтрация...', items.length, 'элементов');
  return items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

function UseMemoCallbackDemo() {
  const [count, setCount] = useState(1);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState('light');
  const [renderTrigger, setRenderTrigger] = useState(0);
  
  // Мониторинг рендеров
  const [optimizationLog, setOptimizationLog] = useState([]);
  const componentRenderCount = useRef(0);
  componentRenderCount.current += 1;
  
  // Функция для логирования
  const logOptimization = (type, description, wasOptimized) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = {
      id: Date.now() + Math.random(),
      timestamp,
      type,
      description,
      wasOptimized,
      render: componentRenderCount.current
    };
    
    setOptimizationLog(prev => [logEntry, ...prev].slice(0, 8));
  };
  
  // Генерация данных при монтировании
  useEffect(() => {
    const generateItems = () => {
      const items = [];
      for (let i = 0; i < 1000; i++) {
        items.push({
          id: i,
          name: `Элемент ${i}`,
          value: Math.random() * 100
        });
      }
      return items;
    };
    
    setItems(generateItems());
  }, []);

  // ❌ БЕЗ useMemo - вычисление каждый рендер
  const expensiveValueWithoutMemo = useMemo(() => {
    console.log('🔴 Вычисление без мемоизации');
    return expensiveCalculation(count);
  }, [count, renderTrigger]); // Добавляем renderTrigger чтобы показать разницу

  // ✅ С useMemo - вычисление только при изменении count
  const expensiveValueWithMemo = useMemo(() => {
    console.log('✅ Вычисление с useMemo');
    return expensiveCalculation(count);
  }, [count]);

  // ❌ БЕЗ useMemo - фильтрация каждый рендер
  const filteredItemsWithoutMemo = useMemo(() => {
    console.log('🔴 Фильтрация без мемоизации');
    return filterItems(items, searchTerm);
  }, [items, searchTerm, renderTrigger]); // Добавляем renderTrigger

  // ✅ С useMemo - фильтрация только при изменении items или searchTerm
  const filteredItemsWithMemo = useMemo(() => {
    console.log('✅ Фильтрация с useMemo');
    return filterItems(items, searchTerm);
  }, [items, searchTerm]);

  // ❌ БЕЗ useCallback - новая функция каждый рендер
  const handleItemClickWithoutCallback = (id) => {
    console.log('Клик по элементу без useCallback:', id);
    logOptimization('callback', `Клик без useCallback (id: ${id})`, false);
  };

  // ✅ С useCallback - стабильная функция
  const handleItemClickWithCallback = useCallback((id) => {
    console.log('Клик по элементу с useCallback:', id);
    logOptimization('callback', `Клик с useCallback (id: ${id})`, true);
  }, [logOptimization]); // Включаем logOptimization в зависимости


  // Сложный объект без useMemo (создается каждый рендер)
  const configWithoutMemo = {
    theme: theme,
    itemCount: items.length,
    timestamp: Date.now() // ❌ Всегда новое значение!
  };

  // Сложный объект с useMemo
  const configWithMemo = useMemo(() => {
    logOptimization('object', `Создание объекта конфигурации`, true);
    return {
      theme: theme,
      itemCount: items.length,
      isLargeDataset: items.length > 500
    };
  }, [theme, items.length]);

  return (
    <div>
      {/* Фиксированная панель мониторинга */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#1e293b',
        color: '#f1f5f9',
        padding: '8px 16px',
        fontSize: '11px',
        fontFamily: 'monospace',
        borderBottom: '2px solid #475569',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        maxHeight: '110px',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', gap: '20px', maxWidth: '1400px', margin: '0 auto' }}>
          {/* Счетчики */}
          <div style={{ minWidth: '200px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#fbbf24' }}>
              ⚡ Оптимизация:
            </div>
            <div style={{ fontSize: '10px', display: 'grid', gap: '2px' }}>
              <div>Рендеров компонента: <span style={{color: '#ef4444'}}>{componentRenderCount.current}</span></div>
              <div>Count: <span style={{color: '#3b82f6'}}>{count}</span></div>
              <div>Search: <span style={{color: '#10b981'}}>"{searchTerm}"</span></div>
              <div>Theme: <span style={{color: '#f59e0b'}}>{theme}</span></div>
              <div>Items: <span style={{color: '#8b5cf6'}}>{items.length}</span></div>
            </div>
          </div>
          
          {/* Лог оптимизаций */}
          <div style={{ flex: 1, minWidth: '500px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#fbbf24' }}>
              📊 Лог оптимизаций:
            </div>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1px', 
              maxHeight: '70px', 
              overflowY: 'auto' 
            }}>
              {optimizationLog.slice(0, 4).map(log => (
                <div key={log.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '9px',
                  padding: '1px 3px',
                  borderRadius: '2px',
                  backgroundColor: log.wasOptimized ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'
                }}>
                  <span style={{ color: '#94a3b8' }}>{log.timestamp}</span>
                  <span style={{ 
                    color: log.wasOptimized ? '#10b981' : '#ef4444',
                    fontWeight: 'bold',
                    minWidth: '60px',
                    fontSize: '8px'
                  }}>
                    {log.wasOptimized ? '✅' : '❌'} {log.type}
                  </span>
                  <span style={{ color: '#e2e8f0', flex: 1, fontSize: '8px' }}>
                    {log.description}
                  </span>
                  <span style={{ color: '#64748b', fontSize: '8px' }}>
                    R#{log.render}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Отступ для фиксированной панели */}
      <div style={{ paddingTop: '120px' }}>
        <h2>⚡ useMemo & useCallback Hooks</h2>
        <p><strong>Назначение:</strong> Оптимизация производительности через мемоизацию</p>
        
        <div className="code-block">
{`// useMemo - мемоизация значений
const memoizedValue = useMemo(() => {
  return expensiveCalculation(dependency);
}, [dependency]);

// useCallback - мемоизация функций
const memoizedCallback = useCallback((param) => {
  doSomething(param);
}, [dependency]);`}
        </div>

        {/* Пример 1: useMemo для дорогих вычислений */}
        <div className="demo-container">
          <h3>1. useMemo для дорогих вычислений</h3>
          <div className="interactive-demo">
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
              <label>
                Число для вычислений: 
                <input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  style={{ marginLeft: '10px', width: '80px' }}
                />
              </label>
              <button 
                className="btn" 
                onClick={() => setRenderTrigger(prev => prev + 1)}
              >
                Принудительный рендер
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ padding: '10px', backgroundColor: '#fef2f2', borderRadius: '6px', border: '1px solid #fecaca' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#dc2626' }}>❌ Без useMemo</h4>
                <div style={{ fontSize: '14px' }}>
                  Результат: <strong>{expensiveValueWithoutMemo.toLocaleString()}</strong>
                </div>
                <div style={{ fontSize: '12px', color: '#7f1d1d', marginTop: '5px' }}>
                  Вычисляется при каждом рендере!
                </div>
              </div>
              
              <div style={{ padding: '10px', backgroundColor: '#f0fdf4', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#16a34a' }}>✅ С useMemo</h4>
                <div style={{ fontSize: '14px' }}>
                  Результат: <strong>{expensiveValueWithMemo.toLocaleString()}</strong>
                </div>
                <div style={{ fontSize: '12px', color: '#14532d', marginTop: '5px' }}>
                  Вычисляется только при изменении count
                </div>
              </div>
            </div>
          </div>
          <div className="code-block">
{`// ❌ БЕЗ useMemo - выполняется каждый рендер
const expensiveValue = expensiveCalculation(count);

// ✅ С useMemo - выполняется только при изменении count
const expensiveValue = useMemo(() => {
  return expensiveCalculation(count);
}, [count]); // Зависимость - count`}
          </div>
        </div>

        {/* Пример 2: useMemo для фильтрации */}
        <div className="demo-container">
          <h3>2. useMemo для фильтрации массивов</h3>
          <div className="interactive-demo">
            <div style={{ marginBottom: '15px' }}>
              <input
                className="input-demo"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Поиск элементов..."
                style={{ width: '300px' }}
              />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ padding: '10px', backgroundColor: '#fef2f2', borderRadius: '6px', border: '1px solid #fecaca' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#dc2626' }}>❌ Без useMemo</h4>
                <div style={{ fontSize: '14px' }}>
                  Найдено: <strong>{filteredItemsWithoutMemo.length}</strong> из {items.length}
                </div>
                <div style={{ fontSize: '12px', color: '#7f1d1d', marginTop: '5px' }}>
                  Фильтрация при каждом рендере
                </div>
              </div>
              
              <div style={{ padding: '10px', backgroundColor: '#f0fdf4', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#16a34a' }}>✅ С useMemo</h4>
                <div style={{ fontSize: '14px' }}>
                  Найдено: <strong>{filteredItemsWithMemo.length}</strong> из {items.length}
                </div>
                <div style={{ fontSize: '12px', color: '#14532d', marginTop: '5px' }}>
                  Фильтрация только при изменении данных
                </div>
              </div>
            </div>
          </div>
          <div className="code-block">
{`// ❌ БЕЗ useMemo - фильтрация каждый рендер
const filteredItems = items.filter(item => 
  item.name.toLowerCase().includes(searchTerm.toLowerCase())
);

// ✅ С useMemo - фильтрация только при изменении
const filteredItems = useMemo(() => {
  return items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [items, searchTerm]); // Зависимости - items и searchTerm`}
          </div>
        </div>

        {/* Пример 3: useCallback для функций */}
        <div className="demo-container">
          <h3>3. useCallback для оптимизации функций</h3>
          <div className="interactive-demo">
            <div style={{ marginBottom: '15px' }}>
              <button 
                className="btn" 
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                Переключить тему: {theme}
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <h4 style={{ margin: '0 0 10px 0', color: '#dc2626' }}>❌ Без useCallback</h4>
                <ExpensiveChild 
                  items={filteredItemsWithMemo.slice(0, 5)}
                  onItemClick={handleItemClickWithoutCallback}
                  theme={theme}
                />
                <div style={{ fontSize: '12px', color: '#7f1d1d', marginTop: '5px' }}>
                  Компонент рендерится каждый раз
                </div>
              </div>
              
              <div>
                <h4 style={{ margin: '0 0 10px 0', color: '#16a34a' }}>✅ С useCallback</h4>
                <ExpensiveChild 
                  items={filteredItemsWithMemo.slice(0, 5)}
                  onItemClick={handleItemClickWithCallback}
                  theme={theme}
                />
                <div style={{ fontSize: '12px', color: '#14532d', marginTop: '5px' }}>
                  Компонент рендерится только при изменении props
                </div>
              </div>
            </div>
          </div>
          <div className="code-block">
{`// ❌ БЕЗ useCallback - новая функция каждый рендер
const handleClick = (id) => {
  console.log('Clicked:', id);
};

// ✅ С useCallback - стабильная функция
const handleClick = useCallback((id) => {
  console.log('Clicked:', id);
}, []); // Нет зависимостей - функция никогда не меняется

// ✅ useCallback с зависимостями
const handleClick = useCallback((id) => {
  console.log('Clicked:', id, 'theme:', theme);
}, [theme]); // Функция меняется только при изменении theme`}
          </div>
        </div>

        {/* Пример 4: useMemo для объектов */}
        <div className="demo-container">
          <h3>4. useMemo для сложных объектов</h3>
          <div className="interactive-demo">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ padding: '10px', backgroundColor: '#fef2f2', borderRadius: '6px', border: '1px solid #fecaca' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#dc2626' }}>❌ Без useMemo</h4>
                <pre style={{ fontSize: '12px', margin: 0, whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(configWithoutMemo, null, 2)}
                </pre>
                <div style={{ fontSize: '12px', color: '#7f1d1d', marginTop: '5px' }}>
                  Новый объект каждый рендер
                </div>
              </div>
              
              <div style={{ padding: '10px', backgroundColor: '#f0fdf4', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#16a34a' }}>✅ С useMemo</h4>
                <pre style={{ fontSize: '12px', margin: 0, whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(configWithMemo, null, 2)}
                </pre>
                <div style={{ fontSize: '12px', color: '#14532d', marginTop: '5px' }}>
                  Тот же объект если зависимости не изменились
                </div>
              </div>
            </div>
          </div>
          <div className="code-block">
{`// ❌ БЕЗ useMemo - новый объект каждый рендер
const config = {
  theme: theme,
  itemCount: items.length,
  timestamp: Date.now() // ❌ Всегда новое значение!
};

// ✅ С useMemo - стабильный объект
const config = useMemo(() => {
  return {
    theme: theme,
    itemCount: items.length,
    isLargeDataset: items.length > 500
  };
}, [theme, items.length]); // Пересоздается только при изменении зависимостей`}
          </div>
        </div>

        <div className="info-box blue">
          <h4 className="mt-0">⚡ Когда использовать useMemo:</h4>
          <ul className="text-sm space-y-1">
            <li><strong>Дорогие вычисления:</strong> сложные математические операции</li>
            <li><strong>Фильтрация/сортировка:</strong> больших массивов данных</li>
            <li><strong>Создание объектов:</strong> которые передаются как props</li>
            <li><strong>Производные значения:</strong> зависящие от состояния</li>
          </ul>
        </div>

        <div className="info-box green">
          <h4 className="mt-0">🔄 Когда использовать useCallback:</h4>
          <ul className="text-sm space-y-1">
            <li><strong>Функции как props:</strong> передаваемые в дочерние компоненты</li>
            <li><strong>Зависимости эффектов:</strong> функции в useEffect</li>
            <li><strong>Оптимизация рендеров:</strong> с React.memo</li>
            <li><strong>Стабильность ссылок:</strong> для предотвращения лишних рендеров</li>
          </ul>
        </div>

        <div className="info-box yellow">
          <h4 className="mt-0">⚠️ Важные моменты:</h4>
          <ul className="text-sm space-y-1">
            <li><strong>Не злоупотребляйте:</strong> мемоизация тоже имеет свою стоимость</li>
            <li><strong>Правильные зависимости:</strong> все используемые значения в массиве</li>
            <li><strong>React.memo:</strong> useCallback эффективен только с мемоизированными компонентами</li>
            <li><strong>Измеряйте производительность:</strong> профилируйте до и после оптимизации</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UseMemoCallbackDemo