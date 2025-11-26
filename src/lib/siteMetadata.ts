const normalizeUrl = (value: string) => value.replace(/\/$/, '');

const siteUrl = normalizeUrl(
  process.env.NEXT_PUBLIC_SITE_URL || 'https://wapp.software'
);

export const siteMetadata = {
  siteUrl,
  siteName: 'WAPP Software Factory',
  title: 'WAPP Software Factory | Desarrollo de software, apps móviles e IA',
  description:
    'Equipo nearshore en Latinoamérica especializado en desarrollo web, apps móviles, IA aplicada y DevOps para acelerar negocios digitales.',
  locale: 'es_AR',
  openGraphImage: `${siteUrl}/wapp/logo-ok.svg`,
  keywords: [
    'software factory',
    'desarrollo web',
    'aplicaciones móviles',
    'IA generativa',
    'Next.js',
    'React',
    'DevOps',
    'SaaS',
    'consultoría tecnológica',
    'automatización',
  ],
  contact: {
    phone: '+54 9 362 520 1249',
    email: 'contacto@wapp.software',
    areaServed: 'Latinoamérica',
  },
};

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: siteMetadata.siteName,
  url: siteMetadata.siteUrl,
  logo: siteMetadata.openGraphImage,
  description: siteMetadata.description,
  areaServed: siteMetadata.contact.areaServed,
  telephone: siteMetadata.contact.phone,
  email: siteMetadata.contact.email,
  sameAs: [] as string[],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: siteMetadata.contact.phone,
      contactType: 'sales',
      email: siteMetadata.contact.email,
      areaServed: siteMetadata.contact.areaServed,
    },
  ],
};
