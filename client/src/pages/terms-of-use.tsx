import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/i18n";

export default function TermsOfUsePage() {
  const { language } = useLanguage();
  const isFrench = language === "fr";

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{isFrench ? "Conditions d'utilisation | Greenfoot Energy Solutions" : "Terms of Use | Greenfoot Energy Solutions"}</title>
        <meta name="description" content={isFrench ? "Conditions d'utilisation du site Web de Greenfoot Energy Solutions Inc." : "Terms of Use for the Greenfoot Energy Solutions Inc. website."} />
        <link rel="canonical" href={`https://www.greenfootenergy.ca${isFrench ? "/fr-ca/terms-of-use" : "/terms-of-use"}`} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <SiteHeader />

      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-black text-[#333333] mb-2">
            {isFrench ? "Conditions d'utilisation" : "Terms of Use"} (Greenfoot Energy Solutions Inc.)
          </h1>
          <p className="text-slate-500 mb-10">
            <strong>{isFrench ? "Date d'entrée en vigueur :" : "Effective Date:"}</strong> {isFrench ? "1er juillet 2025" : "July 1, 2025"}
          </p>

          <div className="prose prose-slate max-w-none space-y-8 text-[#333333] text-sm leading-relaxed">
            <p>
              {isFrench
                ? <>Bienvenue sur le site Web de Greenfoot Energy Solutions Inc., ainsi que ses filiales et sociétés affiliées (<strong>« Greenfoot », « nous », « notre » ou « nos »</strong>). Les présentes conditions d'utilisation (<strong>« Conditions »</strong>) régissent votre utilisation du site Web de Greenfoot et de tous les services, contenus et fonctionnalités connexes. En accédant à notre site Web ou en l'utilisant, vous acceptez d'être lié par les présentes conditions. Si vous n'acceptez pas une partie quelconque de ces conditions, vous ne devez pas utiliser notre site Web.</>
                : <>Welcome to the website of Greenfoot Energy Solutions Inc., and its subsidiaries and affiliates (<strong>"Greenfoot," "we," "us," or "our"</strong>). These Terms of Use (<strong>"Terms"</strong>) govern your use of the Greenfoot website and all related services, content, and functionality. By accessing or using our website, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our website.</>
              }
            </p>

            <section>
              <h2 className="text-xl font-black text-[#333333] mb-3">{isFrench ? "1. Acceptation des conditions" : "1. Acceptance of Terms"}</h2>
              <p>
                {isFrench
                  ? "Les présentes conditions constituent un accord juridiquement contraignant entre vous et Greenfoot. Vous affirmez que vous avez l'âge légal et la capacité de conclure les présentes conditions, ou, dans le cas contraire, que vous avez obtenu le consentement d'un parent ou d'un tuteur."
                  : "These Terms constitute a legally binding agreement between you and Greenfoot. You affirm that you are of legal age and competent to enter into these Terms, or, if you are not, that you have obtained parental or guardian consent."
                }
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-[#333333] mb-3">{isFrench ? "2. Services et exactitude du contenu" : "2. Services and Content Accuracy"}</h2>
              <p>
                {isFrench
                  ? "Greenfoot fournit des renseignements sur nos produits, services (y compris les thermopompes à conduits centraux, le financement et les offres groupées) et solutions énergétiques."
                  : "Greenfoot provides information about our products, services (including ducted-central heat pumps, financing, and bundled offers), and energy solutions."
                }
              </p>

              <h3 className="text-lg font-bold text-[#333333] mt-4 mb-2">{isFrench ? "2.1. Exactitude des renseignements" : "2.1. Information Accuracy"}</h3>
              <p>
                {isFrench
                  ? "Bien que nous nous efforcions de garantir l'exactitude de toutes les informations (prix, spécifications, descriptions de services), nous ne garantissons pas l'exhaustivité ou l'exactitude des documents présentés sur ce site Web. Tout le contenu est susceptible d'être modifié sans préavis."
                  : "While we strive to ensure all information (pricing, specifications, service descriptions) is accurate, we do not warrant the completeness or accuracy of the materials on this website. All content is subject to change without notice."
                }
              </p>

              <h3 className="text-lg font-bold text-[#333333] mt-4 mb-2">{isFrench ? "2.2. Aucun conseil professionnel" : "2.2. No Professional Advice"}</h3>
              <p>
                {isFrench
                  ? <>Le contenu de ce site Web est fourni à titre informatif uniquement et ne constitue pas un <strong>conseil professionnel</strong> (par exemple, technique, financier ou juridique). Vous devez consulter un représentant qualifié de Greenfoot ou d'autres professionnels avant de prendre toute décision d'achat ou d'installation.</>
                  : <>The content on this website is for informational purposes only and does not constitute <strong>professional advice</strong> (e.g., technical, financial, or legal advice). You should consult with a qualified Greenfoot representative or other professionals before making any purchase or installation decisions.</>
                }
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-[#333333] mb-3">{isFrench ? "3. Utilisation du site Web et conduite" : "3. Website Use and Conduct"}</h2>
              <p>
                {isFrench
                  ? "Vous acceptez d'utiliser le site Web uniquement à des fins légales et d'une manière qui ne porte pas atteinte aux droits d'autrui, ni ne restreint ou n'empêche l'utilisation et la jouissance du site Web par quiconque. Les comportements interdits incluent :"
                  : "You agree to use the website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website. Prohibited behavior includes:"
                }
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                {isFrench ? (
                  <>
                    <li>Tenter d'interférer avec le bon fonctionnement du site Web.</li>
                    <li>Introduire des virus, des logiciels malveillants ou d'autres éléments nuisibles.</li>
                    <li>Tenter un <strong>accès non autorisé</strong> à toute partie du site Web, des serveurs ou des réseaux.</li>
                    <li>Utiliser le site Web pour collecter, récolter ou stocker des renseignements personnels sur d'autres utilisateurs.</li>
                  </>
                ) : (
                  <>
                    <li>Attempting to interfere with the proper working of the website.</li>
                    <li>Introducing viruses, malware, or other harmful materials.</li>
                    <li>Attempting <strong>unauthorized access</strong> to any parts of the website, servers, or networks.</li>
                    <li>Using the website to collect, harvest, or store personal information about other users.</li>
                  </>
                )}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-black text-[#333333] mb-3">{isFrench ? "4. Droits de propriété intellectuelle" : "4. Intellectual Property Rights"}</h2>
              <p>
                {isFrench
                  ? "Tout le contenu du site Web de Greenfoot, y compris les textes, graphiques, logos, images, vidéos et logiciels, est la propriété de Greenfoot Energy Solutions Inc. ou de ses fournisseurs de contenu et est protégé par les lois canadiennes et internationales sur la propriété intellectuelle."
                  : "All content on the Greenfoot website, including text, graphics, logos, images, video, and software, is the property of Greenfoot Energy Solutions Inc. or its content suppliers and is protected by Canadian and international intellectual property laws."
                }
              </p>

              <h3 className="text-lg font-bold text-[#333333] mt-4 mb-2">{isFrench ? "4.1. Licence limitée" : "4.1. Limited License"}</h3>
              <p>
                {isFrench
                  ? <>Vous bénéficiez d'une licence limitée, non exclusive et non transférable pour accéder au site Web et l'utiliser à des <strong>fins personnelles et non commerciales uniquement</strong>.</>
                  : <>You are granted a limited, non-exclusive, non-transferable license to access and use the website for <strong>personal, non-commercial use only</strong>.</>
                }
              </p>

              <h3 className="text-lg font-bold text-[#333333] mt-4 mb-2">{isFrench ? "4.2. Restrictions" : "4.2. Restrictions"}</h3>
              <p>
                {isFrench
                  ? "Vous ne pouvez pas copier, reproduire, republier, téléverser, publier, transmettre ou distribuer tout matériel du site Web de quelque manière que ce soit sans le consentement écrit préalable de Greenfoot."
                  : "You may not copy, reproduce, republish, upload, post, transmit, or distribute any material from the website in any manner without the prior written consent of Greenfoot."
                }
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-[#333333] mb-3">{isFrench ? "5. Liens vers des tiers" : "5. Third-Party Links"}</h2>
              <p>
                {isFrench
                  ? "Le site Web peut contenir des liens vers des sites Web de tiers (par exemple, des fournisseurs de financement)."
                  : "The website may contain links to third-party websites (e.g., financing providers)."
                }
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                {isFrench ? (
                  <>
                    <li>Greenfoot n'a aucun contrôle sur le contenu, les politiques de confidentialité ou les pratiques de tout site Web tiers et n'assume aucune responsabilité à leur égard.</li>
                    <li>Votre utilisation des sites Web de tiers est à vos propres risques.</li>
                  </>
                ) : (
                  <>
                    <li>Greenfoot has no control over the content, privacy policies, or practices of any third-party websites and assumes no responsibility for them.</li>
                    <li>Your use of third-party websites is at your own risk.</li>
                  </>
                )}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-black text-[#333333] mb-3">{isFrench ? "6. Exclusion de garanties et de responsabilité" : "6. Disclaimer of Warranties and Liability"}</h2>

              <h3 className="text-lg font-bold text-[#333333] mt-4 mb-2">{isFrench ? "6.1. Exclusion de garanties" : "6.1. Disclaimer of Warranties"}</h3>
              <p>
                {isFrench
                  ? <>Le site Web de Greenfoot et tout son contenu sont fournis <strong>« tels quels » et « selon leur disponibilité »</strong>, sans aucune garantie d'aucune sorte, expresse ou implicite, y compris les garanties implicites de qualité marchande, d'adéquation à un usage particulier ou de non-contrefaçon.</>
                  : <>The Greenfoot website and all content are provided on an <strong>"as is" and "as available" basis</strong>, without any warranties of any kind, either express or implied, including the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.</>
                }
              </p>

              <h3 className="text-lg font-bold text-[#333333] mt-4 mb-2">{isFrench ? "6.2. Limitation de responsabilité" : "6.2. Limitation of Liability"}</h3>
              <p>
                {isFrench
                  ? <>Dans toute la mesure permise par la loi applicable, Greenfoot Energy Solutions Inc., ses sociétés affiliées, dirigeants, administrateurs, employés et agents <strong>ne seront pas responsables de tout dommage direct, indirect, accessoire, spécial, consécutif ou punitif</strong> résultant de votre accès au site Web ou de son utilisation, ou de votre incapacité à y accéder ou à l'utiliser.</>
                  : <>To the fullest extent permitted by applicable law, Greenfoot Energy Solutions Inc., its affiliates, officers, directors, employees, and agents shall <strong>not be liable for any direct, indirect, incidental, special, consequential, or punitive damages</strong> resulting from your access to or use of, or inability to access or use, the website.</>
                }
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-[#333333] mb-3">{isFrench ? "7. Loi applicable" : "7. Governing Law"}</h2>
              <p>
                {isFrench
                  ? <>Les présentes conditions sont régies et interprétées conformément aux lois de la <strong>province du Nouveau-Brunswick</strong> et aux lois fédérales du Canada qui s'y appliquent. Vous acceptez de vous soumettre à la compétence exclusive des tribunaux situés au Nouveau-Brunswick.</>
                  : <>These Terms shall be governed and construed in accordance with the laws of the <strong>Province of New Brunswick</strong> and the federal laws of Canada applicable therein. You agree to submit to the exclusive jurisdiction of the courts located in New Brunswick.</>
                }
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-[#333333] mb-3">{isFrench ? "8. Modifications des conditions" : "8. Changes to Terms"}</h2>
              <p>
                {isFrench
                  ? "Greenfoot se réserve le droit, à sa seule discrétion, de modifier ou de remplacer les présentes conditions à tout moment. Nous publierons toute modification sur cette page. Votre utilisation continue du site Web après la publication de toute modification constitue l'acceptation de ces modifications."
                  : "Greenfoot reserves the right, at its sole discretion, to modify or replace these Terms at any time. We will post any changes on this page. Your continued use of the website following the posting of any changes constitutes acceptance of those changes."
                }
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-[#333333] mb-3">{isFrench ? "9. Coordonnées" : "9. Contact Information"}</h2>
              <p>
                {isFrench
                  ? "Si vous avez des questions concernant les présentes conditions d'utilisation, veuillez communiquer avec nous à :"
                  : "If you have any questions about these Terms of Use, please contact us at:"
                }
              </p>
              <div className="bg-slate-50 rounded-xl p-6 mt-4">
                <p className="font-bold text-[#333333]">Greenfoot Energy Solutions Inc.</p>
                <ul className="mt-3 space-y-1">
                  <li><strong>{isFrench ? "À l'attention de :" : "Attn:"}</strong> Laura Lee Faulkner, {isFrench ? "Directrice du marketing" : "Marketing Manager"}</li>
                  <li><strong>{isFrench ? "Courriel :" : "Email:"}</strong> <a href="mailto:laura.leefaulkner@greenfootenergy.ca" className="text-[#8dc63f] hover:underline">laura.leefaulkner@greenfootenergy.ca</a></li>
                  <li><strong>{isFrench ? "Adresse :" : "Address:"}</strong> 25 Gridless Lane, Moncton, NB E1A 9Z3</li>
                  <li><strong>{isFrench ? "Téléphone :" : "Phone:"}</strong> <a href="tel:5069531920" className="text-[#8dc63f] hover:underline">(506) 953-1920</a></li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
