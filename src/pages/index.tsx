import { ReactElement } from 'react';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { LandingPage } from '@/src/features/landing-page/presentations/page';
import { BaseLayout } from '@/src/shared/presentations/layouts/base/BaseLayout';
import { getServerSidePropsWrapper } from '../core/wrapper';
import { SIGNATURE_CONTAINER_TYPE, signatureContainer } from '../framework/container';
import { SimulationPlacesEntity } from '../shared/domain/entities';
import type { SimulationPlaceUseCase } from '../shared/domain/usecase';

export const getServerSideProps = () =>
  getServerSidePropsWrapper((async () => {
    const simulationPlaceUseCAse = signatureContainer.resolve<SimulationPlaceUseCase>(
      SIGNATURE_CONTAINER_TYPE.SIMULATION_PLACE_USE_CASE
    );
    const data = await simulationPlaceUseCAse.getAll();
    return { props: data };
  }) satisfies GetServerSideProps<SimulationPlacesEntity>);

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Teknologi Siaga Bencana</title>
      </Head>
      <LandingPage />
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout isShowGlobalLoadingBlocker={false}>{page}</BaseLayout>;
};
