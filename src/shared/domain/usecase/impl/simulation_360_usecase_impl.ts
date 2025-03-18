import { injectable } from 'tsyringe';
import { clientBe } from '@/src/framework/client';
import { Simulation360Entity } from '../../entities';
import Simulation360UseCase from '../simulation_360_usecase';

@injectable()
export default class Simulation360UseCaseImpl implements Simulation360UseCase {
    async getProduct(slug: string): Promise<Simulation360Entity> {
        const { data } = await clientBe.get<Simulation360Entity>(`/wilayah/${slug}/product`);
        return data;
    }
}
