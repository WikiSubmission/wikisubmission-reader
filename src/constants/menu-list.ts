import {
  BookOpen,
  CarFront,
  LayoutGrid,
  LucideIcon,
  Moon,
  // Tag,
  // Users,
  // Settings,
  // Bookmark,
  // SquarePen,
} from "lucide-react";

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
    active: false,
    menus: [
      {
        href: "/dashboard",
        label: "Dashboard",
        icon: LayoutGrid,
        submenus: [],
        active: false
      },
    ],
  };

  const quran = {
    groupLabel: "",
    menus: [
      {
        href: "/dashboard/quran",
        label: "Quran",
        icon: BookOpen,
        active: true,
        submenus: [
          {
            href: "/dashboard/quran",
            label: "Read Now",
            active: pathname.endsWith("/dashboard/quran")
          },
          {
            href: "/dashboard/quran/appendices",
            label: "Appendices"
          },
          {
            href: "/dashboard/quran/resources",
            label: "Downloads & PDFs"
          }
        ]
      },
    ],
  };

  // const practices = {
  //   groupLabel: "",
  //   menus: [
  //     {
  //       href: "/dashboard/practices",
  //       label: "Practices",
  //       icon: Moon,
  //       active: true,
  //       submenus: [
  //         {
  //           href: "/dashboard/prayer-times",
  //           label: "Prayer Times",
  //           active: pathname.startsWith("/dashboard/practices/prayer-times")
  //         },
  //       ]
  //     },
  //   ],
  // };

  return [base, quran];
}
