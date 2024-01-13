import { middleware } from '../middleware';
import { APIGatewayProxyResult } from 'aws-lambda';
import { container } from '@kma-score-serverless/core/container';

export const handler = middleware().handler(
  async (): Promise<APIGatewayProxyResult> => {
    const { scheduleService } = container;
    const semesters = await scheduleService.getSemester();

    return {
      statusCode: 200,
      body: JSON.stringify({
        semesters,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  },
);
