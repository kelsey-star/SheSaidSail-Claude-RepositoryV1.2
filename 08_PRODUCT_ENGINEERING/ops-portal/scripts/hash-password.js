/**
 * Generate a SHA-256 password hash for Portal Users table.
 * Usage: node scripts/hash-password.js YourPassword123
 * Paste the output into the Password_Hash field in Airtable Portal Users.
 */
const crypto = require('crypto')
const password = process.argv[2]
if (!password) { console.error('Usage: node scripts/hash-password.js <password>'); process.exit(1) }
const hash = crypto.createHash('sha256').update(password).digest('hex')
console.log('\n--- Portal User Password Hash ---')
console.log('Password:      ', password)
console.log('Password_Hash: ', hash)
console.log('\nPaste Password_Hash into Airtable Portal Users table.\n')
