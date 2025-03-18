import { ExistingApp } from '@/src/shared/domain/entities';

export type Technologies = {
    image: string;
    title: string;
    description: string;
    href?: string;
};

export type SimulationPlaceServerSideProps = {
    slug?: string;
    province?: string;
    region?: string;
    availableTechnologies?: Technologies[];
};
