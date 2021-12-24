import * as React from 'react'

import { Menu } from 'antd'
import { Link } from 'gatsby'

interface INavbarItem {
  path: string
  name: string
  display: boolean
}

const GlobalNavbar = () => {
  const data: INavbarItem[] = [
    { path: '/', name: 'Home', display: true },
    { path: '/blogs', name: '블로그', display: true },
    { path: '/portfolio', name: '포트폴리오', display: true },
  ]

  const getCurrentPage = () => {
    return document.location.pathname
  }

  return (
    <Menu theme="light" mode="horizontal" defaultSelectedKeys={[getCurrentPage()]}>
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
  )
}

export default GlobalNavbar
