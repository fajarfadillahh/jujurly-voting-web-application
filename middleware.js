import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default async function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // check login first
    if (!request.cookies.has("token")) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    try {
      const token = request.cookies.get("token");

      // verify jwt
      const verify = await jwtVerify(
        token.value,
        new TextEncoder().encode(process.env.JWT_SECRET_KEY),
      );

      const response = NextResponse.next();

      response.cookies.set("fullname", verify.payload.fullname);
      return response;
    } catch (error) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/rooms")) {
    // check login first
    if (!request.cookies.has("token")) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    try {
      const token = request.cookies.get("token");

      // verify jwt
      const verify = await jwtVerify(
        token.value,
        new TextEncoder().encode(process.env.JWT_SECRET_KEY),
      );

      const response = NextResponse.next();

      response.cookies.set("fullname", verify.payload.fullname);
      return response;
    } catch (error) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/auth")) {
    if (request.cookies.has("token")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }
}
