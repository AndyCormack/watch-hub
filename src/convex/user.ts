import { query } from '$/convex/_generated/server'
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
