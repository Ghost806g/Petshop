import prisma from "@/lib/prisma";
import { z } from "zod";

// DTO (Data Transfer Object) - A nossa blindagem Zod!
export const CreateBookingSchema = z.object({
  serviceName: z.string().min(2, "O nome do serviço precisa ter pelo menos 2 letras."),
  servicePrice: z.number().positive("O preço do serviço deve ser maior que zero."),
  petName: z.string().min(1, "O nome do Pet é obrigatório!"),
  date: z.date(),
  notes: z.string().optional(),
});

export type CreateBookingDTO = z.infer<typeof CreateBookingSchema>;

// O Repositório cuida apenas das regras e de falar com o Banco de Dados (Isolamento total!)
export const BookingRepository = {
  
  async createBooking(userId: string, data: CreateBookingDTO) {
    // 1. Validação Blindada (Passa pela peneira do Zod)
    const validatedData = CreateBookingSchema.parse(data);

    // 2. Busca ou Cria o Serviço dinamicamente
    let service = await prisma.service.findFirst({ where: { name: validatedData.serviceName } });
    if (!service) {
      service = await prisma.service.create({ 
        data: { name: validatedData.serviceName, price: validatedData.servicePrice, description: "Serviço Automático" } 
      });
    }

    // 3. Salva no banco de forma segura
    return await prisma.booking.create({
      data: {
        userId: userId,
        serviceId: service.id,
        petName: validatedData.petName,
        date: validatedData.date,
        notes: validatedData.notes
      }
    });
  },

  // Busca os agendamentos futuros do dono, já trazendo as informações do Serviço junto (Join)
  async getUpcomingBookings(userId: string) {
    return await prisma.booking.findMany({
      where: { 
        userId: userId,
        date: { gte: new Date() } // Somente agendamentos de hoje para frente
      },
      orderBy: { date: 'asc' },
      include: {
        service: true, // Inclui a tabela de serviços (Pra saber nome e preço)
        user: true,    // Inclui a tabela do dono
      }
    });
  }
};
