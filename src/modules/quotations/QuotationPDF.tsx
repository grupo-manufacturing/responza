import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { memo, type ReactElement } from 'react'

import type { Customer } from '@/types/customer.types'
import type { Quotation } from '@/types/quotation.types'

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#111',
  },
  title: {
    fontSize: 18,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 10,
    color: '#444',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: { width: 90, color: '#555' },
  value: { flex: 1 },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 4,
    marginTop: 16,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  colDesc: { width: '42%' },
  colQty: { width: '12%', textAlign: 'right' },
  colUnit: { width: '18%', textAlign: 'right' },
  colLine: { width: '28%', textAlign: 'right' },
  totals: { marginTop: 20, alignSelf: 'flex-end', width: 200 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
  grand: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#333',
    fontWeight: 'bold',
  },
})

export interface QuotationPDFProps {
  quotation: Quotation
  customer: Customer
}

function QuotationPDFComponent({
  quotation,
  customer,
}: QuotationPDFProps): ReactElement {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Quotation {quotation.quoteNumber}</Text>
        <Text style={styles.subtitle}>Prepared for {customer.companyName}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Contact</Text>
          <Text style={styles.value}>{customer.contactName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{customer.email}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.value}>{quotation.status}</Text>
        </View>
        {quotation.validUntil !== null ? (
          <View style={styles.row}>
            <Text style={styles.label}>Valid until</Text>
            <Text style={styles.value}>{quotation.validUntil}</Text>
          </View>
        ) : null}
        {quotation.notes !== null && quotation.notes.trim() !== '' ? (
          <View style={styles.row}>
            <Text style={styles.label}>Notes</Text>
            <Text style={styles.value}>{quotation.notes}</Text>
          </View>
        ) : null}

        <View style={styles.tableHeader}>
          <Text style={styles.colDesc}>Description</Text>
          <Text style={styles.colQty}>Qty</Text>
          <Text style={styles.colUnit}>Unit</Text>
          <Text style={styles.colLine}>Line total</Text>
        </View>
        {quotation.lineItems.map((line) => (
          <View key={line.id} style={styles.tableRow} wrap={false}>
            <Text style={styles.colDesc}>{line.description || '—'}</Text>
            <Text style={styles.colQty}>{String(line.quantity)}</Text>
            <Text style={styles.colUnit}>${line.unitPrice.toFixed(2)}</Text>
            <Text style={styles.colLine}>${line.lineTotal.toFixed(2)}</Text>
          </View>
        ))}

        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text>Subtotal</Text>
            <Text>${quotation.subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Tax</Text>
            <Text>${quotation.tax.toFixed(2)}</Text>
          </View>
          <View style={styles.grand}>
            <Text>Total</Text>
            <Text>${quotation.total.toFixed(2)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export const QuotationPDF = memo(QuotationPDFComponent)
