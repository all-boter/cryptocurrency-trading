"use client";

import { Menu } from "lucide-react";
import { useDrawerContext } from "../drawer/drawerContext";
import { Drawer } from "../drawer";
import { DocSidebarDesktop } from "../sidebar/desktop";
import { sidebar } from "@/common/router";
import { usePathname } from "next/navigation";
import LanguageSwitcher from '@/components/language-switcher'

export const Nav = ({ isMobile }: { isMobile: boolean }) => {
  const { toggleDrawer } = useDrawerContext();
  const activePath = usePathname()

  const onGithub = () => {
    window.open("https://github.com/all-boter/cryptocurrency-trading", "_blank");
  }

  return (
    <nav className="nav">
      <div className="flex items-center justify-between h-full">
        <div className="flex">
          {isMobile && (
            <Menu
              onClick={() => toggleDrawer("NavDrawer")}
              size={22}
              color="#000"
              className="cursor-pointer mr-[10px]"
            />
          )}

          <img
            alt="icon"
            src="/logo.svg"
            width={36}
            className={`${isMobile ? '' : 'ml-[10px]'} rounded-[20%]`}
          />
        </div>

        <div className="flex h-full items-center">
          <LanguageSwitcher />

          <img
            className="ml-2 mr-[10px] rounded-[50%]"
            alt="icon"
            src="/github.svg"
            width={30}
            onClick={() => onGithub()}
          />
        </div>
      </div>

      <Drawer anchor={"left"} id="NavDrawer" width={220}>
        {isMobile && <div className="sidebarMobile-container">
          <aside className="sidebar-content">
            <DocSidebarDesktop activePath={activePath} sidebar={sidebar} />
          </aside>
        </div>}
      </Drawer>
    </nav>
  );
};
