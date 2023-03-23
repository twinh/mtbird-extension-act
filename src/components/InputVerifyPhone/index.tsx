import {IComponentDefine, IComponentProps, IComponentInstanceForm} from '@mtbird/shared';
import React, {useState} from 'react';
import {Form, Input, Button, message} from 'antd';
import manifest from "./manifest";
import styles from "./style.module.less";

/**
 * @todo 改为 mtbird-component-basic/src/toolComponents/FormItemWrapper
 */
const FormItemWrapper = (allProps: any) => {
    const {node} = allProps;
    const {formConfig} = node;
    return (
        <Form.Item
            name={allProps.formId}
            className={styles.formItem}
            rules={[
                {required: formConfig.isRequired, message: '请输入手机号'},
                {
                    pattern:
                        /^1(3[0-9]|4[01456879]|5[0-3,5-9]|6[2567]|7[0-8]|8[0-9]|9[0-3,5-9])\d{8}$/,
                    message: "请输入正确的手机号",
                },
            ]}
        >
            {allProps.children}
        </Form.Item>
    )
};

/**
 * 发送验证码后倒计时时间
 */
const defaultSecond = 5;

/**
 * @todo 改为实际的发送逻辑
 */
const sendVerifyCode = async () => {
    await new Promise(r => setTimeout(r, 2000));
    const results = [
        {code: 1, message: '发送失败，请稍后再试'},
        {code: 0, message: '发送成功'},
    ];
    const result = results[Math.floor(Math.random() * results.length)];
    const isSuc = 0 === result.code;
    message[isSuc ? 'success' : 'error'](result.message);
    return isSuc;
};

const VerifyCode = (props: any) => {
    const form = Form.useFormInstance();

    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [second, setSecond] = useState(defaultSecond);

    const handleSendCode = async () => {
        try {
            await form.validateFields([props.formId]);
        } catch (e) {
            return;
        }

        // 发送验证码
        setLoading(true);
        const isSuc = await sendVerifyCode();
        setLoading(false);
        if (!isSuc) {
            return;
        }

        setDisabled(true);
        let leftSecond = second;
        const timer = setInterval(() => {
            if (leftSecond <= 1) {
                setSecond(defaultSecond);
                setDisabled(false);
                clearInterval(timer);
            } else {
                leftSecond -= 1;
                setSecond(leftSecond);
            }
        }, 1000);
    };

    const counting = second < defaultSecond;

    return (
        <div className={styles.verifyCodeGroup}>
            <Input placeholder="验证码" onChange={props.onChange} value={props.value} size="small"/>
            <Button
                type="primary"
                size="small"
                disabled={disabled}
                loading={loading}
                onClick={handleSendCode}
            >
                {counting ? (second + '秒') : '获取验证码'}
            </Button>
        </div>
    );
};

const InputVerifyPhone: IComponentDefine<IComponentInstanceForm> = (allProps: IComponentProps) => {
    console.log('InputVerifyPhone allProps', allProps);
    if (typeof window['antd'] === 'undefined') {
        console.error('Require antd');
        return;
    }

    const {onChangeValue, node, value}: IComponentProps = allProps;
    const formId = allProps.formId as string;
    const {formConfig} = node;

    const handleChange = (e: any) => {
        let value = e?.target ? e?.target.value || "" : e;
        onChangeValue(value);
    };

    // Debug
    const form = Form.useFormInstance();
    const handleClick = () => {
        form.setFieldValue(formId, form.getFieldValue(formId) ? '' : '13800138000');
        form.validateFields([formId]);
    };
    const handleClickVerifyCode = () => {
        const name = formId + '-code';
        form.setFieldValue(name, form.getFieldValue(name) ? '' : '123456');
        form.validateFields([name]);
    };

    return (
        <div>
            <FormItemWrapper
                {...allProps}
            >
                <Input
                    size="small"
                    {...formConfig?.componentProps}
                    value={value}
                    onChange={handleChange}
                />
            </FormItemWrapper>

            <Form.Item
                className={styles.formItem}
                name={formId + '-code'}
                rules={[
                    {required: formConfig.isRequired, message: '请输入验证码'},
                ]}
            >
                <VerifyCode formId={formId}/>
            </Form.Item>

            {/* NOTE: 预览页面缺少导出 antd，用于编辑器调试 */}
            <div style={{margin: '10px 0'}}>
                <Button onClick={handleClick} size="small">设置手机号</Button>
                <Button onClick={handleClickVerifyCode} size="small">设置验证码</Button>
            </div>
        </div>
    );
};

InputVerifyPhone.manifest = manifest;

export default InputVerifyPhone;