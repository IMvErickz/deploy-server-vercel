import { prisma } from "../lib/prisma";

async function Main() {
    await prisma.produto.create({
        data: {
            Nome: "Camisa",
            preco: 39
        }
    })
}

Main()