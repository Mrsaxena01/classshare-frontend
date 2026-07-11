import { useState } from 'react';
import { Typography, Button, Divider, QRCode, message, Tooltip } from 'antd';
import {
    CopyOutlined,
    CheckCircleFilled,
    QrcodeOutlined,
    ExportOutlined,
    ArrowLeftOutlined,
} from '@ant-design/icons';
import CodeTiles from './CodeTiles.jsx';

function ShareResult({ result, onShareAnother }) {
    const [showQR, setShowQR] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);
    const [copiedCode, setCopiedCode] = useState(false);
    const shareLink = `${window.location.origin}/access/${result.code}`;

    const handleCopy = (text, type) => {
        navigator.clipboard.writeText(text);
        message.success(`${type} copied to clipboard!`);
        if (type === 'Code') {
            setCopiedCode(true);
            setTimeout(() => setCopiedCode(false), 2000);
        } else {
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2000);
        }
    };

    return (
        <div className="flex flex-col items-center text-center gap-6 py-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--link-soft)]/20 text-[var(--link)]">
                <CheckCircleFilled className="text-2xl text-[var(--link)]" />
            </div>

            <div className="space-y-1">
                <h3 className="text-lg font-bold tracking-tight text-[var(--ink)]">
                    File shared!
                </h3>
                <p className="text-xs text-[var(--mute)] max-w-xs">
                    Share the code or link below with your students.
                </p>
            </div>

            <div className="w-full space-y-2 rounded-xl border border-[var(--hairline)] bg-[var(--canvas-elevated)]/40 p-4">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--mute)] block">
                    Access Code
                </span>
                <div className="flex justify-center py-1">
                    <CodeTiles code={result.code} />
                </div>
                <Button
                    type="text"
                    size="small"
                    className="!text-xs !font-medium !text-[var(--body)] hover:!text-[var(--ink)] hover:!bg-[var(--hairline-soft)] !mx-auto"
                    icon={<CopyOutlined />}
                    onClick={() => handleCopy(result.code, 'Code')}
                >
                    {copiedCode ? 'Copied!' : 'Copy code'}
                </Button>
            </div>

            <Divider className="!my-1 !border-[var(--hairline)]" />

            <div className="flex flex-col items-center gap-3 w-full">
                {!showQR ? (
                    <Button
                        type="dashed"
                        className="!border-[var(--hairline)] !text-xs !font-medium !text-[var(--body)] hover:!text-[var(--link)] hover:!border-[var(--link)] !w-full !py-5 !flex !items-center !justify-center !gap-2"
                        icon={<QrcodeOutlined />}
                        onClick={() => setShowQR(true)}
                    >
                        Show QR code
                    </Button>
                ) : (
                    <div className="p-3 bg-white rounded-xl border border-[var(--hairline)] shadow-sm">
                        <QRCode value={shareLink} size={140} bordered={false} />
                    </div>
                )}
            </div>

            <div className="w-full space-y-1.5 text-left">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--mute)] block pl-1">
                    Share Link
                </span>
                <div className="w-full flex items-center justify-between rounded-lg border border-[var(--hairline)] bg-[var(--hairline-soft)]/60 p-1.5">
                    <span className="flex-1 truncate pl-2 font-mono text-xs text-[var(--body)] tracking-tight">
                        {shareLink}
                    </span>
                    <div className="flex items-center gap-1">
                        <Tooltip title="Open link in tab">
                            <Button
                                type="text"
                                size="small"
                                className="!text-[var(--body)] hover:!text-[var(--ink)] hover:!bg-[var(--hairline)] !h-7 !w-7 !flex !items-center !justify-center"
                                icon={
                                    <ExportOutlined style={{ fontSize: 13 }} />
                                }
                                onClick={() => window.open(shareLink, '_blank')}
                            />
                        </Tooltip>
                        <Tooltip title="Copy link">
                            <Button
                                type="text"
                                size="small"
                                className="!text-[var(--body)] hover:!text-[var(--ink)] hover:!bg-[var(--hairline)] !h-7 !w-7 !flex !items-center !justify-center"
                                icon={<CopyOutlined style={{ fontSize: 13 }} />}
                                onClick={() => handleCopy(shareLink, 'Link')}
                            />
                        </Tooltip>
                    </div>
                </div>
            </div>

            <div className="w-full flex items-center justify-between rounded-lg bg-[var(--canvas-elevated)]/30 border border-[var(--hairline)]/50 px-3 py-2 text-[11px] text-[var(--mute)]">
                <span className="truncate max-w-[180px] font-medium">
                    📄 {result.filename}
                </span>
                <span className="shrink-0 font-mono tracking-tight bg-[var(--hairline-soft)] px-1.5 py-0.5 rounded">
                    Expires in {Math.round(result.expiresInSeconds / 3600)}h
                </span>
            </div>

            <Button
                type="text"
                className="!text-xs !font-medium !text-[var(--body)] hover:!text-[var(--ink)] !flex !items-center !gap-1.5 !mt-1"
                icon={<ArrowLeftOutlined className="text-[10px]" />}
                onClick={onShareAnother}
            >
                Share another file
            </Button>
        </div>
    );
}

export default ShareResult;
