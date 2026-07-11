import { useState } from 'react';
import { Upload, Button } from 'antd';
import {
    InboxOutlined,
    FileOutlined,
    CloudUploadOutlined,
} from '@ant-design/icons';

const { Dragger } = Upload;

function QuickShareForm({ onUpload, uploading }) {
    const [file, setFile] = useState(null);

    const draggerProps = {
        multiple: false,
        beforeUpload: (selectedFile) => {
            setFile(selectedFile);
            return false;
        },
        onRemove: () => setFile(null),
        fileList: file ? [file] : [],
    };

    const handleShare = () => {
        if (!file) return;
        onUpload(file, { mode: 'quick' });
    };

    return (
        <div className="flex flex-col gap-5 pt-1">
            <div className="relative group">
                <Dragger
                    {...draggerProps}
                    className="!border-dashed !border-[var(--hairline)] hover:!border-[var(--link)] !bg-[var(--canvas-elevated)]/40 hover:!bg-[var(--hairline-soft)]/40 !rounded-xl !p-6 transition-all duration-200"
                >
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--hairline)] bg-[var(--canvas-elevated)] text-[var(--ink)] transition-transform group-hover:scale-[1.03]">
                        {file ? (
                            <FileOutlined className="text-xl text-[var(--link)]" />
                        ) : (
                            <InboxOutlined className="text-xl text-[var(--mute)] group-hover:text-[var(--ink)]" />
                        )}
                    </div>

                    <p className="text-sm font-semibold tracking-tight text-[var(--ink)] mb-1">
                        {file
                            ? 'File ready'
                            : 'Click or drag a file to this area'}
                    </p>

                    <p className="text-xs text-[var(--mute)] leading-normal max-w-xs mx-auto mb-4">
                        Auto-generated code · No password · Expires in 24 hours
                    </p>

                    <div
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium transition-colors ${
                            file
                                ? 'border-[var(--link)]/30 bg-[var(--link-soft)]/20 text-[var(--link)]'
                                : 'border-[var(--hairline)] bg-[var(--hairline-soft)] text-[var(--body)]'
                        }`}
                    >
                        <span
                            className={`h-1.5 w-1.5 rounded-full ${file ? 'bg-[var(--link)]' : 'bg-[var(--faint)]'}`}
                        />
                        <span className="truncate max-w-[220px]">
                            {file ? file.name : 'No file selected'}
                        </span>
                    </div>
                </Dragger>
            </div>

            <Button
                type="primary"
                size="large"
                className={`!rounded-lg !text-sm !font-medium !h-11 !flex !items-center !justify-center !gap-2 !shadow-sm transition-all duration-200 ${
                    file
                        ? '!bg-[var(--ink)] !text-[var(--canvas)] hover:!bg-[var(--ink)]/90 hover:!scale-[1.01]'
                        : '!bg-[var(--hairline-soft)] !text-[var(--faint)] !border-none'
                }`}
                disabled={!file}
                loading={uploading}
                icon={!uploading && <CloudUploadOutlined className="text-xs" />}
                onClick={handleShare}
            >
                {uploading ? 'Sharing...' : 'Share now'}
            </Button>
        </div>
    );
}

export default QuickShareForm;
