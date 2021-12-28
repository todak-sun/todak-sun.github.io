import React, { useEffect } from 'react'

import { Menu } from 'antd'
import { Link } from 'gatsby'
import Layout from 'antd/lib/layout/layout'
import './index.scss'

interface INavbarItem {
  path: string
  name: string
  display: boolean
}

const GlobalNavbar = () => {
  const isClientSide: boolean = typeof window !== 'undefined'

  const data: INavbarItem[] = [
    { path: '/', name: 'Home', display: true },
    { path: '/blogs', name: '블로그', display: true },
    { path: '/portfolio', name: '포트폴리오', display: false },
  ]

  return (
    <Layout className="global-navbar">
      
      <p className="logo">로고자리</p>

      <Menu className="menus" theme="light" mode="horizontal" defaultSelectedKeys={[isClientSide ? document.location.pathname : '/']}>
        {data
          .filter(item => item.display)
          .map(item => {
            const key = item.path
            return (
              <Menu.Item key={key}>
                <Link to={item.path}>{item.name}</Link>
              </Menu.Item>
            )
          })}
      </Menu>
    </Layout>
  )
}

export default GlobalNavbar
