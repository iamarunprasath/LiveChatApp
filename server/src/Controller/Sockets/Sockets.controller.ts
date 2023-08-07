import { Request, Response } from "express";
import { client } from "../../Common/GetRedisConnection";
import { MessageInterface } from "../../Interfaces/MessageInterface";
import { config } from "../../Common/Config";

const socketConnectionUrl = (req: Request, res: Response) => {
  const socketIoServerUrl = config.serverUrl; // Update with your Socket.IO server URL
  res.json({ socketIoServerUrl });
};

const getMessagesFromRedisList = async (req: Request, res: Response) => {
  try {
    const listKey = req.body?.listKey;

    const messages: MessageInterface[] = await new Promise(
      (resolve, reject) => {
        client?.lrange(listKey, 0, -1, (error, result) => {
          if (error) {
            console.error("Error retrieving list:", error);
            resolve([]); // Resolve with an empty array in case of error
          }

          const listArray =
            result?.map((item) => {
              return JSON.parse(item);
            }) || [];

          resolve(listArray);
        });
      }
    );

    return res.status(200).send({ messages });
  } catch (e: any) {
    console.error("Error in Getting Redis List Values", e.message);
  }
};

export { socketConnectionUrl, getMessagesFromRedisList };
