"use server"; 

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function cadastrarUsuario(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      return { erro: "Preencha todos os campos." };
    }

    const emailJaExiste = await prisma.user.findUnique({
      where: { email }
    });

    if (emailJaExiste) {
      return { erro: "Esse e-mail já está em uso." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    });

    return { sucesso: true };
  } catch (error: unknown) {
    console.error("Erro fatal no cadastro:", error);
    return { erro: "Ocorreu um erro interno no servidor." };
  }
}
