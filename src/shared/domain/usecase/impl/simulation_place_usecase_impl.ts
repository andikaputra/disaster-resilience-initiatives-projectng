import { injectable } from 'tsyringe';
import { AxiosError } from 'axios';
import { clientBe } from '@/src/framework/client';
import type { SimulationPlaceUseCase } from '..';
import { QuizEntity, SimulationPlacesEntity } from '../../entities';
import { QuizDto } from '@/src/features/simulation-places/domain/dto';
import { DefaultException } from '@/src/core/exception/DefaultException';

@injectable()
export default class SimulationPlaceUseCaseImpl implements SimulationPlaceUseCase {
    async postQuiz(quizDto: QuizDto, slug: string): Promise<QuizEntity> {
        try {
            const { data } = await clientBe.post<QuizEntity>(`/wilayah/${slug}/quiz`, quizDto);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.meta?.error ?? 'Terjadi gangguan';
                throw new DefaultException(errorMessage);
            }
            throw error;
        }
    }
    async getAll(): Promise<SimulationPlacesEntity> {
        const { data } = await clientBe.get<SimulationPlacesEntity>('/wilayah');
        return data;
    }

    async getDetail(slug: string): Promise<any> {
        const { data } = await clientBe.get<SimulationPlacesEntity>(`/wilayah/${slug}/detail`);
        return data;
    }
}
