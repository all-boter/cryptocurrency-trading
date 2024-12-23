'use client';

import { usePathname } from 'next/navigation'
import { DocSidebarDesktop } from './desktop'
import { sidebar } from '@/common/router'

export const Sidebar = ({ isMobile = false }: { isMobile?: boolean }) => {
  const activePath = usePathname()

  if (activePath === '/en' || activePath === '/zh') {
    return null
  }

  return (
    <div className='sidebar-container w-[280px] h-full'>
      <div className="empty-div" />
      <aside className="sidebar-content">
        <DocSidebarDesktop activePath={activePath} sidebar={sidebar} />
      </aside>
    </div>
  )
}