export const jsonToObject = (
  jsonString: string
):
  | {
      result: Record<string, any>;
      error: null;
    }
  | {
      result: null;
      error: unknown;
    } => {
  try {
    const object = JSON.parse(jsonString);
    return {
      result: object,
      error: null,
    };
  } catch (e) {
    return {
      result: null,
      error: e,
    };
  }
};
