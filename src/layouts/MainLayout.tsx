import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  ShoppingOutlined,
  HistoryOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import '@/css/layout.scss';

// 顶部菜单配置（图标 + 名称）
const menuItems: MenuProps['items'] = [
  { key: 'home', icon: <HomeOutlined />, label: '首页' },
  { key: 'purchased', icon: <ShoppingOutlined />, label: '已买到的宝贝' },
  { key: 'footprint', icon: <HistoryOutlined />, label: '我的足迹' },
  { key: 'cart', icon: <ShoppingCartOutlined />, label: '购物车' },
  { key: 'favorites', icon: <HeartOutlined />, label: '收藏夹' },
  { key: 'help', icon: <QuestionCircleOutlined />, label: '帮助中心' },
];

// 各菜单项对应的路由（页面就绪后逐一补充）
const menuRouteMap: Record<string, string> = {
  home: '/',
  cart: '/cart',
  favorites: '/favorites',
};

function MainLayout() {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState('home');

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    // 切换激活态
    setSelectedKey(key);
    // 已有路由的菜单项执行跳转
    const route = menuRouteMap[key];
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className="main-layout">
      <header className="main-layout-header">
        <div className="main-layout-logo">商城</div>
        <Menu
          className="main-layout-menu"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </header>
      <main className="main-layout-content">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
