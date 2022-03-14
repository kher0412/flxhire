import { withLayoutAndPreloadedQuery } from 'withLayout'
import Invoice, { InvoiceQuery } from 'scenes/ClientManage/components/Invoice/Invoice'

export default withLayoutAndPreloadedQuery(Invoice, InvoiceQuery, { name: 'ClientInvoice' })
