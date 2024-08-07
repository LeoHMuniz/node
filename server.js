import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "./database-postgres.js"

const server = fastify()

//POST = http://localhost/3333/videos
//PUT = http://localhost/3333/videos/3

// const database = new DatabaseMemory()

const database = new DatabasePostgres()

// Request Body



server.post('/videos', async (request, reply) => {

    const { title, description, duration } = request.body


    await database.create(
        {
            title,
            description,
            duration,
        })

    return reply.status(201).send()
})

server.get('/videos', async (request) => {
    const search = request.query.search
    const videos = await database.list(search)

    console.log(search)
    console.log('Acho que ta indo')
    return videos
})

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body

    await database.update(videoId, {
        title,
        description,
        duration
    })

    return reply.status(204).send
})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)


    console.log('deletado')
    return reply.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333,
})