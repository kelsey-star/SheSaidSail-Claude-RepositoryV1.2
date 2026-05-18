import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Img,
  Row,
  Column,
  Link,
} from '@react-email/components'

interface EmailLayoutProps {
  preview: string
  children: React.ReactNode
}

export function EmailLayout({ preview, children }: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header */}
          <Section style={styles.header}>
            <Text style={styles.logoText}>She Said Sail</Text>
            <Text style={styles.logoSub}>LUXURY YACHT CHARTERS</Text>
          </Section>

          {/* Gold rule */}
          <Hr style={styles.goldRule} />

          {/* Content */}
          <Section style={styles.content}>{children}</Section>

          {/* Footer */}
          <Hr style={styles.divider} />
          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              She Said Sail · Miami, FL
            </Text>
            <Row>
              <Column align="center">
                <Link href="https://shesaidsail.com" style={styles.footerLink}>
                  Website
                </Link>
                {'  ·  '}
                <Link href="https://instagram.com/shesaidsail" style={styles.footerLink}>
                  Instagram
                </Link>
                {'  ·  '}
                <Link href="mailto:ahoy@shesaidsail.com" style={styles.footerLink}>
                  Contact
                </Link>
              </Column>
            </Row>
            <Text style={styles.footerSmall}>
              © {new Date().getFullYear()} She Said Sail. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const styles = {
  body: {
    backgroundColor: '#0a0a0a',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    margin: '0',
    padding: '24px 0',
  },
  container: {
    maxWidth: '520px',
    margin: '0 auto',
    backgroundColor: '#141414',
    border: '1px solid #252525',
    borderRadius: '12px',
    overflow: 'hidden' as const,
  },
  header: {
    padding: '36px 40px 20px',
    textAlign: 'center' as const,
  },
  logoText: {
    fontSize: '20px',
    fontWeight: '500',
    color: '#f0ede8',
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    margin: '0 0 4px',
  },
  logoSub: {
    fontSize: '9px',
    color: '#c9a96e',
    letterSpacing: '0.25em',
    textTransform: 'uppercase' as const,
    margin: '0',
  },
  goldRule: {
    borderTop: '1px solid #3d2e12',
    margin: '0 40px 0',
  },
  content: {
    padding: '36px 40px',
  },
  divider: {
    borderTop: '1px solid #252525',
    margin: '0 40px',
  },
  footer: {
    padding: '24px 40px',
    textAlign: 'center' as const,
  },
  footerText: {
    fontSize: '12px',
    color: '#505050',
    margin: '0 0 8px',
  },
  footerLink: {
    color: '#c9a96e',
    textDecoration: 'none',
    fontSize: '12px',
  },
  footerSmall: {
    fontSize: '11px',
    color: '#303030',
    margin: '12px 0 0',
  },
}
