import React, { useState } from 'react'
import { TypedUseSelectorHook } from 'react-redux';

import { MessageType, Organization, Section, StatusBar, StatusBarVisibility } from '@the7ofdiamonds/ui-ux';
import { ResearchArchiveComponent } from '@the7ofdiamonds/communications';

interface ResearchArchivePageProps<RootState, AppDispatch> {
    useAppSelector: TypedUseSelectorHook<RootState>;
    useAppDispatch: () => AppDispatch;
}

const ResearchArchivePage: React.FC<ResearchArchivePageProps<any, any>> = ({ useAppSelector, useAppDispatch }) => {
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