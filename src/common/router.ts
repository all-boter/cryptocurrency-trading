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
    label: 'Vocabulary',
    href: '/vocabulary',
    type: 'category',
    items: [
      { href: "/vocabulary/v1", label: "v1" },
    ]
  },
]
