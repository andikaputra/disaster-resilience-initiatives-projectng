import { useRouter } from 'next/router';
import { Select, Space } from '@mantine/core';
import { SimulationPlaceDetailEntity } from '@/src/shared/domain/entities';
import { Article, DataPresentationWrapper } from '@/src/shared/presentations/components';
import { usePageProps } from '@/src/shared/presentations/contexts';
import { SimulationPlacePageContextProvider } from '../../domain/contexts';
import { Gallery, Hero, Links, Quiz, SocialMedia } from '../components';

export default function SimulationPlacePage() {
  const { data } = usePageProps<SimulationPlaceDetailEntity>();
  const router = useRouter();
  return (
    <>
      <SimulationPlacePageContextProvider>
        <Hero />
        <Quiz />
        <DataPresentationWrapper
          isEmpty={() => !data?.blog?.nodes?.length}
          emptyComponent={{
            title: 'Artikel Belum Tersedia',
          }}
        >
          <Article
            items={data?.blog?.nodes?.map((item) => ({
              description: item.sub_title,
              image: item.wallpaper,
              title: item.title,
              onClick: () => {
                router.push(`/blog/${item.slug}`);
              },
            }))}
          />
        </DataPresentationWrapper>
        <DataPresentationWrapper
          isEmpty={() => !data?.useful_link?.length}
          emptyComponent={{
            title: 'Tautan penting BNPB akan tampil di sini',
            subtitle: 'Tautan belum tersedia',
          }}
        >
          <Links
            links={data?.useful_link?.map((value) => ({
              link: value.url,
              title: value.display,
              icon: value.icon,
            }))}
          />
        </DataPresentationWrapper>
        <DataPresentationWrapper isEmpty={() => !data?.social_media?.length}>
          <SocialMedia
            regionName={`BNPB ${data?.regency?.toWellFormed()} di Social Media`}
            socialMedias={data?.social_media?.map((value) => ({
              icon: value.icon,
              href: value.url,
              title: value.display,
            }))}
          />
        </DataPresentationWrapper>
        <DataPresentationWrapper isEmpty={() => !data?.gallery?.assets?.length}>
          <Gallery
            images={[...(data?.gallery?.assets?.map((value) => value.asset_url ?? '') ?? [])]}
          />
        </DataPresentationWrapper>
        <Space h="xl" />
      </SimulationPlacePageContextProvider>
    </>
  );
}
