import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getServerSidePropsWrapper } from '@/src/core/wrapper';
import { AboutPage } from '@/src/features/about/presentation/page';
import { SIGNATURE_CONTAINER_TYPE, signatureContainer } from '@/src/framework/container';
import { BlogEntity } from '@/src/shared/domain/entities';
import { BlogUseCase } from '@/src/shared/domain/usecase';
import { BaseLayout } from '@/src/shared/presentations/layouts/base/BaseLayout';

export const getServerSideProps = () =>
  getServerSidePropsWrapper((async () => {
    const blogUseCase = signatureContainer.resolve<BlogUseCase>(
      SIGNATURE_CONTAINER_TYPE.BLOG_USE_CASE
    );
    const data = await blogUseCase.getAll();
    return { props: data };
  }) satisfies GetServerSideProps<BlogEntity>);

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <AboutPage />
    </>
  );
}

About.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
