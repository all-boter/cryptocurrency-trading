export interface ISidebar {
  href: string
  label: string
  type?: 'category' | 'link'
  items?: ISidebar[]
}

export const sidebar: ISidebar[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
    type: 'category',
    items: [
      { href: "/dashboard", label: "v1" },
    ]
  },
]
