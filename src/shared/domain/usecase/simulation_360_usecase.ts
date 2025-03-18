import { Simulation360Entity } from '../entities';

export default interface Simulation360UseCase {
    getProduct: (slug: string) => Promise<Simulation360Entity>;
}
