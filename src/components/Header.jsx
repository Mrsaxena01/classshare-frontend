import { NavLink } from 'react-router-dom';
import {
    UploadOutlined,
    KeyOutlined,
    MoonFilled,
    SunFilled,
} from '@ant-design/icons';
import { Button, ConfigProvider, theme } from 'antd';

function Header({ themeMode, onThemeToggle }) {
    const isDark = themeMode === 'dark';

    return (
        /* Dynamic styling injected into Ant Design buttons matching the Vercel Geist design language */
        <ConfigProvider
            theme={{
                algorithm: isDark
                    ? theme.darkAlgorithm
                    : theme.defaultAlgorithm,
                token: {
                    fontFamily: 'var(--font-geist)',
                    borderRadiusSM: 6,
                },
            }}
        >
            <header className="sticky top-0 z-50 w-full border-b border-[var(--hairline)] bg-[var(--canvas)]/80 backdrop-blur-md transition-colors duration-200">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                    {/* Logo Brand Segment */}
                    <NavLink
                        to="/"
                        className="flex items-center gap-3 no-underline group"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--ink)] text-[var(--canvas)] font-bold text-sm tracking-tight transition-transform group-hover:scale-[1.02]">
                            CS
                        </div>
                        <div className="flex flex-col">
                            <span className="text-base font-semibold tracking-tight text-[var(--ink)] leading-none">
                                ClassShare
                            </span>
                            <span className="mt-1 text-[11px] font-medium tracking-wide text-[var(--mute)] uppercase font-mono leading-none">
                                file links in a click
                            </span>
                        </div>
                    </NavLink>

                    {/* Navigation Links Routing Structure */}
                    <nav className="flex items-center gap-1 sm:gap-2">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) => `
                flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all no-underline
                ${
                    isActive
                        ? 'text-[var(--ink)] bg-[var(--hairline-soft)]'
                        : 'text-[var(--body)] hover:text-[var(--ink)] hover:bg-[var(--hairline-soft)]/50'
                }
              `}
                        >
                            <UploadOutlined className="text-sm" />{' '}
                            <span>Share</span>
                        </NavLink>

                        <NavLink
                            to="/access"
                            className={({ isActive }) => `
                flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all no-underline
                ${
                    isActive
                        ? 'text-[var(--ink)] bg-[var(--hairline-soft)] font-semibold'
                        : 'text-[var(--body)] hover:text-[var(--ink)] hover:bg-[var(--hairline-soft)]/50'
                }
              `}
                        >
                            <KeyOutlined className="text-sm" />{' '}
                            <span>Access File</span>
                        </NavLink>
                    </nav>

                    {/* Minimalist Theme Control Block */}
                    <div className="flex items-center">
                        <Button
                            type="text"
                            size="middle"
                            className="!flex !items-center !gap-2 !rounded-md !text-sm !font-medium !text-[var(--body)] hover:!text-[var(--ink)] hover:!bg-[var(--hairline-soft)] !border-none !px-3"
                            icon={
                                isDark ? (
                                    <SunFilled className="text-amber-500" />
                                ) : (
                                    <MoonFilled className="text-slate-600" />
                                )
                            }
                            onClick={onThemeToggle}
                        >
                            <span className="hidden sm:inline">
                                {isDark ? 'Light' : 'Dark'}
                            </span>
                        </Button>
                    </div>
                </div>
            </header>
        </ConfigProvider>
    );
}

export default Header;
