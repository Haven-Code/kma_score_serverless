import { CalculateScoreService } from '@infra/score';
import { StudentRepository } from '@infra/student';
import { ScheduleService } from '@infra/schedule';

export interface Cradle {
  // Services
  calculateScoreService: CalculateScoreService;
  // Repositories
  studentRepository: StudentRepository;
  scheduleService: ScheduleService;
}
