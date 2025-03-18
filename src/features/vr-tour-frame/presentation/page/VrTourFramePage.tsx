import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { RiFullscreenFill } from 'react-icons/ri';
import { Simulation360Entity } from '@/src/shared/domain/entities';
import { SignatureContainer, SimpleHeader } from '@/src/shared/presentations/components';
import { usePageProps } from '@/src/shared/presentations/contexts';
import { Channels, Frame, Header } from '../components';
import { VrTourFramePageContextProvider } from '../contexts';

export default function VrTourFramePage() {
  const villageSlug = useRouter().asPath.split('/').at(-2);
  const markerId = useRouter().asPath.split('/').at(-1);
  const { data } = usePageProps<Simulation360Entity>();
  const iframeLink = useMemo(() => {
    const village = data?.village?.find((item) => item.slug === villageSlug);
    const marker = village?.mapbox_collection?.find((item) => item.id === markerId);
    return marker?.vr_url;
  }, [data]);
  return (
    <>
      <VrTourFramePageContextProvider>
        <SimpleHeader
          navigationButton={{
            title: '360 VR Tour',
          }}
          tail={{
            isShow: true,
            onClick: () => {
              window.open(iframeLink);
            },
            component: <RiFullscreenFill />,
          }}
        />
        <Frame />
        <Channels />
      </VrTourFramePageContextProvider>
    </>
  );
}
