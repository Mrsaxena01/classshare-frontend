import { useState } from 'react';
import { Upload, Button, Form, Input, InputNumber, Switch } from 'antd';
import {
    InboxOutlined,
    FileOutlined,
    LockOutlined,
    CalendarOutlined,
    EyeOutlined,
    SafetyCertificateOutlined,
} from '@ant-design/icons';

const { Dragger } = Upload;

function AdvancedShareForm({ onUpload, uploading }) {
    const [file, setFile] = useState(null);
    const [form] = Form.useForm();

    const draggerProps = {
        multiple: false,
        beforeUpload: (selectedFile) => {
            setFile(selectedFile);
            return false;
        },
        onRemove: () => setFile(null),
        fileList: file ? [file] : [],
    };

    const handleFinish = (values) => {
        if (!file) return;
        onUpload(file, { mode: 'advanced', ...values });
    };

    return (
        <div className="flex flex-col gap-6 pt-1">
            <div className="relative group">
                <Dragger
                    {...draggerProps}
                    className="!border-dashed !border-[var(--hairline)] hover:!border-[var(--link)] !bg-[var(--canvas-elevated)]/40 hover:!bg-[var(--hairline-soft)]/40 !rounded-xl !p-5 transition-all duration-200"
                >
                    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--hairline)] bg-[var(--canvas-elevated)] text-[var(--ink)] transition-transform group-hover:scale-[1.03]">
                        {file ? (
                            <FileOutlined className="text-lg text-[var(--link)]" />
                        ) : (
                            <InboxOutlined className="text-lg text-[var(--mute)] group-hover:text-[var(--ink)]" />
                        )}
                    </div>

                    <p className="text-sm font-semibold tracking-tight text-[var(--ink)] mb-1">
                        {file
                            ? 'File ready'
                            : 'Click or drag file to this area'}
                    </p>

                    <p className="text-xs text-[var(--mute)] max-w-xs mx-auto mb-3 leading-normal">
                        Set optional rules below.
                    </p>

                    <div
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-0.5 text-[11px] font-medium transition-colors ${
                            file
                                ? 'border-[var(--link)]/30 bg-[var(--link-soft)]/20 text-[var(--link)]'
                                : 'border-[var(--hairline)] bg-[var(--hairline-soft)] text-[var(--body)]'
                        }`}
                    >
                        <span
                            className={`h-1.5 w-1.5 rounded-full ${file ? 'bg-[var(--link)]' : 'bg-[var(--faint)]'}`}
                        />
                        <span className="truncate max-w-[200px]">
                            {file ? file.name : 'No file selected'}
                        </span>
                    </div>
                </Dragger>
            </div>

            <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                onFinish={handleFinish}
                initialValues={{
                    expiryHours: 24,
                    maxDownloads: 0,
                    oneTimeDownload: false,
                    downloadsEnabled: true,
                    showFilename: true,
                }}
                className="space-y-5"
            >
                <div className="space-y-3">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--mute)]">
                        <LockOutlined className="text-[10px]" /> Access
                    </span>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Form.Item
                            label={
                                <span className="text-xs font-medium text-[var(--body)]">
                                    Custom Access Code
                                </span>
                            }
                            name="customCode"
                            rules={[
                                { min: 4, message: 'At least 4 characters' },
                            ]}
                            className="!mb-0"
                        >
                            <Input
                                placeholder="e.g. CS7A92 (optional)"
                                maxLength={12}
                                className="!py-2 !px-3 !bg-[var(--canvas-elevated)]/50 !border-[var(--hairline)] hover:!border-[var(--faint)] focus:!border-[var(--link)] focus:!shadow-none transition-all duration-150"
                            />
                        </Form.Item>

                        <Form.Item
                            label={
                                <span className="text-xs font-medium text-[var(--body)]">
                                    Password
                                </span>
                            }
                            name="password"
                            className="!mb-0"
                        >
                            <Input.Password
                                placeholder="Leave blank for no password"
                                className="!py-2 !px-3 !bg-[var(--canvas-elevated)]/50 !border-[var(--hairline)] hover:!border-[var(--faint)] focus:!border-[var(--link)] focus:!shadow-none transition-all duration-150"
                            />
                        </Form.Item>
                    </div>
                </div>

                <div className="space-y-3">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--mute)]">
                        <CalendarOutlined className="text-[10px]" /> Expiry &
                        Limits
                    </span>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Form.Item
                            label={
                                <span className="text-xs font-medium text-[var(--body)]">
                                    Expiry (hours)
                                </span>
                            }
                            name="expiryHours"
                            className="!mb-0"
                        >
                            <InputNumber
                                min={0.1}
                                max={720}
                                className="w-full !py-0.5 !bg-[var(--canvas-elevated)]/50 !border-[var(--hairline)] hover:!border-[var(--faint)] focus:!border-[var(--link)] focus:!shadow-none transition-all duration-150"
                            />
                        </Form.Item>

                        <Form.Item
                            label={
                                <span className="text-xs font-medium text-[var(--body)]">
                                    Max Downloads (0 = unlimited)
                                </span>
                            }
                            name="maxDownloads"
                            className="!mb-0"
                        >
                            <InputNumber
                                min={0}
                                className="w-full !py-0.5 !bg-[var(--canvas-elevated)]/50 !border-[var(--hairline)] hover:!border-[var(--faint)] focus:!border-[var(--link)] focus:!shadow-none transition-all duration-150"
                            />
                        </Form.Item>
                    </div>
                </div>

                <div className="space-y-3">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--mute)]">
                        <EyeOutlined className="text-[10px]" /> Options
                    </span>
                    <div className="rounded-xl border border-[var(--hairline)] bg-[var(--canvas-elevated)]/30 p-1.5 divide-y divide-[var(--hairline)]">
                        <div className="flex items-center justify-between p-3">
                            <div className="flex flex-col text-left pr-4">
                                <span className="text-xs font-semibold text-[var(--ink)] leading-tight">
                                    One-Time Download
                                </span>
                                <span className="text-[11px] text-[var(--mute)] mt-0.5">
                                    Delete the file after the first download
                                </span>
                            </div>
                            <Form.Item
                                name="oneTimeDownload"
                                valuePropName="checked"
                                className="!mb-0"
                            >
                                <Switch size="small" className="shrink-0" />
                            </Form.Item>
                        </div>

                        <div className="flex items-center justify-between p-3">
                            <div className="flex flex-col text-left pr-4">
                                <span className="text-xs font-semibold text-[var(--ink)] leading-tight">
                                    Allow Downloads
                                </span>
                                <span className="text-[11px] text-[var(--mute)] mt-0.5">
                                    Let students save the file to their device
                                </span>
                            </div>
                            <Form.Item
                                name="downloadsEnabled"
                                valuePropName="checked"
                                className="!mb-0"
                            >
                                <Switch size="small" className="shrink-0" />
                            </Form.Item>
                        </div>

                        <div className="flex items-center justify-between p-3">
                            <div className="flex flex-col text-left pr-4">
                                <span className="text-xs font-semibold text-[var(--ink)] leading-tight">
                                    Show Filename
                                </span>
                                <span className="text-[11px] text-[var(--mute)] mt-0.5">
                                    Show the original filename to students
                                </span>
                            </div>
                            <Form.Item
                                name="showFilename"
                                valuePropName="checked"
                                className="!mb-0"
                            >
                                <Switch size="small" className="shrink-0" />
                            </Form.Item>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 pt-1">
                    <Form.Item
                        label={
                            <span className="text-xs font-medium text-[var(--body)]">
                                Subject
                            </span>
                        }
                        name="subject"
                        className="!mb-0"
                    >
                        <Input
                            placeholder="e.g. Physics 101"
                            maxLength={100}
                            className="!py-2 !px-3 !bg-[var(--canvas-elevated)]/50 !border-[var(--hairline)] hover:!border-[var(--faint)] focus:!border-[var(--link)] focus:!shadow-none transition-all duration-150"
                        />
                    </Form.Item>

                    <Form.Item
                        label={
                            <span className="text-xs font-medium text-[var(--body)]">
                                Notes
                            </span>
                        }
                        name="notes"
                        className="!mb-0"
                    >
                        <Input.TextArea
                            placeholder="Any notes for your students"
                            maxLength={500}
                            rows={2}
                            className="!py-2 !px-3 !bg-[var(--canvas-elevated)]/50 !border-[var(--hairline)] hover:!border-[var(--faint)] focus:!border-[var(--link)] focus:!shadow-none transition-all duration-150 resize-none"
                        />
                    </Form.Item>
                </div>

                <Form.Item className="!mb-0 !pt-3">
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        block
                        disabled={!file}
                        loading={uploading}
                        icon={
                            !uploading && (
                                <SafetyCertificateOutlined className="text-xs" />
                            )
                        }
                        className={`!h-11 !text-sm !font-medium !rounded-lg !flex !items-center !justify-center !gap-2 !shadow-sm transition-all duration-200 ${
                            file
                                ? '!bg-[var(--ink)] !text-[var(--canvas)] hover:!bg-[var(--ink)]/90 hover:!scale-[1.01]'
                                : '!bg-[var(--hairline-soft)] !text-[var(--faint)] !border-none'
                        }`}
                    >
                        {uploading ? 'Sharing...' : 'Share file'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AdvancedShareForm;
