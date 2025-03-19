import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  user: defineTable({
    slug: v.string(),

    cover: v.optional(
      v.object({
        key: v.string(),
        traktUrl: v.string(),
      })
    ),
  }).index('by_slug', ['slug']),
})
