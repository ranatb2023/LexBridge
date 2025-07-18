import {
  LuLayoutDashboard,
  LuUser,
  LuClipboardCheck,
  LuSquarePlus,
  LuLogOut,
  LuFileText,
  LuFilePlus,
  LuCreditCard,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    id: "02",
    label: "Users",
    icon: LuUser,
    path: "/admin/users",
  },
  {
    id: "03",
    label: "Case Dashboard",
    icon: LuFileText,
    path: "/admin/cases",
  },
  {
    id: "04",
    label: "Case Requirements",
    icon: LuClipboardCheck,
    path: "/admin/case-requirements",
  },
  {
    id: "05",
    label: "Logout",
    icon: LuLogOut,
    path: "logout",
  },
];

export const SIDE_MENU_USER_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/user/dashboard",
  },
  {
    id: "02",
    label: "Generate Case",
    icon: LuFilePlus,
    path: "/user/generate-case",
  },
  {
    id: "03",
    label: "My Cases",
    icon: LuFileText,
    path: "/user/cases",
  },
  {
    id: "04",
    label: "Billing",
    icon: LuCreditCard,
    path: "/user/billing",
  },
  {
    id: "05",
    label: "Logout",
    icon: LuLogOut,
    path: "logout",
  },
];
