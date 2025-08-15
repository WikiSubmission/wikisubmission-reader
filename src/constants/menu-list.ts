import { BookOpen, FileDown, LucideIcon, Newspaper, ScrollTextIcon } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  const base = {
    groupLabel: "",
    menus: [
      {
        href: `/quran`,
        label: "Quran",
        icon: BookOpen,
        submenus: [],
      },
      {
        href: `/appendices`,
        label: "Appendices",
        icon: Newspaper,
        submenus: [],
      },
      {
        href: `/downloads`,
        label: "Downloads",
        icon: FileDown,
        submenus: [],
      },
      {
        href: `/names`,
        label: "Names of God",
        icon: ScrollTextIcon,
        submenus: [],
      },
    ],
  };

  return [base];
}
