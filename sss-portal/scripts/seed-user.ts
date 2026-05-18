/**
 * Generate a bcrypt hash for a portal user password.
 * Usage: npx tsx scripts/seed-user.ts <password>
 * Then copy the hash into the Airtable Users table → Password_Hash field.
 */

import bcrypt from 'bcryptjs'

const password = process.argv[2]

if (!password) {
  console.error('Usage: npx tsx scripts/seed-user.ts <password>')
  process.exit(1)
}

const hash = await bcrypt.hash(password, 12)

console.log('\n--- User Seed ---')
console.log(`Password:      ${password}`)
console.log(`Password_Hash: ${hash}`)
console.log('\nPaste Password_Hash into the Airtable Users table.\n')
