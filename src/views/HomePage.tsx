import React, { useEffect, useState } from 'react'

import { Section, StatusBar } from '@the7ofdiamonds/ui-ux';
import { MessageType, Organization, Products, Services, StatusBarVisibility } from '@the7ofdiamonds/ui-ux';
import { ProductsServicesHero } from '@the7ofdiamonds/products-services';

import type { AppSelectorHook, AppDispatch } from '../model/store';

interface HomePageProps {
    account: Organization;
    useAppSelector: AppSelectorHook;
    useAppDispatch: () => AppDispatch;
}

const HomePage: React.FC<HomePageProps> = ({ account, useAppSelector, useAppDispatch }) => {
    const dispatch = useAppDispatch();

    const instruction = 'Thank you for stopping by. Feel free to leave a message on our contact page, and follow our social links below.';

    const [message, setMessage] = useState<string>(instruction);
    const [messageType, setMessageType] = useState<MessageType>('info');
    const [showStatusBar, setShowStatusBar] = useState<StatusBarVisibility>('hide');

    const [pitch, setPitch] = useState<string | null>(null);
    const [products, setProducts] = useState<Products | null>(null);
    const [services, setServices] = useState<Services | null>(null);

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
            setMessage(instruction)
            setShowStatusBar('hide')
        }
    }, [productsLoading, servicesLoading]);

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

    return (
        <Section>
            {(pitch || products || services) && <ProductsServicesHero pitch={pitch} products={products} services={services} dispatch={dispatch} />}

            {message && <StatusBar show={showStatusBar} messageType={messageType} message={message} />}
        </Section>
    )
}

export default HomePage