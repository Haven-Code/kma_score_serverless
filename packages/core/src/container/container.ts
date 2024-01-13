import Container from 'typedi';
import { Cradle } from './cradle';
import { CalculateScoreService } from '@infra/score';
import { StudentRepository } from '@infra/student';
import { ScheduleService } from '@infra/schedule';

export const container: Cradle = {
  // Services
  calculateScoreService: Container.get(CalculateScoreService),

  // Repositories
  studentRepository: Container.get(StudentRepository),
  scheduleService: Container.get(ScheduleService),
};
