import { Text, Section, Hr } from '@react-email/components'
import { EmailLayout } from './layout'

interface InquiryConfirmationProps {
  firstName: string
  destination?: string
  charterDate?: string
  groupSize?: number
}

export default function InquiryConfirmationEmail({
  firstName,
  destination,
  charterDate,
  groupSize,
}: InquiryConfirmationProps) {
  return (
    <EmailLayout
      preview={`Your inquiry has been received — She Said Sail`}
    >
      <Text style={styles.greeting}>Hello {firstName},</Text>

      <Text style={styles.body}>
        Thank you for reaching out. Your inquiry has been received and our concierge team
        will be in touch within 24 hours.
      </Text>

      {(destination || charterDate || groupSize) && (
        <>
          <Section style={styles.detailBox}>
            <Text style={styles.detailLabel}>YOUR INQUIRY DETAILS</Text>
            <Hr style={styles.detailRule} />
            {destination && <DetailRow label="Destination" value={destination} />}
            {charterDate && <DetailRow label="Requested Date" value={charterDate} />}
            {groupSize && <DetailRow label="Group Size" value={`${groupSize} guests`} />}
          </Section>
        </>
      )}

      <Text style={styles.body}>
        We look forward to crafting an unforgettable experience for you on the water.
      </Text>

      <Text style={styles.signature}>
        Warmly,
        {'\n'}
        <span style={styles.signatureName}>The She Said Sail Team</span>
      </Text>
    </EmailLayout>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Section style={{ marginBottom: '10px' }}>
      <Text style={styles.detailKey}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </Section>
  )
}

const styles = {
  greeting: {
    fontSize: '16px',
    color: '#f0ede8',
    margin: '0 0 16px',
    fontWeight: '400',
  },
  body: {
    fontSize: '15px',
    color: '#a09a90',
    lineHeight: '1.7',
    margin: '0 0 20px',
  },
  detailBox: {
    backgroundColor: '#1c1c1c',
    border: '1px solid #252525',
    borderRadius: '8px',
    padding: '20px 24px',
    margin: '24px 0',
  },
  detailLabel: {
    fontSize: '9px',
    color: '#c9a96e',
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    margin: '0 0 12px',
  },
  detailRule: {
    borderTop: '1px solid #252525',
    margin: '0 0 16px',
  },
  detailKey: {
    fontSize: '11px',
    color: '#505050',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    margin: '0 0 2px',
  },
  detailValue: {
    fontSize: '14px',
    color: '#f0ede8',
    margin: '0',
  },
  signature: {
    fontSize: '14px',
    color: '#808080',
    lineHeight: '1.6',
    margin: '24px 0 0',
    whiteSpace: 'pre-line' as const,
  },
  signatureName: {
    color: '#f0ede8',
    fontWeight: '500',
  },
}

InquiryConfirmationEmail.PreviewProps = {
  firstName: 'Sarah',
  destination: 'Miami · Biscayne Bay',
  charterDate: 'June 14, 2025',
  groupSize: 8,
}
