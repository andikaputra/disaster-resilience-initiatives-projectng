import { QuizDto } from '@/src/features/simulation-places/domain/dto';
import { QuizEntity, SimulationPlaceDetailEntity, SimulationPlacesEntity } from '../entities';

export default interface SimulationPlaceUsecase {
    getAll: () => Promise<SimulationPlacesEntity>
    getDetail: (slug: string) => Promise<SimulationPlaceDetailEntity>
    postQuiz: (quizDto: QuizDto, slug: string) => Promise<QuizEntity>
}
