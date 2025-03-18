import { useContext } from 'react';
import { PagePropsContext } from './AppPageContext';

export const usePageProps = <T>() => useContext(PagePropsContext) as T;
