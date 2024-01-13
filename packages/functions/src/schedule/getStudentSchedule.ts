import { middleware } from '../middleware';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { container } from '@kma-score-serverless/core/container';

type GetScheduleByStudentCodePathParameters = {
  studentCode: string;
};

type GetScheduleByStudentCodeBody = {
  semesterHash: string;
};

export const handler = middleware().handler(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const param =
      event.pathParameters as GetScheduleByStudentCodePathParameters | null;
    const body = event.body as GetScheduleByStudentCodeBody | null;

    if (!param || !body) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Bad request',
        }),
      };
    }

    const { scheduleService } = container;

    const scheduleData = await scheduleService.getStudentScheduleByStudentCode({
      studentCode: param.studentCode,
      semesterHash: body.semesterHash,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        studentInfo: scheduleData.studentInfo,
        studentSchedule: scheduleData.studentSchedule,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  },
);
