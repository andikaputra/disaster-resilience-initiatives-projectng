import { useRouter } from 'next/router';
import { BlogEntity } from '@/src/shared/domain/entities';
import { Article, DataPresentationWrapper } from '@/src/shared/presentations/components';
import { usePageProps } from '@/src/shared/presentations/contexts';
import {
  ContinueScroll,
  Hero,
  PublicationInNumber,
  Quotes,
  Technologies,
  Testimoni,
} from '../components';

export default function AboutPage() {
  const router = useRouter();
  const { data } = usePageProps<BlogEntity>();
  return (
    <>
      <Hero />
      <Quotes />
      <ContinueScroll />
      <Technologies />
      <DataPresentationWrapper isEmpty={() => !data?.nodes?.length}>
        <Article
          items={data?.nodes?.map((item) => ({
            title: item.title,
            description: item.sub_title,
            image: item.wallpaper,
            onClick: () => router.push(`/blog/${item.slug}`),
          }))}
        />
      </DataPresentationWrapper>
      <Testimoni />
      <PublicationInNumber />
    </>
  );
}
