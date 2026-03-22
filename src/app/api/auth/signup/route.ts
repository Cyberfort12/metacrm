import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, workspace } = await req.json();

    if (!name || !email || !password || !workspace) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await prisma.user.findFirst({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Create workspace
    const newWorkspace = await prisma.workspace.create({
      data: {
        name: workspace,
        slug: workspace.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
      },
    });

    // Create default pipeline stages
    const stages = [
      { name: "New Lead", position: 0, color: "#6366F1" },
      { name: "Viewing Booked", position: 1, color: "#25D366" },
      { name: "Negotiating", position: 2, color: "#F59E0B" },
      { name: "Offer Made", position: 3, color: "#EC4899" },
      { name: "Won", position: 4, color: "#25D366", isWon: true },
      { name: "Lost", position: 5, color: "#EF4444", isLost: true },
    ];

    await prisma.stage.createMany({
      data: stages.map((s) => ({ ...s, workspaceId: newWorkspace.id })),
    });

    // Hash password and create user
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "OWNER",
        workspaceId: newWorkspace.id,
      },
    });

    return NextResponse.json({
      success: true,
      userId: user.id,
      workspaceId: newWorkspace.id,
    });

  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

