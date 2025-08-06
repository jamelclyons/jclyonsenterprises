import React, { useEffect, useState } from 'react'
import { TypedUseSelectorHook } from 'react-redux';

import { Section, StatusBar } from '@the7ofdiamonds/ui-ux';
import { MessageType, Organization, RepoContentQuery, StatusBarVisibility } from '@the7ofdiamonds/ui-ux';

import { AboutComponent } from '@the7ofdiamonds/communications';

import { getRepoFile } from '@the7ofdiamonds/github-portfolio';

interface AboutPageProps<RootState, AppDispatch> {
    account: Organization;
    useAppSelector: TypedUseSelectorHook<RootState>;
    useAppDispatch: () => AppDispatch;
}

const AboutPage: React.FC<AboutPageProps<any, any>> = ({ account, useAppSelector, useAppDispatch }) => {
    const dispatch = useAppDispatch();

    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<MessageType>('info');
    const [showStatusBar, setShowStatusBar] = useState<StatusBarVisibility>('hide');

    const [query, setQuery] = useState<RepoContentQuery>(new RepoContentQuery(account?.login ?? '', account?.login ?? '', 'story.md', ''));

    useEffect(() => {
        if (account && account.login) {
            setQuery(new RepoContentQuery(account.login, account.login, 'story.md', ''))
        }
    }, [account])

    return (
        <Section>
            <AboutComponent title={null} account={account} query={query} getFile={getRepoFile} dispatch={dispatch} />
            {message && <StatusBar show={showStatusBar} messageType={messageType} message={message} />}
        </Section>
    )
}

export default AboutPage