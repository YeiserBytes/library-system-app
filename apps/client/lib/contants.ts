import {
  BookText,
  Calendar,
  Home,
  Repeat,
  MessageCircleIcon,
} from "lucide-react";

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
    title: "Notifications",
    url: "/dashboard/notifications",
    icon: MessageCircleIcon,
  },
  {
    title: "Loans",
    url: "/dashboard/loans",
    icon: Repeat,
  },
  {
    title: "Calendar",
    url: "/dashboard/calendar",
    icon: Calendar,
  },
];
