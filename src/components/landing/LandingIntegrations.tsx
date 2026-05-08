import type { ReactElement } from 'react'
import { Container, Eyebrow } from '@/components/landing/primitives'
import whatsappLogo from '@/assets/whatsapp.png'
import instagramLogo from '@/assets/instagram.png'
import indiamartLogo from '@/assets/indiamart.png'

const INTEGRATIONS = [
  { id: 'whatsapp', label: 'WhatsApp', src: whatsappLogo },
  { id: 'instagram', label: 'Instagram', src: instagramLogo },
  { id: 'indiamart', label: 'IndiaMART', src: indiamartLogo },
] as const

export function LandingIntegrations(): ReactElement {
  return (
    <section id="integrations" className="landing-integrations">
      <Container>
        <div className="landing-integrations-head">
          <Eyebrow>Integrations</Eyebrow>
          <h2 className="landing-integrations-title">
            Connect your sales channels in one inbox.
          </h2>
          <p className="landing-integrations-kicker">
            Use WhatsApp, Instagram and IndiaMART from a single workspace built for Indian teams.
          </p>
        </div>

        <div className="landing-integrations-logos" role="list" aria-label="Channel integrations">
          {INTEGRATIONS.map((int) => (
            <div key={int.id} className="landing-integrations-logo-wrap" role="listitem">
              <img
                className="landing-integrations-logo-img"
                src={int.src}
                alt={int.label}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
