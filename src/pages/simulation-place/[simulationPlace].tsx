import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SimulationPlacePage } from '@/src/features/simulation-places/presentation/page';
import { SIGNATURE_CONTAINER_TYPE, signatureContainer } from '@/src/framework/container';
import { SimulationPlaceDetailEntity } from '@/src/shared/domain/entities';
import { SimulationPlaceUseCase } from '@/src/shared/domain/usecase';
import { BaseLayout } from '@/src/shared/presentations/layouts/base/BaseLayout';

export const getServerSideProps = (async (req) => {
  const urlPaths = req.resolvedUrl?.split('?').at(0)?.split('/') ?? [];
  const slug = urlPaths.at(-1);
  if (slug === undefined) return { props: {} };
  const simulationPlaceUseCAse = signatureContainer.resolve<SimulationPlaceUseCase>(
    SIGNATURE_CONTAINER_TYPE.SIMULATION_PLACE_USE_CASE
  );
  const data = await simulationPlaceUseCAse.getDetail(slug);
  return { props: data };
}) satisfies GetServerSideProps<SimulationPlaceDetailEntity>;

export default function SimulationPlace() {
  const title = useRouter()
    .asPath.split('/')
    .at(-1)
    ?.split('-')
    .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(' ');
  return (
    <>
      <Head>
        <title>{`Produk Simulasi ${title ? `| ${title}` : ''}`}</title>
      </Head>
      <SimulationPlacePage />
    </>
  );
}

SimulationPlace.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
