import { NextResponse } from "next/server";
import { VerifyToken } from "./app/utility/JWTTokenHelper";

export async function middleware(req, res) {
  if (req.nextUrl.pathname.startsWith("/api/dashboard")) {
    try {
      let token = req.cookies.get("token");
      let payload = await VerifyToken(token["value"]);
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("email", payload["email"]);
      requestHeaders.set("id", payload["id"]);
      return NextResponse.next({ request: { headers: requestHeaders } });
    } catch (error) {
      return NextResponse.json(
        { status: "fail", data: "unauthorized" },
        { status: 401 }
      );
    }
  }
  if (req.nextUrl.pathname.startsWith("/api/user")) {
    return NextResponse.next();
  }
}
