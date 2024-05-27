# Camille
A note-taking web application where you can think, write, and plan

![Screenshot](./public/marketing/app.png)

## Technologies
1. Next.js ( web framework base on React.js)
2. Tailwind ( utility-first CSS framework )
3. React Query ( managing and caching asynchronous data )
4. Zustand ( state-management )
5. Typescript ( statically checked types )
6. NextAuth.js ( authentication )
7. Stripe ( payment )
8. Prisma ( object-relational mapping )
9. MySQL ( relational database )

## Work In Progress
The app is being under maintenance, as more work needs to be done.

Current functionality includes:
- Sign in, Sign out, Email Verification, OAuth via GitHub, Google
- CURD workspace, teamspace, page
- Soft delete, undo delete, hard delete page
- Add to favorite, duplicate, share to web, copy link page
- Add, remove, change role member in workspace
- Quick open and search all pages by dialog 
- Redirecting user to previous workspace, page after login
- Upgrade plan for workspace via Stripe (Testing Mode)

## Known Bugs
Feel free to email me at hautran.job@outlook.com if you run into any issues or have questions, ideas or concerns. Please enjoy
and feel free to share your opinion, constructive criticism, or comments about my work. Thank you! 🙂

## Future Updates
- Improve overall UX/UI and fix bugs
- Nested page in page

And More ! There's always room for improvement!

## Installation
1. Copy .env.example to .env and update the variables

2. Sync schema prisma with your cloud database
```bash
npx prisma db push
```

3. Install deps:
```bash
pnpm install
```

4. Launch app
```bash
pnpm dev
```

## Deployed Version
<a href="https://camillee.vercel.app">Visit the live app</a>
