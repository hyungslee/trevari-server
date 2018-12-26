import { getModels } from '../models';
import { Request, Response } from 'express';
export const getController = async (request: Request, response:Response) => {
  const data = await getModels(request.user);
  //response.send(data);
    response.send('Hello World!')
};
