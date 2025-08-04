import React, { useEffect, useState } from 'react';
import type { TypedUseSelectorHook } from 'react-redux';

import { Organization, RepoContentQuery, Section, User } from '@the7ofdiamonds/ui-ux'

import { AboutComponent, ContactComponent } from '@the7ofdiamonds/communications';

import { getRepoFile } from '@the7ofdiamonds/github-portfolio';
import { Locations } from '@the7ofdiamonds/locations';
import { ScheduleComponent } from '@the7ofdiamonds/schedule';

interface AboutPageProps<RootState, AppDispatch> {
    account: User | Organization | null;
    useAppSelector: TypedUseSelectorHook<RootState>;
    useAppDispatch: () => AppDispatch;
}

const AboutPage = ({ account, useAppSelector, useAppDispatch }: AboutPageProps<any, any>) => {
    const dispatch = useAppDispatch();

    const [query, setQuery] = useState<RepoContentQuery>(new RepoContentQuery(account?.login ?? '', account?.login ?? '', 'story.md', ''));

    useEffect(() => {
        if (account && account.login) {
            setQuery(new RepoContentQuery(account.login, account.login, 'story.md', ''))
        }
    }, [account])

    return (
        <Section>
            <AboutComponent<RepoContentQuery> title={null} account={account} query={query} getFile={getRepoFile} dispatch={dispatch} />

            <Locations />

            <ScheduleComponent officeHours={[]} availableDates={[]} availableTimes={[]} communicationPreferences={[]}/>

            <ContactComponent title={null}/>
        </Section>
    )
}

export default AboutPage;