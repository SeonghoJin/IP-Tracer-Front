export type ApiHealth = {
  apiName: string;
  status: number;
};

export const isApiHealth = (obj: any): obj is ApiHealth => {
  if (!obj) {
    return false;
  }

  if (typeof obj.apiName !== "string") {
    return false;
  }

  if (typeof obj.status !== "number") {
    return false;
  }

  return true;
};

export const isApiHealths = (obj: any): obj is ApiHealth[] => {
  if (!Array.isArray(obj)) {
    return false;
  }

  for (const apiHealth of obj) {
    if (!isApiHealth(apiHealth)) {
      return false;
    }
  }
  return true;
};
