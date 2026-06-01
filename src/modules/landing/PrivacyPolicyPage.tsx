import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { LandingPageLayout } from '@/components/landing/LandingPageLayout'

export function PrivacyPolicyPage(): ReactElement {
  return (
    <LandingPageLayout>
      <section className="landing-subpage-section">
        <div className="landing-container landing-subpage-prose">
          <Link to="/" className="text-sm text-link-secondary hover:underline">
            Back to home
          </Link>
          <h1 className="mt-4 font-display text-4xl font-normal tracking-tight md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-slate-500">Last updated: May 22, 2026</p>

          <section className="mt-10 space-y-8 text-slate-700">
            <p>
              This Privacy Policy describes Our policies and procedures on the collection, use, and
              disclosure of Your information when You use the Service and tells You about Your
              privacy rights and how the law protects You.
            </p>
            <p>
              We use Your Personal Data to provide and improve the Service. By using the Service,
              You agree to the collection and use of information in accordance with this Privacy
              Policy.
            </p>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">Interpretation and Definitions</h2>

              <h3 className="mt-4 font-semibold text-slate-900">Interpretation</h3>
              <p className="mt-2">
                The words of which the initial letter is capitalized have meanings defined under
                the following conditions. The following definitions shall have the same meaning
                regardless of whether they appear in singular or in plural.
              </p>

              <h3 className="mt-4 font-semibold text-slate-900">Definitions</h3>
              <p className="mt-2">For the purposes of this Privacy Policy:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  <strong>Account</strong> means a unique account created for You to access our
                  Service or parts of our Service.
                </li>
                <li>
                  <strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;,
                  &quot;Us&quot;, or &quot;Our&quot; in this Agreement) refers to Grupo Technologies
                  Private Limited, the operator of Responza.
                </li>
                <li>
                  <strong>Business User</strong> means a business or individual who registers for
                  and uses Responza to manage customer conversations.
                </li>
                <li>
                  <strong>End Customer</strong> means an individual who messages a Business User
                  through Instagram, Facebook, or IndiaMART.
                </li>
                <li>
                  <strong>Cookies</strong> are small files placed on Your computer, mobile device, or
                  any other device by a website, containing details of Your browsing history on that
                  website among its many uses.
                </li>
                <li>
                  <strong>Country</strong> refers to: India
                </li>
                <li>
                  <strong>Device</strong> means any device that can access the Service such as a
                  computer, a cellphone, or a digital tablet.
                </li>
                <li>
                  <strong>Personal Data</strong> is any information that relates to an identified or
                  identifiable individual.
                </li>
                <li>
                  <strong>Service</strong> refers to the Responza website, dashboard, APIs, and
                  related products and services.
                </li>
                <li>
                  <strong>Service Provider</strong> means any natural or legal person who processes
                  the data on behalf of the Company. It refers to third-party companies or
                  individuals employed by the Company to facilitate the Service, to provide the
                  Service on behalf of the Company, to perform services related to the Service, or
                  to assist the Company in analyzing how the Service is used.
                </li>
                <li>
                  <strong>Third-party Social Media Service</strong> refers to any website or any social network website through which a User can log in or create an account to use the Service.
                </li>
                <li>
                  <strong>Usage Data</strong> refers to data collected automatically, either generated
                  by the use of the Service or from the Service infrastructure itself (for example,
                  the duration of a page visit).
                </li>
                <li>
                  <strong>Website</strong> refers to Responza, accessible from{' '}
                  <a
                    href="https://www.responza.in"
                    className="text-link-secondary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.responza.in
                  </a>
                </li>
                <li>
                  <strong>You</strong> means the individual accessing or using the Service, or the
                  company or other legal entity on behalf of which such individual is accessing or
                  using the Service, as applicable.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Collecting and Using Your Personal Data
              </h2>

              <h3 className="mt-4 font-semibold text-slate-900">Types of Data Collected</h3>

              <h4 className="mt-3 font-semibold text-slate-800">Personal Data</h4>
              <p className="mt-2">
                While using Our Service, We may ask You to provide Us with certain personally
                identifiable information that can be used to contact or identify You. Personally
                identifiable information may include, but is not limited to:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Business name, address, State, Province, ZIP/Postal code, City</li>
                <li>Billing and payment information (processed via secure third-party gateways)</li>
                <li>Usage Data</li>
              </ul>

              <h4 className="mt-4 font-semibold text-slate-800">Usage Data</h4>
              <p className="mt-2">Usage Data is collected automatically when using the Service.</p>
              <p className="mt-2">
                Usage Data may include information such as Your Device&apos;s Internet Protocol address
                (e.g. IP address), browser type, browser version, the pages of our Service that You
                visit, the time and date of Your visit, the time spent on those pages, unique device
                identifiers, and other diagnostic data.
              </p>
              <p className="mt-2">
                When You access the Service by or through a mobile device, We may collect certain
                information automatically, including, but not limited to, the type of mobile device
                You use, Your mobile device unique ID, the IP address of Your mobile device, Your
                mobile operating system, the type of mobile Internet browser You use, unique device
                identifiers, and other diagnostic data.
              </p>
              <p className="mt-2">
                We may also collect information that Your browser sends whenever You visit our
                Service or when You access the Service by or through a mobile device.
              </p>

              <h4 className="mt-4 font-semibold text-slate-800">
                Information from Third-Party Social Media Services
              </h4>
              <p className="mt-2">
                The Company allows You to create an account and use the Service by connecting the
                following Third-party Social Media Services:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Google</li> 
                <li>Facebook (Meta)</li>
                <li>Instagram (Meta)</li>
                <li>X</li>
                <li>WhatsApp</li>
                <li>LinkedIn</li>
              </ul>
              <p className="mt-2">
                If You decide to register through or otherwise grant Us access to a Third-Party
                Social Media Service, We may collect Personal Data that is already associated with
                Your Third-Party Social Media Service&apos;s account, such as Your name, Your email
                address, Your profile information, and messaging data made available through Meta&apos;s
                official APIs (including Instagram Direct Messages and Facebook Page messaging, as
                permitted by Your authorization).
              </p>
              <p className="mt-2">
                You may also have the option of sharing additional information with the Company
                through Your Third-Party Social Media Service&apos;s account. If You choose to provide
                such information and Personal Data, during registration or otherwise, You are giving
                the Company permission to use, share, and store it in a manner consistent with this
                Privacy Policy and Meta&apos;s applicable Platform Terms.
              </p>
              <p className="mt-2">
                We access Meta platform data only through Meta&apos;s official APIs. We do not sell Meta
                platform data, use it for purposes unrelated to providing the Service, or transfer it
                to third parties except as described in this Privacy Policy and as permitted by{' '}
                <a
                  href="https://developers.facebook.com/terms"
                  className="text-link-secondary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Meta&apos;s Platform Terms
                </a>
                .
              </p>

              <h4 className="mt-4 font-semibold text-slate-800">Information from IndiaMART</h4>
              <p className="mt-2">
                If You connect an IndiaMART account, We may receive enquiry messages, buyer contact
                details, and lead data made available through IndiaMART&apos;s official APIs, subject to
                IndiaMART&apos;s terms of service and Your authorization. We use this data solely to
                provide the unified inbox and related features of the Service.
              </p>

              <h4 className="mt-4 font-semibold text-slate-800">End Customer Conversation Data</h4>
              <p className="mt-2">
                When Business Users connect channels, We process data about End Customers on behalf of
                Business Users, including message content, sender identifiers (such as Instagram or
                Facebook user IDs, handles, or IndiaMART buyer IDs), timestamps, and channel origin.
                For this data, Responza acts as a data processor on behalf of Business Users. Business
                Users are responsible for having a lawful basis to process End Customer data and for
                maintaining their own privacy disclosures.
              </p>

              <h4 className="mt-4 font-semibold text-slate-800">Tracking Technologies and Cookies</h4>
              <p className="mt-2">
                We use Cookies and similar tracking technologies to track activity on Our Service and
                store certain information. Tracking technologies used include beacons, tags, and
                scripts to collect and track information and to improve and analyze Our Service.
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-6">
                <li>
                  <strong>Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your
                  Device. You can instruct Your browser to refuse all Cookies or to indicate when a
                  Cookie is being sent. However, if You do not accept Cookies, You may not be able to
                  use some parts of our Service.
                </li>
                <li>
                  <strong>Web Beacons.</strong> Certain sections of our Service and our emails may
                  contain small electronic files known as web beacons that permit the Company to
                  count users who have visited those pages or opened an email and for other related
                  website statistics.
                </li>
              </ul>
              <p className="mt-2">We use both Session and Persistent Cookies for the purposes set out below:</p>
              <ul className="mt-2 list-disc space-y-2 pl-6">
                <li>
                  <strong>Necessary / Essential Cookies</strong> Type: Session Cookies
                  by Us — Purpose: These Cookies are essential to provide You with services available
                  through the Website and to enable You to use some of its features, including
                  authentication and preventing fraudulent use of user accounts.
                </li>
                <li>
                  <strong>Cookies Policy / Notice Acceptance Cookies</strong> Type: Persistent
                  Cookies by Us — Purpose: These Cookies identify if users have
                  accepted the use of cookies on the Website.
                </li>
                <li>
                  <strong>Functionality Cookies</strong> Type: Persistent Cookies by Us — Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">Use of Your Personal Data</h2>
              <p className="mt-3">The Company may use Personal Data for the following purposes:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  <strong>To provide and maintain our Service</strong>, including to monitor the usage
                  of our Service and to unify messages from Instagram, Facebook, and IndiaMART in one
                  inbox.
                </li>
                <li>
                  <strong>To manage Your Account:</strong> to manage Your registration as a user of the
                  Service. The Personal Data You provide can give You access to different functionalities
                  of the Service that are available to You as a registered user.
                </li>
                <li>
                  <strong>For the performance of a contract:</strong> the development, compliance and
                  undertaking of the purchase contract for the products, items or services You have
                  purchased or of any other contract with Us through the Service.
                </li>
                <li>
                  <strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or
                  other equivalent forms of electronic communication regarding updates or informative
                  communications related to the functionalities, products or contracted services,
                  including security updates, when necessary or reasonable for their implementation.
                </li>
                <li>
                  <strong>To provide You with news, special offers and general information</strong>{' '}
                  about other goods, services and events which we offer that are similar to those that
                  you have already purchased or enquired about unless You have opted not to receive
                  such information.
                </li>
                <li>
                  <strong>To manage Your requests:</strong> To attend and manage Your requests to Us.
                </li>
                <li>
                  <strong>For business transfers:</strong> We may use Your information to evaluate or
                  conduct a merger, divestiture, restructuring, reorganization, dissolution, or other
                  sale or transfer of some or all of Our assets.
                </li>
                <li>
                  <strong>For other purposes:</strong> We may use Your information for other purposes,
                  such as data analysis, identifying usage trends, determining the effectiveness of our
                  promotional campaigns, and to evaluate and improve our Service, products, services,
                  marketing and your experience.
                </li>
              </ul>
              <p className="mt-3">We may share Your personal information in the following situations:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  <strong>With Service Providers:</strong> We may share Your personal information with
                  Service Providers to monitor and analyze the use of our Service, to provide cloud
                  hosting, payment processing, translation, email delivery, and customer support.
                </li>
                <li>
                  <strong>With channel platforms:</strong> Data flows through Meta (Facebook and
                  Instagram) and IndiaMART APIs as necessary to send and receive messages on Your
                  behalf, in accordance with each platform&apos;s terms.
                </li>
                <li>
                  <strong>For business transfers:</strong> We may share or transfer Your personal
                  information in connection with, or during negotiations of, any merger, sale of
                  Company assets, financing, or acquisition of all or a portion of Our business to
                  another company.
                </li>
                <li>
                  <strong>With Affiliates:</strong> We may share Your information with Our affiliates,
                  in which case we will require those affiliates to honor this Privacy Policy.
                </li>
                <li>
                  <strong>With Your consent:</strong> We may disclose Your personal information for
                  any other purpose with Your consent.
                </li>
              </ul>
              <p className="mt-3">
                We do not sell Your Personal Data or Meta platform data. We do not use Meta platform
                data to train general-purpose AI models without Your explicit consent.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Meta Platform Data — Facebook , Instagram , & WhatsApp
              </h2>
              <p className="mt-3">
                Responza integrates with Meta platforms (Facebook , Instagram & WhatsApp) through Meta&apos;s
                official APIs. The following additional provisions apply:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  We collect and use Meta platform data only to provide the Service (for example,
                  receiving and sending messages, displaying conversations in Your inbox, and
                  AI-assisted replies You authorize).
                </li>
                <li>
                  We access Meta data only through official APIs and do not circumvent Meta&apos;s rate
                  limits, privacy controls, or{' '}
                  <a
                    href="https://developers.facebook.com/terms"
                    className="text-link-secondary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Platform Terms
                  </a>
                  .
                </li>
                <li>
                  You must comply with Meta&apos;s Platform Terms, Instagram Terms of Use, and applicable
                  messaging policies when using Responza.
                </li>
                <li>
                  Meta has independent access to data on its platforms. We are not responsible for
                  Meta&apos;s data practices. Please review Meta&apos;s Privacy Policy at{' '}
                  <a
                    href="https://www.meta.com/privacy"
                    className="text-link-secondary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.meta.com/privacy
                  </a>
                  .
                </li>
                <li>
                  We do not share Meta platform data with third parties except with Service Providers
                  that help Us operate the Service (under contractual safeguards), as required by law,
                  or with Your consent.
                </li>
                <li>
                  You may not use Responza&apos;s Meta integration to send spam, unsolicited messages, or
                  content that violates Meta policies.
                </li>
                <li>
                  You may request deletion of data We have obtained from Meta by contacting Us (see
                  Contact Us below) or by removing Responza&apos;s access to Your Facebook or Instagram
                  account in Your Meta account settings.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">Retention of Your Personal Data</h2>
              <p className="mt-3">
                The Company will retain Your Personal Data only for as long as is necessary for the
                purposes set out in this Privacy Policy. We will retain and use Your Personal Data to
                the extent necessary to comply with our legal obligations (for example, if we are
                required to retain your data to comply with applicable laws), resolve disputes, and
                enforce our legal agreements and policies.
              </p>
              <p className="mt-2">
                The Company will also retain Usage Data for internal analysis purposes. Usage Data is
                generally retained for a shorter period of time, except when this data is used to
                strengthen the security or to improve the functionality of Our Service, or We are
                legally obligated to retain this data for longer time periods.
              </p>
              <p className="mt-2">
                Conversation data is retained for up to 12 months by default unless You configure a
                shorter period or delete it through the Service. Upon account termination, identifiable
                data is deleted within 60 days, subject to legal retention requirements.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">Transfer of Your Personal Data</h2>
              <p className="mt-3">
                Your information, including Personal Data, is processed at the Company&apos;s operating
                offices and in any other places where the parties involved in the processing are
                located. It means that this information may be transferred to — and maintained on —
                computers located outside of Your state, province, country or other governmental
                jurisdiction where the data protection laws may differ than those from Your jurisdiction.
              </p>
              <p className="mt-2">
                Your consent to this Privacy Policy followed by Your submission of such information
                represents Your agreement to that transfer.
              </p>
              <p className="mt-2">
                The Company will take all steps reasonably necessary to ensure that Your data is treated
                securely and in accordance with this Privacy Policy and no transfer of Your Personal
                Data will take place to an organization or a country unless there are adequate controls
                in place including the security of Your data and other personal information.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">Delete Your Personal Data</h2>
              <p className="mt-3">
                You have the right to delete or request that We assist in deleting the Personal Data
                that We have collected about You.
              </p>
              <p className="mt-2">
                Our Service may give You the ability to delete certain information about You from
                within the Service.
              </p>
              <p className="mt-2">
                You may update, amend, or delete Your information at any time by signing in to Your
                Account, if you have one, and visiting the account settings section that allows you to
                manage Your personal information. You may also contact Us to request access to,
                correct, or delete any personal information that You have provided to Us.
              </p>
              <p className="mt-2">
                To delete data obtained from Facebook or Instagram, You may also revoke Responza&apos;s
                access in Your Meta account settings under Apps and Websites.
              </p>
              <p className="mt-2">
                Please note, however, that We may need to retain certain information when we have a
                legal obligation or lawful basis to do so.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">Disclosure of Your Personal Data</h2>

              <h3 className="mt-4 font-semibold text-slate-900">Business Transactions</h3>
              <p className="mt-2">
                If the Company is involved in a merger, acquisition or asset sale, Your Personal Data
                may be transferred. We will provide notice before Your Personal Data is transferred and
                becomes subject to a different Privacy Policy.
              </p>

              <h3 className="mt-4 font-semibold text-slate-900">Law enforcement</h3>
              <p className="mt-2">
                Under certain circumstances, the Company may be required to disclose Your Personal
                Data if required to do so by law or in response to valid requests by public authorities
                (e.g. a court or a government agency).
              </p>

              <h3 className="mt-4 font-semibold text-slate-900">Other legal requirements</h3>
              <p className="mt-2">
                The Company may disclose Your Personal Data in the good faith belief that such action
                is necessary to:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Comply with a legal obligation</li>
                <li>Protect and defend the rights or property of the Company</li>
                <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
                <li>Protect the personal safety of Users of the Service or the public</li>
                <li>Protect against legal liability</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">Security of Your Personal Data</h2>
              <p className="mt-3">
                The security of Your Personal Data is important to Us, but remember that no method of
                transmission over the Internet, or method of electronic storage is 100% secure. While We
                strive to use commercially acceptable means to protect Your Personal Data (including
                encryption in transit and at rest, access controls, and security monitoring), We cannot
                guarantee its absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">Children&apos;s Privacy</h2>
              <p className="mt-3">
                Our Service does not address anyone under the age of 13. We do not knowingly collect
                personally identifiable information from anyone under the age of 13. If You are a parent
                or guardian and You are aware that Your child has provided Us with Personal Data, please
                contact Us. If We become aware that We have collected Personal Data from anyone under the
                age of 13 without verification of parental consent, We take steps to remove that
                information from Our servers.
              </p>
              <p className="mt-2">
                If We need to rely on consent as a legal basis for processing Your information and Your
                country requires consent from a parent, We may require Your parent&apos;s consent before We
                collect and use that information.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">Links to Other Websites</h2>
              <p className="mt-3">
                Our Service may contain links to other websites that are not operated by Us. If You
                click on a third party link, You will be directed to that third party&apos;s site. We strongly
                advise You to review the Privacy Policy of every site You visit.
              </p>
              <p className="mt-2">
                We have no control over and assume no responsibility for the content, privacy policies or
                practices of any third party sites or services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">Changes to this Privacy Policy</h2>
              <p className="mt-3">
                We may update Our Privacy Policy from time to time. We will notify You of any changes by
                posting the new Privacy Policy on this page.
              </p>
              <p className="mt-2">
                You are advised to review this Privacy Policy periodically for any changes. Changes to
                this Privacy Policy are effective when they are posted on this page.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">Contact Us</h2>
              <p className="mt-3">
                If you have any questions about this Privacy Policy, You can contact us:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  By email:{' '}
                  <a
                    href="mailto:contact@responza.in"
                    className="text-link-secondary hover:underline"
                  >
                    contact@responza.in
                  </a>
                </li>
                <li>
                  By visiting our website:{' '}
                  <a
                    href="https://www.responza.in"
                    className="text-link-secondary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.responza.in
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </section>
    </LandingPageLayout>
  )
}
