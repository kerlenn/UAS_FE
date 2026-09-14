import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

function getDatabaseUrl(): string {
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith('file:')) {
    return process.env.DATABASE_URL;
  }

  // When running in Vercel / serverless environment
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const tmpDbPath = '/tmp/dev.db';

    if (!fs.existsSync(tmpDbPath)) {
      const sourceDbPath = path.join(process.cwd(), 'prisma', 'dev.db');
      if (fs.existsSync(sourceDbPath)) {
        try {
          fs.copyFileSync(sourceDbPath, tmpDbPath);
          fs.chmodSync(tmpDbPath, 0o666);
        } catch (err) {
          console.error('Failed to copy db to /tmp:', err);
        }
      }
    }

    const url = `file:${tmpDbPath}`;
    process.env.DATABASE_URL = url;
    return url;
  }

  // Local development
  const localUrl = process.env.DATABASE_URL || `file:${path.resolve(process.cwd(), 'prisma/dev.db')}`;
  process.env.DATABASE_URL = localUrl;
  return localUrl;
}

const dbUrl = getDatabaseUrl();

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: ['error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;