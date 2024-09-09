import { Inbox, Calendar, CalendarDays, Grid2X2 } from "lucide-react";

export const primaryItems = [
  {
    _id: "1",
    href: "/loggedin",
    icon: Inbox,
    label: "Inbox",
  },
  {
    _id: "2",
    href: "/loggedin/today",
    icon: Calendar,
    label: "Today",
  },
  {
    _id: "3",
    href: "/loggedin/upcoming",
    icon: CalendarDays,
    label: "Upcoming",
  },
  {
    _id: "4",
    href: "/loggedin/filter-labels",
    icon: Grid2X2,
    label: "Filter & Labels",
  },
];
