// import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import "../../css/auth/register.scss";

const Register = () => {
  return <div className='page-wrap'>
    <Space vertical>
      <Input placeholder="请输入账号" />
      <Input placeholder="请输入密码" />
      <Input.Password placeholder="input password" />
    </Space>
    <Button type="primary" block className='sub-btn'>
      提交
    </Button>
  </div>;
};

export default Register;
