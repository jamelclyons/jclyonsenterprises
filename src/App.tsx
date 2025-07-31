import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Link, User, Skills, ContactMethods, Organization, Project, Account } from '@the7ofdiamonds/ui-ux';
import { ContactBar } from '@the7ofdiamonds/communications';
import { getAuthenticatedUserAccount, PortfolioPage } from '@the7ofdiamonds/github-portfolio';

import { useAppSelector, useAppDispatch } from '@/model/hooks';

const HeaderComponent = lazy(() => import('@the7ofdiamonds/ui-ux')
  .then(mod => ({ default: mod.HeaderComponent })));
const LoadingComponent = lazy(() => import('@the7ofdiamonds/ui-ux')
  .then(mod => ({ default: mod.LoadingComponent })));
const FooterComponent = lazy(() => import('@the7ofdiamonds/ui-ux')
  .then(mod => ({ default: mod.FooterComponent })));

const AboutPage = lazy(() => import('@the7ofdiamonds/communications')
  .then(mod => ({ default: mod.AboutPage })));
const ContactPage = lazy(() => import('@the7ofdiamonds/communications')
  .then(mod => ({ default: mod.ContactPage })));
const SupportPage = lazy(() => import('@the7ofdiamonds/communications')
  .then(mod => ({ default: mod.SupportPage })));
const UserPage = lazy(() => import('@the7ofdiamonds/communications')
  .then(mod => ({ default: mod.UserPage })));
const FAQPage = lazy(() => import('@the7ofdiamonds/communications')
  .then(mod => ({ default: mod.FAQPage })));
const ResearchPage = lazy(() => import('@the7ofdiamonds/communications')
  .then(mod => ({ default: mod.ResearchPage })));

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
const Dashboard = lazy(() => import('@the7ofdiamonds/gateway')
  .then(mod => ({ default: mod.DashboardPage })));

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

const Home = lazy(() => import('./views/Home'));
const NotFound = lazy(() => import('./views/NotFound'));

import ProtectedRoute from './ProtectedRoute';

const App: React.FC = () => {
  const [leftMenu, setLeftMenu] = useState<Link[]>([]);
  const [centerMenu, setCenterMenu] = useState<Link[]>([]);
  const [rightMenu, setRightMenu] = useState<Link[]>([]);

  useEffect(() => {
    const redirect = sessionStorage.redirect;
    if (redirect) {
      sessionStorage.removeItem('redirect');
      window.history.replaceState(null, '', redirect);
    }
  }, []);

  const aboutPage = new Link();
  aboutPage.setHref('/about');
  aboutPage.setText('About');
  const portfolioPage = new Link();
  portfolioPage.setHref('/portfolio');
  portfolioPage.setText('Portfolio');
  const productsPage = new Link();
  productsPage.setHref('/products');
  productsPage.setText('Products');
  const servicesPage = new Link();
  servicesPage.setHref('/services')
  servicesPage.setText('Services')

  useEffect(() => {
    setLeftMenu([aboutPage, portfolioPage])
  }, []);

  useEffect(() => {
    setCenterMenu([aboutPage, portfolioPage, productsPage, servicesPage])
  }, []);

  useEffect(() => {
    setRightMenu([productsPage, servicesPage])
  }, []);

  return (
    <>
      <HeaderComponent branding={'SEVEN TECH'} leftMenu={leftMenu} centerMenu={centerMenu} rightMenu={rightMenu} />
      <BrowserRouter>
        <Suspense fallback={<LoadingComponent page='' />}>
          <Routes>
            <Route path="/" element={<Home useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
            <Route path="/about" element={<AboutPage useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} account={new Account} />} />
            <Route path="/contact" element={<ContactPage account={new Account} useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
            <Route path="/support" element={<SupportPage useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
            <Route path="/faq" element={<FAQPage useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
            <Route path="/research" element={<ResearchPage useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />

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
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/portfolio" element={<Portfolio account={new Account} portfolio={null} skills={null} />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter >
      <FooterComponent name='J.C. LYONS ENTERPRISES LLC'>
        {/* {contactMethods && <ContactBar contactMethods={contactMethods} location={'footer'} />} */}
      </FooterComponent>
    </>
  );
}

export default App;
