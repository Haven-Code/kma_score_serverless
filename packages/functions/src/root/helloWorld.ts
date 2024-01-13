import { APIGatewayProxyResult } from 'aws-lambda';
import { middleware } from '../middleware';

export const handler = middleware().handler(
  async (): Promise<APIGatewayProxyResult> => {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Hello world',
      }),
    };
  },
);
