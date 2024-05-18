import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
// import { styles } from "./PDFStyles";
// Create styles
const styles = StyleSheet.create({
   page: {
      flexDirection: "column",
      backgroundColor: "#ffffff",
      padding: 30,
   },
   section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
   },
   title: {
      fontSize: 30,
      textAlign: "center",
      marginBottom: 20,
      fontWeight: "bold",
   },
   item: {
      flexDirection: "row",
      marginBottom: 15,
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      alignItems: "stretch",
   },
   itemColumn: {
      flexDirection: "column",
      margin: 10,
   },
   itemName: {
      fontSize: 20,
      fontWeight: "bold",
   },
   itemQuantity: {
      fontSize: 18,
   },
   itemDate: {
      fontSize: 18,
   },
});
// Create Document Component
const Invoice = ({ invoice }) => (
   <Document>
      <Page size="A4" style={styles.page}>
         <Text style={styles.title}>Invoice</Text>
         <Text>Name of Buyer: {invoice.buyerName}</Text>
         <View style={styles.item}>
            <Text style={[styles.itemColumn, styles.itemName]}>
               Product: {invoice.productName}
            </Text>
            <Text style={[styles.itemColumn, styles.itemQuantity]}>
               Quantity: {invoice.quantity}
            </Text>
            <Text style={[styles.itemColumn, styles.itemDate]}>
               Date: {invoice.date}
            </Text>
         </View>
      </Page>
   </Document>
);

export default Invoice;
