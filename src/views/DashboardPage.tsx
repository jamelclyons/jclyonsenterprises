import React, { useState } from 'react'
import type { TypedUseSelectorHook } from 'react-redux';

import { MessageType, Section, StatusBarVisibility } from '@the7ofdiamonds/ui-ux';

interface DashboardPageProps<RootState, AppDispatch> {
    useAppSelector: TypedUseSelectorHook<RootState>;
    useAppDispatch: () => AppDispatch;
}

const DashboardPage: React.FC<DashboardPageProps<any, any>> = ({ useAppSelector, useAppDispatch }) => {
    const dispatch = useAppDispatch();

    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<MessageType>('info');
    const [showStatusBar, setShowStatusBar] = useState<StatusBarVisibility>('hide');

    return (
        <Section>Dashboard</Section>
    )
}

export default DashboardPage;