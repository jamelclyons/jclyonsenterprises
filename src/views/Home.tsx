import React from 'react'

import { Section } from '@the7ofdiamonds/ui-ux';
import { PortfolioComponent } from '@the7ofdiamonds/github-portfolio';
import { AboutComponent } from '@the7ofdiamonds/communications';
import { NavigationLoginComponent } from '@the7ofdiamonds/gateway';
import { ProductsServicesHero } from '@the7ofdiamonds/products-services';
import { Locations } from '@the7ofdiamonds/locations';
// import { ScheduleComponent } from '@the7ofdiamonds/schedule';

const Home: React.FC = () => {
    return (
        <Section>
            <ProductsServicesHero />
            <PortfolioComponent portfolio={null} skills={null} />
            <AboutComponent title={''} missionStatement={''} founders={[]} />
            <Locations />
            {/* <ScheduleComponent /> */}
            <NavigationLoginComponent page={''} />
        </Section>
    )
}

export default Home