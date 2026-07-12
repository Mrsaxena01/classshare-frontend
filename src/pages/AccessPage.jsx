import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Input, Button, Typography, message, Result } from 'antd';
import {
    KeyOutlined,
    FileSearchOutlined,
    DownloadOutlined,
} from '@ant-design/icons';
import { previewFile, downloadFile } from '../services/api.js';
import PasswordPrompt from '../components/PasswordPrompt.jsx';
import FileDetails from '../components/FileDetails.jsx';

const { Title, Paragraph, Text } = Typography;

function AccessPage() {
    const { code: codeFromUrl } = useParams();
    const [code, setCode] = useState(codeFromUrl || '');
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [error, setError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const checkCode = async (targetCode) => {
        if (!targetCode) return;
        setLoading(true);
        setError('');
        setMeta(null);
        try {
            const res = await previewFile(targetCode);
            setMeta(res.data);
        } catch (err) {
            setError(
                err.response?.data?.error ||
                    "That code doesn't exist or has expired."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (codeFromUrl) checkCode(codeFromUrl);
    }, [codeFromUrl]);

    const handleDownload = async (password = null) => {
        setDownloading(true);
        setPasswordError('');
        try {
            const res = await downloadFile(code, password);
            window.location.href = res.data.downloadUrl;
            message.success('Download started!');
        } catch (err) {
            const errMsg = err.response?.data?.error || 'Download failed.';
            if (errMsg.toLowerCase().includes('password')) {
                setPasswordError(errMsg);
            } else {
                message.error(errMsg);
            }
        } finally {
            setDownloading(false);
        }
    };

    const currentStep = !meta ? 1 : meta.passwordRequired ? 2 : 3;

    return (
        <div className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden bg-[var(--canvas)] px-4 py-20 text-[var(--ink)]">
            <div
                className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-80"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, var(--hairline) 1px, transparent 1px),
                        linear-gradient(to bottom, var(--hairline) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    maskImage:
                        'radial-gradient(ellipse 60% 60% at 50% 50%, #000 50%, transparent 100%)',
                    WebkitMaskImage:
                        'radial-gradient(ellipse 60% 60% at 50% 50%, #000 50%, transparent 100%)',
                }}
            />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 bg-[var(--link)]/10 blur-[100px] dark:bg-[var(--link)]/5" />

            <div className="relative z-10 w-full max-w-md">
                <Card
                    className="!border-[var(--hairline)] !bg-[var(--canvas-elevated)]/30 shadow-2xl backdrop-blur-xl"
                    variant={false}
                >
                    <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-5 mb-6">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--hairline)] bg-[var(--canvas-elevated)] text-[13px] font-bold tracking-tighter text-[var(--ink)] shadow-sm">
                            LL
                        </div>
                        <div className="flex items-center gap-1.5 rounded-full border border-[var(--hairline)] bg-[var(--canvas-elevated)]/60 p-1">
                            {[
                                { step: 1, icon: <KeyOutlined /> },
                                { step: 2, icon: <FileSearchOutlined /> },
                                { step: 3, icon: <DownloadOutlined /> },
                            ].map((item) => (
                                <div
                                    key={item.step}
                                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs transition-all duration-200 ${
                                        currentStep === item.step
                                            ? 'bg-[var(--ink)] text-[var(--canvas)] scale-105 font-semibold'
                                            : currentStep > item.step
                                              ? 'text-emerald-500 bg-emerald-500/10'
                                              : 'text-[var(--mute)]'
                                    }`}
                                >
                                    {item.icon}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center sm:text-left mb-6">
                        <Title
                            level={2}
                            className="!text-2xl !font-bold !tracking-tight !text-[var(--ink)] !mb-1.5"
                        >
                            Access a file
                        </Title>
                        <Paragraph className="!text-xs !leading-normal !text-[var(--body)] !mb-0">
                            Enter the code your teacher shared to download the
                            file.
                        </Paragraph>
                    </div>

                    {!meta && (
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--mute)]">
                                    Access Code
                                </label>
                                <Input
                                    size="large"
                                    placeholder="e.g. CS7A92"
                                    value={code}
                                    onChange={(e) =>
                                        setCode(e.target.value.toUpperCase())
                                    }
                                    onPressEnter={() => checkCode(code)}
                                    maxLength={12}
                                    className="!py-2.5 !px-3.5 !bg-[var(--canvas-elevated)]/50 !border-[var(--hairline)] hover:!border-[var(--faint)] focus:!border-[var(--link)] focus:!shadow-none font-mono tracking-wide text-center text-sm transition-all duration-150"
                                />
                            </div>
                            <Button
                                type="primary"
                                size="large"
                                block
                                loading={loading}
                                onClick={() => checkCode(code)}
                                className="!h-11 !text-sm !font-medium !rounded-lg !bg-[var(--ink)] !text-[var(--canvas)] hover:!bg-[var(--ink)]/90 hover:!scale-[1.01] !border-none !shadow-sm transition-all duration-200"
                            >
                                Check code
                            </Button>

                            {error && (
                                <Result
                                    status="error"
                                    subTitle={
                                        <span className="text-xs text-rose-500">
                                            {error}
                                        </span>
                                    }
                                    className="!p-4 !mt-2 rounded-xl border border-rose-500/10 bg-rose-500/5 [&_.ant-result-icon]:!mb-2 [&_.ant-result-icon_.anticon]:!text-2xl"
                                />
                            )}
                        </div>
                    )}

                    {meta && !meta.passwordRequired && (
                        <div className="rounded-xl border border-[var(--hairline)] bg-[var(--hairline-soft)]/20 p-1">
                            <FileDetails
                                meta={meta}
                                onDownload={() => handleDownload()}
                                downloading={downloading}
                            />
                        </div>
                    )}

                    {meta && meta.passwordRequired && (
                        <div className="rounded-xl border border-[var(--hairline)] bg-[var(--hairline-soft)]/20 p-4">
                            <PasswordPrompt
                                onSubmit={handleDownload}
                                loading={downloading}
                                error={passwordError}
                            />
                        </div>
                    )}

                    <div className="mt-6 border-t border-[var(--hairline)] pt-4 text-center">
                        <Text className="!text-[10px] !font-medium !tracking-tight !text-[var(--mute)] !uppercase">
                            Files are deleted automatically after they expire
                        </Text>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default AccessPage;
