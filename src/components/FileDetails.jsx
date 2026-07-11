import { Typography, Button } from 'antd';
import { FileOutlined, DownloadOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

function FileDetails({ meta, onDownload, downloading }) {
    return (
        <div className="flex flex-col items-center text-center gap-6 py-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--hairline)] bg-[var(--canvas-elevated)] text-[var(--ink)] shadow-sm">
                <FileOutlined className="text-2xl text-[var(--link)]" />
            </div>

            <div className="space-y-2 max-w-sm">
                <h3 className="text-xl font-bold tracking-tight text-[var(--ink)] leading-snug truncate px-2">
                    {meta.filename || 'Protected File'}
                </h3>

                <div className="flex items-center justify-center gap-2 flex-wrap">
                    {meta.fileSize && (
                        <span className="font-mono text-xs font-medium tracking-tight bg-[var(--hairline-soft)] text-[var(--body)] px-2 py-0.5 rounded-md border border-[var(--hairline)]">
                            {(meta.fileSize / (1024 * 1024)).toFixed(2)} MB
                        </span>
                    )}
                    {meta.subject && (
                        <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-md bg-[var(--link-soft)]/20 text-[var(--link)] border border-[var(--link)]/10">
                            {meta.subject}
                        </span>
                    )}
                </div>
            </div>

            {meta.notes && (
                <div className="w-full text-left bg-[var(--hairline-soft)]/50 border border-[var(--hairline)] rounded-xl p-4">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--mute)] block mb-1">
                        Note from your teacher
                    </span>
                    <Paragraph className="!text-sm !leading-relaxed !text-[var(--body)] !mb-0 italic">
                        "{meta.notes}"
                    </Paragraph>
                </div>
            )}

            <div className="w-full border-t border-[var(--hairline)] !my-1" />

            <div className="w-full space-y-3">
                <Button
                    type="primary"
                    size="large"
                    block
                    icon={!downloading && <DownloadOutlined />}
                    onClick={onDownload}
                    loading={downloading}
                    className="!h-11 !text-sm !font-medium !rounded-lg !flex !items-center !justify-center !gap-2 !shadow-sm !bg-[var(--ink)] !text-[var(--canvas)] hover:!bg-[var(--ink)]/90 hover:!scale-[1.01] transition-all duration-200"
                >
                    {downloading ? 'Downloading...' : 'Download File'}
                </Button>
            </div>
        </div>
    );
}

export default FileDetails;
