import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

//read products
export async function GET(req) {
  try {
    const headerList = headers();
    const userId = headerList.get("id");
    const { searchParams } = new URL(req.url);
    const product_id = searchParams.get("product_id");

    const prisma = new PrismaClient({ log: ["warn", "error"] });
    const result = await prisma.product_meta.findMany({
      where: { productId: parseInt(product_id), userId: parseInt(userId) },
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
export async function POST(req, res) {
  try {
    const headerList = headers();
    const userId = headerList.get("id");

    const reqBody = await req.json();
    reqBody.userId = parseInt(userId);

    const prisma = new PrismaClient({ log: ["warn", "error"] });
    const result = await prisma.product_meta.create({ data: reqBody });
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
    const prisma = new PrismaClient({ log: ["warn", "error"] });
    const result = await prisma.product_meta.update({
      where: { productId: parseInt(product_id), userId: parseInt(userId) },
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
    const result = await prisma.product_meta.delete({
      where: { productId: parseInt(product_id), userId: parseInt(userId) },
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
