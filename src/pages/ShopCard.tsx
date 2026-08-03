// src/pages/ShopCard.tsx
import { useMemo, useState } from 'react';
import { Button, Card, Checkbox, Col, Empty, InputNumber, Row, Typography, message } from 'antd';
import { DeleteOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import type { CheckboxChangeEvent } from 'antd';
import type { Product } from '@/api/types/api.types';
import { useFavorites } from '@/store/favorites';
import '@/css/shopCard.scss';

const { Text } = Typography;

// 购物车商品（商品信息 + 数量）
interface CartItem extends Product {
  quantity: number;
}

// 构造购物车数据（TODO: 接入后端购物车接口后移除）
const makeItem = (p: Partial<CartItem> & Pick<CartItem, 'id' | 'name' | 'price'>): CartItem => ({
  description: '',
  category: '数码',
  imageUrl: undefined,
  stock: 0,
  rating: 0,
  reviews: 0,
  isActive: true,
  createdAt: '',
  updatedAt: '',
  quantity: 1,
  ...p,
});

const mockCart: CartItem[] = [
  makeItem({ id: 1, name: '无线蓝牙耳机', price: 299, quantity: 2, imageUrl: 'https://picsum.photos/seed/g1/200' }),
  makeItem({ id: 2, name: '机械键盘', price: 459, quantity: 1, imageUrl: 'https://picsum.photos/seed/g2/200' }),
  makeItem({ id: 3, name: '电竞鼠标', price: 199, quantity: 1, imageUrl: 'https://picsum.photos/seed/g3/200' }),
  makeItem({ id: 4, name: '显示器支架', price: 129, quantity: 3, imageUrl: undefined }),
];

const ShopCard = () => {
  const [cartList, setCartList] = useState<CartItem[]>(mockCart);
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());
  const { favorites, toggleFavorite, addFavorites } = useFavorites();

  const allSelected = cartList.length > 0 && selectedIds.size === cartList.length;
  const indeterminate = selectedIds.size > 0 && !allSelected;

  const toggleAll = (e: CheckboxChangeEvent) => {
    setSelectedIds(e.target.checked ? new Set(cartList.map((item) => item.id)) : new Set());
  };

  const toggleOne = (id: string | number, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  // 收藏已选商品
  const favoriteSelected = () => {
    if (selectedIds.size === 0) {
      message.warning('请先选择商品');
      return;
    }
    addFavorites(cartList.filter((item) => selectedIds.has(item.id)));
  };

  // 移出购物车（批量）
  const removeSelected = () => {
    if (selectedIds.size === 0) {
      message.warning('请先选择商品');
      return;
    }
    setCartList((prev) => prev.filter((item) => !selectedIds.has(item.id)));
    setSelectedIds(new Set());
    message.success('已移出购物车');
  };

  // 单个商品移出
  const removeOne = (item: CartItem) => {
    setCartList((prev) => prev.filter((i) => i.id !== item.id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(item.id);
      return next;
    });
    message.info(`已移除「${item.name}」`);
  };

  // 修改数量：减到 0 时移除该商品
  const updateQuantity = (item: CartItem, value: number | null) => {
    if (value === null || value === item.quantity) return;
    if (value <= 0) {
      removeOne(item);
      return;
    }
    setCartList((prev) => prev.map((i) => (i.id === item.id ? { ...i, quantity: value } : i)));
  };

  const selectedItems = useMemo(
    () => cartList.filter((item) => selectedIds.has(item.id)),
    [cartList, selectedIds]
  );
  const totalPrice = useMemo(
    () => selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [selectedItems]
  );

  const goCheckout = () => {
    if (selectedItems.length === 0) {
      message.warning('请先选择商品');
      return;
    }
    // TODO: 跳转结算页
    message.success(`去结算 ${selectedItems.length} 件商品，合计 ¥${totalPrice.toFixed(2)}`);
  };

  if (cartList.length === 0) {
    return (
      <div className="shopcard-page">
        <Empty description="购物车是空的" />
      </div>
    );
  }

  return (
    <div className="shopcard-page">
      <Row gutter={16}>
        {/* 左侧：商品列表 */}
        <Col xs={24} md={16}>
          <Card>
            <div className="shopcard-toolbar">
              <Checkbox checked={allSelected} indeterminate={indeterminate} onChange={toggleAll}>
                全选
              </Checkbox>
              <div className="shopcard-toolbar-actions">
                <Button icon={<HeartOutlined />} onClick={favoriteSelected}>
                  收藏
                </Button>
                <Button danger icon={<DeleteOutlined />} onClick={removeSelected}>
                  移出购物车
                </Button>
              </div>
            </div>
            {cartList.map((item) => (
              <div className="shopcard-item" key={item.id}>
                <Checkbox
                  checked={selectedIds.has(item.id)}
                  onChange={(e) => toggleOne(item.id, e.target.checked)}
                />
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="shopcard-item-img" />
                ) : (
                  <div className="shopcard-item-img shopcard-item-img-placeholder">暂无图片</div>
                )}
                <div className="shopcard-item-info">
                  <div className="shopcard-item-name">{item.name}</div>
                  <Text type="danger" strong>
                    ¥{item.price}
                  </Text>
                </div>
                {/* 数量加减：减到 0 自动移除 */}
                <InputNumber
                  className="shopcard-item-qty"
                  size="small"
                  min={0}
                  max={999}
                  value={item.quantity}
                  onChange={(value) => updateQuantity(item, value)}
                />
                {/* 收藏 / 删除 */}
                <div className="shopcard-item-actions">
                  {favorites.some((f) => f.id === item.id) ? (
                    <HeartFilled className="shopcard-item-fav shopcard-item-fav-active" onClick={() => toggleFavorite(item)} />
                  ) : (
                    <HeartOutlined className="shopcard-item-fav" onClick={() => toggleFavorite(item)} />
                  )}
                  <DeleteOutlined className="shopcard-item-del" onClick={() => removeOne(item)} />
                </div>
              </div>
            ))}
          </Card>
        </Col>

        {/* 右侧：已选商品汇总 */}
        <Col xs={24} md={8}>
          <Card title={`已选商品（${selectedItems.length} 件）`}>
            <div className="shopcard-selected">
              {selectedItems.map((item) => (
                <div className="shopcard-selected-item" key={item.id} title={item.name}>
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} />
                  ) : (
                    <div className="shopcard-selected-placeholder">暂无图</div>
                  )}
                  <span className="shopcard-selected-qty">×{item.quantity}</span>
                </div>
              ))}
              {selectedItems.length === 0 && (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="未选择商品" />
              )}
            </div>
            <div className="shopcard-total">
              <span>合计：</span>
              <Text type="danger" strong style={{ fontSize: 20 }}>
                ¥{totalPrice.toFixed(2)}
              </Text>
            </div>
            <Button type="primary" block onClick={goCheckout}>
              去结算
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ShopCard;
