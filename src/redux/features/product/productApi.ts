import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      getAllProducts: builder.query({
         query: (data) => ({
            url: "/products",
            method: "GET",
            params: data,
         }),
         providesTags: ["Products"],
      }),
      getProductById: builder.query({
         query: (id) => ({
            url: `/products/${id}`,
            method: "GET",
         }),
         providesTags: ["Products"],
      }),
      createProduct: builder.mutation({
         query: (data) => ({
            url: "/products/create-product",
            method: "POST",
            body: data,
         }),
         invalidatesTags: ["Products"],
      }),
      updateProductById: builder.mutation({
         query: ({ id, data }) => ({
            url: `/products/update-product/${id}`,
            method: "PATCH",
            body: data,
         }),
         invalidatesTags: ["Products"],
      }),
      deleteProduct: builder.mutation({
         query: (id) => ({
            url: `/products/delete-product/${id}`,
            method: "DELETE",
         }),
         invalidatesTags: ["Products"],
      }),
      deleteAllProducts: builder.mutation({
         query: () => ({
            url: `/products/delete-products`,
            method: "DELETE",
         }),
         invalidatesTags: ["Products"],
      }),
      deleteMultipleProducts: builder.mutation({
         query: (ids) => ({
            url: `/products/delete-multiple-products`,
            method: "DELETE",
            body: ids,
         }),
         invalidatesTags: ["Products"],
      }),
   }),
});

export const {
   useGetAllProductsQuery,
   useCreateProductMutation,
   useDeleteProductMutation,
   useGetProductByIdQuery,
   useUpdateProductByIdMutation,
   useDeleteAllProductsMutation,
   useDeleteMultipleProductsMutation,
} = productApi;
