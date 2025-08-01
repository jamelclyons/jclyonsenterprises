import React, { useState } from 'react'
import type { TypedUseSelectorHook } from 'react-redux';

import { Account, MessageType, Section, StatusBarVisibility } from '@the7ofdiamonds/ui-ux';
import { PortfolioComponent } from '@the7ofdiamonds/github-portfolio';
import { AboutComponent, ContactComponent } from '@the7ofdiamonds/communications';
import { NavigationLoginComponent } from '@the7ofdiamonds/gateway';
import { ProductsServicesHero } from '@the7ofdiamonds/products-services';
import { Locations } from '@the7ofdiamonds/locations';
import { ScheduleComponent } from '@the7ofdiamonds/schedule';

interface HomeProps<RootState, AppDispatch> {
    account: Account
    useAppSelector: TypedUseSelectorHook<RootState>;
    useAppDispatch: () => AppDispatch;
}

const Home: React.FC<HomeProps<any, any>> = ({ account, useAppSelector, useAppDispatch }) => {
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<MessageType>('info');
    const [showStatusBar, setShowStatusBar] = useState<StatusBarVisibility>('hide');

    return (
        <Section>
            <ProductsServicesHero />
            <PortfolioComponent portfolio={account.portfolio} skills={account.skills} />
            <AboutComponent title={''} missionStatement={''} founders={[]} />
            <Locations />
            <ScheduleComponent useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />
            <NavigationLoginComponent page={''} />
            <ContactComponent title={null} />
        </Section>
    )
}

export default Home