import { configureStore } from '@reduxjs/toolkit';

import { contentSlice } from '@the7ofdiamonds/ui-ux';

import { contactSlice } from '@the7ofdiamonds/communications';
import { scheduleSlice } from '@the7ofdiamonds/schedule';
import { accountSlice, authSlice } from '@the7ofdiamonds/gateway';
import {
  portfolioSlice,
  projectSlice,
  organizationSlice,
  githubSlice,
} from '@the7ofdiamonds/github-portfolio';
import { locationSlice } from '@the7ofdiamonds/locations';
import {
  productsSlice,
  productSlice,
  servicesSlice,
  serviceSlice,
} from '@the7ofdiamonds/products-services';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    account: accountSlice.reducer,
    contact: contactSlice.reducer,
    content: contentSlice.reducer,
    github: githubSlice.reducer,
    organization: organizationSlice.reducer,
    portfolio: portfolioSlice.reducer,
    project: projectSlice.reducer,
    location: locationSlice.reducer,
    products: productsSlice.reducer,
    product: productSlice.reducer,
    services: servicesSlice.reducer,
    service: serviceSlice.reducer,
    schedule: scheduleSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
