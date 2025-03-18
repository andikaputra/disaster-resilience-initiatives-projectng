import { LandingPageServerSideProps } from "../types";

export default interface LandingPageUsecase {
    getLandingPage: () => Promise<LandingPageServerSideProps>;
}