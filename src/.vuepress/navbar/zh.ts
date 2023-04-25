import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "博文",
    icon: "edit",
    prefix: "/posts/",
    children: [
      {
        text: "杂项",
        link: "sundry/",
      },
      {
        text:"vue相关",
        link:"Vue/"
      }
      
    ],
  },
]);
