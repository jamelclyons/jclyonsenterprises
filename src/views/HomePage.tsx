import React, { useEffect, useState } from 'react'
import type { TypedUseSelectorHook } from 'react-redux';

import { Section, StatusBar } from '@the7ofdiamonds/ui-ux';
import { MessageType, Organization, Portfolio, Products, RepoContentQuery, Services, Skills, StatusBarVisibility } from '@the7ofdiamonds/ui-ux';
import { getRepoFile, PortfolioComponent } from '@the7ofdiamonds/github-portfolio';
import { AboutComponent } from '@the7ofdiamonds/communications';
import { fetchProducts, fetchServices, ProductsServicesHero } from '@the7ofdiamonds/products-services';

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
        productsLoading,
        productsObject
    } = useAppSelector((state) => state.products);
    const {
        servicesLoading,
        servicesObject
    } = useAppSelector((state) => state.services);

    useEffect(() => {
        if (account?.bio) {
            setPitch(account.bio)
        }
    }, [account]);

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
        if (account.services && account.services.list.length === 0) {
            dispatch(fetchServices());
        }
    }, [account?.services]);

    useEffect(() => {
        if (account.products && account.products.list.length === 0) {
            dispatch(fetchProducts());
        }
    }, [account?.products]);

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
        if (account?.products) {
            setProducts(account.products)
        }
    }, [account, account?.products]);

    useEffect(() => {
        if (account?.services) {
            setServices(account.services)
        }
    }, [account, account?.services]);

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
            {(pitch || products || services) && <ProductsServicesHero pitch={pitch} products={products} services={services} dispatch={dispatch} />}

            {(portfolio || skills) && <PortfolioComponent portfolio={portfolio} skills={skills} />}

            {account && <AboutComponent title={null} account={account} query={query} getFile={getRepoFile} dispatch={dispatch} />}

            {message && <StatusBar show={showStatusBar} messageType={messageType} message={message} />}
        </Section>
    )
}

export default HomePage