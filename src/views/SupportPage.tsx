import React, { useState } from 'react'
import { TypedUseSelectorHook } from 'react-redux';

import { MessageType, Organization, Section, StatusBar, StatusBarVisibility } from '@the7ofdiamonds/ui-ux'
import { SupportComponent } from '@the7ofdiamonds/communications';

interface SupportPageProps<RootState, AppDispatch> {
    account: Organization;
    useAppSelector: TypedUseSelectorHook<RootState>;
    useAppDispatch: () => AppDispatch;
}

const SupportPage: React.FC<SupportPageProps<any, any>> = ({ account, useAppSelector, useAppDispatch }) => {
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