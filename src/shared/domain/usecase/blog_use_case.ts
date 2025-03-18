import { BlogDetailEntity, BlogEntity } from '../entities';

export default interface BlogUseCase {
    getAll: () => Promise<BlogEntity>;
    getDetail: (slug: string) => Promise<BlogDetailEntity>;
}
