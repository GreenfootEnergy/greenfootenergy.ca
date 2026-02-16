import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/i18n";

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();
  const isFrench = language === "fr";

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{isFrench ? "Politique de confidentialité | Greenfoot Energy Solutions" : "Privacy Policy | Greenfoot Energy Solutions"}</title>
        <meta name="description" content={isFrench ? "Politique de confidentialité de Greenfoot Energy Solutions Inc. concernant la collecte, l'utilisation et la sécurité des données personnelles." : "Privacy Policy for Greenfoot Energy Solutions Inc. regarding data collection, use, and security of personal information."} />
        <link rel="canonical" href={`https://www.greenfootenergy.ca${isFrench ? "/fr-ca/privacy-policy" : "/privacy-policy"}`} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <SiteHeader />

      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-black text-[#333333] mb-2">
            {isFrench ? "Politique de confidentialité : Collecte et sécurité des données" : "Privacy Policy: Data Collection & Security"}
          </h1>
          <p className="text-slate-500 mb-2">
            <strong>{isFrench ? "Date d'entrée en vigueur :" : "Effective Date:"}</strong> {isFrench ? "1er juillet 2025" : "July 1, 2025"}
          </p>
          <p className="text-slate-500 mb-10">
            <strong>{isFrench ? "Entreprise :" : "Company:"}</strong> Greenfoot Energy Solutions Inc. {isFrench ? "et ses filiales et sociétés affiliées" : "and its subsidiaries and affiliates"} (« <strong>Greenfoot</strong> »)
          </p>

          <div className="prose prose-slate max-w-none space-y-8 text-[#333333] text-sm leading-relaxed">

            <h2 className="text-2xl font-black text-[#333333] mb-4">
              {isFrench ? "Aperçu des pratiques de confidentialité de Greenfoot Energy Solutions" : "Overview of Greenfoot Energy Solutions' Privacy Practices"}
            </h2>

            <section>
              <h3 className="text-xl font-black text-[#333333] mb-3">1. {isFrench ? "Introduction" : "Introduction"}</h3>
              <p>
                {isFrench
                  ? "La présente politique de confidentialité décrit les pratiques de confidentialité de Greenfoot Energy Solutions Inc., ses filiales et sociétés affiliées (« Greenfoot ») concernant la collecte, l'utilisation, la conservation, la divulgation et la sécurité des renseignements personnels obtenus auprès des clients, des demandeurs de crédit, des candidats à l'emploi et d'autres personnes (« vous » ou « votre ») au Canada."
                  : "This Privacy Policy outlines the privacy practices of Greenfoot Energy Solutions Inc., its subsidiaries, and affiliates (\"Greenfoot\") concerning the collection, use, retention, disclosure, and security of personal information obtained from customers, credit applicants, employment applicants, and other individuals (\"you\" or \"your\") in Canada."
                }
              </p>
              <p className="mt-3">
                {isFrench
                  ? <>Cette politique a été élaborée conformément aux lois canadiennes sur la protection des renseignements personnels dans le secteur privé, notamment la <strong>Loi sur la protection des renseignements personnels et les documents électroniques (LPRPDE)</strong> et la <strong>Personal Information Protection Act (Colombie-Britannique)</strong>.</>
                  : <>This Policy has been developed in compliance with Canada's private sector privacy laws, including the <strong>Personal Information Protection and Electronic Documents Act (PIPEDA)</strong> and the <strong>Personal Information Protection Act (British Columbia)</strong>.</>
                }
              </p>
              <p className="mt-3">
                {isFrench
                  ? "Chez Greenfoot, nous nous engageons à protéger votre vie privée et à maintenir la confidentialité et la sécurité de vos renseignements personnels. Nous utilisons ces renseignements pour fournir les produits et services que vous demandez et pour mieux comprendre vos besoins et préférences — ce qui nous permet d'offrir le plus haut niveau de service à la clientèle."
                  : "At Greenfoot, we are committed to protecting your privacy and maintaining the confidentiality and security of your personal information. We use this information to deliver the products and services you request and to better understand your needs and preferences—allowing us to provide the highest standard of customer service."
                }
              </p>
            </section>

            <section>
              <h3 className="text-xl font-black text-[#333333] mb-3">2. {isFrench ? "Renseignements personnels que nous recueillons" : "Personal Information We Collect"}</h3>
              <p>
                {isFrench
                  ? "« Renseignements personnels » désigne tout renseignement concernant une personne identifiable, à l'exclusion des coordonnées professionnelles utilisées uniquement à des fins de communication d'affaires."
                  : "\"Personal information\" means any information about an identifiable individual, excluding business contact information when used solely for business communications."
                }
              </p>
              <p className="mt-3">{isFrench ? "Les renseignements personnels peuvent inclure, sans s'y limiter :" : "Examples of personal information may include, but are not limited to:"}</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                {isFrench ? (
                  <>
                    <li>Renseignements d'identification tels que le nom, l'adresse, le numéro de téléphone et l'adresse courriel.</li>
                    <li>Renseignements recueillis ou générés pour se conformer aux exigences légales et réglementaires.</li>
                    <li>Numéro d'assurance sociale et/ou autres identifiants personnels (p. ex., date de naissance) recueillis pour les vérifications de crédit.</li>
                    <li>Rapports de crédit, renseignements sur l'actif et le passif, et historique de crédit.</li>
                    <li>Renseignements sur le compte, historique des paiements et relevés de transactions avec Greenfoot.</li>
                    <li>Transactions financières avec des références ou des sociétés affiliées tierces.</li>
                    <li>Autres renseignements personnels recueillis avec consentement ou tel que permis ou exigé par la loi.</li>
                  </>
                ) : (
                  <>
                    <li>Identifying information such as name, address, telephone number, and email address.</li>
                    <li>Information collected or generated to comply with legal and regulatory requirements.</li>
                    <li>Social Insurance Number and/or other personal identifiers (e.g., date of birth) collected for credit checks.</li>
                    <li>Credit reports, asset and liability information, and credit history.</li>
                    <li>Account information, payment history, and records of transactions with Greenfoot.</li>
                    <li>Financial dealings with third-party references or affiliates.</li>
                    <li>Other personal information collected with consent or as permitted or required by law.</li>
                  </>
                )}
              </ul>
              <div className="bg-slate-50 rounded-xl p-5 mt-4">
                <p>
                  <strong>{isFrench ? "Remarque :" : "Note:"}</strong> {isFrench
                    ? "Greenfoot utilise un fournisseur tiers pour le financement client. Nous ne stockons ni ne demandons directement les numéros d'assurance sociale. Cependant, le processus de demande de crédit du tiers peut exiger de tels renseignements, et vous devriez consulter leur politique de confidentialité dans le cadre de la demande."
                    : "Greenfoot uses a third-party provider for customer financing. We do not store or request Social Insurance Numbers directly. However, the third-party credit application process may require such information, and you should review their privacy policy as part of the application."
                  }
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-black text-[#333333] mb-3">3. {isFrench ? "Collecte de renseignements personnels" : "Collection of Personal Information"}</h3>
              <p>{isFrench ? "Nous pouvons recueillir des renseignements personnels dans diverses situations, notamment :" : "We may collect personal information in various situations, including but not limited to:"}</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                {isFrench ? (
                  <>
                    <li>Lorsque vous demandez un devis, passez une commande ou achetez nos produits ou services.</li>
                    <li>Lors de la soumission de demandes de crédit ou d'emploi.</li>
                    <li>Lors de correspondances avec nous (électroniquement ou autrement).</li>
                    <li>Lors de la participation à des promotions ou des sondages.</li>
                    <li>À partir de registres et bases de données publics.</li>
                    <li>Auprès d'agences d'évaluation du crédit et d'institutions financières.</li>
                    <li>Par l'intermédiaire de nos sociétés affiliées, partenaires et visites du site Web (y compris les données de site recueillies automatiquement).</li>
                    <li>Par le biais d'autres transactions ou interactions en cours avec Greenfoot.</li>
                  </>
                ) : (
                  <>
                    <li>When you request a quote, order, or purchase our products or services.</li>
                    <li>When submitting credit or employment applications.</li>
                    <li>When corresponding with us (electronically or otherwise).</li>
                    <li>When participating in promotions or surveys.</li>
                    <li>From public registries and databases.</li>
                    <li>From credit reporting agencies and financial institutions.</li>
                    <li>Through our affiliates, partners, and website visits (including automatically collected site data).</li>
                    <li>Through other ongoing transactions or interactions with Greenfoot.</li>
                  </>
                )}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-black text-[#333333] mb-3">4. {isFrench ? "Utilisation des renseignements personnels" : "Use of Personal Information"}</h3>
              <p>{isFrench ? "Les renseignements personnels ne seront utilisés qu'aux fins auxquelles vous avez consenti, notamment :" : "Personal information will only be used for purposes to which you have consented, including:"}</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                {isFrench ? (
                  <>
                    <li>Identifier les clients et leurs représentants.</li>
                    <li>Développer et maintenir notre relation d'affaires avec vous.</li>
                    <li>Examiner les demandes de crédit et déterminer la solvabilité.</li>
                    <li>Échanger des renseignements de crédit avec des parties autorisées.</li>
                    <li>Détecter et prévenir les transactions frauduleuses ou suspectes.</li>
                    <li>Satisfaire aux exigences légales, d'audit et réglementaires.</li>
                    <li>Gérer les opérations commerciales, exécuter les comptes et recouvrer les dettes.</li>
                    <li>Évaluer les demandes d'emploi.</li>
                    <li>Toute autre fin consentie ou requise par la loi.</li>
                  </>
                ) : (
                  <>
                    <li>Identifying customers and their representatives.</li>
                    <li>Developing and maintaining our business relationship with you.</li>
                    <li>Reviewing credit applications and determining creditworthiness.</li>
                    <li>Exchanging credit information with authorized parties.</li>
                    <li>Detecting and preventing fraudulent or suspicious transactions.</li>
                    <li>Meeting legal, audit, and regulatory requirements.</li>
                    <li>Managing business operations, enforcing accounts, and collecting debts.</li>
                    <li>Evaluating employment applications.</li>
                    <li>Any other purpose consented to or as required by law.</li>
                  </>
                )}
              </ul>

              <h4 className="text-lg font-bold text-[#333333] mt-6 mb-2">{isFrench ? "Utilisation sans consentement" : "Use Without Consent"}</h4>
              <p>{isFrench ? "Greenfoot peut utiliser ou divulguer des renseignements personnels sans consentement lorsque :" : "Greenfoot may use or disclose personal information without consent when:"}</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                {isFrench ? (
                  <>
                    <li>Exigé par les forces de l'ordre ou les autorités juridiques.</li>
                    <li>En cas d'urgence menaçant la vie, la santé ou la sécurité.</li>
                    <li>À des fins statistiques ou de recherche.</li>
                    <li>Lorsque les renseignements sont accessibles au public tel que défini par la loi.</li>
                    <li>Pour prévenir la fraude ou enquêter sur des violations de la loi ou d'un accord.</li>
                  </>
                ) : (
                  <>
                    <li>Required by law enforcement or legal authorities.</li>
                    <li>In emergencies threatening life, health, or security.</li>
                    <li>For statistical or research purposes.</li>
                    <li>When publicly available as defined by law.</li>
                    <li>To prevent fraud or investigate breaches of law or agreement.</li>
                  </>
                )}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-black text-[#333333] mb-3">5. {isFrench ? "Divulgation et transfert des renseignements personnels" : "Disclosure and Transfer of Personal Information"}</h3>
              <p>{isFrench ? "L'accès aux renseignements personnels est limité aux employés, dirigeants et administrateurs qui en ont besoin à des fins commerciales légitimes." : "Access to personal information is restricted to employees, officers, and directors who need it for legitimate business purposes."}</p>
              <p className="mt-3">{isFrench ? "Greenfoot peut divulguer des renseignements personnels :" : "Greenfoot may disclose personal information:"}</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                {isFrench ? (
                  <>
                    <li>À des fournisseurs tiers, pour les produits, services ou garanties que vous avez demandés.</li>
                    <li>Au sein du groupe Greenfoot, à des fins de prévention de la fraude, de gestion des risques et de vérification.</li>
                    <li>À des agents, fournisseurs de services ou sociétés affiliées qui traitent des renseignements en notre nom.</li>
                    <li>Dans le cadre de transactions commerciales (p. ex., fusions, ventes ou financement).</li>
                    <li>Pour satisfaire aux exigences d'assurance, d'audit ou réglementaires.</li>
                  </>
                ) : (
                  <>
                    <li>To third-party suppliers, for products, services, or warranties you have requested.</li>
                    <li>Within the Greenfoot Group, for fraud prevention, risk management, and verification purposes.</li>
                    <li>To agents, service providers, or affiliates that process information on our behalf.</li>
                    <li>In connection with business transactions (e.g., mergers, sales, or financing).</li>
                    <li>To satisfy insurance, audit, or regulatory requirements.</li>
                  </>
                )}
              </ul>
              <p className="mt-3">{isFrench ? "Tous les tiers traitant des renseignements personnels doivent les protéger par des ententes de confidentialité ou des mesures de protection similaires." : "All third parties handling personal information must protect it through confidentiality agreements or similar safeguards."}</p>

              <h4 className="text-lg font-bold text-[#333333] mt-6 mb-2">{isFrench ? "Divulgations permises en vertu de la LPRPDE" : "Permitted Disclosures Under PIPEDA"}</h4>
              <p>{isFrench ? "Greenfoot peut également divulguer des renseignements personnels sans consentement pour :" : "Greenfoot may also disclose personal information without consent to:"}</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                {isFrench ? (
                  <>
                    <li>Nos représentants juridiques.</li>
                    <li>Recouvrer des dettes dues à Greenfoot.</li>
                    <li>Se conformer aux assignations, mandats ou ordonnances du tribunal.</li>
                    <li>Aider les forces de l'ordre ou les enquêtes gouvernementales.</li>
                  </>
                ) : (
                  <>
                    <li>Our legal representatives.</li>
                    <li>Collect debts owed to Greenfoot.</li>
                    <li>Comply with subpoenas, warrants, or court orders.</li>
                    <li>Assist law enforcement or government investigations.</li>
                  </>
                )}
              </ul>
              <p className="mt-3">
                {isFrench
                  ? <>Nous ne <strong>vendrons, n'échangerons ni ne louerons jamais</strong> vos renseignements personnels. Lorsqu'une divulgation a lieu, elle sera effectuée avec des mesures de protection strictes de la vie privée.</>
                  : <>We will <strong>never trade, rent, or sell</strong> your personal information. When disclosure occurs, it will be done under strict privacy safeguards.</>
                }
              </p>
            </section>

            <section>
              <h3 className="text-xl font-black text-[#333333] mb-3">6. {isFrench ? "Divulgation et transferts à l'extérieur du Canada" : "Disclosure and Transfers Outside of Canada"}</h3>
              <p>{isFrench ? "Certains fournisseurs de services tiers (y compris les sociétés affiliées) peuvent être situés à l'extérieur du Canada (p. ex., les États-Unis)." : "Some third-party service providers (including affiliates) may be located outside of Canada (e.g., the United States)."}</p>
              <p className="mt-3">{isFrench ? "Les renseignements personnels divulgués ou traités à l'extérieur du Canada peuvent être soumis aux lois étrangères." : "Personal information disclosed or processed outside of Canada may be subject to foreign laws."}</p>
            </section>

            <section>
              <h3 className="text-xl font-black text-[#333333] mb-3">7. {isFrench ? "Consentement" : "Consent"}</h3>
              <p>{isFrench ? "Avant ou au moment de la collecte, Greenfoot obtiendra un consentement écrit explicite aux fins énoncées." : "Before or at the time of collection, Greenfoot will obtain express written consent for the stated purposes."}</p>
              <p className="mt-3">{isFrench ? "En signant une demande de crédit ou tout autre formulaire, vous fournissez un consentement implicite à Greenfoot pour vérifier les renseignements auprès de tiers (p. ex., banques ou agences d'évaluation du crédit)." : "By signing a credit application or other form, you provide implied consent for Greenfoot to verify information with third parties (e.g., banks or credit bureaus)."}</p>
              <p className="mt-3">{isFrench ? "Vous pouvez retirer votre consentement à tout moment en soumettant une demande écrite à Greenfoot (voir les coordonnées ci-dessous)." : "You may withdraw consent at any time by submitting a written request to Greenfoot (see contact information below)."}</p>
              <p className="mt-3">{isFrench ? "Le retrait du consentement peut affecter la capacité de Greenfoot à fournir des produits ou des services." : "Withdrawal may affect Greenfoot's ability to provide products or services."}</p>
            </section>

            <section>
              <h3 className="text-xl font-black text-[#333333] mb-3">8. {isFrench ? "Conservation des renseignements personnels" : "Retention of Personal Information"}</h3>
              <p>{isFrench ? "Les renseignements personnels sont conservés aussi longtemps que nécessaire à des fins commerciales ou juridiques :" : "Personal information is retained as long as necessary for business or legal purposes:"}</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                {isFrench ? (
                  <>
                    <li>Les dossiers actifs sont maintenus tant que la relation client existe.</li>
                    <li>Les dossiers de crédit inactifs (p. ex., entièrement remboursés ou résiliés) sont conservés pendant <strong>sept (7) ans</strong>.</li>
                    <li>Les demandes rejetées sont conservées pendant <strong>un maximum de deux (2) ans</strong>.</li>
                  </>
                ) : (
                  <>
                    <li>Active files are maintained while the customer relationship exists.</li>
                    <li>Inactive credit files (e.g., fully repaid or terminated) are retained for <strong>seven (7) years</strong>.</li>
                    <li>Rejected applications are retained for <strong>up to two (2) years</strong>.</li>
                  </>
                )}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-black text-[#333333] mb-3">9. {isFrench ? "Exactitude" : "Accuracy"}</h3>
              <p>{isFrench ? "Greenfoot s'efforce de maintenir les renseignements personnels exacts et à jour." : "Greenfoot strives to keep personal information accurate and current."}</p>
              <p className="mt-3">{isFrench ? "Veuillez nous informer de toute mise à jour de vos renseignements." : "Please notify us of any updates to your information."}</p>
              <p className="mt-3">{isFrench ? "Les renseignements contenus dans les dossiers inactifs ne sont pas mis à jour." : "Information in inactive files is not updated."}</p>
            </section>

            <section>
              <h3 className="text-xl font-black text-[#333333] mb-3">10. {isFrench ? "Mesures de protection" : "Safeguards"}</h3>
              <p>
                {isFrench
                  ? <>Nous employons des <strong>mesures de protection physiques, organisationnelles et technologiques</strong> pour protéger les renseignements personnels, notamment :</>
                  : <>We employ <strong>physical, organizational, and technological safeguards</strong> to protect personal information, including:</>
                }
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                {isFrench ? (
                  <>
                    <li>Stockage sécurisé des dossiers et accès physique limité.</li>
                    <li>Protection par mot de passe, accès restreint et systèmes chiffrés.</li>
                    <li>Politiques de sécurité internes et centres de données contrôlés.</li>
                    <li>Déchiquetage des documents avant leur élimination.</li>
                  </>
                ) : (
                  <>
                    <li>Secured file storage and limited physical access.</li>
                    <li>Password protection, restricted access, and encrypted systems.</li>
                    <li>Internal security policies and controlled data centers.</li>
                    <li>Shredding of documents prior to disposal.</li>
                  </>
                )}
              </ul>
              <p className="mt-3">{isFrench ? "Seul le personnel autorisé peut accéder aux renseignements à des fins commerciales légitimes." : "Only authorized personnel may access information for legitimate business needs."}</p>
            </section>

            <section>
              <h3 className="text-xl font-black text-[#333333] mb-3">11. {isFrench ? "Questions et plaintes" : "Questions and Complaints"}</h3>
              <p>{isFrench ? "Les questions ou plaintes concernant la présente politique de confidentialité doivent être adressées par écrit à :" : "Questions or complaints regarding this Privacy Policy should be directed in writing to:"}</p>
              <div className="bg-slate-50 rounded-xl p-6 mt-4">
                <p className="font-bold text-[#333333]">Greenfoot Energy Solutions Inc.</p>
                <ul className="mt-3 space-y-1">
                  <li><strong>{isFrench ? "À l'attention de :" : "Attn:"}</strong> Laura Lee Faulkner, {isFrench ? "Directrice du marketing" : "Marketing Manager"}</li>
                  <li><strong>{isFrench ? "Courriel :" : "Email:"}</strong> <a href="mailto:laura.leefaulkner@greenfootenergy.ca" className="text-[#8dc63f] hover:underline">laura.leefaulkner@greenfootenergy.ca</a></li>
                  <li><strong>{isFrench ? "Adresse :" : "Address:"}</strong> 25 Gridless Lane, Moncton, NB E1A 9Z3</li>
                  <li><strong>{isFrench ? "Téléphone :" : "Phone:"}</strong> <a href="tel:5069531920" className="text-[#8dc63f] hover:underline">(506) 953-1920</a></li>
                </ul>
              </div>
              <p className="mt-4">{isFrench ? "Greenfoot enquêtera et répondra à toutes les plaintes vérifiées." : "Greenfoot will investigate and respond to all verified complaints."}</p>
              <p className="mt-3">{isFrench ? "Si vous n'êtes pas satisfait, vous pouvez communiquer avec le commissaire à la protection de la vie privée applicable :" : "If you remain unsatisfied, you may contact the applicable Privacy Commissioner:"}</p>
              <ul className="list-disc pl-6 space-y-3 mt-3">
                <li>
                  <strong>{isFrench ? "Commissariat à la protection de la vie privée du Canada" : "Office of the Privacy Commissioner of Canada"}</strong> — <a href="https://www.priv.gc.ca/" target="_blank" rel="noopener noreferrer" className="text-[#8dc63f] hover:underline">www.priv.gc.ca</a><br />
                  <span className="text-slate-500">30 Victoria Street, Gatineau QC K1A 1H3 | 1-800-282-1376</span>
                </li>
                <li>
                  <strong>{isFrench ? "Bureau de l'ombudsman (Nouveau-Brunswick)" : "Office of the Ombud (New Brunswick)"}</strong> — <a href="https://www.ombudnb.ca/" target="_blank" rel="noopener noreferrer" className="text-[#8dc63f] hover:underline">www.ombudnb.ca</a><br />
                  <span className="text-slate-500">751 Brunswick Street, Fredericton NB E3B 1H8 | 1-888-755-6611</span>
                </li>
                <li>
                  <strong>{isFrench ? "Commissaire à l'information et à la protection de la vie privée de la Nouvelle-Écosse" : "Office of the Information and Privacy Commissioner for Nova Scotia"}</strong> — <a href="https://oipc.novascotia.ca/" target="_blank" rel="noopener noreferrer" className="text-[#8dc63f] hover:underline">oipc.novascotia.ca</a>
                </li>
                <li>
                  <strong>{isFrench ? "Commissaire à l'information et à la protection de la vie privée de l'Î.-P.-É." : "PEI Information and Privacy Commissioner"}</strong> — <a href="https://www.assembly.pe.ca/" target="_blank" rel="noopener noreferrer" className="text-[#8dc63f] hover:underline">www.assembly.pe.ca</a>
                </li>
                <li>
                  <strong>{isFrench ? "Commissaire à l'information et à la protection de la vie privée (T.-N.-L.)" : "Office of the Information and Privacy Commissioner (NL)"}</strong> — <a href="https://www.oipc.nl.ca/" target="_blank" rel="noopener noreferrer" className="text-[#8dc63f] hover:underline">www.oipc.nl.ca</a>
                </li>
                <li>
                  <strong>{isFrench ? "Commissaire à l'information et à la protection de la vie privée de la C.-B." : "Office of the Information and Privacy Commissioner for BC"}</strong> — <a href="https://www.oipc.bc.ca/" target="_blank" rel="noopener noreferrer" className="text-[#8dc63f] hover:underline">www.oipc.bc.ca</a>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-black text-[#333333] mb-3">12. {isFrench ? "Communication par SMS" : "SMS Communication"}</h3>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>{isFrench ? "Nom de la marque :" : "Brand name:"}</strong> Service-Yeti</li>
                <li><strong>{isFrench ? "Types de messages :" : "Types of messages:"}</strong>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    {isFrench ? (
                      <>
                        <li>Messages concernant la planification</li>
                        <li>Mises à jour concernant votre demande</li>
                        <li>Promotions et offres</li>
                      </>
                    ) : (
                      <>
                        <li>Messages about scheduling</li>
                        <li>Updates about your request</li>
                        <li>Promotions and offers</li>
                      </>
                    )}
                  </ul>
                </li>
                <li><strong>{isFrench ? "Fréquence des messages :" : "Message frequency:"}</strong> {isFrench ? "La fréquence des messages varie" : "Message Frequency varies"}</li>
                <li><strong>{isFrench ? "Remarque :" : "Note:"}</strong> {isFrench ? "Des frais de messagerie et de données peuvent s'appliquer." : "Message and data rates may apply."}</li>
                <li><strong>{isFrench ? "Service à la clientèle :" : "Customer care:"}</strong> {isFrench ? "Textez AIDE pour obtenir de l'aide" : "Text HELP for help"}, {isFrench ? "Communiquez avec nous à" : "Contact us at"} <a href="mailto:info@serviceyeti.com" className="text-[#8dc63f] hover:underline">info@serviceyeti.com</a> {isFrench ? "ou" : "or"} <a href="tel:18558589384" className="text-[#8dc63f] hover:underline">1-855-858-9384</a></li>
                <li><strong>{isFrench ? "Désabonnement :" : "Opt-out:"}</strong> {isFrench ? "Textez ARRÊT pour vous désabonner des messages" : "Text STOP to unsubscribe from receiving messages"}</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-black text-[#333333] mb-3">13. {isFrench ? "Modifications à la présente politique de confidentialité" : "Amendments to This Privacy Policy"}</h3>
              <p>{isFrench ? <>La présente politique de confidentialité est en vigueur depuis le <strong>1er juillet 2025</strong>.</> : <>This Privacy Policy is effective <strong>July 1, 2025</strong>.</>}</p>
              <p className="mt-3">{isFrench ? "Greenfoot peut mettre à jour cette politique périodiquement en réponse aux changements de la législation ou des pratiques commerciales." : "Greenfoot may update this Policy periodically in response to changes in legislation or business practices."}</p>
              <p className="mt-3">{isFrench ? "Toutes les modifications seront publiées sur le site Web de Greenfoot et s'appliqueront aux renseignements recueillis après la date révisée." : "All amendments will be posted on Greenfoot's website and will apply to information collected after the revised date."}</p>
            </section>

          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
