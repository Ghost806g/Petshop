import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { name, breed, age, allergies, description, preferences } = body;

    if (!name) {
      return NextResponse.json({ error: "Nome do pet é obrigatório" }, { status: 400 });
    }

    const pet = await prisma.pet.create({
      data: {
        name,
        breed,
        age,
        allergies,
        description,
        preferences,
        ownerId: session.user.id,
      },
    });

    return NextResponse.json(pet, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar pet:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
