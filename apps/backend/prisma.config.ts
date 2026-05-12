/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

const POSTGRES_PROTOCOLS = new Set(['postgres:', 'postgresql:']);
const NEON_POOLER_SEGMENT = '-pooler';

function resolvePrismaDatasourceUrl({
  databaseUrl,
  prismaDatabaseUrl,
}: {
  databaseUrl: string;
  prismaDatabaseUrl?: string | null | undefined;
}): string {
  const explicitPrismaDatabaseUrl = prismaDatabaseUrl?.trim();

  if (explicitPrismaDatabaseUrl) {
    return explicitPrismaDatabaseUrl;
  }

  try {
    const datasourceUrl = new URL(databaseUrl);
    if (!POSTGRES_PROTOCOLS.has(datasourceUrl.protocol)) {
      return databaseUrl;
    }
    if (!datasourceUrl.hostname.includes(NEON_POOLER_SEGMENT)) {
      return databaseUrl;
    }
    datasourceUrl.hostname = datasourceUrl.hostname.replace(
      NEON_POOLER_SEGMENT,
      '',
    );
    return datasourceUrl.toString();
  } catch {
    return databaseUrl;
  }
}

const prismaDatasourceUrl = resolvePrismaDatasourceUrl({
  databaseUrl: env('DATABASE_URL'),
  prismaDatabaseUrl:
    process.env.PRISMA_DATABASE_URL ?? process.env.DIRECT_DATABASE_URL,
});

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'bun run seed',
  },
  datasource: {
    url: prismaDatasourceUrl,
  },
});
