import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
   page: {
      padding: 30,
   },
   section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
   },
});

// Create Document Component
const SalesReport = ({ reportData }) => (
   <Document>
      <Page size="A4" style={styles.page}>
         <View style={styles.section}>
            <Text>Total Quantity: {reportData.totalQuantity}</Text>
            <Text>Total Sell Amount: {reportData.totalSellAmount}</Text>
         </View>
      </Page>
   </Document>
);

export default SalesReport;
