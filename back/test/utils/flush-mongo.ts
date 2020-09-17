import { Connection } from 'mongoose';

export const flushMongo = async (conn: Connection) => {
  for (const key in conn.collections) {
    const col = conn.collections[key];
    await col.deleteMany({});
  }
};
