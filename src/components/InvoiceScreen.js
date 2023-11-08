/* -----------------Globals--------------- */
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/* -----------------UI--------------- */
import {  Button } from 'react-bootstrap';
import InvoiceModal from './InvoiceModal';
import InvoiceTable from './InvoiceTable';

/* -----------------Redux Actions--------------- */
import { deleteInvoice, viewInvoice } from '../features/invoice/invoiceSlice';

const InvoiceScreen = () => {
	const invoices = useSelector((state) => state.invoice.invoices);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [currentInvoice, setCurrentInvoice] = useState(null);

	const [showModal, setShowModal] = useState(false);

	const handleCreateInvoice = () => {
		navigate('/create-invoice');
	};

	const handleViewInvoice = (invoiceId) => {
		dispatch(viewInvoice(invoiceId));
		const currentInvoice = invoices[invoiceId - 1];

		setCurrentInvoice(currentInvoice);
		setShowModal(true);

	};

	const handleEditInvoice = (invoiceId) => {
		navigate(`/edit-invoice/${invoiceId}`);
	};

	const handleDeleteInvoice = (invoiceId) => {
		dispatch(deleteInvoice(invoiceId));
	};

	return (
		<div className='d-flex flex-column align-items-center mt-4 vh-100'>
			<Button onClick={handleCreateInvoice} className='mb-4'>
				Create Invoice
			</Button>
			{invoices.length > 0 ? (
				<div style={{ maxWidth: '100%' }}>
					<InvoiceTable
                    invoices={invoices}
                    handleViewInvoice={handleViewInvoice}
                    handleEditInvoice={handleEditInvoice}
                    handleDeleteInvoice={handleDeleteInvoice}
                />
				</div>
			): (
        <p>No invoices available. Please create a new invoice.</p>
      )}
      {showModal &&  currentInvoice &&
						<InvoiceModal
							showModal={showModal}
							closeModal={() => setShowModal(false)}
							info={currentInvoice}
							items={currentInvoice?.items}
							currency={currentInvoice?.currency}
							subTotal={currentInvoice?.subTotal}
							taxAmmount={currentInvoice?.taxAmmount}
							discountAmmount={currentInvoice?.discountAmmount}
							total={currentInvoice.total}
						/> 
						  }
		</div>
	);
};

export default InvoiceScreen;
