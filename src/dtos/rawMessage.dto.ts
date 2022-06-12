export type RawMessageDto = string;

export const isRawMessage = (
  rawMessageDto: any
): rawMessageDto is RawMessageDto => {
  if (rawMessageDto == null) return false;
  return true;
};
