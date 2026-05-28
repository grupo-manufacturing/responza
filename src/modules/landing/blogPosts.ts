export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  content: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-responza-unifies-whatsapp-instagram-indiamart',
    title: 'How Responza Unifies WhatsApp, Instagram, and IndiaMART for Faster Sales',
    excerpt:
      'A practical breakdown of how Responza helps growing teams reduce missed leads and reply faster from one unified inbox.',
    category: 'Product',
    readTime: '6 min read',
    date: 'May 28, 2026',
    content: [
      'Most growing teams lose leads for one simple reason: conversations are scattered across too many channels. One buyer asks on WhatsApp, another follows up on Instagram, and an enquiry arrives from IndiaMART. Without one shared view, context gets lost and replies get delayed.',
      'Responza solves this by combining all channel conversations into a single inbox. Your team can see the entire conversation history in one thread, regardless of where the customer first reached out. This removes duplicate replies, lowers handoff friction, and keeps communication consistent.',
      'The biggest win is response speed. With everything in one place, sales and support teams can prioritize active leads quickly, assign ownership clearly, and move deals forward without switching tabs all day.',
      'For Indian D2C and manufacturing teams, this translates into better close rates, better customer experience, and fewer dropped opportunities. Unified conversations are not just cleaner operations; they directly impact revenue.',
    ],
  },
  {
    slug: 'responza-ai-replies-for-small-teams',
    title: 'Using Responza AI Replies to Scale Customer Conversations with a Small Team',
    excerpt:
      'Learn how small teams can maintain high response quality while handling higher message volume using AI-assisted replies in Responza.',
    category: 'AI',
    readTime: '5 min read',
    date: 'May 28, 2026',
    content: [
      'As message volume grows, small teams face a quality problem: either respond fast with inconsistent answers, or respond carefully but too slowly. Responza AI Replies are designed to help teams do both well.',
      'AI-generated drafts are built from the live conversation context, so agents start with a relevant response instead of writing from scratch. Teams can review, edit, and send quickly while keeping brand tone and policy alignment intact.',
      'This reduces repetitive typing and allows agents to focus on edge cases, escalations, and high-intent buyers. For managers, it improves consistency across shifts and lowers training time for new team members.',
      'The result is simple: faster first response, steadier quality, and more capacity without immediately expanding headcount. AI works best when humans stay in control, and Responza is built around that model.',
    ],
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}
