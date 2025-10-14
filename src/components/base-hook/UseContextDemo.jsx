import { useState, useContext, createContext } from 'react'

// Создаем контексты
const ThemeContext = createContext();
const UserContext = createContext();
const SettingsContext = createContext();

// Theme Provider компонент
function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const value = {
        theme,
        toggleTheme,
        colors: {
            light: {
                bg: '#ffffff',
                text: '#333333',
                border: '#e9ecef'
            },
            dark: {
                bg: '#2d3748',
                text: '#e2e8f0',
                border: '#4a5568'
            }
        }
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

// User Provider компонент
function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (username) => {
        setIsLoading(true);
        // Имитация API запроса
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUser({
            id: Date.now(),
            username,
            email: `${username}@example.com`,
            role: 'user'
        });
        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

// Settings Provider компонент
function SettingsProvider({ children }) {
    const [settings, setSettings] = useState({
        language: 'ru',
        notifications: true,
        autoSave: false,
        fontSize: 'medium'
    });

    const updateSetting = (key, value) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const resetSettings = () => {
        setSettings({
            language: 'ru',
            notifications: true,
            autoSave: false,
            fontSize: 'medium'
        });
    };

    const value = {
        settings,
        updateSetting,
        resetSettings
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
}

// Компонент заголовка, использующий контекст темы
function Header() {
    const { theme, toggleTheme, colors } = useContext(ThemeContext);
    const { user, logout } = useContext(UserContext);

    return (
        <div style={{
            background: colors[theme].bg,
            color: colors[theme].text,
            border: `2px solid ${colors[theme].border}`,
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div>
                <h3 style={{ margin: 0 }}>
                    {user ? `Привет, ${user.username}!` : 'Добро пожаловать!'}
                </h3>
                {user && (
                    <small style={{ opacity: 0.7 }}>
                        {user.email} • {user.role}
                    </small>
                )}
            </div>
            <div>
                <button className="btn" onClick={toggleTheme}>
                    {theme === 'light' ? '🌙' : '☀️'}
                    {theme === 'light' ? 'Темная' : 'Светлая'} тема
                </button>
                {user && (
                    <button className="btn" onClick={logout} style={{ marginLeft: '10px' }}>
                        Выйти
                    </button>
                )}
            </div>
        </div>
    );
}

// Компонент авторизации
function LoginForm() {
    const [username, setUsername] = useState('');
    const { login, isLoading } = useContext(UserContext);
    const { theme, colors } = useContext(ThemeContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            login(username.trim());
            setUsername('');
        }
    };

    return (
        <div className="theme-demo" style={{
            background: colors[theme].bg,
            color: colors[theme].text,
            border: `2px solid ${colors[theme].border}`
        }}>
            <h4>Вход в систему</h4>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Введите имя пользователя"
                    className="input-demo"
                    disabled={isLoading}
                    style={{
                        background: colors[theme].bg,
                        color: colors[theme].text,
                        border: `1px solid ${colors[theme].border}`
                    }}
                />
                <button
                    type="submit"
                    className="btn"
                    disabled={isLoading || !username.trim()}
                >
                    {isLoading ? 'Вход...' : 'Войти'}
                </button>
            </form>
        </div>
    );
}

function UseContextDemo() {
    const [showAdvanced, setShowAdvanced] = useState(false);

    return (
        <div>
            <h2>🔄 useContext Hook</h2>
            <p><strong>Назначение:</strong> Получение данных из React Context без prop drilling</p>

            <div className="code-block">
{`const MyContext = createContext();

// Provider
<MyContext.Provider value={data}>
    <App />
</MyContext.Provider>

// Consumer
const data = useContext(MyContext);`}
            </div>

            {/* Интерактивная демонстрация */}
            <div className="demo-container">
                <h3>Интерактивная демонстрация</h3>
                <div className="interactive-demo">
                    <ThemeProvider>
                        <UserProvider>
                            <SettingsProvider>
                                <Header />

                                <UserContext.Consumer>
                                    {({ user }) => (
                                        !user ? <LoginForm /> : (
                                            <div>
                                                <div style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: '1fr',
                                                    gap: '15px',
                                                    marginBottom: '15px'
                                                }}>
                                                    <div style={{
                                                        padding: '20px',
                                                        borderRadius: '8px',
                                                        background: '#f0f8ff',
                                                        border: '1px solid #b3d9ff'
                                                    }}>
                                                        <h4>🎉 Вы успешно авторизованы!</h4>
                                                        <p>Теперь вы можете использовать все функции приложения.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </UserContext.Consumer>
                            </SettingsProvider>
                        </UserProvider>
                    </ThemeProvider>
                </div>
            </div>

            <div style={{
                background: '#e8f4fd',
                border: '1px solid #b3d9ff',
                borderRadius: '8px',
                padding: '15px',
                marginTop: '20px'
            }}>
                <h4>💡 Ключевые особенности useContext:</h4>
                <ul>
                    <li><strong>Подписка:</strong> компонент автоматически перерендеривается при изменении контекста</li>
                    <li><strong>Ближайший Provider:</strong> используется значение из ближайшего родительского Provider</li>
                    <li><strong>Значение по умолчанию:</strong> из createContext используется только если нет Provider</li>
                    <li><strong>Производительность:</strong> все потребители перерендериваются при изменении</li>
                </ul>
            </div>
        </div>
    );
}

export default UseContextDemo
