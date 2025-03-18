import { injectable } from 'tsyringe';
import { clientBe } from '@/src/framework/client';
import { BlogDetailEntity, BlogEntity } from '../../entities';
import BlogUseCase from '../blog_use_case';

@injectable()
export default class BlogUseCaseImpl implements BlogUseCase {
    async getAll(): Promise<BlogEntity> {
        const { data } = await clientBe.get<BlogEntity>('/blog');
        return data;
    }
    async getDetail(slug: string): Promise<BlogDetailEntity> {
        const { data } = await clientBe.get<BlogDetailEntity>(`/blog/detail/${slug}`);
        return data;
    }
}
