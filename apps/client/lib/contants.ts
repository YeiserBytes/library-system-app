import { BookText, Calendar, Home, Repeat } from "lucide-react";

export const sideBarItems = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Catálogo",
    url: "/dashboard/catalog",
    icon: BookText,
  },
  {
    title: "Calendar",
    url: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    title: "Loans",
    url: "/dashboard/loans",
    icon: Repeat,
  },
  // {
  //   title: "Settings",
  //   url: "/dashboard/settings",
  //   icon: Settings,
  // },
];
