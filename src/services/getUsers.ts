import { PrismaClient } from "@prisma/client";


 export class GetUsers {
 prisma: PrismaClient 
 
 constructor() {
  this.prisma = new PrismaClient();
 }

  async execute() {
    const users = await this.prisma.user.findMany();
    return users
  }
 }

 