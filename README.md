# Ritsa Rugs — Full-Stack E-Commerce

> Premium handcrafted rugs, delivered to your door.

## Monorepo Structure

```
/
├── client/    → React (Vite) frontend
├── server/    → Node.js + Express backend
├── .gitignore
└── README.md
```

## Tech Stack

| Layer    | Technology                               |
|----------|------------------------------------------|
| Frontend | React 18, Vite, Redux Toolkit, CSS Modules |
| Backend  | Node.js, Express.js, MongoDB, Mongoose   |
| API      | RESTful                                  |

## Getting Started

```bash
# Install dependencies
npm install          # root (if workspace scripts)
cd client && npm install
cd server && npm install

# Run development servers
npm run client       # starts Vite dev server
npm run server       # starts Express with nodemon
```

## Environment Variables

Copy `.env.example` → `.env` in both `client/` and `server/` and fill in your values.

## License

Private — All rights reserved.
