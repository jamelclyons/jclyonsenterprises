import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ContactMethods, Organization, SiteMapComponent } from '@the7ofdiamonds/ui-ux';
import { ContactBar } from '@the7ofdiamonds/communications';
import { getOrganization } from '@the7ofdiamonds/github-portfolio';

import { useAppSelector, useAppDispatch } from '@/model/hooks';

import { leftMenu, centerMenu, rightMenu, siteMap } from './Links'

import orgJson from '../organization.json';

const HeaderComponent = lazy(() => import('@the7ofdiamonds/ui-ux')
  .then(mod => ({ default: mod.HeaderComponent })));
const LoadingComponent = lazy(() => import('@the7ofdiamonds/ui-ux')
  .then(mod => ({ default: mod.LoadingComponent })));
const FooterComponent = lazy(() => import('@the7ofdiamonds/ui-ux')
  .then(mod => ({ default: mod.FooterComponent })));

const ContactPage = lazy(() => import('@the7ofdiamonds/communications')
  .then(mod => ({ default: mod.ContactPage })));

const UserPage = lazy(() => import('@the7ofdiamonds/communications')
  .then(mod => ({ default: mod.UserPage })));

const SchedulePage = lazy(() => import('@the7ofdiamonds/schedule')
  .then(mod => ({ default: mod.SchedulePage })));

const Login = lazy(() => import('@the7ofdiamonds/gateway')
  .then(mod => ({ default: mod.LoginPage })));
const Logout = lazy(() => import('@the7ofdiamonds/gateway')
  .then(mod => ({ default: mod.LogoutPage })));
const SignUp = lazy(() => import('@the7ofdiamonds/gateway')
  .then(mod => ({ default: mod.SignUpPage })));
const Forgot = lazy(() => import('@the7ofdiamonds/gateway')
  .then(mod => ({ default: mod.ForgotPage })));

const Portfolio = lazy(() => import('@the7ofdiamonds/github-portfolio')
  .then(mod => ({ default: mod.PortfolioPage })));

const ProductPage = lazy(() => import('@the7ofdiamonds/products-services')
  .then(mod => ({ default: mod.ProductPage })));
const ProductsPage = lazy(() => import('@the7ofdiamonds/products-services')
  .then(mod => ({ default: mod.ProductsPage })));
const ServicePage = lazy(() => import('@the7ofdiamonds/products-services')
  .then(mod => ({ default: mod.ServicePage })));
const ServicesPage = lazy(() => import('@the7ofdiamonds/products-services')
  .then(mod => ({ default: mod.ServicesPage })));

const AboutPage = lazy(() => import('./views/AboutPage'));
const Dashboard = lazy(() => import('./views/DashboardPage'));
const FAQPage = lazy(() => import('./views/FAQPage'));
const Home = lazy(() => import('./views/HomePage'));
const NotFound = lazy(() => import('./views/NotFoundPage'));
const ResearchArchivePage = lazy(() => import('./views/ResearchArchivePage'));
const ResearchPage = lazy(() => import('./views/ResearchPage'));
const SupportPage = lazy(() => import('./views/SupportPage'));

import ProtectedRoute from './ProtectedRoute';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const org = new Organization();
  org.fromJSON(orgJson);

  const [organization, setOrganization] = useState<Organization>(org);
  const [contactMethods, setContactMethods] = useState<ContactMethods | null>(null);

  const { organizationObject } = useAppSelector(
    (state) => state.organization);

  useEffect(() => {
    if (!organizationObject && org.login) {
      dispatch(getOrganization(org.login));
    }
  }, [org.login, organizationObject]);

  useEffect(() => {
    if (organizationObject) {
      const newOrg = new Organization(organizationObject);
      newOrg.fromJSON(orgJson)
      setOrganization(newOrg);
      setContactMethods(newOrg.contactMethods);
    }
  }, [organizationObject]);

  useEffect(() => {
    if (organization.contactMethods) {
      setContactMethods(organization.contactMethods);
    }
  }, [organization.contactMethods]);
console.log(siteMap)
  return (
    <>
      <HeaderComponent branding={'SEVEN TECH'} leftMenu={leftMenu} centerMenu={centerMenu} rightMenu={rightMenu} />
      <BrowserRouter>
        <Suspense fallback={<LoadingComponent page='' />}>
          <Routes>
            <Route path="/" element={<Home account={organization} useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
            <Route path="/about" element={<AboutPage account={organization} useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
            <Route path="/contact" element={<ContactPage account={organization} useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
            <Route path="/support" element={<SupportPage useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} account={organization} />} />
            <Route path="/faq" element={<FAQPage account={organization} useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
            <Route path="/research" element={<ResearchArchivePage useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
            <Route path="/research/:owner/:projectID" element={<ResearchPage useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />

            <Route path="/schedule" element={<SchedulePage useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />

            <Route path="/products" element={<ProductsPage useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
            <Route path="/products:productID" element={<ProductPage useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
            <Route path="/services" element={<ServicesPage useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
            <Route path="/services/:serviceID" element={<ServicePage useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />

            <Route path="/login" element={<Login useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
            <Route path="/logout" element={<Logout useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
            <Route path="/signup" element={<SignUp useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
            <Route path="/forgot" element={<Forgot useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />
              </ProtectedRoute>
            } />

            {/* <Route path="/portfolio" element={<Portfolio account={organization} portfolio={organization.portfolio} skills={organization.skills} useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} /> */}

            <Route path="/user/:userID" element={<UserPage useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter >
      <FooterComponent name='J.C. LYONS ENTERPRISES LLC'>
        {contactMethods && <ContactBar contactMethods={contactMethods} location={'footer'} />}
        <SiteMapComponent siteMap={siteMap} />
      </FooterComponent>
    </>
  );
}

export default App;
