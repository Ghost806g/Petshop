"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { BookingRepository } from "@/repositories/bookingRepository";

export async function agendarServico(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Você precisa estar logado!");

  // Busca quem é o dono pelo email da sessão
  const dono = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!dono) throw new Error("Usuário não encontrado.");

  try {
    // Montamos o "pacote de dados" (DTO) bruto vindo do formulário
    const rawData = {
      serviceName: formData.get("serviceName") as string,
      servicePrice: parseFloat(formData.get("servicePrice") as string),
      petName: formData.get("petName") as string,
      date: new Date(formData.get("date") as string),
      notes: formData.get("notes") as string || undefined,
    };

    // Repassamos a responsabilidade pesada para o Repositório
    await BookingRepository.createBooking(dono.id, rawData);

    return { sucesso: true };
  } catch (error: unknown) {
    console.error("Erro na validação blindada:", error);
    throw new Error((error as Error).message || "Falha na validação dos dados.");
  }
}
