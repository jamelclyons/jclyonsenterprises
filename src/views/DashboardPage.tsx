import React, { useState } from 'react'

import { MessageType, Section, StatusBarVisibility } from '@the7ofdiamonds/ui-ux';

import type { AppSelectorHook, AppDispatch } from '../model/store';

interface DashboardPageProps {
    useAppSelector: AppSelectorHook;
    useAppDispatch: () => AppDispatch;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ useAppSelector, useAppDispatch }) => {
    const dispatch = useAppDispatch();

    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<MessageType>('info');
    const [showStatusBar, setShowStatusBar] = useState<StatusBarVisibility>('hide');

    return (
        <Section>Dashboard</Section>
    )
}

export default DashboardPage;