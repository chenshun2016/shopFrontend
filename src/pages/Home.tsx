// src/pages/Home.tsx
// import {} from '@/api'
import { goodsApi } from '@/api/goods';
import { useEffect } from 'react';
const Home = () => {
  useEffect(() => {
    goodsApi.getGoodsList({page: 1, limit: 10}).then(res=>{
      console.log(res, 'rrr')
    })
  })
  return <div>

  </div>;
};

export default Home;
