import {
  IStudentScheduleService,
  ScheduleData,
} from '@application/ports/schedule';
import { credentials } from '@grpc/grpc-js';
import {
  GetScheduleByStudentCodeReq,
  KmaScheduleCrawlerServiceClient,
  SemesterData,
} from '../../../../../proto/schedule';
import { Service } from 'typedi';

@Service()
export class ScheduleService implements IStudentScheduleService {
  private grpcClient: KmaScheduleCrawlerServiceClient;

  constructor() {
    this.grpcClient = new KmaScheduleCrawlerServiceClient(
      process.env.SCHEDULE_SERVICE_URL ?? '',
      credentials.createInsecure(),
    );
  }

  getSemester(): Promise<SemesterData[]> {
    return new Promise((resolve, reject) => {
      this.grpcClient.getSemesterList({}, (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(res.semesterList);
        }
      });
    });
  }

  getStudentScheduleByStudentCode(
    param: GetScheduleByStudentCodeReq,
  ): Promise<ScheduleData> {
    return new Promise((resolve, reject) => {
      this.grpcClient.getScheduleByStudentCode(param, (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve({
            studentInfo: res.studentInfo,
            studentSchedule: res.studentSchedule,
          });
        }
      });
    });
  }
}
