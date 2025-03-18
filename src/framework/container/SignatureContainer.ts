import { container } from 'tsyringe';
import { SIGNATURE_CONTAINER_TYPE } from './SignatureContainerType';
import { BlogUseCaseImpl, DependencyUseCaseImpl, SimulationPlaceUsecaseImpl } from '@/src/shared/domain/usecase';
import Simulation360UseCaseImpl from '@/src/shared/domain/usecase/impl/simulation_360_usecase_impl';

container.register(SIGNATURE_CONTAINER_TYPE.SIMULATION_PLACE_USE_CASE, { useClass: SimulationPlaceUsecaseImpl });
container.register(SIGNATURE_CONTAINER_TYPE.DEPENDECY_USE_CASE, { useClass: DependencyUseCaseImpl });
container.register(SIGNATURE_CONTAINER_TYPE.SIMULATION_360_USE_CASE, { useClass: Simulation360UseCaseImpl });
container.register(SIGNATURE_CONTAINER_TYPE.BLOG_USE_CASE, { useClass: BlogUseCaseImpl });

export { container as signatureContainer };
