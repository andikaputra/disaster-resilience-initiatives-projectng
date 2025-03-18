import { LandingPageServerSideProps } from "../../types";
import LandingPageUsecase from "../landing-page-usecase";

export abstract class LandingPageUsecaseImpl implements LandingPageUsecase {
    async getLandingPage(): Promise<LandingPageServerSideProps> {
        return {
            data: {
                halo: 'halo'
            }
        } as LandingPageServerSideProps;
    }
}