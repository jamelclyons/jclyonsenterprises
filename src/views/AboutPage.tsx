import React, { useEffect, useState } from 'react'

import { Modal, Section, StatusBar } from '@the7ofdiamonds/ui-ux';
import { MessageType, Organization, RepoContentQuery, StatusBarVisibility } from '@the7ofdiamonds/ui-ux';

import { AboutComponent } from '@the7ofdiamonds/communications';

import { getRepoFile } from '@the7ofdiamonds/portfolio';

import type { AppSelectorHook, AppDispatch } from '../model/store';

interface AboutPageProps {
    account: Organization;
    useAppSelector: AppSelectorHook;
    useAppDispatch: () => AppDispatch;
}

const AboutPage: React.FC<AboutPageProps> = ({ account, useAppSelector, useAppDispatch }) => {
    const dispatch = useAppDispatch();

    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<MessageType>('info');
    const [showStatusBar, setShowStatusBar] = useState<StatusBarVisibility>('hide');

    const [query, setQuery] = useState<RepoContentQuery | null>(account?.login ? new RepoContentQuery(account.login, account.login, 'story.md', '') : null);

    const { githubLoading, githubErrorMessage } = useAppSelector(
        (state) => state.github
    );

    useEffect(() => {
        if (account?.login) {
            setQuery(new RepoContentQuery(account.login, account.login, 'story.md', ''))
        }
    }, [account?.login])

    useEffect(() => {
        if (githubLoading) {
            setMessage('Now Loading Company Story...')
            setShowStatusBar('show')
            setMessageType('info')
        } else {
            setMessage(null)
            setShowStatusBar('hide')
        }
    }, [githubLoading])

    useEffect(() => {
        if (githubErrorMessage) {
            setMessage(githubErrorMessage)
            setShowStatusBar('show')
            setMessageType('error')
        } else {
            setMessage(null)
            setShowStatusBar('hide')
        }
    }, [githubErrorMessage])

    return (
        <Section>
            <AboutComponent<RepoContentQuery> title={null} account={account} query={query} getFile={getRepoFile} dispatch={dispatch} />

            <Modal show={showStatusBar} messageType={messageType}>
                <StatusBar show={showStatusBar} messageType={messageType} message={message} />
            </Modal>
        </Section>
    )
}

export default AboutPage