import { Col, Row } from 'antd'
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout'
import React from 'react'
import GlobalNavbar from '../global-navbar'
import { INavbarItem } from '../global-navbar/index'
import './index.scss'
interface LayoutProps {
  children: React.ReactNode
}

const LayoutContainer = ({ children }: LayoutProps) => {
  const menus: INavbarItem[] = [
    { path: '/', name: 'Home', display: true },
    { path: '/blogs', name: '블로그', display: true },
    { path: '/portfolio', name: '포트폴리오', display: false },
  ]

  return (
    <Layout className="global-layout-container">
      <Header className="global-header-container">
        <Row>
          <Col flex="100px">
            <div className="logo">Todak</div>
          </Col>
          <Col flex="auto">
            <GlobalNavbar menus={menus} />
          </Col>
        </Row>
      </Header>
      <Content className="global-content-container">{children}</Content>
      <Footer className="global-footer-container">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://todak-sun.github.io">Todak</a>
      </Footer>
    </Layout>
  )
}

export default LayoutContainer
