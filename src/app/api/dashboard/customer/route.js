import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const headerList = headers();
    const userId = headerList.get("id");
    const prisma = new PrismaClient();
    const result = await prisma.customers.findMany({
      where: { user_id: parseInt(userId) },
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
    const prisma = new PrismaClient();
    const result = await prisma.customers.create({ data: reqBody });
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
    const customerId = searchParams.get("cus_id");

    const reqBody = await req.json();

    const prisma = new PrismaClient();
    const result = await prisma.customers.update({
      where: { id: parseInt(customerId), user_id: parseInt(userId) },
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
    const customerId = searchParams.get("cus_id");

    const prisma = new PrismaClient();
    const result = await prisma.customers.delete({
      where: { id: parseInt(customerId), user_id: parseInt(userId) },
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}

// single customer
export async function PATCH(req, res) {
  try {
    const headerList = headers();
    const userId = headerList.get("id");

    const { searchParams } = new URL(req.url);
    const cusId = searchParams.get("cus_id");

    const prisma = new PrismaClient({ log: ["error"] });
    const result = await prisma.customers.findUnique({
      where: { id: parseInt(cusId), user_id: parseInt(userId) },
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
