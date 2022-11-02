import Fastify from 'Fastify'
import cors from '@fastify/cors'
import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query'],
})

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true,
  })

  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count()
    return { count }
  })

  await fastify.listen({ port: 3001 })
  // await fastify.listen({ port: 3001, host: '0.0.0.0' })
}

bootstrap()