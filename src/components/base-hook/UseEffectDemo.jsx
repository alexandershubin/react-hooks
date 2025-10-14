import { useState, useEffect, useRef } from 'react'

function UseEffectDemo() {
    const [count, setCount] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [timer, setTimer] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Для мониторинга эффектов
    const [effectLog, setEffectLog] = useState([]);
    const effectCounters = useRef({
        everyRender: 0,
        onMount: 0,
        onCountChange: 0,
        onEvents: 0,
        onTimer: 0,
        onMouse: 0
    });

    // Функция для логирования эффектов
    const logEffect = (effectName, description, type = 'info') => {
        const timestamp = new Date().toLocaleTimeString();
        effectCounters.current[effectName] = (effectCounters.current[effectName] || 0) + 1;

        const logEntry = {
            id: Date.now() + Math.random(),
            timestamp,
            effectName,
            description,
            type,
            count: effectCounters.current[effectName]
        };

        setEffectLog(prev => [logEntry, ...prev].slice(0, 15)); // Храним последние 15 записей
    };

    // Пример 1: Эффект без зависимостей (выполняется каждый рендер)
    // useEffect(() => {
    //     logEffect('everyRender', 'Эффект без зависимостей - выполняется каждый рендер', 'warning');
    //     console.log('Компонент отрендерился!');
    // });

    // Пример 2: Эффект с пустым массивом зависимостей (выполняется только при монтировании)
    useEffect(() => {
        logEffect('onMount', 'Эффект только при монтировании - выполнился', 'success');
        console.log('Компонент смонтирован!');
        document.title = `useEffect Demo - Счетчик: ${count}`;

        return () => {
            logEffect('onMount', 'Функция очистки при размонтировании', 'error');
            console.log('Компонент размонтируется!');
            document.title = 'React 19 Hooks Presentation';
        };
    }, []);

    // Пример 3: Эффект с зависимостями (выполняется при изменении count)
    useEffect(() => {
        logEffect('onCountChange', `Эффект при изменении count: ${count}`, 'info');
        document.title = `Счетчик: ${count}`;
    }, [count]);

    // Пример 4: Подписка на события (с очисткой)
    useEffect(() => {
        logEffect('onEvents', 'Подписка на события окна (resize, online/offline)', 'success');

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('resize', handleResize);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            logEffect('onEvents', 'Очистка подписок на события', 'warning');
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Пример 5: Таймер с очисткой
    useEffect(() => {
        let interval;

        if (isTimerRunning) {
            logEffect('onTimer', 'Запуск таймера - создание interval', 'info');
            interval = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        } else {
            logEffect('onTimer', 'Таймер остановлен', 'warning');
        }

        return () => {
            if (interval) {
                logEffect('onTimer', 'Очистка interval таймера', 'error');
                clearInterval(interval);
            }
        };
    }, [isTimerRunning]);

    // Пример 6: Отслеживание мыши
    useEffect(() => {
        logEffect('onMouse', 'Подписка на движение мыши', 'success');

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            logEffect('onMouse', 'Отписка от событий мыши', 'warning');
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Пример 7: Имитация API запроса
    const fetchPosts = async () => {
        logEffect('onAPI', 'Начало загрузки данных через API', 'info');
        setLoading(true);
        try {
            // Имитация API запроса
            await new Promise(resolve => setTimeout(resolve, 1500));
            const mockPosts = [
                { id: 1, title: 'Изучаем useEffect', content: 'useEffect позволяет выполнять побочные эффекты' },
                { id: 2, title: 'Очистка эффектов', content: 'Важно очищать подписки и таймеры' },
                { id: 3, title: 'Зависимости эффектов', content: 'Массив зависимостей контролирует выполнение' }
            ];
            setPosts(mockPosts);
            logEffect('onAPI', 'Данные успешно загружены', 'success');
        } catch (error) {
            logEffect('onAPI', 'Ошибка загрузки данных', 'error');
            console.error('Ошибка загрузки:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getTypeColor = (type) => {
        const colors = {
            info: '#3b82f6',
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444'
        };
        return colors[type] || '#6b7280';
    };

    return (
        <div>
            {/* Фиксированная панель мониторинга эффектов */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                backgroundColor: '#111827',
                color: '#f3f4f6',
                padding: '8px 16px',
                fontSize: '11px',
                fontFamily: 'monospace',
                borderBottom: '2px solid #374151',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                maxHeight: '120px',
                overflow: 'hidden'
            }}>
                <div style={{ display: 'flex', gap: '24px', maxWidth: '1400px', margin: '0 auto' }}>
                    {/* Счетчики эффектов */}
                    <div style={{ minWidth: '300px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#fbbf24' }}>
                            🔍 Счетчики useEffect:
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '10px' }}>
                            <span>Каждый рендер: <span style={{color: '#f59e0b'}}>{effectCounters.current.everyRender}</span></span>
                            <span>При монтировании: <span style={{color: '#10b981'}}>{effectCounters.current.onMount}</span></span>
                            <span>При count: <span style={{color: '#3b82f6'}}>{effectCounters.current.onCountChange}</span></span>
                            <span>События: <span style={{color: '#10b981'}}>{effectCounters.current.onEvents}</span></span>
                            <span>Таймер: <span style={{color: '#f59e0b'}}>{effectCounters.current.onTimer}</span></span>
                            <span>Мышь: <span style={{color: '#10b981'}}>{effectCounters.current.onMouse}</span></span>
                        </div>
                    </div>

                    {/* Лог эффектов */}
                    <div style={{ flex: 1, minWidth: '400px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#fbbf24' }}>
                            📜 Последние эффекты:
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2px',
                            maxHeight: '80px',
                            overflowY: 'auto'
                        }}>
                            {effectLog.slice(0, 4).map(log => (
                                <div key={log.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '10px',
                                    padding: '2px 4px',
                                    borderRadius: '3px',
                                    backgroundColor: 'rgba(75, 85, 99, 0.3)'
                                }}>
                                    <span style={{ color: '#9ca3af' }}>{log.timestamp}</span>
                                    <span style={{
                                        color: getTypeColor(log.type),
                                        fontWeight: 'bold',
                                        minWidth: '80px'
                                    }}>
                                        {log.effectName}
                                    </span>
                                    <span style={{ color: '#d1d5db', flex: 1 }}>
                                        {log.description}
                                    </span>
                                    <span style={{
                                        color: '#6b7280',
                                        fontSize: '9px',
                                        minWidth: '30px',
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
            <div style={{ paddingTop: '130px' }}>
                <h2>⚡ useEffect Hook</h2>
                <p><strong>Назначение:</strong> Выполнение побочных эффектов (API запросы, подписки, очистка)</p>

            <div className="code-block">
{`useEffect(() => {
    // Побочный эффект
    return () => {
        // Очистка (опционально)
    };
}, [dependencies]); // Массив зависимостей`}
            </div>

            {/* Пример 1: Отслеживание изменений */}
            <div className="demo-container">
                <h3>1. Отслеживание изменений счетчика</h3>
                <div className="interactive-demo">
                    <div className="counter">{count}</div>
                    <button className="btn" onClick={() => setCount(count + 1)}>
                        Увеличить
                    </button>
                    <button className="btn" onClick={() => setCount(0)}>
                        Сбросить
                    </button>
                    <p>Заголовок страницы обновляется при изменении счетчика!</p>
                </div>
                <div className="code-block">
{`useEffect(() => {
    document.title = \`Счетчик: \${count}\`;
}, [count]); // Выполняется при изменении count`}
                </div>
            </div>

            {/* Пример 2: Подписки на события */}
            <div className="demo-container">
                <h3>2. Подписка на события окна</h3>
                <div className="interactive-demo">
                    <div className={`status ${isOnline ? 'online' : 'offline'}`}>
                        Статус: {isOnline ? '🟢 Онлайн' : '🔴 Оффлайн'}
                    </div>
                    <p>Ширина окна: <strong>{windowWidth}px</strong></p>
                    <p>Позиция мыши: <strong>x: {mousePosition.x}, y: {mousePosition.y}</strong></p>
                    <small>Попробуйте изменить размер окна или переключить сеть</small>
                </div>
                <div className="code-block">
{`useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    const handleOnline = () => setIsOnline(true);
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('online', handleOnline);
    
    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('online', handleOnline);
    };
}, []); // Пустой массив = выполняется только при монтировании`}
                </div>
            </div>

            {/* Пример 3: Таймер */}
            <div className="demo-container">
                <h3>3. Управление таймером</h3>
                <div className="interactive-demo">
                    <div className="counter">{formatTime(timer)}</div>
                    <button
                        className="btn"
                        onClick={() => setIsTimerRunning(!isTimerRunning)}
                    >
                        {isTimerRunning ? 'Остановить' : 'Запустить'}
                    </button>
                    <button
                        className="btn"
                        onClick={() => {
                            setTimer(0);
                            setIsTimerRunning(false);
                        }}
                    >
                        Сбросить
                    </button>
                </div>
                <div className="code-block">
{`useEffect(() => {
    let interval;
    
    if (isTimerRunning) {
        interval = setInterval(() => {
            setTimer(prev => prev + 1);
        }, 1000);
    }

    return () => {
        if (interval) clearInterval(interval);
    };
}, [isTimerRunning]); // Зависит от isTimerRunning`}
                </div>
            </div>

            {/* Пример 4: API запросы */}
            <div className="demo-container">
                <h3>4. Загрузка данных (имитация API)</h3>
                <div className="interactive-demo">
                    <button
                        className="btn"
                        onClick={fetchPosts}
                        disabled={loading}
                    >
                        {loading ? 'Загружаем...' : 'Загрузить посты'}
                    </button>

                    {loading && (
                        <div style={{ padding: '20px', textAlign: 'center' }}>
                            <div style={{
                                border: '4px solid #f3f3f3',
                                borderTop: '4px solid #61dafb',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                animation: 'spin 2s linear infinite',
                                margin: '0 auto'
                            }}></div>
                            <p>Загрузка данных...</p>
                        </div>
                    )}

                    {posts.length > 0 && !loading && (
                        <div style={{ marginTop: '15px' }}>
                            {posts.map(post => (
                                <div key={post.id} style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    padding: '15px',
                                    marginBottom: '10px',
                                    background: '#f9f9f9'
                                }}>
                                    <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>
                                        {post.title}
                                    </h4>
                                    <p style={{ margin: 0, color: '#666' }}>
                                        {post.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="code-block">
{`const fetchPosts = async () => {
    setLoading(true);
    try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);
    } catch (error) {
        console.error('Ошибка:', error);
    } finally {
        setLoading(false);
    }
};`}
                </div>
            </div>

            <div style={{
                background: '#e8f4fd',
                border: '1px solid #b3d9ff',
                borderRadius: '8px',
                padding: '15px',
                marginTop: '20px'
            }}>
                <h4>💡 Типы useEffect по зависимостям:</h4>
                <ul>
                    <li><code>useEffect(() =&gt; {})</code> - каждый рендер</li>
                    <li><code>useEffect(() =&gt; {}, [])</code> - только при монтировании</li>
                    <li><code>useEffect(() =&gt; {}, [dep])</code> - при изменении dep</li>
                    <li><strong>Очистка:</strong> return функция выполняется перед следующим эффектом или размонтированием</li>
                </ul>
            </div>

            <div style={{
                background: '#fff3cd',
                border: '1px solid #ffeaa7',
                borderRadius: '8px',
                padding: '15px',
                marginTop: '15px'
            }}>
                <h4>⚠️ Частые ошибки:</h4>
                <ul>
                    <li><strong>Бесконечный цикл:</strong> забыли указать зависимости</li>
                    <li><strong>Утечки памяти:</strong> не очистили подписки/таймеры</li>
                    <li><strong>Лишние рендеры:</strong> неправильные зависимости</li>
                    <li><strong>Устаревшие замыкания:</strong> используйте функциональные обновления</li>
                </ul>
            </div>

            <style>
{`@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}`}
            </style>
            </div>
        </div>
    );
}

export default UseEffectDemo
