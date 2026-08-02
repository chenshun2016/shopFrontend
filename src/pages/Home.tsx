// src/pages/Home.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Empty, Pagination, Row, Spin, Typography, message } from 'antd';
import { goodsApi } from '@/api/goods';
import type { Product } from '@/api/types/api.types';
import '@/css/home.scss';

const { Text, Title } = Typography;
const PAGE_SIZE = 8;

const Home = () => {
  const navigate = useNavigate();
  const [list, setList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchList = async (current: number) => {
    setLoading(true);
    try {
      const res = await goodsApi.getGoodsList({ page: current, limit: PAGE_SIZE });
      setList(res.list);
      setTotal(res.total);
    } catch {
      message.error('获取商品列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home-page">
      <Title level={4}>商品列表</Title>
      <Spin spinning={loading}>
        {list.length === 0 && !loading ? (
          <Empty description="暂无商品" />
        ) : (
          <Row gutter={[16, 16]}>
            {list.map((item) => (
              <Col xs={12} sm={8} md={6} key={item.id}>
                <Card
                  hoverable
                  cover={
                    item.images?.[0] ? (
                      <img src={item.images[0]} alt={item.name} className="goods-cover" />
                    ) : (
                      <div className="goods-cover goods-cover-placeholder">暂无图片</div>
                    )
                  }
                  onClick={() => navigate(`/goodDetail/${item.id}`)}
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
        )}
      </Spin>
      {total > PAGE_SIZE && (
        <Pagination
          className="home-pagination"
          current={page}
          total={total}
          pageSize={PAGE_SIZE}
          onChange={(p) => {
            setPage(p);
            fetchList(p);
          }}
        />
      )}
    </div>
  );
};

export default Home;
