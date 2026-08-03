// src/pages/Home.tsx
import { useEffect, useState } from 'react';
import { Input, Pagination, Spin, Typography, message } from 'antd';
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
  const [keyword, setKeyword] = useState('');

  const fetchList = async (current: number, kw = keyword) => {
    setLoading(true);
    try {
      const res = await goodsApi.getGoodsList({ page: current, limit: PAGE_SIZE, keyword: kw || undefined });
      setList(res.list);
      setTotal(res.total);
    } catch {
      message.error('获取商品列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 搜索：重置到第 1 页并按关键词查询
  const onSearch = (value: string) => {
    setKeyword(value);
    setPage(1);
    fetchList(1, value);
  };

  useEffect(() => {
    fetchList(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home-page">
      <Title level={4}>商品列表</Title>
      <div className="home-search">
        <Input.Search
          placeholder="搜索商品"
          allowClear
          enterButton="搜索"
          onSearch={onSearch}
          style={{ width: 400, maxWidth: '100%' }}
        />
      </div>
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
