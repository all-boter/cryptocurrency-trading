"use client";

import { Menu } from "lucide-react";
import { useDrawerContext } from "../drawer/drawerContext";
import { Drawer } from "../drawer";
import { DocSidebarDesktop } from "../sidebar/desktop";
import { sidebar } from "@/common/router";
import { usePathname } from "next/navigation";
import LanguageSwitcher from '@/components/language-switcher'
import { ThemeToggle } from "../theme-toggle";

export const Nav = ({ isMobile }: { isMobile: boolean }) => {
  const { toggleDrawer } = useDrawerContext();
  const activePath = usePathname()

  const onGithub = () => {
    window.open("https://github.com/all-boter/cryptocurrency-trading", "_blank");
  }

  return (
    <nav className="nav md:px-6 bg-[#e4e8ec] dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="flex items-center justify-between h-full">
        <div className="flex">
          {isMobile && (
            <Menu
              onClick={() => toggleDrawer("NavDrawer")}
              size={22}
              className="cursor-pointer mr-[10px] text-gray-700 dark:text-gray-200"
            />
          )}

          <div className='flex items-center'>
            <img
              alt="icon"
              src="/logo.svg"
              width={36}
              className={`${isMobile ? '' : 'ml-[10px]'} rounded-[20%] mr-2`}
            />
            <span className="text-lg text-gray-900 dark:text-white">
              Boter
            </span>
          </div>
        </div>

        <div className="flex h-full items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
          <img
            className="ml-2 mr-[10px] rounded-[50%] dark:filter dark:invert hover:opacity-80 transition-opacity cursor-pointer"
            alt="icon"
            src="/github.svg"
            width={30}
            onClick={() => onGithub()}
          />
        </div>
      </div>

      <Drawer anchor={"left"} id="NavDrawer" width={220}>
        {isMobile && (
          <div className="sidebarMobile-container bg-[#e4e8ec] dark:bg-gray-900">
            <aside className="sidebar-content">
              <DocSidebarDesktop activePath={activePath} sidebar={sidebar} />
            </aside>
          </div>
        )}
      </Drawer>
    </nav>
  );
};
