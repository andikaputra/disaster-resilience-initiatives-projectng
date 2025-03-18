import { ContinueScroll, Hero, SimulationPlaces } from '../components';
import { LandingPageContextProvider } from '../contexts';

export default function LandingPage() {
  return (
    <>
      <LandingPageContextProvider>
        <Hero />
        <ContinueScroll />
        <SimulationPlaces />
      </LandingPageContextProvider>
    </>
  );
}
