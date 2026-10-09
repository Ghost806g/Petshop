"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getNotifications() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  return prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
}

export async function markAsRead(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return;

  await prisma.notification.update({
    where: { id, userId: session.user.id },
    data: { unread: false },
  });

  revalidatePath("/");
}

export async function markAllAsRead() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return;

  await prisma.notification.updateMany({
    where: { userId: session.user.id, unread: true },
    data: { unread: false },
  });

  revalidatePath("/");
}

// Para propósitos de teste:
export async function createWelcomeNotification() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return;

  await prisma.notification.create({
    data: {
      title: "🎉 Bem-vindo ao PetSitter Pro!",
      desc: "Você acabou de dar o primeiro passo para uma vida mais tranquila e feliz com seu pet.",
      userId: session.user.id,
      unread: true,
    }
  });

  revalidatePath("/");
}
