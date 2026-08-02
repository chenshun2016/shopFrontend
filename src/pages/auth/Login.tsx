// src/pages/auth/Login.tsx
import type { FormProps } from 'antd';
import { Button, Input, Form, message } from 'antd';
import '@/css/auth/register.scss';
import { useNavigate } from 'react-router-dom';
import { userApi } from '@/api/user';
import { tokenStorage } from '@/utils/storage';
const Login = () => {
  type FieldType = {
    username: string;
    password: string;
  };
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    userApi.login(values).then(res=>{
      console.log(values, '111')
      message.success("登录成功");
      tokenStorage.setAccessToken(res.accessToken);
      // tokenStorage.setRefreshToken(res.refreshToken);
      navigate("/")
    })
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return <div className='page-wrap'>
    <Form
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Form.Item<FieldType>
        label='Username'
        name='username'
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>;
};

export default Login;
