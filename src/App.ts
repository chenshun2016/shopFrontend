import { userApi } from "./api/user.js";

const App = () => {
  const btnClick = () => {
    userApi.createUser({
      username: 'cess',
      email: 'hdjsgjhf@qq.com',
      password: '131234'
    }).then(res=>{
      console.log('创建用户成功', res)
    })
  };

  // return 后面写 JSX
  return (
    <div className="App">
      <button onClick={btnClick}>按钮</button>
    </div>
  );
};

export default App;