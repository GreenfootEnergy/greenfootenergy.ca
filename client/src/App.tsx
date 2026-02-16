import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { FavoritesProvider } from "./lib/favorites-context";
import { LanguageProvider } from "./lib/i18n";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";

import StickyBookingButton from "@/components/ui/sticky-booking-button";
import { ErrorBoundary } from "@/components/error-boundary";

const LandingPage = lazy(() => import("@/pages/landing"));
const MiniSplitPage = lazy(() => import("@/pages/mini-split"));
const MiniSplitLocationPage = lazy(() => import("@/pages/mini-split-location"));
const DuctedCentralPage = lazy(() => import("@/pages/ducted-central"));
const GeothermalPage = lazy(() => import("@/pages/geothermal"));
const VentilationPage = lazy(() => import("@/pages/ventilation"));
const SolarPage = lazy(() => import("@/pages/solar"));
const SolarLocationPage = lazy(() => import("@/pages/solar-location"));
const AboutUsPage = lazy(() => import("@/pages/about-us"));
const WhyChooseUsPage = lazy(() => import("@/pages/why-choose-us"));
const FinancingPage = lazy(() => import("@/pages/financing"));
const ContactUsPage = lazy(() => import("@/pages/contact-us"));
const FAQPage = lazy(() => import("@/pages/faq"));
const SweepstakesPage = lazy(() => import("@/pages/sweepstakes"));
const ChilliwackPage = lazy(() => import("@/pages/chilliwack"));
const TwoDollarsADayPage = lazy(() => import("@/pages/two-dollars-a-day"));
const OilToHeatPumpPage = lazy(() => import("@/pages/oil-to-heat-pump"));
const OilToHeatPump15kPage = lazy(() => import("@/pages/oil-to-heat-pump-15k"));
const CareersPage = lazy(() => import("@/pages/careers"));
const AdminPage = lazy(() => import("@/pages/admin"));
const AdminLoginPage = lazy(() => import("@/pages/admin-login"));
const BlogPage = lazy(() => import("@/pages/blog"));
const BlogPostPage = lazy(() => import("@/pages/blog-post"));
const SpecialsPromotionsPage = lazy(() => import("@/pages/specials-promotions"));
const SpecialsProvincePage = lazy(() => import("@/pages/specials-province"));
const ProvincialIncentivesPage = lazy(() => import("@/pages/provincial-incentives"));
const KidsClubPage = lazy(() => import("@/pages/kids-club"));
const ServiceYetiPage = lazy(() => import("@/pages/service-yeti"));
const CommercialSolarPage = lazy(() => import("@/pages/commercial-solar"));
const CommercialSolarLocationPage = lazy(() => import("@/pages/commercial-solar-location"));
const ResidentialSolarPage = lazy(() => import("@/pages/residential-solar"));
const HeatPumpsACPage = lazy(() => import("@/pages/heat-pumps-ac"));
const WaterHeatersPage = lazy(() => import("@/pages/water-heaters"));
const GlossaryPage = lazy(() => import("@/pages/glossary"));
const AppSetupPage = lazy(() => import("@/pages/app-setup"));
const SnowCoversPage = lazy(() => import("@/pages/snow-covers"));
const MembershipPlansPage = lazy(() => import("@/pages/membership-plans"));
const DualFuelHeatingSystemsPage = lazy(() => import("@/pages/dual-fuel-heating-systems"));
const CommercialHVACPage = lazy(() => import("@/pages/commercial-hvac"));
const CommercialServicesPage = lazy(() => import("@/pages/commercial-services"));
const GeneratorsPage = lazy(() => import("@/pages/generators"));
const ReferralPage = lazy(() => import("@/pages/referral"));
const SprayfoamInsulationPage = lazy(() => import("@/pages/sprayfoam-insulation"));
const SprayfoamLocationPage = lazy(() => import("@/pages/sprayfoam-location"));
const BattPolyInsulationPage = lazy(() => import("@/pages/batt-poly-insulation"));
const BlownInInsulationPage = lazy(() => import("@/pages/blown-in-insulation"));
const UrbanYetiAppliancesPage = lazy(() => import("@/pages/urban-yeti-appliances"));
const PeakThermostatPage = lazy(() => import("@/pages/peak-thermostat"));
const SoundproofingPage = lazy(() => import("@/pages/soundproofing"));
const AirConditioningPage = lazy(() => import("@/pages/air-conditioning"));
const ACLocationPage = lazy(() => import("@/pages/ac-location"));
const CozySubscriptionLP = lazy(() => import("@/pages/lp-cozy-subscription"));
const NBInsulationRebatesLP = lazy(() => import("@/pages/lp-nb-insulation-rebates"));
const NLInsulationRebatesLP = lazy(() => import("@/pages/lp-nl-insulation-rebates"));
const BCInsulationRebatesLP = lazy(() => import("@/pages/lp-bc-insulation-rebates"));
const PEIInsulationRebatesLP = lazy(() => import("@/pages/lp-pei-insulation-rebates"));
const NSInsulationRebatesLP = lazy(() => import("@/pages/lp-ns-insulation-rebates"));
const NationalInsulationRebatesLP = lazy(() => import("@/pages/lp-national-insulation-rebates"));
const PIEERProgramPage = lazy(() => import("@/pages/lp-pieer-program"));
const RefurbishedHeatPumpsPage = lazy(() => import("@/pages/lp-refurbished-heat-pumps"));
const NewHome15kRebateLP = lazy(() => import("@/pages/lp-new-home-15k-rebate"));
const HYGNPage = lazy(() => import("@/pages/hygn"));
const ReviewOurServicesPage = lazy(() => import("@/pages/review-our-services"));
const GoogleReviewsPage = lazy(() => import("@/pages/google-reviews-page"));
const GEHeatPumpsPage = lazy(() => import("@/pages/brands/ge-heat-pumps"));
const GridlessHeatPumpsPage = lazy(() => import("@/pages/brands/gridless-heat-pumps"));
const KerrHeatPumpsPage = lazy(() => import("@/pages/brands/kerr-heat-pumps"));
const MitsubishiHeatPumpsPage = lazy(() => import("@/pages/brands/mitsubishi-heat-pumps"));
const LGHeatPumpsPage = lazy(() => import("@/pages/brands/lg-heat-pumps"));
const DaikinHeatPumpsPage = lazy(() => import("@/pages/brands/daikin-heat-pumps"));
const PrivacyPolicyPage = lazy(() => import("@/pages/privacy-policy"));
const TermsOfUsePage = lazy(() => import("@/pages/terms-of-use"));
const NotFound = lazy(() => import("@/pages/not-found"));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#8dc63f] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium">Loading...</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        {/* English routes */}
        <Route path="/" component={LandingPage} />
        <Route path="/services/mini-split-heat-pumps" component={MiniSplitPage} />
        <Route path="/heat-pump-experts/:slug" component={MiniSplitLocationPage} />
        <Route path="/services/ducted-central-heat-pumps" component={DuctedCentralPage} />
        <Route path="/services/geothermal-heat-pumps" component={GeothermalPage} />
        <Route path="/services/indoor-air-quality-ventilation" component={VentilationPage} />
        <Route path="/services/solar-energy" component={SolarPage} />
        <Route path="/solar-experts/:slug" component={SolarLocationPage} />
        <Route path="/about-us" component={AboutUsPage} />
        <Route path="/why-choose-us" component={WhyChooseUsPage} />
        <Route path="/financing" component={FinancingPage} />
        <Route path="/contact-us" component={ContactUsPage} />
        <Route path="/faq" component={FAQPage} />
        <Route path="/sweepstakes" component={SweepstakesPage} />
        <Route path="/chilliwack" component={ChilliwackPage} />
        <Route path="/2-a-day" component={TwoDollarsADayPage} />
        <Route path="/lp/oil-to-heat-pump-rebate-up-to-22k" component={OilToHeatPumpPage} />
        <Route path="/lp/oil-to-heat-pump-rebate-up-to-15k" component={OilToHeatPump15kPage} />
        <Route path="/careers" component={CareersPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/admin/login" component={AdminLoginPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/blog/:slug" component={BlogPostPage} />
        <Route path="/specials-promotions" component={SpecialsPromotionsPage} />
        <Route path="/specials/:province" component={SpecialsProvincePage} />
        <Route path="/provincial-incentives" component={ProvincialIncentivesPage} />
        <Route path="/kids-club" component={KidsClubPage} />
        <Route path="/services/maintenance-service-yeti" component={ServiceYetiPage} />
        <Route path="/services/commercial-solar" component={CommercialSolarPage} />
        <Route path="/services/commercial-solar/:slug" component={CommercialSolarLocationPage} />
        <Route path="/services/residential-solar" component={ResidentialSolarPage} />
        <Route path="/services/heat-pumps-and-air-conditioning" component={HeatPumpsACPage} />
        <Route path="/services/water-heaters" component={WaterHeatersPage} />
        <Route path="/membership-plans" component={MembershipPlansPage} />
        <Route path="/heat-pump-glossary" component={GlossaryPage} />
        <Route path="/app-setup" component={AppSetupPage} />
        <Route path="/heat-pump-snow-covers-protect-your-investment" component={SnowCoversPage} />
        <Route path="/services/dual-fuel-heating-systems" component={DualFuelHeatingSystemsPage} />
        <Route path="/services/dual-fuel-heating">
          <Redirect to="/services/dual-fuel-heating-systems" />
        </Route>
        <Route path="/services/remote-monitoring">
          <Redirect to="/services/peak-thermostat#remote-monitoring" />
        </Route>
        <Route path="/services/multi-unit-appliances">
          <Redirect to="/services/urban-yeti-appliances" />
        </Route>
        <Route path="/services/commercial-hvac" component={CommercialHVACPage} />
        <Route path="/services/commercial">
          <Redirect to="/services/commercial-services" />
        </Route>
        <Route path="/services/commercial-services" component={CommercialServicesPage} />
        <Route path="/services/generators" component={GeneratorsPage} />
        <Route path="/referral" component={ReferralPage} />
        <Route path="/services/sprayfoam-insulation" component={SprayfoamInsulationPage} />
        <Route path="/services/sprayfoam-insulation/halifax">
          <Redirect to="/services/sprayfoam-insulation/dartmouth" />
        </Route>
        <Route path="/services/sprayfoam-insulation/st-johns">
          <Redirect to="/services/sprayfoam-insulation/paradise" />
        </Route>
        <Route path="/services/sprayfoam-insulation/tracadie">
          <Redirect to="/services/sprayfoam-insulation/tracadie-sheila" />
        </Route>
        <Route path="/services/sprayfoam-insulation/vancouver">
          <Redirect to="/services/sprayfoam-insulation/surrey" />
        </Route>
        <Route path="/services/sprayfoam-insulation/:slug" component={SprayfoamLocationPage} />
        <Route path="/services/spray-foam-insulation-halifax">
          <Redirect to="/services/sprayfoam-insulation/dartmouth" />
        </Route>
        <Route path="/services/spray-foam-insulation-fredericton">
          <Redirect to="/services/sprayfoam-insulation/fredericton" />
        </Route>
        <Route path="/services/sprayfoam-insulation-charlottetown">
          <Redirect to="/services/sprayfoam-insulation/charlottetown" />
        </Route>
        <Route path="/spray-foam/insulation">
          <Redirect to="/services/sprayfoam-insulation" />
        </Route>
        <Route path="/services/spray-foam-insulation">
          <Redirect to="/services/sprayfoam-insulation" />
        </Route>
        <Route path="/services/batt-poly-insulation" component={BattPolyInsulationPage} />
        <Route path="/services/blown-in-insulation" component={BlownInInsulationPage} />
        <Route path="/services/urban-yeti-appliances" component={UrbanYetiAppliancesPage} />
        <Route path="/services/peak-thermostat" component={PeakThermostatPage} />
        <Route path="/services/soundproofing" component={SoundproofingPage} />
        <Route path="/services/air-conditioning" component={AirConditioningPage} />
        <Route path="/air-conditioning-experts/:slug" component={ACLocationPage} />
        <Route path="/lp/cozy-subscription" component={CozySubscriptionLP} />
        <Route path="/lp/new-brunswick-insulation-rebates" component={NBInsulationRebatesLP} />
        <Route path="/lp/newfoundland-labrador-insulation-rebates" component={NLInsulationRebatesLP} />
        <Route path="/lp/british-columbia-insulation-rebates" component={BCInsulationRebatesLP} />
        <Route path="/lp/prince-edward-island-insulation-rebates" component={PEIInsulationRebatesLP} />
        <Route path="/lp/nova-scotia-insulation-rebates" component={NSInsulationRebatesLP} />
        <Route path="/lp/national-insulation-rebates" component={NationalInsulationRebatesLP} />
        <Route path="/lp/pieer-program" component={PIEERProgramPage} />
        <Route path="/lp/refurbished-heat-pumps" component={RefurbishedHeatPumpsPage} />
        <Route path="/lp/new-home-15k-rebate" component={NewHome15kRebateLP} />
        <Route path="/hygn" component={HYGNPage} />
        <Route path="/review-our-services" component={ReviewOurServicesPage} />
        <Route path="/google-reviews-page" component={GoogleReviewsPage} />
        <Route path="/brands/general-electric-heat-pumps" component={GEHeatPumpsPage} />
        <Route path="/brands/gridless-heat-pumps" component={GridlessHeatPumpsPage} />
        <Route path="/brands/kerr-heat-pumps" component={KerrHeatPumpsPage} />
        <Route path="/brands/mitsubishi-electric-heat-pumps" component={MitsubishiHeatPumpsPage} />
        <Route path="/brands/lg-heat-pumps" component={LGHeatPumpsPage} />
        <Route path="/brands/daikin-heat-pumps" component={DaikinHeatPumpsPage} />
        
        {/* French Canadian routes (fr-ca prefix) - URLs match old sitemap */}
        <Route path="/fr-ca" component={LandingPage} />
        <Route path="/fr-ca/services/mini-split-heat-pumps" component={MiniSplitPage} />
        <Route path="/fr-ca/services/pompes-a-chaleur-mini-split" component={MiniSplitPage} />
        <Route path="/fr-ca/services/ducted-central-heat-pumps" component={DuctedCentralPage} />
        <Route path="/fr-ca/services/pompes-a-chaleur-a-canalisations-centrales" component={DuctedCentralPage} />
        <Route path="/fr-ca/services/geothermal-heat-pumps" component={GeothermalPage} />
        <Route path="/fr-ca/services/pompes-a-chaleur-geothermiques" component={GeothermalPage} />
        <Route path="/fr-ca/services/indoor-air-quality-ventilation" component={VentilationPage} />
        <Route path="/fr-ca/services/qualite-air-interieur-ventilation" component={VentilationPage} />
        <Route path="/fr-ca/services/solar-energy" component={SolarPage} />
        <Route path="/fr-ca/services/energie-solaire" component={SolarPage} />
        <Route path="/fr-ca/about-us" component={AboutUsPage} />
        <Route path="/fr-ca/a-propos-de-nous" component={AboutUsPage} />
        <Route path="/fr-ca/why-choose-us" component={WhyChooseUsPage} />
        <Route path="/fr-ca/pourquoi-nous-choisir" component={WhyChooseUsPage} />
        <Route path="/fr-ca/financing" component={FinancingPage} />
        <Route path="/fr-ca/financement" component={FinancingPage} />
        <Route path="/fr-ca/contact-us" component={ContactUsPage} />
        <Route path="/fr-ca/communiquez-avec-nous" component={ContactUsPage} />
        <Route path="/fr-ca/review-our-services" component={ReviewOurServicesPage} />
        <Route path="/fr-ca/evaluez-nos-services" component={ReviewOurServicesPage} />
        <Route path="/fr-ca/google-reviews-page" component={GoogleReviewsPage} />
        <Route path="/fr-ca/avis-google" component={GoogleReviewsPage} />
        <Route path="/fr-ca/faq" component={FAQPage} />
        <Route path="/fr-ca/careers" component={CareersPage} />
        <Route path="/fr-ca/carrieres" component={CareersPage} />
        <Route path="/fr-ca/blog" component={BlogPage} />
        <Route path="/fr-ca/blogue" component={BlogPage} />
        <Route path="/fr-ca/blog/:slug" component={BlogPostPage} />
        <Route path="/fr-ca/blogue/:slug" component={BlogPostPage} />
        <Route path="/fr-ca/specials-promotions" component={SpecialsPromotionsPage} />
        <Route path="/fr-ca/offres-et-promotions" component={SpecialsPromotionsPage} />
        <Route path="/fr-ca/provincial-incentives" component={ProvincialIncentivesPage} />
        <Route path="/fr-ca/programmes-encouragement-gouvernementaux" component={ProvincialIncentivesPage} />
        <Route path="/fr-ca/kids-club" component={KidsClubPage} />
        <Route path="/fr-ca/club-pour-enfants" component={KidsClubPage} />
        <Route path="/fr-ca/services/maintenance-service-yeti" component={ServiceYetiPage} />
        <Route path="/fr-ca/services/entretien-et-reparation" component={ServiceYetiPage} />
        <Route path="/fr-ca/services/commercial-solar" component={CommercialSolarPage} />
        <Route path="/fr-ca/services/solaire-commercial" component={CommercialSolarPage} />
        <Route path="/fr-ca/services/residential-solar" component={ResidentialSolarPage} />
        <Route path="/fr-ca/services/solaire-residentiel" component={ResidentialSolarPage} />
        <Route path="/fr-ca/services/heat-pumps-and-air-conditioning" component={HeatPumpsACPage} />
        <Route path="/fr-ca/services/pompes-a-chaleur-et-climatisation" component={HeatPumpsACPage} />
        <Route path="/fr-ca/services/water-heaters" component={WaterHeatersPage} />
        <Route path="/fr-ca/services/chauffe-eau-a-pompe-a-chaleur" component={WaterHeatersPage} />
        <Route path="/fr-ca/membership-plans" component={MembershipPlansPage} />
        <Route path="/fr-ca/regimes-adhesion" component={MembershipPlansPage} />
        <Route path="/fr-ca/heat-pump-glossary" component={GlossaryPage} />
        <Route path="/fr-ca/glossaire-des-thermopompes" component={GlossaryPage} />
        <Route path="/fr-ca/app-setup" component={AppSetupPage} />
        <Route path="/fr-ca/configuration-application" component={AppSetupPage} />
        <Route path="/fr-ca/heat-pump-snow-covers-protect-your-investment" component={SnowCoversPage} />
        <Route path="/fr-ca/couvertures-neige-thermopompes" component={SnowCoversPage} />
        <Route path="/fr-ca/services/dual-fuel-heating-systems" component={DualFuelHeatingSystemsPage} />
        <Route path="/fr-ca/services/systemes-de-chauffage-a-double-combustible" component={DualFuelHeatingSystemsPage} />
        <Route path="/fr-ca/services/commercial-hvac" component={CommercialHVACPage} />
        <Route path="/fr-ca/services/cvc-commercial" component={CommercialHVACPage} />
        <Route path="/fr-ca/services/commercial-services" component={CommercialServicesPage} />
        <Route path="/fr-ca/services/services-commerciaux" component={CommercialServicesPage} />
        <Route path="/fr-ca/services/generators" component={GeneratorsPage} />
        <Route path="/fr-ca/services/generateurs-denergie-de-secours" component={GeneratorsPage} />
        <Route path="/fr-ca/referral" component={ReferralPage} />
        <Route path="/fr-ca/services/sprayfoam-insulation" component={SprayfoamInsulationPage} />
        <Route path="/fr-ca/services/isolation-en-mousse-pulverisee" component={SprayfoamInsulationPage} />
        <Route path="/fr-ca/services/sprayfoam-insulation/halifax">
          <Redirect to="/fr-ca/services/sprayfoam-insulation/dartmouth" />
        </Route>
        <Route path="/fr-ca/services/sprayfoam-insulation/st-johns">
          <Redirect to="/fr-ca/services/sprayfoam-insulation/paradise" />
        </Route>
        <Route path="/fr-ca/services/sprayfoam-insulation/tracadie">
          <Redirect to="/fr-ca/services/sprayfoam-insulation/tracadie-sheila" />
        </Route>
        <Route path="/fr-ca/services/sprayfoam-insulation/vancouver">
          <Redirect to="/fr-ca/services/sprayfoam-insulation/surrey" />
        </Route>
        <Route path="/fr-ca/services/sprayfoam-insulation/:slug" component={SprayfoamLocationPage} />
        <Route path="/fr-ca/services/isolation-en-mousse-pulverisee/halifax">
          <Redirect to="/fr-ca/services/isolation-en-mousse-pulverisee/dartmouth" />
        </Route>
        <Route path="/fr-ca/services/isolation-en-mousse-pulverisee/st-johns">
          <Redirect to="/fr-ca/services/isolation-en-mousse-pulverisee/paradise" />
        </Route>
        <Route path="/fr-ca/services/isolation-en-mousse-pulverisee/tracadie">
          <Redirect to="/fr-ca/services/isolation-en-mousse-pulverisee/tracadie-sheila" />
        </Route>
        <Route path="/fr-ca/services/isolation-en-mousse-pulverisee/vancouver">
          <Redirect to="/fr-ca/services/isolation-en-mousse-pulverisee/surrey" />
        </Route>
        <Route path="/fr-ca/services/isolation-en-mousse-pulverisee/:slug" component={SprayfoamLocationPage} />
        <Route path="/fr-ca/services/isolation-en-mousse-pulverisee-halifax">
          <Redirect to="/fr-ca/services/sprayfoam-insulation/dartmouth" />
        </Route>
        <Route path="/fr-ca/services/isolation-en-mousse-pulverisee-fredericton">
          <Redirect to="/fr-ca/services/sprayfoam-insulation/fredericton" />
        </Route>
        <Route path="/fr-ca/services/isolant-en-mousse-pulverisee-charlottetown">
          <Redirect to="/fr-ca/services/sprayfoam-insulation/charlottetown" />
        </Route>
        <Route path="/fr-ca/services/spray-foam-insulation">
          <Redirect to="/fr-ca/services/sprayfoam-insulation" />
        </Route>
        <Route path="/fr-ca/services/batt-poly-insulation" component={BattPolyInsulationPage} />
        <Route path="/fr-ca/services/isolation-en-baton-et-en-polyethylene" component={BattPolyInsulationPage} />
        <Route path="/fr-ca/services/blown-in-insulation" component={BlownInInsulationPage} />
        <Route path="/fr-ca/services/isolation-par-soufflage" component={BlownInInsulationPage} />
        <Route path="/fr-ca/services/urban-yeti-appliances" component={UrbanYetiAppliancesPage} />
        <Route path="/fr-ca/services/electromenagers-urbains" component={UrbanYetiAppliancesPage} />
        <Route path="/fr-ca/services/peak-thermostat" component={PeakThermostatPage} />
        <Route path="/fr-ca/services/thermostats-intelligents-peak" component={PeakThermostatPage} />
        <Route path="/fr-ca/services/soundproofing" component={SoundproofingPage} />
        <Route path="/fr-ca/services/insonorisation" component={SoundproofingPage} />
        <Route path="/fr-ca/services/air-conditioning" component={AirConditioningPage} />
        <Route path="/fr-ca/services/climatisation" component={AirConditioningPage} />
        
        <Route path="/privacy-policy" component={PrivacyPolicyPage} />
        <Route path="/terms-of-use" component={TermsOfUsePage} />
        <Route path="/fr-ca/privacy-policy" component={PrivacyPolicyPage} />
        <Route path="/fr-ca/terms-of-use" component={TermsOfUsePage} />

        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <FavoritesProvider>
          <TooltipProvider>
            <Toaster />
            <StickyBookingButton />
            <ErrorBoundary>
              <Router />
            </ErrorBoundary>
          </TooltipProvider>
        </FavoritesProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
