import HeaderCus from './components/Header'
// import WithDraw from './components/WithDraw'
// import Balance from './components/Balance'
// import PublishMessage from './components/PublishMessage'
// import MessageList from './components/MessageList'

// function App() {
//   return (
//     <div className="App">
//       <Header />
//       <WithDraw />
//       <Balance />
//       <PublishMessage />
//       <MessageList />
//     </div>
//   )
// }

// export default App
import {
  SendOutlined,
  TableOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Outlet, Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import type { MenuProps } from 'antd/es/menu';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
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
  getItem(<Link to={`dashboard`}>Dashboard</Link>, '1', <HomeOutlined />),
  getItem(<Link to={`sendMessage`}>SendMessage</Link>, '2', <SendOutlined />),
  getItem(<Link to={`messageList`}>MessageList</Link>, '3', <TableOutlined />),
]
const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="search"></div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <HeaderCus />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>My Wagmi Project 2024 Created by Mary</Footer>
      </Layout>
    </Layout>
  );
};

export default App;