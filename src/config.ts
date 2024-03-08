import { Pathnames } from "next-intl/navigation";

export const locales = ["en", "np"] as const;

export const pathnames = {
  "/": "/",
  "/auth": "/auth",
  "/login": "/login",
  "/discussed": "/discussed",
  "/post": "/post",
  "/upvote": "upvote",
  "/[username]": "/[username]",
  "/bookmarks": "/bookmarks",
  "/choose-category": "/choose-category",
  "/feed": "/feed",
  "/search": "/search",
  "/user-info": "/user-info",
  "/user-info/post": "/user-info/post",
  "/user-info/share-link": "/user-info/share-link",
  "/feed/post": "/feed/post",
  "/feed/post/[id]": "/feed/post/[id]",
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = "always";

export type AppPathnames = keyof typeof pathnames;
