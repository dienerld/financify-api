export const redisConst = {
  userSession: 'user-session',
  type: 'type',
} as const;

const values = Object.values(redisConst);
// keys should redisConst values concat with string
export type KeysRedis = `${(typeof values)[number]}-${string}`;
