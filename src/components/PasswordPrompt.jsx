import { Form, Input, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';

function PasswordPrompt({ onSubmit, loading, error }) {
    return (
        <div className="w-full max-w-sm mx-auto p-1">
            <div className="flex flex-col items-center text-center mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--hairline)] bg-[var(--canvas-elevated)] text-[var(--ink)] shadow-sm mb-4">
                    <LockOutlined
                        className={`text-xl ${error ? 'text-[var(--error)]' : 'text-[var(--mute)]'}`}
                    />
                </div>
                <h3 className="text-base font-semibold tracking-tight text-[var(--ink)]">
                    Password protected
                </h3>
                <p className="text-xs text-[var(--mute)] mt-1 max-w-[280px]">
                    This file requires a password to download.
                </p>
            </div>

            <Form
                layout="vertical"
                requiredMark={false}
                onFinish={(values) => onSubmit(values.password)}
                className="space-y-4"
            >
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter the password',
                        },
                    ]}
                    validateStatus={error ? 'error' : ''}
                    help={error}
                    className="!mb-0"
                >
                    <Input.Password
                        prefix={
                            <LockOutlined className="text-[var(--faint)] mr-1" />
                        }
                        placeholder="Enter password"
                        autoFocus
                        className="!py-2.5 !px-3 !bg-[var(--canvas-elevated)]/50 !border-[var(--hairline)] hover:!border-[var(--faint)] focus:!border-[var(--link)] focus:!shadow-none transition-all duration-150"
                    />
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                    className={`!h-10 !text-sm !font-medium !rounded-lg !flex !items-center !justify-center !gap-2 !shadow-sm transition-all duration-200 ${
                        error
                            ? '!bg-[var(--error)] hover:!bg-[var(--error-deep)] !border-none'
                            : '!bg-[var(--ink)] !text-[var(--canvas)] hover:!bg-[var(--ink)]/90 hover:!scale-[1.01]'
                    }`}
                >
                    {loading ? 'Checking password...' : 'Unlock & Download'}
                </Button>
            </Form>
        </div>
    );
}

export default PasswordPrompt;
