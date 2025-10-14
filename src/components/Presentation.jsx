import { useState, useEffect } from 'react'
import UseStateDemo from './base-hook/UseStateDemo.jsx'
import UseEffectDemo from './base-hook/UseEffectDemo.jsx'
import UseContextDemo from './base-hook/UseContextDemo.jsx'
import UseReducerDemo from './extra-hook/UseReducerDemo.jsx'
import UseMemoCallbackDemo from './extra-hook/UseMemoCallbackDemo.jsx'
import UseRefDemo from './extra-hook/UseRefDemo.jsx'
import UseDeferredValueDemo from './react18-hook/UseDeferredValueDemo.jsx'
import UseTransitionDemo from './react18-hook/UseTransitionDemo.jsx'
import UseIdDemo from './react18-hook/UseIdDemo.jsx'
import UseSyncExternalStoreDemo from './react18-hook/UseSyncExternalStoreDemo.jsx'
import UseInsertionEffectDemo from './react18-hook/UseInsertionEffectDemo.jsx'
import UseDemo from './react19-hook/UseDemo.jsx'
import UseOptimisticDemo from './react19-hook/UseOptimisticDemo.jsx'
import UseActionStateDemo from './react19-hook/UseActionStateDemo.jsx'
import UseFormStatusDemo from './react19-hook/UseFormStatusDemo.jsx'

// Слайд введения
function IntroSlide() {
    const [animationStep, setAnimationStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setAnimationStep(prev => (prev + 1) % 4);
        }, 2000);

        return () => clearInterval(timer);
    }, []);

    const features = [
        '🎯 Управление состоянием',
        '⚡ Побочные эффекты',
        '🔄 Передача данных',
        '🚀 Простота использования'
    ];

    return (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <h2 style={{ fontSize: '2.5em', marginBottom: '30px', color: '#21569c' }}>
                Добро пожаловать в мир React 19 Hooks!
            </h2>

            <div style={{
                background: 'linear-gradient(135deg, #61dafb 0%, #21569c 100%)',
                borderRadius: '20px',
                padding: '30px',
                color: 'white',
                marginBottom: '30px'
            }}>
                <h3 style={{ marginTop: 0 }}>Что такое хуки?</h3>
                <p style={{ fontSize: '1.2em', lineHeight: '1.6' }}>
                    React Hooks — это функции, которые позволяют "подключаться" к возможностям React
                    (состояние, жизненный цикл) из функциональных компонентов.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
            }}>
                {features.map((feature, index) => (
                    <div
                        key={index}
                        style={{
                            background: index === animationStep ? '#e3f2fd' : '#f8f9fa',
                            border: index === animationStep ? '2px solid #2196f3' : '2px solid #e9ecef',
                            borderRadius: '15px',
                            padding: '20px',
                            transform: index === animationStep ? 'scale(1.05)' : 'scale(1)',
                            transition: 'all 0.3s ease',
                            fontSize: '1.1em'
                        }}
                    >
                        {feature}
                    </div>
                ))}
            </div>

            <div style={{
                background: '#fff3cd',
                border: '1px solid #ffeaa7',
                borderRadius: '10px',
                padding: '20px',
                marginBottom: '20px'
            }}>
                <h4 style={{ marginTop: 0 }}>В этой презентации вы изучите:</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '15px', textAlign: 'left', fontSize: '0.95em' }}>
                    <div>
                        <h5 style={{ color: '#21569c', marginBottom: '10px' }}>🎯 Базовые хуки:</h5>
                        <ul style={{ fontSize: '1em', paddingLeft: '18px' }}>
                            <li><strong>useState</strong> — управление состоянием</li>
                            <li><strong>useEffect</strong> — побочные эффекты</li>
                            <li><strong>useContext</strong> — передача данных</li>
                        </ul>
                    </div>
                    <div>
                        <h5 style={{ color: '#21569c', marginBottom: '10px' }}>⚡ Дополнительные хуки:</h5>
                        <ul style={{ fontSize: '1em', paddingLeft: '18px' }}>
                            <li><strong>useReducer</strong> — сложное состояние</li>
                            <li><strong>useMemo/useCallback</strong> — оптимизация</li>
                            <li><strong>useRef</strong> — ссылки на DOM</li>
                        </ul>
                    </div>
                    <div>
                        <h5 style={{ color: '#21569c', marginBottom: '10px' }}>🚀 React 18+ хуки:</h5>
                        <ul style={{ fontSize: '1em', paddingLeft: '18px' }}>
                            <li><strong>useDeferredValue</strong> — отложенное обновление</li>
                            <li><strong>useTransition</strong> — неблокирующие обновления</li>
                            <li><strong>useId</strong> — уникальные ID</li>
                            <li><strong>useSyncExternalStore</strong> — внешние хранилища</li>
                            <li><strong>useInsertionEffect</strong> — вставка стилей</li>
                        </ul>
                    </div>
                    <div>
                        <h5 style={{ color: '#21569c', marginBottom: '10px' }}>💎 React 19+ хуки:</h5>
                        <ul style={{ fontSize: '1em', paddingLeft: '18px' }}>
                            <li><strong>use</strong> — универсальный хук</li>
                            <li><strong>useOptimistic</strong> — оптимистичные обновления</li>
                            <li><strong>useActionState</strong> — управление формами</li>
                            <li><strong>useFormStatus</strong> — статус формы</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div style={{ fontSize: '1.1em', color: '#666' }}>
                <p>📝 Каждый раздел содержит интерактивные примеры</p>
                <p>💡 Вы можете взаимодействовать с демо в реальном времени</p>
                <p>🔧 Изучите код и посмотрите, как работают хуки на практике</p>
            </div>
        </div>
    );
}

