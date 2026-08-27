import React, { useState } from 'react'

import { MessageType, Organization, Section, StatusBar, StatusBarVisibility } from '@the7ofdiamonds/ui-ux';
import { ResearchArchiveComponent } from '@the7ofdiamonds/communications';

import type { AppSelectorHook, AppDispatch } from '../model/store';

interface ResearchArchivePageProps {
    useAppSelector: AppSelectorHook;
    useAppDispatch: () => AppDispatch;
}

const ResearchArchivePage: React.FC<ResearchArchivePageProps> = ({ useAppSelector, useAppDispatch }) => {
    const dispatch = useAppDispatch();

    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<MessageType>('info');
    const [showStatusBar, setShowStatusBar] = useState<StatusBarVisibility>('hide');

    return (
        <Section>
            <ResearchArchiveComponent/>
            {message && <StatusBar show={showStatusBar} messageType={messageType} message={message} />}
        </Section>
    )
}

export default ResearchArchivePage