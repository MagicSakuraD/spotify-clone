import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";


let headers = { "accept-language": "en-US,en;q=0.5,zh-CN;q=0.3" };
let languages = new Negotiator({ headers }).languages();
let locales = ["en-US", "zh-CN", "zh"];
let defaultLocale = "en-US";

match(languages, locales, defaultLocale); // -> 'en-US'

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|/|/search|/code|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
