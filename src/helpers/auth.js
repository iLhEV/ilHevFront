import { LOCAL_STORAGE_TOKEN_FIELD } from "@/settings/auth";

export const isAuth = () => {
  return localStorage.getItem(LOCAL_STORAGE_TOKEN_FIELD);
};
