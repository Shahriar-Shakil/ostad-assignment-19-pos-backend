import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

//read products
export async function GET() {
  try {
    let headerList = headers();
    let id = headerList.get("id");

    const prisma = new PrismaClient({ log: ["warn", "error"] });
    const result = await prisma.products.findMany({
      where: { user_id: parseInt(id) },
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
//create
export async function POST(req, res) {
  try {
    const headerList = headers();
    const userId = headerList.get("id");
    const reqBody = await req.json();
    reqBody.user_id = parseInt(userId);
    const prisma = new PrismaClient({ log: ["warn", "error"] });
    const result = await prisma.products.create({ data: reqBody });
    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
//update

export async function PUT(req, res) {
  try {
    const headerList = headers();
    const userId = headerList.get("id");

    const { searchParams } = new URL(req.url);
    const product_id = searchParams.get("product_id");

    const reqBody = await req.json();

    const prisma = new PrismaClient({ log: ["error"] });
    const result = await prisma.products.update({
      where: { id: parseInt(product_id), user_id: parseInt(userId) },
      data: reqBody,
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}

//delete
export async function DELETE(req, res) {
  try {
    const headerList = headers();
    const userId = headerList.get("id");

    const { searchParams } = new URL(req.url);
    const product_id = searchParams.get("product_id");

    const prisma = new PrismaClient();
    const result = await prisma.products.delete({
      where: { id: parseInt(product_id), user_id: parseInt(userId) },
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
//single products
export async function PATCH(req, res) {
  try {
    const headerList = headers();
    const userId = headerList.get("id");

    const { searchParams } = new URL(req.url);
    const product_id = searchParams.get("product_id");

    const prisma = new PrismaClient();
    const result = await prisma.products.findUnique({
      where: { id: parseInt(product_id), user_id: parseInt(userId) },
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
