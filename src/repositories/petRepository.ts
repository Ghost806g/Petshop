import prisma from "@/lib/prisma";
import { z } from "zod";

// Zod DTO para Cadastrar/Editar Pet
export const PetSchema = z.object({
  name: z.string().min(2, "O nome precisa ter pelo menos 2 letras."),
  breed: z.string().optional(),
  age: z.string().optional(),
  allergies: z.string().optional(),
  description: z.string().optional(),
  preferences: z.string().optional(),
});

export type PetDTO = z.infer<typeof PetSchema>;

export const PetRepository = {
  // Retorna todos os pets de um dono
  async getPetsByOwner(userId: string) {
    return await prisma.pet.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' }
    });
  },

  // Cadastra um novo pet (com validação Zod blindada)
  async createPet(userId: string, data: PetDTO) {
    const validData = PetSchema.parse(data);
    
    return await prisma.pet.create({
      data: {
        ownerId: userId,
        name: validData.name,
        breed: validData.breed,
        age: validData.age,
        allergies: validData.allergies,
        description: validData.description,
        preferences: validData.preferences
      }
    });
  }
};
