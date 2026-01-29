import { compare, genSalt, hash } from "bcryptjs";

const SALT_ROUND = 10;

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(SALT_ROUND);
  return await hash(password, salt);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await compare(password, hash);
};

export const paginate = <T>(data: T[], count: number, page?: string, limit?: string) => {
  const pageInt = page ? parseInt(page, 10) : 1;
  const perPageInt = limit ? parseInt(limit, 10) : 10;
  const total = count;
  const pagination = {
    total,
    page: pageInt,
    limit: perPageInt,
    totalPage: Math.ceil(total / perPageInt),
  };

  return { data, pagination };
};

export function cleanJSON<T extends { _id: unknown; __v?: unknown }>(doc: T) {
  const { _id, __v, ...rest } = doc;
  return { id: _id, ...rest };
}
