import React, { useEffect, useState } from 'react'
import type { TypedUseSelectorHook } from 'react-redux';

import { MessageType, Section, StatusBarVisibility } from '@the7ofdiamonds/ui-ux';
import { Organization, RepoContentQuery } from '@the7ofdiamonds/ui-ux';

import { FAQComponent } from '@the7ofdiamonds/communications';

import { getRepoFile } from '@the7ofdiamonds/portfolio';

import type { AppSelectorHook, AppDispatch } from '../model/store';

interface FAQPageProps {
  account: Organization;
  useAppSelector: AppSelectorHook;
  useAppDispatch: () => AppDispatch;
}

const FAQPage: React.FC<FAQPageProps> = ({ account, useAppSelector, useAppDispatch }) => {
    const dispatch = useAppDispatch();

    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<MessageType>('info');
    const [showStatusBar, setShowStatusBar] = useState<StatusBarVisibility>('hide');
    
  const [query, setQuery] = useState<RepoContentQuery>(new RepoContentQuery(account?.login ?? '', account?.login ?? '', 'faq.md', ''));

  useEffect(() => {
    if (account && account.login) {
      setQuery(new RepoContentQuery(account.login, account.login, 'faq.md', ''))
    }
  }, [account])

  return (
    <Section>
      <FAQComponent query={query} getFile={getRepoFile} dispatch={dispatch} />
    </Section>
  )
}

export default FAQPage;