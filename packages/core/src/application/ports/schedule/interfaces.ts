import {
  SemesterData,
  StudentSchedule,
  StudentInfo,
  GetScheduleByStudentCodeReq,
} from '../../../../../../proto/schedule';

export type ScheduleData = {
  studentSchedule: StudentSchedule[];
  studentInfo: StudentInfo | undefined;
};

export interface IStudentScheduleService {
  getSemester(): Promise<SemesterData[]>;

  getStudentScheduleByStudentCode(
    param: GetScheduleByStudentCodeReq,
  ): Promise<ScheduleData>;
}
