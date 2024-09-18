import { Inbox, Calendar, CalendarDays, Grid2X2 } from "lucide-react";

export const primaryItems = [
  {
    _id: "1",
    href: "/loggedin",
    navicon: Inbox,
    label: "Inbox",
  },
  {
    _id: "2",
    href: "/loggedin/today",
    navicon: Calendar,
    label: "Today",
  },
  {
    _id: "3",
    href: "/loggedin/upcoming",
    navicon: CalendarDays,
    label: "Upcoming",
  },
  {
    _id: "4",
    href: "/loggedin/filter-labels",
    navicon: Grid2X2,
    label: "Filter & Labels",
  },
];
