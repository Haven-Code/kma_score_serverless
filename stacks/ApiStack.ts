import { StackContext, Api } from 'sst/constructs';
import { prismaLayer } from './layers';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';

export function API(stackContext: StackContext) {
  const { app, stack } = stackContext;
  const layers = [prismaLayer(stackContext)];

  const api = new Api(stack, 'api', {
    defaults: {
      function: {
        environment: {
          DB_URL: process.env.DB_URL ?? '',
          SCHEDULE_PROTO_URL: process.env.SCHEDULE_PROTO_URL ?? '',
        },
        runtime: 'nodejs18.x',
        nodejs: {
          // This is required for Prisma to work
          esbuild: {
            external: ['@prisma/client', '.prisma'],
          },
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        layers: layers,
      },
    },
    routes: {
      'GET /student/{id}':
        'packages/functions/src/student/getAllStudentWithScore.handler',
      'GET /': 'packages/functions/src/root/helloWorld.handler',
      'GET /schedule/semester':
        'packages/functions/src/schedule/getSemester.handler',
      'POST /schedule/{studentCode}':
        'packages/functions/src/schedule/getStudentSchedule.handler',
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    customDomain: app.local
      ? undefined
      : {
          domainName: 'alphascore.dqtio.com',
          isExternalDomain: true,
          cdk: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            certificate: Certificate.fromCertificateArn(
              stack,
              'score_api_certificate',
              process.env.CERTIFICATE_ARN ?? '',
            ),
          },
        },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
