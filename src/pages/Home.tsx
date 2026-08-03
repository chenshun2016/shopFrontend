// src/pages/Home.tsx
import { useEffect, useState } from 'react';
import { Pagination, Spin, Typography, message } from 'antd';
import { goodsApi } from '@/api/goods';
import type { Product } from '@/api/types/api.types';
import GoodsList from '@/businessComponents/GoodsList';
import '@/css/home.scss';

const { Title } = Typography;
const PAGE_SIZE = 8;

const Home = () => {
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
        <GoodsList list={list} />
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
