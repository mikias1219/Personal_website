// Open web links in a new tab; leave mailto: and in-page links alone.
export const externalProps = (href: string) =>
  href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {};
