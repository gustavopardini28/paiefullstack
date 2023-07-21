import { PrismaClient } from "@prisma/client";

interface UserProps {
  name: string,
  age: number
}

export class CreateUser {
   private prisma:PrismaClient
  
   constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(user : UserProps) {
    await this.prisma.user.create({
      data: {
        name: user.name,
        age: user.age
      },
    })
  }
}