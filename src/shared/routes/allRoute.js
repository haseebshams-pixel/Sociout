import Home from "../../pages/home";
import Feed from "../../pages/feed";
import Profile from "../../pages/profile";
import Search from "../../pages/search";
import Jobs from "../../pages/jobs";
import Chat from "../../pages/chat";

let allPublicRoute = [
  {
    path: "/",
    component: Home,
    name: "Home",
  },
  {
    path: "/feed",
    component: Feed,
    name: "Feeds",
  },
];
let logedInRoute = [
  {
    path: "/feed",
    component: Feed,
    name: "Feeds",
  },
  {
    path: "/jobs",
    component: Jobs,
    name: "Jobs",
  },
  {
    path: "/profile/:id",
    component: Profile,
    name: "Profile",
  },
  {
    path: "/search",
    component: Search,
    name: "Search",
  },
  {
    path: "/chat",
    component: Chat,
    name: "Chat",
  },
];
export { allPublicRoute, logedInRoute };
