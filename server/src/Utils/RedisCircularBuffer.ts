import { client } from "../Common/GetRedisConnection";

export const addToRedisCircularBuffer = (
  key: string,
  value: string,
  bufferSize: number
): void => {
  client?.rpush(key, value, async (error, _result) => {
    if (error) {
      console.error("Error adding to circular buffer:", error);
      return;
    }

    const listLength = await client?.llen(key);
    if (listLength && listLength > bufferSize)
      // Trim the list to the desired size
      client?.lpop(key, (trimError) => {
        if (trimError) {
          console.error("Error trimming circular buffer:", trimError);
        }
      });
  });
};