// Страница категории "Базовые хуки"
function BasicHooksPage({ goToSlide }) {
    const hooks = [
        { index: 2, title: 'useState', description: 'Управление локальным состоянием компонента', items: ['Счетчики', 'Формы ввода', 'Переключатели'] },
        { index: 3, title: 'useEffect', description: 'Выполнение побочных эффектов', items: ['API запросы', 'Подписки', 'Таймеры'] },
        { index: 4, title: 'useContext', description: 'Передача данных через дерево компонентов', items: ['Темы', 'Авторизация', 'Локализация'] }
    ];

    return (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <h2 style={{ fontSize: '2.5em', marginBottom: '30px', color: '#21569c' }}>
                🎯 Базовые хуки React 19
            </h2>

            {/* Табы для выбора хука */}
            <div style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
                marginBottom: '30px',
                flexWrap: 'wrap'
            }}>
                {hooks.map(hook => (
                    <button
                        key={hook.index}
                        className="nav-btn"
                        onClick={() => goToSlide(hook.index)}
                        style={{
                            background: '#2196f3',
                            color: 'white',
                            fontSize: '1.1em',
                            padding: '12px 24px'
                        }}
                    >
                        {hook.title}
                    </button>
                ))}
            </div>

            <div style={{
                background: 'linear-gradient(135deg, #61dafb 0%, #21569c 100%)',
                borderRadius: '20px',
                padding: '30px',
                color: 'white',
                marginBottom: '30px'
            }}>
                <h3 style={{ marginTop: 0 }}>Что такое базовые хуки?</h3>
                <p style={{ fontSize: '1.2em', lineHeight: '1.6' }}>
                    Базовые хуки — это фундаментальные инструменты React, которые используются
                    в большинстве компонентов для управления состоянием и побочными эффектами.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
            }}>
                {hooks.map(hook => (
                    <div
                        key={hook.index}
                        style={{
                            background: '#e3f2fd',
                            border: '2px solid #2196f3',
                            borderRadius: '15px',
                            padding: '20px',
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                        }}
                        onClick={() => goToSlide(hook.index)}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <h3 style={{ color: '#21569c', marginTop: 0 }}>{hook.title}</h3>
                        <p style={{ fontSize: '1.1em' }}>{hook.description}</p>
                        <ul>
                            {hook.items.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div style={{
                background: '#fff3cd',
                border: '1px solid #ffeaa7',
                borderRadius: '10px',
                padding: '20px',
                fontSize: '1.1em'
            }}>
                💡 Нажмите на карточку или выберите хук из вкладок выше, чтобы увидеть интерактивные примеры!
            </div>
        </div>
    );
}

// Страница категории "Дополнительные хуки"
function AdditionalHooksPage({ goToSlide }) {
    const hooks = [
        { index: 6, title: 'useReducer', description: 'Управление сложным состоянием', items: ['Сложные формы', 'Множественные действия', 'Связанное состояние'] },
        { index: 7, title: 'useMemo/useCallback', description: 'Оптимизация производительности', items: ['Мемоизация значений', 'Кэширование функций', 'Избежание ре-рендеров'] },
        { index: 8, title: 'useRef', description: 'Работа с ссылками и DOM', items: ['Доступ к DOM', 'Хранение значений', 'Фокус элементов'] }
    ];

    return (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <h2 style={{ fontSize: '2.5em', marginBottom: '30px', color: '#21569c' }}>
                ⚡ Дополнительные хуки React 19
            </h2>

            {/* Табы для выбора хука */}
            <div style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
                marginBottom: '30px',
                flexWrap: 'wrap'
            }}>
                {hooks.map(hook => (
                    <button
                        key={hook.index}
                        className="nav-btn"
                        onClick={() => goToSlide(hook.index)}
                        style={{
                            background: '#ff6b6b',
                            color: 'white',
                            fontSize: '1.1em',
                            padding: '12px 24px'
                        }}
                    >
                        {hook.title}
                    </button>
                ))}
            </div>

            <div style={{
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
                borderRadius: '20px',
                padding: '30px',
                color: 'white',
                marginBottom: '30px'
            }}>
                <h3 style={{ marginTop: 0 }}>Что такое дополнительные хуки?</h3>
                <p style={{ fontSize: '1.2em', lineHeight: '1.6' }}>
                    Дополнительные хуки — это более специализированные инструменты для оптимизации
                    производительности и работы со сложным состоянием.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
            }}>
                {hooks.map(hook => (
                    <div
                        key={hook.index}
                        style={{
                            background: '#ffe3e3',
                            border: '2px solid #ff6b6b',
                            borderRadius: '15px',
                            padding: '20px',
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                        }}
                        onClick={() => goToSlide(hook.index)}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <h3 style={{ color: '#c92a2a', marginTop: 0 }}>{hook.title}</h3>
                        <p style={{ fontSize: '1.1em' }}>{hook.description}</p>
                        <ul>
                            {hook.items.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div style={{
                background: '#fff3cd',
                border: '1px solid #ffeaa7',
                borderRadius: '10px',
                padding: '20px',
                fontSize: '1.1em'
            }}>
                💡 Нажмите на карточку или выберите хук из вкладок выше, чтобы увидеть интерактивные примеры!
            </div>
        </div>
    );
}

// Страница категории "React 18+ хуки"
function React18PlusHooksPage({ goToSlide }) {
    const hooks = [
        { index: 10, title: 'useDeferredValue', description: 'Отложенное обновление UI', items: ['Поиск в списках', 'Тяжелые вычисления', 'Неблокирующий рендеринг'] },
        { index: 11, title: 'useTransition', description: 'Неблокирующие обновления состояния', items: ['Переключение вкладок', 'Фильтрация', 'Навигация'] },
        { index: 12, title: 'useId', description: 'Генерация уникальных ID', items: ['Формы', 'Accessibility', 'SSR-безопасность'] },
        { index: 13, title: 'useSyncExternalStore', description: 'Подписка на внешние источники', items: ['Browser APIs', 'Библиотеки состояния', 'WebSocket'] },
        { index: 14, title: 'useInsertionEffect', description: 'Вставка стилей перед layout', items: ['CSS-in-JS', 'Динамические стили', 'Оптимизация'] }
    ];

    return (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <h2 style={{ fontSize: '2.5em', marginBottom: '30px', color: '#21569c' }}>
                🚀 React 18+ хуки
            </h2>

            {/* Табы для выбора хука */}
            <div style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
                marginBottom: '30px',
                flexWrap: 'wrap'
            }}>
                {hooks.map(hook => (
                    <button
                        key={hook.index}
                        className="nav-btn"
                        onClick={() => goToSlide(hook.index)}
                        style={{
                            background: '#10b981',
                            color: 'white',
                            fontSize: '1.1em',
                            padding: '12px 24px'
                        }}
                    >
                        {hook.title}
                    </button>
                ))}
            </div>

            <div style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '20px',
                padding: '30px',
                color: 'white',
                marginBottom: '30px'
            }}>
                <h3 style={{ marginTop: 0 }}>Что такое React 18+ хуки?</h3>
                <p style={{ fontSize: '1.2em', lineHeight: '1.6' }}>
                    Это новые хуки, добавленные в React 18 и позже, которые предоставляют продвинутые возможности
                    для оптимизации производительности, работы с внешними данными и улучшения пользовательского опыта.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
            }}>
                {hooks.map(hook => (
                    <div
                        key={hook.index}
                        style={{
                            background: '#d1fae5',
                            border: '2px solid #10b981',
                            borderRadius: '15px',
                            padding: '20px',
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                        }}
                        onClick={() => goToSlide(hook.index)}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <h3 style={{ color: '#047857', marginTop: 0 }}>{hook.title}</h3>
                        <p style={{ fontSize: '1.1em' }}>{hook.description}</p>
                        <ul>
                            {hook.items.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div style={{
                background: '#fff3cd',
                border: '1px solid #ffeaa7',
                borderRadius: '10px',
                padding: '20px',
                fontSize: '1.1em'
            }}>
                💡 Нажмите на карточку или выберите хук из вкладок выше, чтобы увидеть интерактивные примеры!
            </div>
        </div>
    );
}

// Страница категории "React 19+ хуки"
function React19PlusHooksPage({ goToSlide }) {
    const hooks = [
        {
            index: 16,
            title: 'use',
            description: 'Универсальный хук для ресурсов',
            items: [
                '📦 Читает Promise и Context',
                '🔀 Можно вызывать условно',
                '⚡ Интеграция с Suspense',
                '🎯 Универсальный API'
            ],
            gradient: 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%)'
        },
        {
            index: 17,
            title: 'useOptimistic',
            description: 'Оптимистичные обновления UI',
            items: [
                '⚡ Мгновенная обратная связь',
                '🔄 Автоматический откат',
                '💬 Чаты и комментарии',
                '❤️ Лайки и реакции'
            ],
            gradient: 'linear-gradient(135deg, #c084fc 0%, #a855f7 100%)'
        },
        {
            index: 18,
            title: 'useActionState',
            description: 'Управление состоянием форм',
            items: [
                '📝 Состояние форм',
                '⏳ isPending индикатор',
                '🔄 Server Actions',
                '✅ Валидация и ошибки'
            ],
            gradient: 'linear-gradient(135deg, #d8b4fe 0%, #c084fc 100%)'
        },
        {
            index: 19,
            title: 'useFormStatus',
            description: 'Статус родительской формы',
            items: [
                '📊 Статус формы',
                '👶 Для дочерних компонентов',
                '🔘 UI компоненты',
                '🎯 Переиспользуемые кнопки'
            ],
            gradient: 'linear-gradient(135deg, #e9d5ff 0%, #d8b4fe 100%)'
        }
    ];

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            padding: '40px 50px',
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)'
        }}>
            <h2 style={{
                color: '#e9d5ff',
                fontSize: '2.5em',
                marginBottom: '15px',
                textAlign: 'center'
            }}>
                💎 React 19+ хуки
            </h2>

            <p style={{
                color: '#c4b5fd',
                fontSize: '1.2em',
                textAlign: 'center',
                marginBottom: '40px'
            }}>
                Новые хуки React 19 для современных паттернов разработки
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '25px',
                flex: 1
            }}>
                {hooks.map(hook => (
                    <div
                        key={hook.index}
                        onClick={() => goToSlide(hook.index)}
                        style={{
                            background: hook.gradient,
                            padding: '30px',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 10px 30px rgba(168, 85, 247, 0.3)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 15px 40px rgba(168, 85, 247, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(168, 85, 247, 0.3)';
                        }}
                    >
                        <div>
                            <h3 style={{
                                color: 'white',
                                fontSize: '1.8em',
                                marginBottom: '10px',
                                fontWeight: 'bold'
                            }}>
                                {hook.title}
                            </h3>
                            <p style={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: '1.1em',
                                marginBottom: '20px'
                            }}>
                                {hook.description}
                            </p>
                        </div>

                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            fontSize: '1em',
                            color: 'rgba(255, 255, 255, 0.95)'
                        }}>
                            {hook.items.map((item, i) => (
                                <li key={i} style={{ marginBottom: '8px' }}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div style={{
                marginTop: '30px',
                textAlign: 'center',
                color: '#c4b5fd',
                fontSize: '0.9em',
                padding: '15px',
                background: 'rgba(168, 85, 247, 0.1)',
                borderRadius: '10px'
            }}>
                💡 Нажмите на карточку или выберите хук из вкладок выше, чтобы увидеть интерактивные примеры!
            </div>
        </div>
    );
}

// Слайд заключения
function SummarySlide() {
    const [checkedItems, setCheckedItems] = useState({});

    const concepts = [
        // Базовые хуки
        {
            id: 'useState',
            title: 'useState',
            category: 'basic',
            description: 'Управление локальным состоянием компонента',
            examples: ['Счетчики', 'Формы', 'Переключатели', 'Списки']
        },
        {
            id: 'useEffect',
            title: 'useEffect',
            category: 'basic',
            description: 'Выполнение побочных эффектов',
            examples: ['API запросы', 'Подписки', 'Таймеры', 'DOM манипуляции']
        },
        {
            id: 'useContext',
            title: 'useContext',
            category: 'basic',
            description: 'Передача данных через дерево компонентов',
            examples: ['Темы', 'Авторизация', 'Настройки', 'Локализация']
        },
        // Дополнительные хуки
        {
            id: 'useReducer',
            title: 'useReducer',
            category: 'additional',
            description: 'Управление сложным состоянием',
            examples: ['Сложные формы', 'Множественные действия', 'Связанное состояние', 'State machine']
        },
        {
            id: 'useRef',
            title: 'useRef',
            category: 'additional',
            description: 'Работа с ссылками и DOM',
            examples: ['Доступ к DOM', 'Хранение значений', 'Фокус элементов', 'Предыдущие значения']
        },
        {
            id: 'useMemo',
            title: 'useMemo/useCallback',
            category: 'additional',
            description: 'Оптимизация производительности',
            examples: ['Мемоизация значений', 'Кэширование функций', 'Избежание ре-рендеров', 'Тяжелые вычисления']
        },
        // React 18+ хуки
        {
            id: 'useDeferredValue',
            title: 'useDeferredValue',
            category: 'react18',
            description: 'Отложенное обновление UI',
            examples: ['Поиск', 'Фильтрация', 'Тяжелые вычисления', 'Неблокирующий рендеринг']
        },
        {
            id: 'useTransition',
            title: 'useTransition',
            category: 'react18',
            description: 'Неблокирующие обновления состояния',
            examples: ['Переключение вкладок', 'Навигация', 'Фильтрация', 'Индикатор isPending']
        },
        {
            id: 'useId',
            title: 'useId',
            category: 'react18',
            description: 'Генерация уникальных ID',
            examples: ['Формы', 'Accessibility', 'SSR-безопасность', 'Связь label-input']
        },
        {
            id: 'useSyncExternalStore',
            title: 'useSyncExternalStore',
            category: 'react18',
            description: 'Подписка на внешние источники данных',
            examples: ['Browser APIs', 'Библиотеки состояния', 'WebSocket', 'Redux/MobX']
        },
        {
            id: 'useInsertionEffect',
            title: 'useInsertionEffect',
            category: 'react18',
            description: 'Вставка стилей перед layout',
            examples: ['CSS-in-JS библиотеки', 'Динамические стили', 'Оптимизация производительности']
        },
        // React 19+ хуки
        {
            id: 'use',
            title: 'use',
            category: 'react19',
            description: 'Универсальный хук для ресурсов',
            examples: ['Promise', 'Context', 'Условные вызовы', 'Server Components']
        },
        {
            id: 'useOptimistic',
            title: 'useOptimistic',
            category: 'react19',
            description: 'Оптимистичные обновления UI',
            examples: ['Чаты', 'Комментарии', 'Лайки', 'Мгновенная обратная связь']
        },
        {
            id: 'useActionState',
            title: 'useActionState',
            category: 'react19',
            description: 'Управление состоянием форм',
            examples: ['Регистрация', 'Логин', 'Server Actions', 'FormData API']
        },
        {
            id: 'useFormStatus',
            title: 'useFormStatus',
            category: 'react19',
            description: 'Статус родительской формы',
            examples: ['Кнопки submit', 'Индикаторы загрузки', 'Переиспользуемые компоненты']
        }
    ];

    const toggleCheck = (id) => {
        setCheckedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const allChecked = concepts.every(concept => checkedItems[concept.id]);

    return (
        <div>
            <h2 style={{ textAlign: 'center', color: '#21569c', marginBottom: '30px' }}>
                🎓 Поздравляем! Вы изучили хуки React 19
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
            }}>
                {concepts.map(concept => (
                    <div
                        key={concept.id}
                        style={{
                            background: checkedItems[concept.id] ? '#e8f5e8' : '#f8f9fa',
                            border: `2px solid ${checkedItems[concept.id] ? '#4caf50' : '#e9ecef'}`,
                            borderRadius: '15px',
                            padding: '20px',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                            <input
                                type="checkbox"
                                checked={checkedItems[concept.id] || false}
                                onChange={() => toggleCheck(concept.id)}
                                style={{ marginRight: '10px', transform: 'scale(1.2)' }}
                            />
                            <h3 style={{ margin: 0, color: '#21569c' }}>
                                {concept.title}
                            </h3>
                        </div>

                        <p style={{ marginBottom: '15px', fontSize: '1.1em' }}>
                            {concept.description}
                        </p>

                        <div>
                            <strong>Примеры использования:</strong>
                            <ul style={{ marginTop: '8px' }}>
                                {concept.examples.map((example, index) => (
                                    <li key={index}>{example}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            {allChecked && (
                <div style={{
                    background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
                    color: 'white',
                    borderRadius: '15px',
                    padding: '20px',
                    textAlign: 'center',
                    marginBottom: '20px',
                    animation: 'pulse 2s infinite'
                }}>
                    <h3 style={{ margin: '0 0 10px' }}>🎉 Отлично! Вы освоили все хуки из презентации!</h3>
                    <p style={{ margin: 0, fontSize: '1.1em' }}>
                        Теперь вы готовы применять их в своих проектах!
                    </p>
                </div>
            )}

            <div style={{
                background: '#e3f2fd',
                border: '1px solid #b3d9ff',
                borderRadius: '10px',
                padding: '20px',
                marginBottom: '20px'
            }}>
                <h4 style={{ marginTop: 0 }}>🚀 Что дальше?</h4>
                <ul style={{ fontSize: '1.1em' }}>
                    <li><strong>React Compiler</strong> — автоматическая мемоизация без useMemo/useCallback</li>
                    <li><strong>React Server Components</strong> — серверные компоненты для улучшения производительности</li>
                    <li><strong>Server Actions</strong> — выполнение серверного кода напрямую из компонентов</li>
                    <li><strong>Продвинутые паттерны</strong> — композиция хуков, кастомные хуки, архитектура</li>
                    <li><strong>Практика</strong> — применяйте изученные хуки в реальных проектах!</li>
                </ul>
            </div>

            <style>
{`@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
}`}
            </style>
        </div>
    );
}

// Главный компонент презентации
function Presentation() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [openMenu, setOpenMenu] = useState(null); // 'basic', 'additional', 'react18plus', or 'react19plus'

    const slides = [
        {
            id: 'intro',
            title: 'Введение',
            component: IntroSlide
        },
        {
            id: 'basicHooks',
            title: 'Базовые хуки',
            component: BasicHooksPage
        },
        {
            id: 'useState',
            title: 'useState',
            component: UseStateDemo
        },
        {
            id: 'useEffect',
            title: 'useEffect',
            component: UseEffectDemo
        },
        {
            id: 'useContext',
            title: 'useContext',
            component: UseContextDemo
        },
        {
            id: 'additionalHooks',
            title: 'Дополнительные хуки',
            component: AdditionalHooksPage
        },
        {
            id: 'useReducer',
            title: 'useReducer',
            component: UseReducerDemo
        },
        {
            id: 'useMemoCallback',
            title: 'useMemo/useCallback',
            component: UseMemoCallbackDemo
        },
        {
            id: 'useRef',
            title: 'useRef',
            component: UseRefDemo
        },
        {
            id: 'react18PlusHooks',
            title: 'React 18+ хуки',
            component: React18PlusHooksPage
        },
        {
            id: 'useDeferredValue',
            title: 'useDeferredValue',
            component: UseDeferredValueDemo
        },
        {
            id: 'useTransition',
            title: 'useTransition',
            component: UseTransitionDemo
        },
        {
            id: 'useId',
            title: 'useId',
            component: UseIdDemo
        },
        {
            id: 'useSyncExternalStore',
            title: 'useSyncExternalStore',
            component: UseSyncExternalStoreDemo
        },
        {
            id: 'useInsertionEffect',
            title: 'useInsertionEffect',
            component: UseInsertionEffectDemo
        },
        {
            id: 'react19PlusHooks',
            title: 'React 19+ хуки',
            component: React19PlusHooksPage
        },
        {
            id: 'use',
            title: 'use',
            component: UseDemo
        },
        {
            id: 'useOptimistic',
            title: 'useOptimistic',
            component: UseOptimisticDemo
        },
        {
            id: 'useActionState',
            title: 'useActionState',
            component: UseActionStateDemo
        },
        {
            id: 'useFormStatus',
            title: 'useFormStatus',
            component: UseFormStatusDemo
        },
        {
            id: 'summary',
            title: 'Заключение',
            component: SummarySlide
        }
    ];

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            document.documentElement.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
        setIsFullscreen(!isFullscreen);
    };

    // Обработка клавиш
    useEffect(() => {
        const handleKeyPress = (e) => {
            switch(e.key) {
                case 'ArrowRight':
                case ' ':
                    nextSlide();
                    break;
                case 'ArrowLeft':
                    prevSlide();
                    break;
                case 'f':
                case 'F11':
                    e.preventDefault();
                    toggleFullscreen();
                    break;
                case 'Escape':
                    if (isFullscreen) {
                        toggleFullscreen();
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isFullscreen]);

    const CurrentSlideComponent = slides[currentSlide].component;

    return (
        <div className="presentation-container">
            <div className="header">
                <h1>React 19 Hooks - Полное руководство</h1>
                <p>Интерактивная презентация с живыми примерами</p>
            </div>

            <div className="navigation">
                <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    gap: '0',
                    width: '100%'
                }}>
                    <button
                        className={`nav-btn ${currentSlide === 0 ? 'active' : ''}`}
                        onClick={() => goToSlide(0)}
                        style={{ flex: 1 }}
                    >
                        Введение
                    </button>

                    {/* Выпадающее меню для базовых хуков */}
                    <div style={{ flex: 1, position: 'relative' }}>
                        <button
                            className={`nav-btn ${[1, 2, 3, 4].includes(currentSlide) ? 'active' : ''}`}
                            onClick={() => setOpenMenu(openMenu === 'basic' ? null : 'basic')}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '5px'
                            }}
                        >
                            🎯 Базовые хуки
                            <span style={{ fontSize: '12px' }}>{openMenu === 'basic' ? '▲' : '▼'}</span>
                        </button>

                        {openMenu === 'basic' && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                right: 0,
                                marginTop: '5px',
                                background: 'white',
                                border: '2px solid #2196f3',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                zIndex: 1000,
                                overflow: 'hidden'
                            }}>
                                <button
                                    className="nav-btn"
                                    onClick={() => {
                                        goToSlide(1);
                                        setOpenMenu(null);
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = '#e3f2fd'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = currentSlide === 1 ? '#e3f2fd' : 'white'}
                                    style={{
                                        width: '100%',
                                        textAlign: 'left',
                                        borderRadius: 0,
                                        border: 'none',
                                        borderBottom: '1px solid #e9ecef',
                                        background: currentSlide === 1 ? '#e3f2fd' : 'white',
                                        transition: 'background 0.2s ease'
                                    }}
                                >
                                    📋 Обзор базовых хуков
                                </button>
                                {[
                                    { index: 2, title: 'useState' },
                                    { index: 3, title: 'useEffect' },
                                    { index: 4, title: 'useContext' }
                                ].map((hook, idx) => (
                                    <button
                                        key={hook.index}
                                        className="nav-btn"
                                        onClick={() => {
                                            goToSlide(hook.index);
                                            setOpenMenu(null);
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = '#e3f2fd'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = currentSlide === hook.index ? '#e3f2fd' : 'white'}
                                        style={{
                                            width: '100%',
                                            textAlign: 'left',
                                            borderRadius: 0,
                                            border: 'none',
                                            borderBottom: idx < 2 ? '1px solid #e9ecef' : 'none',
                                            background: currentSlide === hook.index ? '#e3f2fd' : 'white',
                                            transition: 'background 0.2s ease'
                                        }}
                                    >
                                        {hook.title}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Выпадающее меню для дополнительных хуков */}
                    <div style={{ flex: 1, position: 'relative' }}>
                        <button
                            className={`nav-btn ${[5, 6, 7, 8].includes(currentSlide) ? 'active' : ''}`}
                            onClick={() => setOpenMenu(openMenu === 'additional' ? null : 'additional')}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '5px'
                            }}
                        >
                            ⚡ Дополнительные хуки
                            <span style={{ fontSize: '12px' }}>{openMenu === 'additional' ? '▲' : '▼'}</span>
                        </button>

                        {openMenu === 'additional' && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                right: 0,
                                marginTop: '5px',
                                background: 'white',
                                border: '2px solid #ff6b6b',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                zIndex: 1000,
                                overflow: 'hidden'
                            }}>
                                <button
                                    className="nav-btn"
                                    onClick={() => {
                                        goToSlide(5);
                                        setOpenMenu(null);
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = '#ffe3e3'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = currentSlide === 5 ? '#ffe3e3' : 'white'}
                                    style={{
                                        width: '100%',
                                        textAlign: 'left',
                                        borderRadius: 0,
                                        border: 'none',
                                        borderBottom: '1px solid #e9ecef',
                                        background: currentSlide === 5 ? '#ffe3e3' : 'white',
                                        transition: 'background 0.2s ease'
                                    }}
                                >
                                    📋 Обзор дополнительных хуков
                                </button>
                                {[
                                    { index: 6, title: 'useReducer' },
                                    { index: 7, title: 'useMemo/useCallback' },
                                    { index: 8, title: 'useRef' }
                                ].map((hook, idx) => (
                                    <button
                                        key={hook.index}
                                        className="nav-btn"
                                        onClick={() => {
                                            goToSlide(hook.index);
                                            setOpenMenu(null);
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = '#ffe3e3'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = currentSlide === hook.index ? '#ffe3e3' : 'white'}
                                        style={{
                                            width: '100%',
                                            textAlign: 'left',
                                            borderRadius: 0,
                                            border: 'none',
                                            borderBottom: idx < 2 ? '1px solid #e9ecef' : 'none',
                                            background: currentSlide === hook.index ? '#ffe3e3' : 'white',
                                            transition: 'background 0.2s ease'
                                        }}
                                    >
                                        {hook.title}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Выпадающее меню для React 18+ хуков */}
                    <div style={{ flex: 1, position: 'relative' }}>
                        <button
                            className={`nav-btn ${[9, 10, 11, 12, 13, 14].includes(currentSlide) ? 'active' : ''}`}
                            onClick={() => setOpenMenu(openMenu === 'react18plus' ? null : 'react18plus')}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '5px'
                            }}
                        >
                            🚀 React 18+ хуки
                            <span style={{ fontSize: '12px' }}>{openMenu === 'react18plus' ? '▲' : '▼'}</span>
                        </button>

                        {openMenu === 'react18plus' && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                right: 0,
                                marginTop: '5px',
                                background: 'white',
                                border: '2px solid #10b981',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                zIndex: 1000,
                                overflow: 'hidden'
                            }}>
                                <button
                                    className="nav-btn"
                                    onClick={() => {
                                        goToSlide(9);
                                        setOpenMenu(null);
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = '#d1fae5'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = currentSlide === 9 ? '#d1fae5' : 'white'}
                                    style={{
                                        width: '100%',
                                        textAlign: 'left',
                                        borderRadius: 0,
                                        border: 'none',
                                        borderBottom: '1px solid #e9ecef',
                                        background: currentSlide === 9 ? '#d1fae5' : 'white',
                                        transition: 'background 0.2s ease'
                                    }}
                                >
                                    📋 Обзор React 18+ хуков
                                </button>
                                {[
                                    { index: 10, title: 'useDeferredValue' },
                                    { index: 11, title: 'useTransition' },
                                    { index: 12, title: 'useId' },
                                    { index: 13, title: 'useSyncExternalStore' },
                                    { index: 14, title: 'useInsertionEffect' }
                                ].map((hook, idx) => (
                                    <button
                                        key={hook.index}
                                        className="nav-btn"
                                        onClick={() => {
                                            goToSlide(hook.index);
                                            setOpenMenu(null);
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = '#d1fae5'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = currentSlide === hook.index ? '#d1fae5' : 'white'}
                                        style={{
                                            width: '100%',
                                            textAlign: 'left',
                                            borderRadius: 0,
                                            border: 'none',
                                            borderBottom: idx < 4 ? '1px solid #e9ecef' : 'none',
                                            background: currentSlide === hook.index ? '#d1fae5' : 'white',
                                            transition: 'background 0.2s ease'
                                        }}
                                    >
                                        {hook.title}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Выпадающее меню для React 19+ хуков */}
                    <div style={{ flex: 1, position: 'relative' }}>
                        <button
                            className={`nav-btn ${[15, 16, 17, 18, 19].includes(currentSlide) ? 'active' : ''}`}
                            onClick={() => setOpenMenu(openMenu === 'react19plus' ? null : 'react19plus')}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '5px'
                            }}
                        >
                            💎 React 19+ хуки
                            <span style={{ fontSize: '12px' }}>{openMenu === 'react19plus' ? '▲' : '▼'}</span>
                        </button>

                        {openMenu === 'react19plus' && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                right: 0,
                                marginTop: '5px',
                                background: 'white',
                                border: '2px solid #a855f7',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                zIndex: 1000,
                                overflow: 'hidden'
                            }}>
                                <button
                                    className="nav-btn"
                                    onClick={() => {
                                        goToSlide(15);
                                        setOpenMenu(null);
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = '#f3e8ff'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = currentSlide === 15 ? '#f3e8ff' : 'white'}
                                    style={{
                                        width: '100%',
                                        textAlign: 'left',
                                        borderRadius: 0,
                                        border: 'none',
                                        borderBottom: '1px solid #e9ecef',
                                        background: currentSlide === 15 ? '#f3e8ff' : 'white',
                                        transition: 'background 0.2s ease'
                                    }}
                                >
                                    📋 Обзор React 19+ хуков
                                </button>
                                {[
                                    { index: 16, title: 'use' },
                                    { index: 17, title: 'useOptimistic' },
                                    { index: 18, title: 'useActionState' },
                                    { index: 19, title: 'useFormStatus' }
                                ].map((hook, idx) => (
                                    <button
                                        key={hook.index}
                                        className="nav-btn"
                                        onClick={() => {
                                            goToSlide(hook.index);
                                            setOpenMenu(null);
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = '#f3e8ff'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = currentSlide === hook.index ? '#f3e8ff' : 'white'}
                                        style={{
                                            width: '100%',
                                            textAlign: 'left',
                                            borderRadius: 0,
                                            border: 'none',
                                            borderBottom: idx < 3 ? '1px solid #e9ecef' : 'none',
                                            background: currentSlide === hook.index ? '#f3e8ff' : 'white',
                                            transition: 'background 0.2s ease'
                                        }}
                                    >
                                        {hook.title}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        className={`nav-btn ${currentSlide === 20 ? 'active' : ''}`}
                        onClick={() => goToSlide(20)}
                        style={{ flex: 1 }}
                    >
                        Заключение
                    </button>
                </div>
            </div>

            <div className="content">
                <CurrentSlideComponent goToSlide={goToSlide} />
            </div>

            <div style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                display: 'flex',
                gap: '10px',
                zIndex: 1000
            }}>
                <button
                    className="btn"
                    onClick={prevSlide}
                    style={{
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 0
                    }}
                >
                    ←
                </button>
                <button
                    className="btn"
                    onClick={nextSlide}
                    style={{
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 0
                    }}
                >
                    →
                </button>
                <button
                    className="btn"
                    onClick={toggleFullscreen}
                    style={{
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 0
                    }}
                    title="Полноэкранный режим (F)"
                >
                    ⛶
                </button>
            </div>

            <div style={{
                position: 'fixed',
                bottom: '20px',
                left: '20px',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '15px',
                fontSize: '14px',
                zIndex: 1000
            }}>
                {currentSlide + 1} / {slides.length}
            </div>

            <div style={{
                position: 'fixed',
                top: '80px',
                right: '20px',
                background: 'rgba(0,0,0,0.1)',
                padding: '10px',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#666',
                zIndex: 1000
            }}>
                <div>Навигация:</div>
                <div>← → : Переключение слайдов</div>
                <div>F : Полный экран</div>
                <div>Esc : Выход из полного экрана</div>
            </div>
        </div>
    );
}

export default Presentation
