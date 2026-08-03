// src/businessComponents/GoodsList.tsx
// 商品列表组件：父组件通过 list props 传入商品数据渲染卡片
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Empty, Row, Typography, message } from 'antd';
import { HeartFilled, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import type { Product } from '@/api/types/api.types';
import './goodsList.scss';

const { Text } = Typography;

interface GoodsListProps {
  list: Product[];
}

const GoodsList = ({ list }: GoodsListProps) => {
  const navigate = useNavigate();
  // 本地收藏状态（持久化需接后端）
  const [favorites, setFavorites] = useState<Set<string | number>>(new Set());

  const toggleFavorite = (item: Product) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(item.id)) {
        next.delete(item.id);
        message.info(`已取消收藏「${item.name}」`);
      } else {
        next.add(item.id);
        message.success(`已收藏「${item.name}」`);
      }
      return next;
    });
  };

  const addToCart = (item: Product) => {
    message.success(`已加入购物车「${item.name}」`);
  };

  if (list.length === 0) {
    return <Empty description="暂无商品" />;
  }

  return (
    <Row gutter={[16, 16]}>
      {list.map((item) => (
        <Col xs={12} sm={8} md={6} key={item.id}>
          <Card
            hoverable
            cover={
              item.imageUrl ? (
                <img src={item.imageUrl} alt={item.name} className="goods-cover" />
              ) : (
                <div className="goods-cover goods-cover-placeholder">暂无图片</div>
              )
            }
            onClick={() => navigate(`/goodDetail/${item.id}`)}
            actions={[
              // 收藏
              favorites.has(item.id) ? (
                <HeartFilled
                  key="favorite"
                  className="goods-action-active"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item);
                  }}
                />
              ) : (
                <HeartOutlined
                  key="favorite"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item);
                  }}
                />
              ),
              // 添加（加入购物车）
              <ShoppingCartOutlined
                key="cart"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item);
                }}
              />,
            ]}
          >
            <Card.Meta
              title={item.name}
              description={
                <div className="goods-card-desc">
                  <Text type="danger" strong>
                    ¥{item.price}
                  </Text>
                  <Text type="secondary" className="goods-card-category">
                    {item.category}
                  </Text>
                </div>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default GoodsList;
