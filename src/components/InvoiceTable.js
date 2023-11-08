import React from 'react';
import { Table } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const InvoiceTable = ({
	invoices,
	handleViewInvoice,
	handleEditInvoice,
	handleDeleteInvoice,
}) => (
	<Table striped bordered hover>
		<thead>
			<tr>
				<th className='text-center'>Invoice #</th>
				<th className='text-center'>Date of Issue</th>
				<th className='text-center'>Bill To</th>
				<th className='text-center'>Bill From</th>
				<th className='text-center'>Total</th>
				<th className='text-center'>Sub Total</th>
				<th className='text-center'>Tax Rate</th>
				<th className='text-center'>Tax Amount</th>
				<th className='text-center'>Discount Rate</th>
				<th className='text-center'>Discount Amount</th>
				<th className='text-center'>Actions</th>
			</tr>
		</thead>
		<tbody>
			{invoices.map((invoice, index) => (
				<tr key={index}>
					<td className='text-center'>{invoice.invoiceNumber}</td>
					<td className='text-center'>{invoice.dateOfIssue}</td>
					<td className='text-center'>{invoice.billTo}</td>
					<td className='text-center'>{invoice.billFrom}</td>
					<td className='text-center'>{invoice.total}</td>
					<td className='text-center'>{invoice.subTotal}</td>
					<td className='text-center'>{invoice.taxRate}</td>
					<td className='text-center'>{invoice.taxAmmount}</td>
					<td className='text-center'>{invoice.discountRate}</td>
					<td className='text-center'>{invoice.discountAmmount}</td>
					<td>
						<FaEye
							style={{ margin: '10px' }}
							onClick={() => handleViewInvoice(invoice.id)}
						/>
						<FaEdit
							style={{ margin: '10px' }}
							onClick={() => handleEditInvoice(invoice.id)}
						/>
						<FaTrash
							style={{ margin: '10px' }}
							onClick={() => handleDeleteInvoice(invoice.id)}
						/>
					</td>
				</tr>
			))}
		</tbody>
	</Table>
);

export default InvoiceTable;
