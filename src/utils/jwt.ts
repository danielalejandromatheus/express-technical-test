export const getExpiration = (expiresAt: string | number) => {
  const now = Math.floor(Date.now() / 1000); // seconds

  if (typeof expiresAt === 'string') {
    const ms = require('ms');
    return now + Math.floor(ms(expiresAt) / 1000);
  }

  return now + expiresAt;
};
