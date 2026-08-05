// src/pages/MyCollect.tsx
// 我的收藏页：展示全局收藏的商品（主页/购物车收藏的商品都会出现在这里）
import { Button, Popconfirm, Typography, message } from 'antd';
import GoodsList from '@/businessComponents/GoodsList';
import { useFavorites } from '@/store/favorites';
import { favoriteApi } from '@/api/favarite';
import '@/css/mycollect.scss';

const { Title } = Typography;

const MyCollect = () => {
  const { favorites, clearFavorites } = useFavorites();

  const handleClear = () => {
    clearFavorites();
    message.success('已清空收藏');
  };

  const favoriteProdAdd = (id: number) => {
    favoriteApi.add(id).then(() => {
      console.log('添加成功');
    })
  }

  return (
    <div className="mycollect-page">
      <div className="mycollect-header">
        <Title level={4} style={{ margin: 0 }}>
          我的收藏（{favorites.length}）
        </Title>
        {favorites.length > 0 && (
          <Popconfirm title="确定清空全部收藏吗？" onConfirm={handleClear}>
            <Button danger size="small">
              清空收藏
            </Button>
          </Popconfirm>
        )}
      </div>
      {/* 复用商品列表组件：展示、点击进详情、取消收藏都在里面 */}
      <GoodsList list={favorites} favoriteProdAdd = { favoriteProdAdd } />
    </div>
  );
};

export default MyCollect;
