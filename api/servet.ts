import { prisma } from "../lib/prisma";
import Fastify from "fastify";
import Cors from '@fastify/cors'
import { randomUUID } from "crypto";
import { z } from "zod";

async function start() {
     const fastify = Fastify({
        logger: true,
        
    })

    await fastify.register(Cors, {
        origin: true,
    })

    fastify.post('/newProduct', async (response, reply) => {

        const produto = z.object({
            Nome: z.string(),
            preco: z.number()
        })

        const {Nome, preco} = produto.parse(response.body)

        await prisma.produto.create({
            data: {
                id: randomUUID(),
                Nome,
                preco
            }
        })

        return reply.status(201).send()
    })

    fastify.get('/produtos', async () => {
        const produtos = await prisma.produto.findMany()

        return {produtos}
    })

    await fastify.listen({port: 3000})
}

start()