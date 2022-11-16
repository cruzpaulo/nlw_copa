import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { poolRoutes } from './routes/pool'
import { userRoutes } from './routes/user'
import { authRoutes } from './routes/auth'
import { gameRoutes } from './routes/game'
import { guessRoutes } from './routes/guess'

async function bootstrap() {


  const secret = process.env["SECRET_JWT"]

  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true,
  })

  // em producao usar variavel .env
  await fastify.register(jwt, {
    secret: 'nlwcopa',
  })

  await fastify.register(authRoutes)
  await fastify.register(gameRoutes)
  await fastify.register(guessRoutes)
  await fastify.register(poolRoutes)
  await fastify.register(userRoutes)

  // await fastify.listen({ port: 3001 })
  await fastify.listen({ port: 3001, host: '0.0.0.0' })
}

bootstrap()