import { Menu } from 'antd'
import { Link } from 'gatsby'
import React from 'react'

export interface INavbarItem {
  path: string
  name: string
  display: boolean
}

interface GlobalNavbarProps {
  menus: INavbarItem[]
}

const GlobalNavbar = (props: GlobalNavbarProps) => {
  const { menus } = props
  const isClientSide: boolean = typeof window !== 'undefined'

  return (
    <Menu className="menus" theme="light" mode="horizontal" defaultSelectedKeys={[isClientSide ? document.location.pathname : '/']}>
      {menus
        .filter(menu => menu.display)
        .map(menu => {
          const key = menu.path
          return (
            <Menu.Item key={key}>
              <Link to={menu.path}>{menu.name}</Link>
            </Menu.Item>
          )
        })}
    </Menu>
  )
}

export default GlobalNavbar
