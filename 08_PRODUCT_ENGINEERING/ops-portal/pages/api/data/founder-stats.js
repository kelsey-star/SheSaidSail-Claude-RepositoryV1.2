import { requireApiAuth } from '../../../lib/withAuth'
import {
  requests, bookings, approvals, tasks, alerts,
  payments, payouts, issues, campaigns, getAll, T,
} from '../../../lib/airtable'

export default requireApiAuth(['Founder'], async function (req, res) {
  const [
    todayLeads,
    hotLeads,
    activeBookings,
    next7,
    pendingApprovals,
    openTasks,
    openAlerts,
    openIssues,
    recentPayments,
    balancesDue,
    pendingPayouts,
  ] = await Promise.allSettled([
    requests.getToday(),
    requests.getHot(),
    bookings.getActive(),
    bookings.getNext7Days(),
    approvals.getPending(),
    tasks.getOpen(),
    alerts.getUnresolved(),
    issues.getOpen(),
    payments.getRecent(),
    payments.getBalancesDue(),
    payouts.getPending(),
  ])

  function val(result) {
    return result.status === 'fulfilled' ? result.value : []
  }

  const activeBookingsList = val(activeBookings)
  const paymentsList = val(recentPayments)

  const bookedRevenue = activeBookingsList.reduce((s, b) => s + (b.Total_Value || 0), 0)
  const cashCollected = paymentsList.filter(p => p.Paid).reduce((s, p) => s + (p.Amount || 0), 0)
  const balanceDue = val(balancesDue).reduce((s, p) => s + (p.Amount || 0), 0)

  return res.json({
    todayLeads:       val(todayLeads).length,
    hotLeads:         val(hotLeads).length,
    bookedRevenue,
    cashCollected,
    balanceDue,
    next7Charters:    val(next7).length,
    next7List:        val(next7).slice(0, 7),
    pendingApprovals: val(pendingApprovals).length,
    approvalsList:    val(pendingApprovals).slice(0, 5),
    openIssues:       val(openIssues).length,
    openTasks:        val(openTasks).length,
    openAlerts:       val(openAlerts).length,
    pendingPayouts:   val(pendingPayouts).length,
    pendingPayoutAmt: val(pendingPayouts).reduce((s, p) => s + (p.Amount || 0), 0),
  })
})
