import React, { useEffect, useState } from 'react'
import { TypedUseSelectorHook } from 'react-redux';
import { useParams } from 'react-router-dom';

import { DocumentComponent, Section, StatusBar } from '@the7ofdiamonds/ui-ux';
import { MessageType, Page, RepoContentQuery, StatusBarVisibility } from '@the7ofdiamonds/ui-ux';

import { ResearchComponent } from '@the7ofdiamonds/communications';

import { getRepoFile } from '@the7ofdiamonds/github-portfolio';

interface ResearchPageProps<RootState, AppDispatch> {
    useAppSelector: TypedUseSelectorHook<RootState>;
    useAppDispatch: () => AppDispatch;
}

const ResearchPage: React.FC<ResearchPageProps<any, any>> = ({ useAppSelector, useAppDispatch }) => {
    const dispatch = useAppDispatch();

    const { owner, projectID } = useParams<string>();

    const { content } = useAppSelector(state => state.content);

    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<MessageType>('info');
    const [showStatusBar, setShowStatusBar] = useState<StatusBarVisibility>('hide');

    const [query, setQuery] = useState<RepoContentQuery>(new RepoContentQuery(owner ?? '', projectID ?? '', 'research.md', ''));
    const [page, setPage] = useState<Page | null>(null);
    const [documentURL, setDocumentURL] = useState<string | null>(null);

    useEffect(() => {
        if (owner && projectID) {
            setQuery(new RepoContentQuery(owner, projectID, 'research.md', ''))
        }
    }, [owner, projectID])

    useEffect(() => {
        if (content) {
            setPage(new Page(content))
        }
    }, [content]);

    useEffect(() => {
        if (page && page.documentURL) {
            setDocumentURL(page.documentURL)
        }
    }, [page]);

    return (
        <Section>
            {documentURL ? (
                <DocumentComponent documentURL={documentURL} />
            ) : (
                <ResearchComponent<RepoContentQuery> query={query} getFile={getRepoFile} dispatch={dispatch} />
            )}
            {message && <StatusBar show={showStatusBar} messageType={messageType} message={message} />}
        </Section>
    )
}

export default ResearchPage