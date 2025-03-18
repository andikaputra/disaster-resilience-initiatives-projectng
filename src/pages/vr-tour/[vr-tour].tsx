import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { VrTourPage } from '@/src/features/vr-tour/presentation/page';
import { SIGNATURE_CONTAINER_TYPE, signatureContainer } from '@/src/framework/container';
import { Simulation360Entity } from '@/src/shared/domain/entities';
import Simulation360UseCase from '@/src/shared/domain/usecase/simulation_360_usecase';
import { BaseLayout } from '@/src/shared/presentations/layouts/base/BaseLayout';

export const getServerSideProps = (async (req) => {
  const urlPaths = req.resolvedUrl.split('/');
  const slug = urlPaths.at(-1);
  if (slug === undefined) return { props: {} };
  const simulationPlaceUseCAse = signatureContainer.resolve<Simulation360UseCase>(
    SIGNATURE_CONTAINER_TYPE.SIMULATION_360_USE_CASE
  );
  const data = await simulationPlaceUseCAse.getProduct(slug);
  return { props: data };
}) satisfies GetServerSideProps<Simulation360Entity>;

export default function VrTour() {
  const title = useRouter()
    .asPath.split('/')
    .at(-1)
    ?.split('-')
    .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(' ');
  return (
    <>
      <Head>
        <title>{`360 Vr Tour ${title ? `| ${title}` : ''}`}</title>
      </Head>
      <VrTourPage />
    </>
  );
}

VrTour.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout isShowGlobalLoadingBlocker>{page}</BaseLayout>;
};
