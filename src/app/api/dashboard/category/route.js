import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { PrismaClient } from "@prisma/client";

// Category List Select
export async function GET() {
  try {
    let headerList = headers();
    let email = headerList.get("email");
    let id = headerList.get("id");

    const prisma = new PrismaClient({ log: ["warn", "error"] });
    const result = await prisma.categories.findMany({
      where: { user_id: parseInt(id) },
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
//Create Category
export async function POST(req, res) {
  try {
    const headerList = headers();
    const userId = headerList.get("id");
    console.log(userId);
    const prisma = new PrismaClient({ log: ["error"] });
    const reqBody = await req.json();
    reqBody.user_id = parseInt(userId);
    const result = await prisma.categories.create({ data: reqBody });
    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}

export async function PUT(req, res) {
  try {
    const headerList = headers();
    const userId = headerList.get("id");
    const { searchParams } = new URL(req.url);
    const catId = searchParams.get("cat_id");
    const reqBody = await req.json();
    const prisma = new PrismaClient({ log: ["error"] });
    const result = await prisma.categories.update({
      where: { id: parseInt(catId), user_id: parseInt(userId) },
      data: { ...reqBody },
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}

export async function DELETE(req, res) {
  try {
    const headerList = headers();
    const userId = headerList.get("id");
    const { searchParams } = new URL(req.url);
    const catId = searchParams.get("cat_id");
    const prisma = new PrismaClient({ log: ["error"] });
    const result = await prisma.categories.delete({
      where: { id: parseInt(catId), user_id: parseInt(userId) },
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}

// single category
export async function PATCH(req, res) {
  try {
    const headerList = headers();
    const userId = headerList.get("id");
    const { searchParams } = new URL(req.url);
    const catId = searchParams.get("cat_id");
    const prisma = new PrismaClient({ log: ["error"] });
    const result = await prisma.categories.findUnique({
      where: { id: parseInt(catId), user_id: parseInt(userId) },
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
