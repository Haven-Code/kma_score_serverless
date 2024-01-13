import { Score } from '@prisma/client';
import { LearningResult } from '../subject';
// import { GetById } from '@infra/student';

export interface ICalculateScoreService {
  getLearningResult(scores: Score[]): LearningResult;
  getAverageScore(student: unknown): number; // TODO: FIX THIS
}
