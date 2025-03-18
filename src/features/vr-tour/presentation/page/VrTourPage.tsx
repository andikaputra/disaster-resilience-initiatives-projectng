import { Simulation360Entity } from '@/src/shared/domain/entities';
import { About } from '@/src/shared/presentations/components';
import { usePageProps } from '@/src/shared/presentations/contexts';
import { Header, MapBox } from '../components';
import { MapBoxVrTourPageContextProvider } from '../contexts';

export default function VrTourPage() {
  const { data } = usePageProps<Simulation360Entity>();
  return (
    <>
      <div style={{ position: 'relative', height: '100dvh', overflow: 'hidden' }}>
        <Header />
        <MapBoxVrTourPageContextProvider>
          <MapBox />
        </MapBoxVrTourPageContextProvider>
      </div>
      <About
        aboutTab={{
          video: {
            iframeEmbeded: (
              <iframe
                title="Video Mitigasi Bencana"
                src={data?.about?.intro_video_url}
                width="640"
                height="480"
                allow="autoplay"
                style={{ border: 'none' }}
                allowFullScreen
              />
            ),
            link: data?.about?.tutorial_video_url,
          },
        }}
        mitigationTab={{
          content: data?.disaster_mitigation_info,
        }}
      />
    </>
  );
}
