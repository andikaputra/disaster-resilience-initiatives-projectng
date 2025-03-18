import { injectable } from 'tsyringe';
import DependencyUseCase from '../dependency_usecase';

@injectable()
export default class DependencyUseCaseImpl implements DependencyUseCase {
    async getAll(): Promise<any> {
    }
}
