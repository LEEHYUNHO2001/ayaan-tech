"use client";

import { useRouter, usePathname } from "next/navigation";
import Tag from "@/components/Tag/Tag";
import { HEADER_MENU_LIST, HeaderMenu } from "@/constants/header";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const handleOnClickMenuItem = (path: string): void => {
    if (isSamePathCurrentPage(path)) return;
    router.push(path);
  };

  const handleOnClickHome = (): void => {
    if (isHomePath()) return;
    router.push("/");
  };

  const isSamePathCurrentPage = (path: string): boolean =>
    pathname.startsWith(path);

  const isHomePath = (): boolean => {
    return pathname === "/" || pathname === "";
  };

  return (
    <header className="fixed left-0 right-0 top-0 border-b border-grey bg-[rgba(45,47,57,0.8)] bg-opacity-5 backdrop-blur-sm">
      <div className="container flex cursor-pointer items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2" onClick={handleOnClickHome}>
          Logo
          <h1 className="text-xl font-bold">ayaan tech</h1>
        </div>

        <ul className="flex items-center gap-2">
          {HEADER_MENU_LIST.map((headerMenu: HeaderMenu) => (
            <li key={headerMenu.label}>
              <Tag
                label={headerMenu.label}
                active={isSamePathCurrentPage(headerMenu.path)}
                onClick={() => handleOnClickMenuItem(headerMenu.path)}
              />
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
