export interface HeaderMenu {
  label: string;
  path: string;
}

export const HEADER_MENU_LIST: HeaderMenu[] = [
  { label: "Intro", path: "/intro" },
  { label: "Blog", path: "/blog" },
  { label: "Resume", path: "/resume" },
];
