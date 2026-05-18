import withSession from './lib/withSession'
import { ROLE_HOME } from '../lib/withAuth'

export default function Home() {
  return null
}

export const getServerSideProps = withSession(async ({ req }) => {
  const user = req.session.get('user')
  if (!user) return { redirect: { destination: '/login', permanent: false } }
  return { redirect: { destination: ROLE_HOME[user.role] || '/login', permanent: false } }
})
