import { type NextRequest, NextResponse } from "next/server";

import { updateSession } from "@/lib/supabase/middleware";

import { createServerClient } from "@supabase/ssr";

export async function middleware(
  request: NextRequest
) {

  let response =
    await updateSession(request);

  const supabase =
    createServerClient(

      process.env.NEXT_PUBLIC_SUPABASE_URL!,

      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

      {

        cookies: {

          getAll() {

            return request.cookies.getAll();

          },

          setAll(cookiesToSet) {

            cookiesToSet.forEach(

              ({
                name,
                value,
              }) =>

                request.cookies.set(
                  name,
                  value
                )

            );

            cookiesToSet.forEach(

              ({
                name,
                value,
                options,
              }) =>

                response.cookies.set(

                  name,

                  value,

                  options

                )

            );

          },

        },

      }

    );

  const {

    data: { user },

  } = await supabase.auth.getUser();

  const pathname =
    request.nextUrl.pathname;

  const isLoginPage =
    pathname === "/login";

  const isAdminRoute =
    pathname.startsWith("/admin");

  /*
   * Not logged in
   */

  if (
    !user &&
    isAdminRoute
  ) {

    return NextResponse.redirect(

      new URL(
        "/login",
        request.url
      )

    );

  }

  /*
   * Already logged in
   */

  if (
    user &&
    isLoginPage
  ) {

    return NextResponse.redirect(

      new URL(
        "/admin",
        request.url
      )

    );

  }

  return response;

}

export const config = {

  matcher: [

    "/((?!_next/static|_next/image|favicon.ico).*)",

  ],

};