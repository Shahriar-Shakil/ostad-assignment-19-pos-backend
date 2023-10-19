import { SendEmail } from "@/app/utility/EmailUtility";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
// send otp
export async function GET(req, res) {
  try {
    //getting Query params value
    let { searchParams } = new URL(req.url);
    let email = searchParams.get("email");

    //user count
    const prisma = new PrismaClient();
    const count = await prisma.users.count({ where: { email } });

    if (count === 1) {
      let code = Math.floor(1000 + Math.random() * 9000);
      const result = await prisma.users.update({
        where: { email: email },
        data: { otp: code.toString() },
      });
      // Send Email
      // let EmailText = `Your Code Is ${code}`;
      // let EmailSubject = "Inventory Verification Email";
      // await SendEmail(email, EmailText, EmailSubject);

      return NextResponse.json({
        status: "success",
        data: `4 Digit code is ${code}. The OTP will be active for 3 minute`,
      });
    } else {
      return NextResponse.json({ status: "fail", data: "No user found" });
    }
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
//verify otp
export async function POST(req, res) {
  try {
    const reqBody = await req.json();
    const prisma = new PrismaClient();
    const result = await prisma.users.findUnique({ where: reqBody });

    if (result) {
      const currentTime = new Date();
      const timeElapsed = currentTime - new Date(result.updatedAt);
      if (timeElapsed < 3 * 60 * 1000) {
        return NextResponse.json({ status: "success", data: "valid code" });
      } else {
        return NextResponse.json({
          status: "fail",
          data: "OTP time is up. Try again",
        });
      }
    } else {
      return NextResponse.json({ status: "fail", data: "Invalid Code" });
    }
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
//reset
