# TULIP
## Trusted Unified Legal Intake Portal

TULIP (Trusted Unified Legal Intake Portal) is a web application created in partnership between OSS and the SLU School of Law Clinic Program. It is a digital intake portal for all clinics within the program to replace the current paper-based intake system. Case-assignment workflows are standardized through this tool for more efficient document management.

## Installation

### 1. Install [node.js](https://nodejs.org/en/download/current)

### 2. Install [Postgres](https://www.postgresql.org/download/) (or have access to a connection string) and start local server

### 3. Clone the repository

```bash
git clone https://github.com/oss-slu/tulip.git
```
### 4. Set up environment variables

```bash
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/YOUR_DATABASE_NAME" (start a local postgres server and put that here)
```

### 5. Install dependencies

```bash
cd tulip
npm install
```

```bash
cd app
npm install
```

```bash
cd api
npm install
```

### 6. Start the development server

```bash
cd api
npm run dev
```

### 7. Start the react app

```bash
cd app
npm run dev
```

### 8. Open your browser to `http://localhost:5173` to view the app

### 9. Migrate prisma database with local postgres server.

Install Prisma Client
```bash
npm install prisma --save-dev
npm install @prisma/client @prisma/adapter-pg pg
```

Generate Prisma Client
```bash
npx prisma generate
```

Apply migrations
```bash
npx prisma migrate dev
```

### 10. If you need to access the database (not necessary for initial setup), open Prisma Studio

Run the following in your terminal (Command Prompt for Windows) to open the database
```bash
npx prisma studio
```
