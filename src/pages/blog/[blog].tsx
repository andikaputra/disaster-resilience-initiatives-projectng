import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { BlogPage } from '@/src/features/blog/presentations/page';
import { SIGNATURE_CONTAINER_TYPE, signatureContainer } from '@/src/framework/container';
import { BlogDetailEntity } from '@/src/shared/domain/entities';
import { BlogUseCase } from '@/src/shared/domain/usecase';
import { usePageProps } from '@/src/shared/presentations/contexts';
import { BaseLayout } from '@/src/shared/presentations/layouts/base/BaseLayout';

export const getServerSideProps = (async (req) => {
  const urlPaths = req.resolvedUrl.split('/');
  const slug = urlPaths.at(-1);
  if (slug === undefined) return { props: {} };
  const blogUseCase = signatureContainer.resolve<BlogUseCase>(
    SIGNATURE_CONTAINER_TYPE.BLOG_USE_CASE
  );
  const data = await blogUseCase.getDetail(slug);
  return { props: data };
}) satisfies GetServerSideProps<BlogDetailEntity>;

export default function Blog() {
  const { data } = usePageProps<BlogDetailEntity>();
  return (
    <>
      <Head>
        <title>{`Blog ${data?.title ? `| ${data?.title}` : ''}`}</title>
      </Head>
      <BlogPage />
    </>
  );
}

Blog.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
