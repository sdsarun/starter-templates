import z from 'zod';

export const ConfigurationSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(4000),
  HOST: z.string().default('0.0.0.0'),
});

export type Configuration = z.infer<typeof ConfigurationSchema>;

export function validateConfiguration(
  input: Record<string, any>,
): Record<string, any> {
  const parsed = ConfigurationSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }
  return parsed.data;
}
