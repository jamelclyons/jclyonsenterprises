import React, { useState } from 'react'

import { MessageType, Organization, Section, StatusBar, StatusBarVisibility } from '@the7ofdiamonds/ui-ux'
import { SupportComponent } from '@the7ofdiamonds/communications';

import type { AppSelectorHook, AppDispatch } from '../model/store';

interface SupportPageProps {
    account: Organization;
    useAppSelector: AppSelectorHook;
    useAppDispatch: () => AppDispatch;
}

const SupportPage: React.FC<SupportPageProps> = ({ account, useAppSelector, useAppDispatch }) => {
    const dispatch = useAppDispatch();

    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<MessageType>('info');
    const [showStatusBar, setShowStatusBar] = useState<StatusBarVisibility>('hide');

    return (
        <Section>
            <SupportComponent/>
            {message && <StatusBar show={showStatusBar} messageType={messageType} message={message} />}
        </Section>
    )
}

export default SupportPage