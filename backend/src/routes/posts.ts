import type { FastifyInstance } from 'fastify'
import { prisma } from '../db.js'
import { handlePrismaError } from '../lib/prismaError.js'
import { type User, toPublicUser } from '../models/user.js'
import type { Comment, CommentWithAuthor } from '../models/comment.js'
import {
  type CreatePostInput,
  type UpdatePostInput,
  type Post,
  type PostWithRelations,
} from '../models/post.js'

const WITH_RELATIONS = {
  include: {
    author: true,
    comments: {
      include: { author: true },
      orderBy: { createdAt: 'desc' },
    },
  },
} as const

type CommentRow = Comment & { author: User }
type PostRow = Post & { author: User; comments: CommentRow[] }

function toPostWithRelations(post: PostRow): PostWithRelations {
  return {
    id: post.id,
    authorId: post.authorId,
    title: post.title,
    content: post.content,
    createdAt: post.createdAt,
    author: toPublicUser(post.author),
    comments: post.comments.map(
      (c): CommentWithAuthor => ({
        id: c.id,
        postId: c.postId,
        authorId: c.authorId,
        content: c.content,
        createdAt: c.createdAt,
        author: toPublicUser(c.author),
      }),
    ),
  }
}

function parseId(raw: string): number | null {
  const id = Number(raw)
  return Number.isInteger(id) && id > 0 ? id : null
}

export async function postsRoutes(app: FastifyInstance) {
  app.post<{ Body: CreatePostInput }>('/', async (request, reply) => {
    const { authorId, title, content } = request.body ?? {}

    if (!authorId || !title || !content) {
      return reply.status(400).send({ error: 'Missing required fields' })
    }

    try {
      const post: Post = await prisma.post.create({
        data: { authorId, title, content },
      })

      return reply.status(201).send(post)
    } catch (err) {
      if (handlePrismaError(err, reply)) return
      throw err
    }
  })

  app.get<{ Querystring: { authorId?: string } }>(
    '/',
    async (request): Promise<PostWithRelations[]> => {
      const authorIdRaw = request.query.authorId
      const authorId = authorIdRaw ? Number(authorIdRaw) : undefined

      const posts = await prisma.post.findMany({
        where: authorId ? { authorId } : undefined,
        orderBy: { createdAt: 'desc' },
        ...WITH_RELATIONS,
      })

      return posts.map(toPostWithRelations)
    },
  )

  app.get<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const id = parseId(request.params.id)
    if (id === null) return reply.status(400).send({ error: 'Invalid id' })

    const post = await prisma.post.findUnique({
      where: { id },
      ...WITH_RELATIONS,
    })
    if (!post) return reply.status(404).send({ error: 'Not found' })

    return toPostWithRelations(post)
  })

  app.patch<{ Params: { id: string }; Body: UpdatePostInput }>(
    '/:id',
    async (request, reply) => {
      const id = parseId(request.params.id)
      if (id === null) return reply.status(400).send({ error: 'Invalid id' })

      const body = request.body ?? {}

      try {
        const post: Post = await prisma.post.update({
          where: { id },
          data: {
            ...(body.title !== undefined && { title: body.title }),
            ...(body.content !== undefined && { content: body.content }),
          },
        })

        return post
      } catch (err) {
        if (handlePrismaError(err, reply)) return
        throw err
      }
    },
  )

  app.delete<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const id = parseId(request.params.id)
    if (id === null) return reply.status(400).send({ error: 'Invalid id' })

    try {
      await prisma.post.delete({ where: { id } })
      return reply.status(204).send()
    } catch (err) {
      if (handlePrismaError(err, reply)) return
      throw err
    }
  })
}
