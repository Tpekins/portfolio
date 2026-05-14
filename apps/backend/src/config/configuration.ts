import { z } from 'zod/v4';

const appEnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(1),
  TOKEN_EXPIRES_IN: z.string().default('7d'),
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default(7000),
  GOOGLE_GENAI_API_KEY: z.string().optional(),
});

export type AppEnv = z.infer<typeof appEnvSchema>;

export function validateEnv(config: Record<string, unknown>): AppEnv {
  const result = appEnvSchema.safeParse(config);
  if (!result.success) {
    console.error(
      'Environment variable validation failed:',
      result.error.format(),
    );
    throw new Error('Invalid environment variables');
  }
  return result.data;
}
