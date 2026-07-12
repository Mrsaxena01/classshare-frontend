import { useEffect, useMemo, useState } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import UploadPage from './pages/UploadPage.jsx';
import AccessPage from './pages/AccessPage.jsx';
import api from './services/api.js';

function App() {
    const [themeMode, setThemeMode] = useState(() => {
        if (typeof window === 'undefined') return 'light';

        const savedTheme = window.localStorage.getItem('classshare-theme');
        if (savedTheme === 'light' || savedTheme === 'dark') {
            return savedTheme;
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    });

    useEffect(() => {
        document.documentElement.dataset.theme = themeMode;
        window.localStorage.setItem('classshare-theme', themeMode);
    }, [themeMode]);

    useEffect(() => {
        api.get('/health').catch(() => {}); // fire-and-forget warm-up ping
    }, []);

    const isDark = themeMode === 'dark';

    const antdThemeConfig = useMemo(
        () => ({
            algorithm: isDark
                ? antdTheme.darkAlgorithm
                : antdTheme.defaultAlgorithm,
            token: {
                colorPrimary: 'var(--primary)',
                colorPrimaryHover: 'var(--brand-strong)',
                colorPrimaryActive: 'var(--ink)',
                colorLink: 'var(--link)',
                colorLinkHover: 'var(--link-deep)',
                colorError: 'var(--error)',
                colorWarning: 'var(--warning)',
                colorSuccess: 'var(--link)',
                colorTextBase: 'var(--ink)',
                colorTextSecondary: 'var(--body)',
                colorTextTertiary: 'var(--mute)',
                colorTextDisabled: 'var(--faint)',
                colorBgBase: 'var(--canvas)',
                colorBgContainer: 'var(--canvas-elevated)',
                colorBgElevated: 'var(--canvas-elevated)',
                colorBorder: 'var(--hairline)',
                controlItemBgActive: 'var(--link-soft)',
                borderRadius: 6,
                fontFamily: 'var(--font-geist)',
                fontSize: 14,
                controlHeight: 40,
                paddingContentHorizontal: 12,
            },
        }),
        [isDark]
    );

    return (
        <ConfigProvider theme={antdThemeConfig}>
            <div className="app-shell">
                <Header
                    themeMode={themeMode}
                    onThemeToggle={() =>
                        setThemeMode((current) =>
                            current === 'dark' ? 'light' : 'dark'
                        )
                    }
                />
                <Routes>
                    <Route path="/" element={<UploadPage />} />
                    <Route path="/access/:code?" element={<AccessPage />} />
                    <Route path="*" element={<AccessPage />} />
                </Routes>
            </div>
        </ConfigProvider>
    );
}

export default App;
