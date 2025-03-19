import { mutation, query } from '$/convex/_generated/server'
import { v } from 'convex/values'

export const get = query({
  args: { slug: v.string() },

  handler: async ({ db }, args) => {
    const user = await db
      .query('user')
      .withIndex('by_slug', (q) => q.eq('slug', args.slug))
      .unique()

    return user
  },
})

export const setCover = mutation({
  args: {
    slug: v.string(),
    key: v.string(),
    traktUrl: v.string(),
  },

  handler: async ({ db }, args) => {
    const user = await db
      .query('user')
      .withIndex('by_slug', (q) => q.eq('slug', args.slug))
      .unique()

    if (!user) {
      await db.insert('user', {
        slug: args.slug,
        cover: {
          key: args.key,
          traktUrl: args.traktUrl,
        },
      })
      return
    }

    await db.patch(user._id, {
      cover: {
        key: args.key,
        traktUrl: args.traktUrl,
      },
    })
  },
})
