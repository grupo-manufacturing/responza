import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { LandingFooter } from '@/components/landing/LandingFooter'
import { LandingNavbar } from '@/components/landing/LandingNavbar'

export function TermsConditionsPage(): ReactElement {
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
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-sm text-slate-500">Effective Date: April 16, 2026</p>

          <section className="mt-10 space-y-8 text-slate-700">
          <p>
            These Terms and Conditions ("Terms") constitute a legally binding agreement between
            you ("Business User") and Responza, operated by Grupo.in ("Responza", "we", "us"),
            governing your access to and use of the Responza platform, APIs, dashboard, and
            related services (collectively, the "Platform").
          </p>
          <p>
            By creating an account or using the Platform, you confirm that you have read,
            understood, and agree to these Terms. If you are registering on behalf of a company or
            business, you represent that you have authority to bind that entity.
          </p>

          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">1. About Responza</h2>
            <p className="mt-3">
              Responza is a unified AI-powered messaging and customer intelligence platform that
              connects to your business accounts on WhatsApp (via Meta's Business API), Instagram
              (via Meta's Graph API), IndiaMart, and TikTok. Responza provides:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>A unified inbox aggregating messages from all connected channels</li>
              <li>
                AI-powered daily insights on customer interactions, volumes, and channel
                performance
              </li>
              <li>
                Real-time message translation across Hindi, Telugu, English, and Spanish
              </li>
              <li>
                Automated intent detection and smart routing of messages (e.g., customer support,
                sales enquiry, complaint)
              </li>
              <li>AI-assisted response suggestions and workflow automation tools</li>
            </ul>
            <p className="mt-3">
              Responza is part of the Grupo.in family of products and is built for businesses —
              particularly Indian MSMEs and social commerce sellers — operating across digital and
              offline channels.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              2. Eligibility and Account Registration
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                You must be at least 18 years of age and operate a legitimate business entity to
                use Responza.
              </li>
              <li>
                You agree to provide accurate, current, and complete information during
                registration.
              </li>
              <li>
                You are responsible for all activity that occurs under your account and for
                maintaining the security of your login credentials. Notify us immediately at{' '}
                <a
                  href="mailto:support@responza.in"
                  className="text-link-secondary hover:underline"
                >
                  support@responza.in
                </a>{' '}
                if you suspect unauthorised access.
              </li>
              <li>
                Responza reserves the right to verify your business identity and to decline or
                suspend registration at its sole discretion.
              </li>
              <li>
                One account per business entity. Creating multiple accounts to circumvent usage
                limits or policies is prohibited.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              3. Connected Channels and API Authorisation
            </h2>

            <h3 className="mt-4 font-semibold">3.1 WhatsApp Business API (Meta)</h3>
            <p className="mt-2">
              To use WhatsApp integration, you must hold a valid WhatsApp Business account and
              authorise Responza as your Business Solutions Provider (BSP). By connecting
              WhatsApp, you agree to:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                WhatsApp's Business Policy (
                <a
                  href="https://www.whatsapp.com/legal/business-policy"
                  className="text-link-secondary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.whatsapp.com/legal/business-policy
                </a>
                )
              </li>
              <li>
                Meta's Platform Terms (
                <a
                  href="https://developers.facebook.com/terms"
                  className="text-link-secondary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  developers.facebook.com/terms
                </a>
                )
              </li>
              <li>
                Ensure all WhatsApp messaging via Responza complies with Meta's messaging
                guidelines, including opt-in requirements for promotional messages
              </li>
            </ul>

            <h3 className="mt-4 font-semibold">3.2 Instagram Messaging (Meta)</h3>
            <p className="mt-2">
              Instagram DM integration requires you to authorise Responza through Meta's OAuth
              flow. You must own or have administrative access to the Instagram Business or Creator
              account you connect. Meta's Platform Terms apply to all Instagram data accessed
              through Responza.
            </p>

            <h3 className="mt-4 font-semibold">3.3 IndiaMart</h3>
            <p className="mt-2">
              IndiaMart integration requires a valid IndiaMart seller subscription with API access
              enabled. You are responsible for complying with IndiaMart's platform terms. Responza
              is not affiliated with IndiaMart and cannot guarantee API availability or continuity.
            </p>

            <h3 className="mt-4 font-semibold">3.4 TikTok</h3>
            <p className="mt-2">
              TikTok integration is available for TikTok Business accounts with messaging API
              access. You must comply with TikTok's Business API Terms of Service. Responza's
              TikTok integration availability is subject to TikTok's API policies and regional
              restrictions.
            </p>

            <h3 className="mt-4 font-semibold">3.5 Channel Availability</h3>
            <p className="mt-2">
              Responza does not guarantee uninterrupted access to any third-party channel. If
              Meta, IndiaMart, or TikTok changes or restricts their API terms, Responza may need
              to modify, suspend, or discontinue an integration. We will notify you as promptly as
              possible in such events.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              4. AI Features — Scope and Limitations
            </h2>

            <h3 className="mt-4 font-semibold">4.1 Message Translation</h3>
            <p className="mt-2">
              Responza provides real-time message translation between Hindi, Telugu, English, and
              Spanish. Translations are AI-generated and provided for convenience. Responza does
              not guarantee translation accuracy and is not liable for misunderstandings arising
              from translated communications. Business Users should review AI translations before
              sending critical responses.
            </p>

            <h3 className="mt-4 font-semibold">4.2 Intent Detection and Smart Routing</h3>
            <p className="mt-2">
              Responza's AI classifies incoming messages by intent and suggests routing. These
              classifications are probabilistic in nature. Responza does not guarantee 100%
              accuracy and is not liable for messages routed incorrectly. Business Users are
              responsible for supervising AI routing and maintaining final approval over customer
              communications.
            </p>

            <h3 className="mt-4 font-semibold">4.3 Customer Insights</h3>
            <p className="mt-2">
              Daily and periodic analytics are generated from your message data. These insights are
              provided for informational and decision-support purposes. Responza does not guarantee
              the accuracy or completeness of analytics and is not liable for business decisions
              made on the basis of Platform-generated insights.
            </p>

            <h3 className="mt-4 font-semibold">4.4 AI Response Suggestions</h3>
            <p className="mt-2">
              Where Responza provides AI-generated response suggestions, these are suggestions
              only. Business Users retain full responsibility for the content of all communications
              sent to their End Customers.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              5. Subscription Plans and Billing
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                Responza offers subscription-based pricing plans. Current pricing is available at{' '}
                <a
                  href="https://www.responza.in/pricing"
                  className="text-link-secondary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.responza.in/pricing
                </a>{' '}
                and may be updated from time to time.
              </li>
              <li>
                Subscriptions are billed monthly or annually as selected. Payments are due in
                advance.
              </li>
              <li>
                All prices are in Indian Rupees (INR) unless otherwise stated. Applicable GST will
                be added to all invoices.
              </li>
              <li>
                Responza will notify Business Users at least 30 days before implementing any price
                changes.
              </li>
              <li>
                Payments are non-refundable except as required by applicable Indian consumer law
                or as explicitly stated in our Refund Policy.
              </li>
              <li>
                In the event of non-payment, Responza may suspend access to the Platform with 7
                days' written notice.
              </li>
            </ul>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">6. Acceptable Use Policy</h2>
            <p className="mt-3">By using Responza, you agree NOT to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                Send spam, bulk unsolicited messages, or use Responza to conduct mass marketing
                without proper end-customer opt-in in violation of platform policies
              </li>
              <li>Use Responza to harass, abuse, threaten, or defraud any person</li>
              <li>Use the Platform to transmit malware, viruses, or harmful code</li>
              <li>
                Process sensitive personal data categories — including health data, financial
                account information, national identification numbers, or data relating to minors —
                through Responza's messaging channels without appropriate safeguards
              </li>
              <li>
                Attempt to reverse-engineer, scrape, or extract data from the Platform beyond what
                is available through official APIs
              </li>
              <li>
                Use Responza to conduct activities that violate Indian law or the laws of any
                jurisdiction in which your End Customers are located
              </li>
              <li>
                Resell, sublicense, or white-label access to the Platform without Responza's prior
                written consent
              </li>
              <li>
                Use Responza in a manner that could damage, overload, or impair our infrastructure
                or third-party APIs
              </li>
            </ul>
            <p className="mt-3">
              Violation of this Acceptable Use Policy may result in immediate suspension or
              termination of your account without refund.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              7. Data Ownership and Licence
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                Business Users retain ownership of their business data and End Customer
                conversation data processed through Responza.
              </li>
              <li>
                You grant Responza a limited, non-exclusive licence to process, transmit, and
                store your data for the sole purpose of providing the Platform services.
              </li>
              <li>
                Responza retains ownership of all Platform software, AI models, algorithms,
                insights methodologies, interface designs, and aggregated anonymised data derived
                from Platform use.
              </li>
              <li>
                Business Users may export their conversation data at any time through the Platform
                dashboard.
              </li>
            </ul>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              8. Business User Responsibilities Regarding End Customers
            </h2>
            <p className="mt-3">You acknowledge and agree that:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                You are the data controller for your End Customers' personal data and Responza
                acts as your data processor
              </li>
              <li>
                You are responsible for obtaining valid consent from your End Customers to receive
                messages and to process their data through third-party platforms including Responza
              </li>
              <li>
                You must maintain and publish a privacy policy for your own business that discloses
                your use of messaging platforms, AI-powered tools, and data processors
              </li>
              <li>
                You will handle End Customer data in compliance with all applicable laws, including
                the Digital Personal Data Protection Act, 2023
              </li>
              <li>
                You will promptly notify Responza if you become aware of any data breach involving
                your connected channels
              </li>
            </ul>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">9. Confidentiality</h2>
            <p className="mt-3">
              Each party agrees to keep confidential any non-public information of the other party
              disclosed in the course of using the Platform, including pricing, technical systems,
              and business strategy. This obligation does not apply to information that is publicly
              available, independently developed, or required to be disclosed by law.
            </p>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">10. Intellectual Property</h2>
            <p className="mt-3">
              Responza, its logo, AI engine, dashboard design, and all related technology are the
              intellectual property of Grupo.in. You are granted a limited, non-exclusive,
              non-transferable licence to use the Platform for your business purposes. You may not
              copy, adapt, reverse-engineer, or create derivative works from any element of the
              Platform.
            </p>
          </div>

          {/* Section 11 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              11. Disclaimer of Warranties
            </h2>
            <p className="mt-3">
              Responza is provided on an "as is" and "as available" basis. We make no warranties,
              express or implied, including warranties of merchantability, fitness for a particular
              purpose, or non-infringement. We do not warrant that the Platform will be
              error-free, uninterrupted, or that AI-generated content (translations, insights,
              intent classifications) will be 100% accurate.
            </p>
          </div>

          {/* Section 12 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">12. Limitation of Liability</h2>
            <p className="mt-3">
              To the fullest extent permitted under Indian law, Responza's total aggregate
              liability for any claim arising from these Terms shall not exceed the subscription
              fees paid by you in the 3 months immediately preceding the claim.
            </p>
            <p className="mt-3">
              Responza shall not be liable for indirect, incidental, consequential, or punitive
              damages, including lost revenue, business interruption, reputational harm, or loss of
              customer data, even if advised of the possibility of such damages.
            </p>
            <p className="mt-3">
              Responza is not liable for the actions, policies, or downtime of third-party
              platforms including Meta (WhatsApp/Instagram), IndiaMart, or TikTok.
            </p>
          </div>

          {/* Section 13 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">13. Indemnification</h2>
            <p className="mt-3">
              You agree to indemnify, defend, and hold harmless Responza, Grupo.in, and their
              respective officers, directors, employees, and agents from and against any claims,
              liabilities, damages, losses, and expenses (including reasonable legal fees) arising
              from: (a) your use of the Platform in violation of these Terms; (b) your
              communications sent to End Customers via Responza; (c) your violation of any
              applicable law or third-party platform terms; or (d) infringement of third-party
              rights.
            </p>
          </div>

          {/* Section 14 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">14. Term and Termination</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                These Terms are effective from the date you create an account and remain in effect
                until terminated.
              </li>
              <li>
                You may cancel your subscription at any time from the dashboard. Cancellation
                takes effect at the end of the current billing period.
              </li>
              <li>
                Responza may suspend or terminate your account immediately for material breach of
                these Terms, violation of the Acceptable Use Policy, non-payment, or conduct that
                harms other users or the Platform.
              </li>
              <li>
                Upon termination, your access to the Platform ceases. You may export your data
                within 30 days of termination, after which identifiable data is deleted per the
                retention policy.
              </li>
              <li>
                Provisions relating to intellectual property, confidentiality, limitation of
                liability, indemnification, and dispute resolution survive termination.
              </li>
            </ul>
          </div>

          {/* Section 15 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              15. Modifications to the Platform and Terms
            </h2>
            <p className="mt-3">
              Responza reserves the right to modify, suspend, or discontinue any feature of the
              Platform at any time, with reasonable notice where possible. We may update these
              Terms at any time. Material changes will be communicated by email and in-dashboard
              notification at least 15 days before taking effect. Continued use after the effective
              date constitutes acceptance.
            </p>
          </div>

          {/* Section 16 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">16. Dispute Resolution</h2>
            <p>
              Users may bring any disputes to the Company who will try to resolve them amicably.
            </p>
            <p>
              While User's right to take legal action shall always remain unaffected, in the event of any controversy regarding the use of Responza or the Service, Users are asked to contact the Company at the contact details provided in this document.
            </p>
            <p>
              The user may submit the complaint including a brief description and if applicable , the details of the related order , purchase , or account to the Company's email address specified in this document.
            </p>
          </div>

          {/* Section 17 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              17. Governing Law and Jurisdiction
            </h2>
            <p className="mt-3">
              These Terms are governed by the laws of India. Subject to the arbitration clause,
              you submit to the exclusive jurisdiction of the courts of Hyderabad, Telangana,
              India.
            </p>
          </div>

          {/* Section 18 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">18. General Provisions</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong>Entire Agreement:</strong> These Terms, together with the Privacy Policy
                and any applicable order forms, constitute the entire agreement between you and
                Responza.
              </li>
              <li>
                <strong>Severability:</strong> If any provision is found unenforceable, the
                remaining provisions remain in full force.
              </li>
              <li>
                <strong>Waiver:</strong> Failure to enforce any right under these Terms does not
                constitute a waiver of that right.
              </li>
              <li>
                <strong>Assignment:</strong> You may not assign your rights under these Terms
                without Responza's written consent. Responza may assign its rights in connection
                with a merger or acquisition.
              </li>
              <li>
                <strong>Force Majeure:</strong> Responza is not liable for delays or failures
                caused by circumstances beyond its reasonable control, including API platform
                outages, internet failures, or acts of government.
              </li>
            </ul>
          </div>

          {/* Section 19 */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              19. Contact — Legal Enquiries
            </h2>
            <p className="mt-3">Responza (by Grupo.in)</p>
            <p className="mt-1">
              Email:{' '}
              <a
                href="mailto:legal@responza.in"
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
            <p className="mt-1">Registered in India</p>
          </div>
          </section>
        </div>
      </section>

      <LandingFooter />
    </main>
  )
}