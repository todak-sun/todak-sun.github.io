import { Menu } from 'antd'
import Layout, { Header } from 'antd/lib/layout/layout'
import { graphql, Link, useStaticQuery } from 'gatsby'
import * as React from 'react'
import GlobalNavbar from './global-navbar'

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
    <Layout className="layout" style={{
      background: `#ffffff`
    }}>
      <Header>
        <GlobalNavbar/>
      </Header>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
          background: `#ffffff`,
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
          }}
        >
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://todak-sun.github.io">Todak</a>
        </footer>
      </div>
    </Layout>
  )
}

export default LayoutContainer
