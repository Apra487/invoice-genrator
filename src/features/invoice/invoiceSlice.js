import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  invoices: [],
  currentInvoice: null
};

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    addInvoice: (state, action) => {
      action.payload.id = state.invoices.length + 1;
      state.invoices.push(action.payload);
    },
    editInvoice: (state, action) => {
      const index = state.invoices.findIndex(invoice => invoice.id === action.payload.id);
      if (index !== -1) {
        state.invoices[index] = action.payload;
      }
    },
    deleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter(invoice => invoice.id !== action.payload);
    },
    viewInvoice: (state, action) => {
      state.currentInvoice = state.invoices[action.payload - 1];
    }
  }
});

export const { addInvoice, editInvoice, deleteInvoice, viewInvoice } = invoiceSlice.actions;

export default invoiceSlice.reducer;