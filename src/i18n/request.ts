import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => ({
  // English is the only active locale; existing URLs stay unchanged.
  locale: "en",
  messages: (await import("../../messages/en.json")).default,
}));
