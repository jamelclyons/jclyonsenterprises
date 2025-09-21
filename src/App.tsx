import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ContactMethods, Hours, Organization, Service, SiteMapComponent, Skills, Portfolio, Products, Services, Product } from '@the7ofdiamonds/ui-ux';
import { ContactBar } from '@the7ofdiamonds/communications';
import { getOrganization, getPortfolioDetails } from '@the7ofdiamonds/github-portfolio';

import { useAppSelector, useAppDispatch } from '@/model/hooks';

import { leftMenu, centerMenu, rightMenu, siteMap } from './Menus'

import orgJson from '../organization.json';
import skillsJson from '../skills.json';

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

const PortfolioPage = lazy(() => import('@the7ofdiamonds/github-portfolio')
  .then(mod => ({ default: mod.PortfolioPage })));
const Project = lazy(() => import('@the7ofdiamonds/github-portfolio')
  .then(mod => ({ default: mod.ProjectPage })));

const Search = lazy(() => import('@the7ofdiamonds/github-portfolio')
  .then(mod => ({ default: mod.SearchPage })));

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

  const didFetchOrg = useRef(false);
  const didFetchPortfolio = useRef(false);

  const [organization, setOrganization] = useState<Organization>(new Organization());
  const [services, setServices] = useState<Services | null>(null);
  const [products, setProducts] = useState<Products | null>(null);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [skills, setSkills] = useState<Skills>(new Skills());
  const [officeHours, setOfficeHours] = useState<Array<Hours>>([]);
  const [contactMethods, setContactMethods] = useState<ContactMethods | null>(null);

  const { organizationObject } = useAppSelector(
    (state) => state.organization);
  const { portfolioObject } = useAppSelector(
    (state) => state.portfolio
  );

  useEffect(() => {
    if (!didFetchOrg.current && !organizationObject && orgJson.login) {
      dispatch(getOrganization(orgJson.login));
      didFetchOrg.current = true;
    }
  }, [organizationObject, orgJson.login]);

  useEffect(() => {
    if (organizationObject) {
      const newOrg = new Organization(organizationObject);
      newOrg.fromJSON(orgJson);
      setContactMethods(newOrg.contactMethods);
      setOrganization(newOrg);
    }
  }, [organizationObject]);

  useEffect(() => {
    setSkills(new Skills({ list: skillsJson }))
  }, []);

  useEffect(() => {
    if (skills?.list && skills.list.length > 0) {
      setOrganization(prevOrg => {
        const newOrg = new Organization(prevOrg.toOrganizationObject());
        newOrg.setSkills(skills);
        return newOrg;
      });
    }
  }, [skills?.list]);

  useEffect(() => {
    setOfficeHours([
      new Hours(true, 'SUN', '01:00 PM', '05:00 PM'),
      new Hours(true, 'MON', '09:00 AM', '05:00 PM'),
      new Hours(true, 'TUE', '09:00 AM', '05:00 PM'),
      new Hours(true, 'WED', '09:00 AM', '05:00 PM'),
      new Hours(true, 'THU', '09:00 AM', '05:00 PM'),
      new Hours(true, 'FRI', '08:00 AM', '04:00 PM'),
      new Hours(false, 'SAT'),
    ]);
  }, []);

  useEffect(() => {
    if (officeHours.length > 0) {
      setOrganization(prevOrg => {
        const newOrg = new Organization(prevOrg.toOrganizationObject());
        newOrg.setOfficeHours(officeHours);
        return newOrg;
      });
    }
  }, [officeHours]);

  useEffect(() => {
    const fetchPortfolio = async (portfolio: Portfolio) => {
      const portfolioObject = await dispatch(getPortfolioDetails(portfolio)).unwrap();
      if (portfolioObject) {
        setOrganization(prevOrg => {
          const newOrg = new Organization(prevOrg.toOrganizationObject());
          setPortfolio(organization?.portfolio);
          newOrg.setPortfolio(new Portfolio(portfolioObject));
          return newOrg;
        });
      }
    };

    if (!didFetchPortfolio.current && organization?.portfolio && organization.portfolio.projects && organization?.portfolio.projects.size > 0) {
      fetchPortfolio(organization.portfolio);
      didFetchPortfolio.current = true;
    }
  }, [organization?.portfolio]);

  useEffect(() => {
    if (portfolio?.projects && portfolio.projects.size > 0) {
      const srvs = new Services();
      srvs.fromPortfolio(portfolio);
      const list: Array<Service> = [
        new Service({
          id: '1',
          title: 'APP Development',
          gallery: {
            icons: [{
              id: 'apple-app-store',
              title: 'Apple App Store',
              url: null,
              class_name: 'fa-brands fa-app-store-ios'
            },
            {
              id: 'chrome',
              title: 'Google chrome Browser',
              url: null,
              class_name: 'fa-brands fa-chrome'
            },
            {
              id: 'safari',
              title: "Apple's Safari Browser",
              url: null,
              class_name: 'fa-brands fa-safari'
            },
            {
              id: 'edge',
              title: "Microsoft's Edge Browser",
              url: null,
              class_name: 'fa-brands fa-edge'
            }]
          },
          description: 'Build a Custom Cross-Platform Application',
          pricing: { range: true, starting_price: 66100 },
          action_word: 'build app'
        }),
        new Service({
          id: '2',
          title: 'Web APP Development',
          gallery: {
            icons: [{
              id: 'chrome',
              title: 'Google chrome Browser',
              url: null,
              class_name: 'fa-brands fa-chrome'
            },
            {
              id: 'safari',
              title: "Apple's Safari Browser",
              url: null,
              class_name: 'fa-brands fa-safari'
            },
            {
              id: 'edge',
              title: "Microsoft's Edge Browser",
              url: null,
              class_name: 'fa-brands fa-edge'
            }]
          },
          description: 'Build a Custom Web Application',
          pricing: { range: true, starting_price: 6610 },
          action_word: 'build web app'
        }),
      ];

      srvs.setList([...srvs.list, ...list])
      setServices(srvs)
      setOrganization(prevOrg => {
        const newOrg = new Organization(prevOrg.toOrganizationObject());
        newOrg.setServices(srvs);
        return newOrg;
      });
    }
  }, [portfolio]);

  useEffect(() => {
    if (portfolio?.projects && portfolio.projects.size > 0) {
      const prds = new Products();
      prds.fromPortfolio(portfolio);
      const list: Array<Product> = [
    
      ];
      prds.setList([...prds.list, ...list])
      setProducts(prds)
      setOrganization(prevOrg => {
        const newOrg = new Organization(prevOrg.toOrganizationObject());
        newOrg.setProducts(prds);
        return newOrg;
      });
    }
  }, [portfolio]);

  return (
    <BrowserRouter>
      <HeaderComponent branding={'SEVEN TECH'} leftMenu={leftMenu} centerMenu={centerMenu} rightMenu={rightMenu} />
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

          <Route path="/products" element={<ProductsPage useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} account={organization} />} />
          <Route path="/product/:productID" element={<ProductPage useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} account={organization} />} />
          <Route path="/services" element={<ServicesPage account={organization} useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
          <Route path="/service/:serviceID" element={<ServicePage useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} account={organization} />} />

          <Route path="/login" element={<Login useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
          <Route path="/logout" element={<Logout useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
          <Route path="/signup" element={<SignUp useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
          <Route path="/forgot" element={<Forgot useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />
            </ProtectedRoute>
          } />

          <Route path="/portfolio" element={<PortfolioPage account={organization} portfolio={organization.portfolio} skills={organization.skills} useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
          <Route path="/portfolio/:owner/:projectID" element={<Project account={organization} portfolio={organization.portfolio} skills={organization.skills} useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />

          <Route path="/taxonomy/:taxonomy/:type/:term" element={<Search account={organization} skills={skills} />} />

          <Route path="/user/:userID" element={<UserPage useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <FooterComponent name='J.C. LYONS ENTERPRISES LLC'>
        {contactMethods && <ContactBar contactMethods={contactMethods} location={'footer'} />}
        <SiteMapComponent siteMap={siteMap} />
      </FooterComponent>
    </BrowserRouter >
  );
}

export default App;
