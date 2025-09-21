import React, { useEffect, useState } from 'react'
import type { TypedUseSelectorHook } from 'react-redux';

import { Section, StatusBar } from '@the7ofdiamonds/ui-ux';
import { MessageType, Organization, Portfolio, Products, RepoContentQuery, Services, Skills, StatusBarVisibility } from '@the7ofdiamonds/ui-ux';
import { getRepoFile, PortfolioComponent } from '@the7ofdiamonds/github-portfolio';
import { AboutComponent } from '@the7ofdiamonds/communications';
import { ProductsServicesHero } from '@the7ofdiamonds/products-services';

interface HomePageProps<RootState, AppDispatch> {
    account: Organization;
    useAppSelector: TypedUseSelectorHook<RootState>;
    useAppDispatch: () => AppDispatch;
}

const HomePage: React.FC<HomePageProps<any, any>> = ({ account, useAppSelector, useAppDispatch }) => {
    const dispatch = useAppDispatch();

    const [message, setMessage] = useState<string>('Thank you for stopping by. Feel free to leave a message on our contact page, and follow our social links below.');
    const [messageType, setMessageType] = useState<MessageType>('info');
    const [showStatusBar, setShowStatusBar] = useState<StatusBarVisibility>('hide');

    const [pitch, setPitch] = useState<string | null>(null);
    const [products, setProducts] = useState<Products | null>(null);
    const [services, setServices] = useState<Services | null>(null);
    const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
    const [skills, setSkills] = useState<Skills | null>(account?.skills);
    const [query, setQuery] = useState<RepoContentQuery>(new RepoContentQuery(account?.login ?? '', account?.login ?? '', 'story.md', ''));

    const {
        productsLoading
    } = useAppSelector((state) => state.products);
    const {
        servicesLoading
    } = useAppSelector((state) => state.services);

    useEffect(() => {
        if (account?.bio) {
            setPitch(account.bio)
        }
    }, [account?.bio]);

    useEffect(() => {
        if (productsLoading || servicesLoading) {
            setMessage('Welcome to SEVEN TECH')
            setMessageType('info')
            setShowStatusBar('show')
        } else {
            setMessage('Thank you for stopping by. Feel free to leave a message on our contact page, and follow our social links below.')
            setShowStatusBar('hide')
        }
    }, [productsLoading, servicesLoading]);

    useEffect(() => {
        if (account?.login) {
            setQuery(new RepoContentQuery(account.login, account.login, 'story.md', ''))
        }
    }, [account?.login])

    useEffect(() => {
        if (account?.services) {
            setServices(account.services)
        }
    }, [account?.services]);

    useEffect(() => {
        if (account?.products) {
            setProducts(account.products)
        }
    }, [account?.products]);

    useEffect(() => {
        if (account?.portfolio) {
            setPortfolio(account.portfolio)
        }
    }, [account?.portfolio]);

    useEffect(() => {
        if (account?.skills) {
            setSkills(account.skills)
        }
    }, [account?.skills]);

    return (
        <Section>
            {(pitch || products || services) && <ProductsServicesHero pitch={pitch} products={products} services={services} dispatch={dispatch} />}

            {(portfolio || skills) && <PortfolioComponent portfolio={portfolio} skills={skills} />}

            {account && <AboutComponent title={null} account={account} query={query} getFile={getRepoFile} dispatch={dispatch} />}

            {message && <StatusBar show={showStatusBar} messageType={messageType} message={message} />}
        </Section>
    )
}

export default HomePage