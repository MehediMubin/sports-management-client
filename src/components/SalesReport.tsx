import {
   Document,
   Page,
   pdf,
   StyleSheet,
   Text,
   View,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";

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
      flexDirection: "column",
      marginBottom: 15,
      borderBottomColor: "#000",
      borderBottomWidth: 1,
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
const SalesReport = ({ salesReport }) => (
   <Document>
      <Page size="A4" style={styles.page}>
         <View style={styles.section}>
            <Text style={styles.title}>Sales Report</Text>
            <View style={styles.item}>
               <View style={styles.itemColumn}>
                  <Text style={styles.itemName}>Total Quantity:</Text>
                  <Text style={styles.itemQuantity}>
                     {salesReport.totalQuantity}
                  </Text>
               </View>
               <View style={styles.itemColumn}>
                  <Text style={styles.itemName}>Total Sell Amount:</Text>
                  <Text style={styles.itemQuantity}>
                     {salesReport.totalSellAmount}
                  </Text>
               </View>
               <View style={styles.itemColumn}>
                  <Text style={styles.itemName}>Total Expense:</Text>
                  <Text style={styles.itemQuantity}>
                     {salesReport.totalExpense}
                  </Text>
               </View>
               <View style={styles.itemColumn}>
                  <Text style={styles.itemName}>Profit:</Text>
                  <Text style={styles.itemQuantity}>{salesReport.profit}</Text>
               </View>
               <View style={styles.itemColumn}>
                  <Text style={styles.itemName}>Loss:</Text>
                  <Text style={styles.itemQuantity}>{salesReport.loss}</Text>
               </View>
            </View>
         </View>
      </Page>
   </Document>
);

const DownloadSalesReportButton = ({ salesReport }) => (
   <div className="mt-4 mr-1">
      <button
         onClick={async () => {
            const blob = await pdf(
               <SalesReport salesReport={salesReport} />
            ).toBlob();
            saveAs(blob, "sales_report.pdf");
         }}
         className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 border border-blue-700 rounded shadow"
      >
         Download Sales Report
      </button>
   </div>
);

export { DownloadSalesReportButton, SalesReport };
