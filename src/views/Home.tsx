import React from 'react'
import type { TypedUseSelectorHook } from 'react-redux';

import { Section } from '@the7ofdiamonds/ui-ux';
import { PortfolioComponent } from '@the7ofdiamonds/github-portfolio';
import { AboutComponent, ContactComponent } from '@the7ofdiamonds/communications';
import { NavigationLoginComponent } from '@the7ofdiamonds/gateway';
import { ProductsServicesHero } from '@the7ofdiamonds/products-services';
import { Locations } from '@the7ofdiamonds/locations';
import { ScheduleComponent } from '@the7ofdiamonds/schedule';

interface HomeProps<RootState, AppDispatch> {
    useAppSelector: TypedUseSelectorHook<RootState>;
    useAppDispatch: () => AppDispatch;
}

const Home: React.FC<HomeProps<any, any>> = ({ useAppSelector, useAppDispatch }) => {
    return (
        <Section>
            <ProductsServicesHero />
            <PortfolioComponent portfolio={null} skills={null} />
            <AboutComponent title={''} missionStatement={''} founders={[]} />
            <Locations />
            <ScheduleComponent useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />
            <NavigationLoginComponent page={''} />
            <ContactComponent title={null} showStatusBar={'show'} message={''} messageType={'info'} />
        </Section>
    )
}

export default Home