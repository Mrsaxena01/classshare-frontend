import { useState } from 'react';
import { Tabs, Card, Typography, message } from 'antd';
import {
    CloudUploadOutlined,
    SafetyCertificateOutlined,
    RocketOutlined,
} from '@ant-design/icons';
import QuickShareForm from '../components/QuickShareForm.jsx';
import { uploadFile } from '../services/api.js';
import ShareResult from '../components/ShareResult.jsx';
import AdvancedShareForm from '../components/AdvancedShareForm.jsx';

const { Paragraph } = Typography;

function UploadPage() {
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState(null);

    const flowSteps = [
        {
            icon: (
                <CloudUploadOutlined className="text-xl text-[var(--link)]" />
            ),
            title: '1. Upload',
            detail: 'Drop a file with a single click and keep your classroom flow moving.',
        },
        {
            icon: (
                <SafetyCertificateOutlined className="text-xl text-[var(--link)]" />
            ),
            title: '2. Set rules',
            detail: 'Control expiry, password protection, download limits, and visibility.',
        },
        {
            icon: <RocketOutlined className="text-xl text-[var(--link)]" />,
            title: '3. Share code',
            detail: 'Students open the file with one code on any device — no account needed.',
        },
    ];

    const handleUpload = async (file, options) => {
        setUploading(true);
        setResult(null);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('mode', options.mode);
        if (options.customCode)
            formData.append('customCode', options.customCode);
        if (options.password) formData.append('password', options.password);
        if (options.expiryHours)
            formData.append('expiryHours', options.expiryHours);
        if (options.maxDownloads !== undefined)
            formData.append('maxDownloads', options.maxDownloads);
        if (options.oneTimeDownload !== undefined)
            formData.append('oneTimeDownload', options.oneTimeDownload);
        if (options.downloadsEnabled !== undefined)
            formData.append('downloadsEnabled', options.downloadsEnabled);
        if (options.showFilename !== undefined)
            formData.append('showFilename', options.showFilename);
        if (options.subject) formData.append('subject', options.subject);
        if (options.notes) formData.append('notes', options.notes);

        try {
            const res = await uploadFile(formData);
            setResult(res.data);
            message.success('File shared successfully!');
        } catch (err) {
            const errMsg =
                err.response?.data?.error || 'Upload failed. Please try again.';
            message.error(errMsg);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-[var(--canvas)] px-6 py-16 text-[var(--ink)]">
            <div
                className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-80"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, var(--hairline) 1px, transparent 1px),
                        linear-gradient(to bottom, var(--hairline) 1px, transparent 1px)
                    `,
                    backgroundSize: '48px 48px',
                    maskImage:
                        'radial-gradient(ellipse 60% 50% at 50% 10%, #000 60%, transparent 100%)',
                    WebkitMaskImage:
                        'radial-gradient(ellipse 60% 50% at 50% 10%, #000 60%, transparent 100%)',
                }}
            />
            <div className="pointer-events-none absolute left-1/2 top-[-100px] h-[350px] w-[500px] -translate-x-1/2 bg-[var(--link)]/10 blur-[80px] dark:bg-[var(--link)]/5" />

            <div className="relative z-10 mx-auto max-w-6xl">
                <section className="grid grid-cols-1 items-start gap-16 pb-20 pt-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="text-center lg:text-left lg:pt-4">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--canvas-elevated)] px-3.5 py-1 text-xs font-medium tracking-tight text-[var(--body)] shadow-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            No sign-up required
                        </span>

                        <h1 className="mt-6 text-4xl font-bold tracking-tight text-[var(--ink)] sm:text-5xl lg:leading-[1.15]">
                            Share files in{' '}
                            <span className="bg-gradient-to-r from-[var(--link)] to-sky-500 bg-clip-text text-transparent">
                                seconds
                            </span>
                            .
                        </h1>

                        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[var(--body)] lg:mx-0">
                            Upload a file, get a short code, and share it with
                            your class — no accounts, no group chats.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs lg:justify-start">
                            <span className="rounded bg-[var(--ink)] px-2 py-0.5 font-bold uppercase tracking-wider text-[var(--canvas)] text-[10px]">
                                For Students
                            </span>
                            <span className="font-medium text-[var(--body)]">
                                One short code
                            </span>
                            <span className="text-[var(--faint)]">•</span>
                            <span className="font-medium text-[var(--body)]">
                                Zero sign-ins required
                            </span>
                            <span className="text-[var(--faint)]">•</span>
                            <span className="font-medium text-[var(--body)]">
                                Any device
                            </span>
                        </div>
                    </div>

                    <div className="w-full">
                        <Card
                            className="!border-[var(--hairline)] !bg-[var(--canvas-elevated)]/20 shadow-2xl backdrop-blur-xl"
                            variant={false}
                        >
                            {!result ? (
                                <Tabs
                                    defaultActiveKey="quick"
                                    className="geist-custom-tabs !bg-[var(--canvas-elevated)]/20 !rounded-xl !border-[var(--hairline)] !p-1"
                                    items={[
                                        {
                                            key: 'quick',
                                            label: 'Quick Share',
                                            children: (
                                                <QuickShareForm
                                                    onUpload={handleUpload}
                                                    uploading={uploading}
                                                />
                                            ),
                                        },
                                        {
                                            key: 'advanced',
                                            label: 'Advanced Share',
                                            children: (
                                                <AdvancedShareForm
                                                    onUpload={handleUpload}
                                                    uploading={uploading}
                                                />
                                            ),
                                        },
                                    ]}
                                />
                            ) : (
                                <ShareResult
                                    result={result}
                                    onShareAnother={() => setResult(null)}
                                />
                            )}
                        </Card>
                    </div>
                </section>

                <section className="border-t border-[var(--hairline)] py-16">
                    <div className="mb-12 text-center">
                        <span className="font-mono text-xs font-medium uppercase tracking-widest text-[var(--link)]">
                            How it works
                        </span>
                        <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-3xl">
                            Three steps, no sign-up
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {flowSteps.map((item, idx) => (
                            <div
                                key={idx}
                                className="rounded-xl border border-[var(--hairline)] bg-[var(--canvas-elevated)]/40 p-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--faint)]/40 hover:bg-[var(--canvas-elevated)]/80"
                            >
                                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--hairline)] bg-[var(--canvas-elevated)]">
                                    {item.icon}
                                </div>
                                <h3 className="text-base font-semibold text-[var(--ink)]">
                                    {item.title}
                                </h3>
                                <Paragraph className="!mt-2 !text-sm !leading-relaxed !text-[var(--body)] !mb-0">
                                    {item.detail}
                                </Paragraph>
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="flex items-center justify-center gap-3 border-t border-[var(--hairline)] pt-8 text-[11px] font-medium tracking-tight text-[var(--mute)] uppercase">
                    <span className="rounded-full border border-[var(--hairline)] bg-[var(--canvas-elevated)]/50 px-3 py-1">
                        No account needed
                    </span>
                    <span className="rounded-full border border-[var(--hairline)] bg-[var(--canvas-elevated)]/50 px-3 py-1">
                        Files deleted after expiry
                    </span>
                </footer>
            </div>
        </div>
    );
}

export default UploadPage;
