// src/pages/goods/goodDetail.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Descriptions, Empty, Spin, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { goodsApi } from '@/api/goods';
import type { GoodsDetail } from '@/api/types/api.goods.types';

const GoodDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<GoodsDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    goodsApi
      .getGoodDetail(Number(id))
      .then((res) => setDetail(res))
      .catch(() => message.error('获取商品详情失败'))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div style={{ padding: 24 }}>
      <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>
        返回
      </Button>
      <Spin spinning={loading}>
        {detail ? (
          <Card title="商品详情">
            <Descriptions column={1} bordered>
              <Descriptions.Item label="商品ID">{detail.id}</Descriptions.Item>
              <Descriptions.Item label="价格">¥{detail.price}</Descriptions.Item>
            </Descriptions>
          </Card>
        ) : (
          !loading && <Empty description="未找到该商品" />
        )}
      </Spin>
    </div>
  );
};

export default GoodDetail;
