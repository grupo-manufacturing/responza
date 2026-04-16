import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { LandingFooter } from '@/components/landing/LandingFooter'
import { LandingNavbar } from '@/components/landing/LandingNavbar'

export function PrivacyPolicyPage(): ReactElement {
  return (
    <main className="relative min-h-dvh bg-surface-base text-text-primary">
      <section className="mx-auto w-full max-w-6xl px-6 py-6 md:px-10 md:py-8">
        <LandingNavbar />
      </section>

      <section className="px-6 py-10 md:px-10 md:py-12">
        <div className="mx-auto w-full max-w-4xl">
          <Link to="/" className="text-sm text-link-secondary hover:underline">
            Back to home
          </Link>
          <h1 className="mt-4 font-display text-4xl font-normal tracking-tight md:text-5xl">
            Privacy Policy
          </h1>

          <section className="mt-10 space-y-8 text-slate-700">
          <p>
            Responza ("Responza", "we", "our", or "us") is a unified AI-powered messaging and
            customer intelligence platform operated by Grupo Technologies Private Limited. Responza enables businesses
            ("Business Users") operating on WhatsApp, Instagram, IndiaMart, TikTok, and other
            digital commerce channels to manage customer conversations, gain AI-driven insights,
            translate messages, and automate customer support all from one platform.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, store, and share information when
            you use Responza both as a Business User and in relation to data about your end
            customers ("End Customers") whose messages you receive through our platform.
          </p>
          <p>By registering for or using Responza, you agree to this Privacy Policy.</p>

          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">1. Who We Are and Our Role</h2>
            <p className="mt-3">Responza acts in a dual capacity depending on the data involved:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong>Data Controller:</strong> For information we collect about Business Users
                (account data, billing information, usage analytics), Responza is the data
                controller.
              </li>
              <li>
                <strong>Data Processor:</strong> For End Customer messages and conversation data
                that Business Users receive and process through Responza, Responza acts as a data
                processor on behalf of Business Users. Business Users are responsible for ensuring
                they have a lawful basis to process their End Customers' data and must maintain
                their own privacy policy disclosing their use of third-party platforms like
                Responza.
              </li>
            </ul>
            <p className="mt-3">
              Responza is registered in India and operates in compliance with the Digital Personal
              Data Protection Act, 2023 (India), and applicable data protection regulations of
              other jurisdictions to the extent users are located there.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">2. Information We Collect</h2>

            <h3 className="mt-4 font-semibold">2.1 Business User Account Information</h3>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Name, business name, email address, phone number, and GSTIN (where applicable)</li>
              <li>Business type, industry, size, and social commerce channels in use</li>
              <li>Billing and payment information (processed via secure third-party payment gateways)</li>
              <li>Login credentials and authentication data</li>
              <li>Support requests, feedback, and communications with Responza</li>
            </ul>

            <h3 className="mt-4 font-semibold">2.2 Connected Platform Data</h3>
            <p className="mt-2">
              When you connect your business accounts to Responza, we access data via authorised
              APIs including:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                <strong>WhatsApp Business API (Meta-verified):</strong> Inbound and outbound
                message text, message timestamps, delivery/read receipts, sender phone numbers,
                and business profile data
              </li>
              <li>
                <strong>Instagram Messaging API (Meta-verified):</strong> Direct messages (DMs),
                comment threads directed to your business account, and basic sender profile
                metadata provided by Meta
              </li>
              <li>
                <strong>IndiaMart API:</strong> Buyer enquiry messages, buyer contact details
                shared by IndiaMart within their platform's terms, and lead data
              </li>
              <li>
                <strong>TikTok Business API:</strong> Direct messages and customer interactions on
                your TikTok business account as permitted by TikTok's API terms
              </li>
            </ul>
            <p className="mt-2">
              We access only the data that your authorisation grants us through official,
              rate-limited API connections. We do not access messages beyond those directed to your
              business account.
            </p>

            <h3 className="mt-4 font-semibold">2.3 End Customer Conversation Data</h3>
            <p className="mt-2">
              As a consequence of connecting your channels, Responza processes data about your End
              Customers, including:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                Message content (text only we do not access voice messages, images, or documents
                unless you explicitly enable those integrations in future features)
              </li>
              <li>
                Sender identifiers (phone numbers, Instagram user handles, or IndiaMart buyer IDs)
              </li>
              <li>Message timestamps and channel origin</li>
              <li>
                AI-generated metadata: intent classification (e.g., customer support, sales
                enquiry, complaint), sentiment signals, and translated message variants
              </li>
            </ul>

            <h3 className="mt-4 font-semibold">2.4 Usage and Technical Data</h3>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Platform interaction data: features used, response times, dashboard activity</li>
              <li>Device and browser information, IP address, and session identifiers</li>
              <li>Aggregated analytics and product performance metrics</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">3. How We Use Your Information</h2>

            <h3 className="mt-4 font-semibold">3.1 To Provide Core Platform Services</h3>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                Aggregate and display messages from all connected channels (WhatsApp, Instagram,
                IndiaMart, TikTok) in a single unified inbox
              </li>
              <li>
                Deliver daily and periodic AI-powered insights on customer interaction volumes,
                response times, and channel performance
              </li>
              <li>
                Perform real-time message translation across supported language pairs: Hindi,
                Telugu, English, and Spanish
              </li>
              <li>
                Automatically classify incoming messages by intent (e.g., customer support,
                product enquiry, complaint, order follow-up) and route them to the appropriate
                team queue
              </li>
              <li>
                Enable automated and assisted responses using AI-powered suggestions based on
                conversation context
              </li>
            </ul>

            <h3 className="mt-4 font-semibold">3.2 To Improve and Develop the Platform</h3>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                Analyse aggregated, anonymised usage patterns to improve Responza's AI models,
                translation accuracy, and intent detection
              </li>
              <li>Conduct product research and test new features</li>
              <li>Monitor system health, detect bugs, and maintain platform reliability</li>
            </ul>

            <h3 className="mt-4 font-semibold">3.3 For Account Management and Billing</h3>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Manage your subscription, process payments, and issue invoices</li>
              <li>Send account notifications, service updates, and billing alerts</li>
              <li>Provide customer support and resolve technical issues</li>
            </ul>

            <h3 className="mt-4 font-semibold">3.4 For Legal and Compliance Purposes</h3>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                Comply with applicable Indian law, including the DPDP Act 2023, Information
                Technology Act 2000, and GST regulations
              </li>
              <li>Respond to lawful requests from government or regulatory authorities</li>
              <li>Enforce our Terms and Conditions and protect against fraud or misuse</li>
            </ul>
            <p className="mt-3">
              We do not use End Customer conversation data to train general-purpose AI models
              without explicit Business User consent.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">4. AI Features and Data Processing</h2>

            <h3 className="mt-4 font-semibold">4.1 Message Translation</h3>
            <p className="mt-2">
              Responza provides AI-powered translation for messages in Hindi, Telugu, English, and
              Spanish. Translation is performed in real time. Message content processed for
              translation is not stored beyond the session unless you save it within your inbox. We
              use trusted translation APIs and ensure data is processed under appropriate
              contractual safeguards.
            </p>

            <h3 className="mt-4 font-semibold">4.2 Intent Detection and Smart Routing</h3>
            <p className="mt-2">
              Responza's AI engine automatically analyses incoming messages to classify their
              intent. Classifications may include: customer support request, product enquiry, order
              status, complaint, general query, or sales lead. These classifications are used
              solely to route messages to the appropriate queue and to generate aggregate insights
              for Business Users. Individual intent labels are not shared with third parties.
            </p>

            <h3 className="mt-4 font-semibold">4.3 Customer Insights Dashboard</h3>
            <p className="mt-2">
              Responza generates daily and periodic reports for Business Users, including:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                Total customer interactions per channel (WhatsApp, Instagram, IndiaMart, TikTok)
              </li>
              <li>Volume trends, peak hours, and response time analytics</li>
              <li>
                Aggregate intent breakdown (e.g., X% of messages were support requests today)
              </li>
              <li>Language distribution across your customer base</li>
            </ul>
            <p className="mt-2">
              Insights are presented at an aggregate level and are designed to inform business
              decisions without exposing individual End Customer data unnecessarily.
            </p>

            <h3 className="mt-4 font-semibold">4.4 AI Model Training</h3>
            <p className="mt-2">
              Responza may use anonymised, aggregated data to improve its intent detection and
              language models. We will not use identifiable conversation content to train AI models
              without your explicit opt-in consent.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              5. Meta Platform Data — Special Provisions
            </h2>
            <p className="mt-3">
              Responza is a Meta-verified Business Solutions Provider (BSP) and accesses WhatsApp
              and Instagram data under Meta's Platform Terms and WhatsApp Business API Terms of
              Service. The following additional provisions apply:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                We access WhatsApp and Instagram data only through Meta's official APIs and do not
                circumvent Meta's rate limits, privacy controls, or Terms of Service
              </li>
              <li>
                Business Users are required to comply with Meta's WhatsApp Business Policy and
                Instagram Platform Policy when using Responza's integration
              </li>
              <li>
                Meta has independent access to data on its platforms. Responza is not responsible
                for Meta's data practices. Please review Meta's Privacy Policy at{' '}
                <a
                  href="https://www.meta.com/privacy"
                  className="text-link-secondary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.meta.com/privacy
                </a>
              </li>
              <li>
                Responza does not share Meta platform data with third parties except as required
                to provide the Platform services or as required by law
              </li>
              <li>
                Business Users may not use Responza's Meta integration to send spam, unsolicited
                messages, or to violate Meta's messaging policies
              </li>
            </ul>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              6. IndiaMart and TikTok Data — Special Provisions
            </h2>
            <p className="mt-3">
              Data received via IndiaMart's API is subject to IndiaMart's own terms of service and
              privacy policy. Business Users must ensure they are authorised IndiaMart subscribers
              with valid API access. TikTok platform data is accessed under TikTok's Business API
              terms. Responza is not responsible for changes to IndiaMart's or TikTok's API access
              policies that may affect platform functionality.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              7. Information Sharing and Disclosure
            </h2>
            <p className="mt-3">
              We do not sell your data or your End Customers' data. We share information only in
              the following circumstances:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong>Service Providers:</strong> We engage trusted third-party vendors for
                cloud infrastructure, payment processing, translation APIs, email delivery, and
                analytics. All vendors are bound by data processing agreements.
              </li>
              <li>
                <strong>Channel Platforms:</strong> Data flows through Meta, IndiaMart, and TikTok
                APIs as necessary to send and receive messages on your behalf.
              </li>
              <li>
                <strong>Legal Obligations:</strong> We may disclose data when required by Indian
                law, court order, or regulatory authority.
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger or acquisition
                involving Grupo.in or Responza, data may be transferred subject to equivalent
                protections.
              </li>
              <li>
                <strong>With Your Consent:</strong> For any other purpose, only with explicit
                Business User consent.
              </li>
            </ul>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              8. Your Responsibilities as a Business User
            </h2>
            <p className="mt-3">By using Responza, you acknowledge and agree that:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                You are responsible for ensuring you have a lawful basis to collect, process, and
                respond to your End Customers' messages through Responza
              </li>
              <li>
                You must maintain a privacy policy for your own business that discloses your use of
                messaging platforms, AI tools, and third-party service providers like Responza
              </li>
              <li>
                You will not use Responza to process data of minors under 18 years of age without
                appropriate safeguards
              </li>
              <li>
                You will comply with all applicable platform terms (Meta, IndiaMart, TikTok) when
                using integrated channels
              </li>
              <li>
                You will promptly notify your End Customers of any data breach that may affect
                them, to the extent required by applicable law
              </li>
            </ul>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">9. Data Retention</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                Account and billing data is retained for the duration of your subscription and for
                7 years thereafter in compliance with Indian tax and accounting regulations
              </li>
              <li>
                Conversation and message data is retained for 12 months by default. Business Users
                may configure shorter retention periods or manually delete conversation data
                through the platform dashboard.
              </li>
              <li>
                Aggregated insights and anonymised analytics data may be retained indefinitely as
                they contain no personally identifiable information
              </li>
              <li>
                Upon account termination, identifiable conversation data is deleted within 60 days.
                Anonymised data may be retained for platform improvement purposes.
              </li>
            </ul>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">10. Data Security</h2>
            <p className="mt-3">
              Responza implements industry-standard security measures to protect your data:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>TLS 1.2+ encryption for all data in transit</li>
              <li>AES-256 encryption for data at rest</li>
              <li>
                Role-based access controls, multi-factor authentication options, and audit logging
              </li>
              <li>Regular security reviews, penetration testing, and vulnerability assessments</li>
              <li>Incident response procedures for detecting and responding to data breaches</li>
            </ul>
            <p className="mt-3">
              In the event of a data breach affecting your account, we will notify you within 72
              hours of becoming aware, in accordance with the DPDP Act 2023.
            </p>
          </div>

          {/* Section 11 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              11. Your Rights Under the DPDP Act 2023
            </h2>
            <p className="mt-3">
              As a Data Principal under the Digital Personal Data Protection Act, 2023 (India), you
              have the right to:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong>Access:</strong> Obtain a summary of personal data we process and
                information about processing activities
              </li>
              <li>
                <strong>Correction and Erasure:</strong> Request correction of inaccurate data or
                deletion of data we no longer need
              </li>
              <li>
                <strong>Grievance Redressal:</strong> Raise a complaint with our Data Protection
                Officer and receive a response within 30 days
              </li>
              <li>
                <strong>Nomination:</strong> Designate a nominee to exercise your data rights in
                the event of death or incapacity
              </li>
            </ul>
            <p className="mt-3">
              To exercise these rights, contact{' '}
              <a
                href="mailto:privacy@responza.in"
                className="text-link-secondary hover:underline"
              >
                privacy@responza.in
              </a>
              . We will respond within 30 days.
            </p>
          </div>

          {/* Section 12 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">12. Cookies and Tracking</h2>
            <p className="mt-3">
              Responza's web dashboard uses cookies and similar technologies for session
              management, preference storage, and analytics. We use strictly necessary cookies
              (required for platform operation), performance cookies (to improve user experience),
              and analytics cookies (via third-party tools such as Google Analytics). You may
              control non-essential cookies through your browser settings.
            </p>
          </div>

          {/* Section 13 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">13. Children's Privacy</h2>
            <p className="mt-3">
              Responza is a business-to-business platform intended for use by registered
              businesses. We do not knowingly collect personal information from individuals under
              18 years of age. Business Users are responsible for ensuring their own End Customers
              are of appropriate age.
            </p>
          </div>

          {/* Section 14 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">14. Changes to This Policy</h2>
            <p className="mt-3">
              We may update this Privacy Policy as our platform evolves. We will notify Business
              Users of material changes by email and via the Responza dashboard at least 15 days
              before changes take effect. Continued use of the platform after the effective date
              constitutes acceptance.
            </p>
          </div>

          {/* Section 15 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              15. Contact — Privacy Enquiries
            </h2>
            <p className="mt-3">Data Protection Officer, Responza (by Grupo.in)</p>
            <p className="mt-1">
              Email:{' '}
              <a
                href="mailto:privacy@responza.in"
                className="text-link-secondary hover:underline"
              >
                contact@grupo.in
              </a>
            </p>
            <p className="mt-1">
              Website:{' '}
              <a
                href="https://www.responza.in"
                className="text-link-secondary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.responza.in
              </a>
            </p>
            <p className="mt-1">Registered in India under Grupo.in</p>
          </div>
          </section>
        </div>
      </section>

      <LandingFooter />
    </main>
  )
}