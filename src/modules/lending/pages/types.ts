import { type LinkProps } from 'react-router-dom'

type User = {
  name: string
  email: string
  avatar: string
}

type Products = {
  name: string
  logo: React.ElementType
  plan: string
}


type OtherProductMenu = {
  name: string
  logo: React.ElementType
  plan: string
}

type BaseNavItem = {
  title: string
  badge?: string
  icon?: React.ElementType
}

type NavLink = BaseNavItem & {
  url: LinkProps['to'] | (string & {})
  items?: never
}

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: LinkProps['to'] | (string & {}) })[]
  url?: never
}

type NavItem = NavCollapsible | NavLink

type NavGroup = {
  title: string
  items: NavItem[]
}

type CommandSidebarData = {
  user: User
  products: Products[]
  navGroups: NavGroup[]
}

type SidebarData = {
  user: User
  otherProductMenus: OtherProductMenu[]
  productMenus: NavGroup[]
}

export type { SidebarData, CommandSidebarData, NavGroup, NavItem, NavCollapsible, NavLink }
