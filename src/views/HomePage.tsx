import React, { useEffect, useState } from 'react'
import type { TypedUseSelectorHook } from 'react-redux';

import { Section, StatusBar } from '@the7ofdiamonds/ui-ux';
import { MessageType, Organization, Portfolio, RepoContentQuery, Services, Skills, StatusBarVisibility } from '@the7ofdiamonds/ui-ux';
import { getRepoFile, PortfolioComponent } from '@the7ofdiamonds/github-portfolio';
import { AboutComponent } from '@the7ofdiamonds/communications';
import { fetchProducts, fetchServices, Products, ProductsServicesHero } from '@the7ofdiamonds/products-services';

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

    const [query, setQuery] = useState<RepoContentQuery>(new RepoContentQuery(account?.login ?? '', account?.login ?? '', 'story.md', ''));
    const [products, setProducts] = useState<Products | null>(null);
    const [services, setServices] = useState<Services | null>(null);
    const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
    const [skills, setSkills] = useState<Skills | null>(null);

    const {
        productsLoading,
        productsObject
    } = useAppSelector((state) => state.products);
    const {
        servicesLoading,
        servicesObject
    } = useAppSelector((state) => state.services);

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
        if (account && account.login) {
            setQuery(new RepoContentQuery(account.login, account.login, 'story.md', ''))
        }
    }, [account])

    useEffect(() => {
        dispatch(fetchServices());
    }, []);

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    useEffect(() => {
        if (productsObject) {
            setProducts(new Products(productsObject))
        }
    }, [productsObject]);

    useEffect(() => {
        if (servicesObject) {
            setServices(servicesObject)
        }
    }, [servicesObject]);

    useEffect(() => {
        if (account && account.portfolio) {
            setPortfolio(account.portfolio)
        }
    }, [account, account?.portfolio]);

    useEffect(() => {
        if (account && account.skills) {
            setSkills(account.skills)
        }
    }, [account, account?.skills]);

    return (
        <Section>
            {(products || services) && <ProductsServicesHero products={products} services={services} />}

            {(portfolio || skills) && <PortfolioComponent portfolio={portfolio} skills={skills} />}

            {account && <AboutComponent title={null} account={account} query={query} getFile={getRepoFile} dispatch={dispatch} />}

            {message && <StatusBar show={showStatusBar} messageType={messageType} message={message} />}
        </Section>
    )
}

export default HomePage