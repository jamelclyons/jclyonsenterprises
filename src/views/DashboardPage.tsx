import React from 'react'
import type { TypedUseSelectorHook } from 'react-redux';

import { Section } from '@the7ofdiamonds/ui-ux';

interface DashboardPageProps<RootState, AppDispatch> {
    useAppSelector: TypedUseSelectorHook<RootState>;
    useAppDispatch: () => AppDispatch;
}

const DashboardPage: React.FC<DashboardPageProps<any, any>> = ({ useAppSelector, useAppDispatch }) => {
    return (
        <Section>Dashboard</Section>
    )
}

export default DashboardPage;