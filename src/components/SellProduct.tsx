/* eslint-disable @typescript-eslint/no-explicit-any */
import {
   Document,
   PDFDownloadLink,
   Page,
   StyleSheet,
   Text,
   View,
} from "@react-pdf/renderer";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Modal from "react-modal";
import { toast } from "sonner";
import { useGetProductByIdQuery } from "../redux/features/product/productApi";
import { useCreateSaleMutation } from "../redux/features/sales/salesApi";

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

Modal.setAppElement("#root");

const MyDocument = ({ sellingInfo }) => (
   <Document>
      <Page size="A4" style={styles.page}>
         <View style={styles.section}>
            <Text>Product Name: {sellingInfo?.productName}</Text>
            <Text>Buyer Name: {sellingInfo?.buyerName}</Text>
            <Text>Quantity: {sellingInfo?.quantity}</Text>
            <Text>Date: {sellingInfo?.date}</Text>
         </View>
      </Page>
   </Document>
);

const SellProduct = ({ productId }: { productId: any }) => {
   const [isFormOpen, setIsFormOpen] = useState(false);

   const [sellProduct] = useCreateSaleMutation();
   const { register, handleSubmit, reset } = useForm();
   const { data: product, isLoading } = useGetProductByIdQuery(productId);
   const [sellingInfo, setSellingInfo] = useState<any>(null);

   const [modalIsOpen, setIsOpen] = useState(false);
   function openModal() {
      setIsOpen(true);
   }

   function closeModal() {
      setIsOpen(false);
   }

   const customStyles = {
      content: {
         top: "50%",
         left: "50%",
         right: "auto",
         bottom: "auto",
         marginRight: "-50%",
         transform: "translate(-50%, -50%)",
         backgroundColor: "#282c34",
         border: "1px solid #888",
         padding: "20px",
         color: "#fff",
         borderRadius: "10px",
         boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.2)",
         textAlign: "center",
      },
   };

   const onSubmit = async (data: FieldValues) => {
      const newSellingInfo = {
         productId,
         productName: product.data.name,
         buyerName: data.buyerName,
         quantity: data.quantity,
         branch: data.branch,
         date: data.date,
      };

      setSellingInfo(newSellingInfo);
      openModal();
      setIsFormOpen(false);
      reset();
      const res = await sellProduct(newSellingInfo);

      if ("error" in res && res.error) {
         toast.error("Something went wrong! Please try again later.", {
            duration: 2000,
         });
         return;
      } else {
         toast.success("Product sold successfully!", {
            duration: 2000,
         });
      }
   };

   if (isLoading) return <div>Loading...</div>;

   return (
      <div id="root">
         <button
            className="btn btn-primary"
            onClick={() => setIsFormOpen(true)}
         >
            Sell
         </button>
         {isFormOpen && (
            <div className="fixed z-50 inset-0 overflow-y-auto">
               <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                     <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                           Sell Product
                        </h3>
                        <form
                           className="mt-2 space-y-4"
                           onSubmit={handleSubmit(onSubmit)}
                        >
                           <div className="flex flex-col">
                              <label
                                 htmlFor="buyerName"
                                 className="mb-2 font-bold text-lg text-gray-900"
                              >
                                 Name of the Buyer
                              </label>
                              <input
                                 {...register("buyerName")}
                                 type="text"
                                 id="buyerName"
                                 name="buyerName"
                                 className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                           </div>
                           <div className="flex flex-col">
                              <label
                                 htmlFor="quantity"
                                 className="mb-2 font-bold text-lg text-gray-900"
                              >
                                 Quantity
                              </label>
                              <input
                                 {...register("quantity")}
                                 type="number"
                                 id="quantity"
                                 name="quantity"
                                 className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                           </div>
                           <div className="flex flex-col">
                              <label
                                 htmlFor="branch"
                                 className="mb-2 font-bold text-lg text-gray-900"
                              >
                                 Branch
                              </label>
                              <input
                                 {...register("branch")}
                                 defaultValue={product?.data.branch}
                                 type="text"
                                 id="branch"
                                 name="branch"
                                 className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                 readOnly
                              />
                           </div>
                           <div className="flex flex-col">
                              <label
                                 htmlFor="date"
                                 className="mb-2 font-bold text-lg text-gray-900"
                              >
                                 Date
                              </label>
                              <input
                                 {...register("date")}
                                 type="date"
                                 id="date"
                                 name="date"
                                 defaultValue={new Date()
                                    .toISOString()
                                    .slice(0, 10)}
                                 className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                           </div>

                           <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                              <button type="submit" className="btn btn-primary">
                                 Submit
                              </button>
                              <button
                                 type="button"
                                 className="btn btn-secondary mr-2"
                                 onClick={() => {
                                    setIsFormOpen(false);
                                    reset();
                                 }}
                              >
                                 Cancel
                              </button>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         )}
         <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
         >
            <h2>Product Sold</h2>
            <PDFDownloadLink
               document={<MyDocument sellingInfo={sellingInfo} />}
               fileName="invoice.pdf"
            >
               {({ blob, url, loading, error }) =>
                  loading ? "Loading document..." : "Download Invoice"
               }
            </PDFDownloadLink>
         </Modal>
      </div>
   );
};

export default SellProduct;
