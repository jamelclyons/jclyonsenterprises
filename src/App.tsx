import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ContactMethods, Hours, Organization, Service, SiteMapComponent, Skills, Portfolio, Products, Services, Product } from '@the7ofdiamonds/ui-ux';
import { useAppSelector, useAppDispatch } from '@/model/hooks';

import { HeaderComponent, LoadingComponent, FooterComponent, VersionComponent, CopyrightComponent, NotFound } from '@the7ofdiamonds/ui-ux';

import { ContactBar, ContactPage, UserPage } from '@the7ofdiamonds/communications';

import { getOrganizationLocalData } from '@the7ofdiamonds/portfolio';
import { PortfolioPage, ProjectPage, SearchPage } from '@the7ofdiamonds/portfolio';

import { SchedulePage, getOfficeHoursLocalData } from '@the7ofdiamonds/schedule';

import { fetchProducts, fetchServices } from '@the7ofdiamonds/products-services';
import { ProductPage, ProductsPage, ServicePage, ServicesPage } from '@the7ofdiamonds/products-services';

import { LoginPage, LogoutPage, SignUpPage, ForgotPage } from '@the7ofdiamonds/gateway';

import { leftMenu, centerMenu, rightMenu, siteMap } from './Menus'

import AboutPage from './views/AboutPage';
import Dashboard from './views/DashboardPage';
import FAQPage from './views/FAQPage';
import Home from './views/HomePage';
import ResearchArchivePage from './views/ResearchArchivePage';
import ResearchPage from './views/ResearchPage';
import SupportPage from './views/SupportPage';

import ProtectedRoute from './ProtectedRoute';

import pkgJson from '../package.json';
import orgJson from '../organization.json';
import hoursJson from '../hours.json';
import skillsJson from '../skills.json';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const didFetchOrg = useRef(false);
  const didFetchPortfolio = useRef(false);
  const didFetchProducts = useRef(false);
  const didFetchServices = useRef(false);

  const [organization, setOrganization] = useState<Organization>(new Organization());
  const [services, setServices] = useState<Services | null>(null);
  const [products, setProducts] = useState<Products | null>(null);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [skills, setSkills] = useState<Skills>(new Skills());
  const [officeHours, setOfficeHours] = useState<Array<Hours>>([]);
  const [contactMethods, setContactMethods] = useState<ContactMethods | null>(null);


  const [name, setName] = useState<string | null>(null);
  const [company, setCompany] = useState<string | null>(null);
  const [appVersion, setAppVersion] = useState<string | null>(null);
  const [startingYear, setStartingYear] = useState<number | null>(null);

  const { organizationObject } = useAppSelector(
    (state) => state.organization);
  const { portfolioObject } = useAppSelector(
    (state) => state.portfolio
  );
  const { productsObject } = useAppSelector(
    (state) => state.products);
  const { servicesObject } = useAppSelector(
    (state) => state.services
  );

  useEffect(() => {
    if (orgJson?.contact_methods) {
      setContactMethods(new ContactMethods(orgJson?.contact_methods));
    }
  }, []);

  useEffect(() => {
    if (pkgJson?.version) {
      setAppVersion(`v${pkgJson.version}`);
    }
  }, []);

  useEffect(() => {
    if (!didFetchOrg.current && !organizationObject) {
      dispatch(getOrganizationLocalData({
        organization: orgJson,
        office_hours: hoursJson,
        skills: skillsJson,
        organizations: null
      }));
      didFetchOrg.current = true;
    }
  }, [didFetchOrg.current, organizationObject]);

  useEffect(() => {
    dispatch(getOfficeHoursLocalData(hoursJson));
  }, []);

  useEffect(() => {
    if (organizationObject) {
      setOrganization(new Organization(organizationObject));
    }
  }, [organizationObject]);

  useEffect(() => {
    if (portfolioObject) {
      setPortfolio(new Portfolio(portfolioObject));
    }
  }, [portfolioObject]);

  useEffect(() => {
    if (portfolio?.projects && portfolio.projects.size > 0) {
      const srvs = new Services();
      srvs.fromPortfolio(portfolio);
      if (srvs?.list && srvs.list.length > 0) {
        setServices(srvs)
      }

      const prds = new Products();
      prds.fromPortfolio(portfolio);
      if (prds?.list && prds.list.length > 0) {
        setProducts(prds)
      }
    }
  }, [portfolio?.projects]);
  // console.log(products)
  // console.log(services)
  // useEffect(() => {
  //   if (!didFetchProducts.current && !productsObject) {
  //     dispatch(fetchProducts());
  //     didFetchProducts.current = true;
  //   }
  // }, [didFetchProducts.current, productsObject]);

  // useEffect(() => {
  //   if (productsObject) {
  //     const newProducts = new Products(productsObject);
  //     setProducts(newProducts)
  //   }
  // }, [productsObject]);

  // useEffect(() => {
  //   if (!didFetchServices.current && !servicesObject) {
  //     dispatch(fetchServices());
  //     didFetchServices.current = true;
  //   }
  // }, [didFetchServices.current, servicesObject]);

  // useEffect(() => {
  //   if (servicesObject) {
  //     const newServices = new Services(servicesObject);
  //     setServices(newServices)
  //   }
  // }, [servicesObject]);

  useEffect(() => {
    if (organization?.name) {
      setName(organization.name)
    }
  }, [organization?.name]);

  useEffect(() => {
    if (organization?.company) {
      setCompany(organization.company)
    }
  }, [organization?.company]);

  useEffect(() => {
    if (organization?.startingYear && !Number.isNaN(organization.startingYear)) {
      setStartingYear(organization.startingYear)
    }
  }, [organization?.startingYear]);

  return (
    <BrowserRouter>
      <HeaderComponent branding={name} leftMenu={leftMenu} centerMenu={centerMenu} rightMenu={rightMenu} />
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

          <Route path="/login" element={<LoginPage useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
          <Route path="/logout" element={<LogoutPage useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
          <Route path="/signup" element={<SignUpPage useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
          <Route path="/forgot" element={<ForgotPage useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />
            </ProtectedRoute>
          } />

          <Route path="/portfolio" element={<PortfolioPage account={organization} portfolio={organization.portfolio} skills={organization.skills} useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />
          <Route path="/portfolio/:owner/:projectID" element={<ProjectPage account={organization} portfolio={organization.portfolio} skills={organization.skills} useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />

          <Route path="/taxonomy/:taxonomy/:type/:term" element={<SearchPage account={organization} skills={skills} />} />

          <Route path="/user/:userID" element={<UserPage useAppSelector={useAppSelector} useAppDispatch={useAppDispatch} />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <FooterComponent>
        {contactMethods && <ContactBar contactMethods={contactMethods} location={'footer'} />}
        <SiteMapComponent siteMap={siteMap} />
        {company && <CopyrightComponent startingYear={startingYear} name={company} />}
        {appVersion && <VersionComponent version={appVersion} />}
      </FooterComponent>
    </BrowserRouter >
  );
}

export default App;
