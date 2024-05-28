export const calculateFinancials = (totalQuantity, totalSellAmount) => {
   const totalExpense = totalSellAmount * 0.7;

   const profit = totalSellAmount - totalExpense;
   const loss = totalExpense - totalSellAmount;

   return {
      totalQuantity,
      totalSellAmount,
      totalExpense,
      profit: profit > 0 ? profit : 0,
      loss: loss > 0 ? loss : 0,
   };
};
