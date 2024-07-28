import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    UserOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<NavLink to={"/admin"}>Trang chủ</NavLink>, '1', <PieChartOutlined />),
    getItem(<NavLink to={"/admin/products"}>Sản phẩm</NavLink>, '2', <DesktopOutlined />),
    getItem('Tài khoản', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Files', '9', <FileOutlined />),
];

const LayoutAdmin: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Coppy Right ©{new Date().getFullYear()} Created by khanhtd8998
                </Footer>
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;