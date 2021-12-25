import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import GlobalNavbar from '../global-navbar'
import './index.scss'

interface LayoutProps {
  children: React.ReactNode
}

const LayoutContainer = ({ children }: LayoutProps) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Layout className="global-layout-container">
      <Header className="global-header-container">
        <GlobalNavbar />
      </Header>
      <Content className='global-content-container'>{children}</Content>
      <Footer className="global-footer-container">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://todak-sun.github.io">Todak</a>
      </Footer>
    </Layout>
  )
}

export default LayoutContainer
