/* -----------------Globals--------------- */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

/* -----------------UI--------------- */
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';

/* -----------------Child components--------------- */
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';

import { addInvoice, editInvoice } from '../features/invoice/invoiceSlice';

const InvoiceForm = ({
	type = 'create' | 'edit',
}) => {

  const { invoiceId } = useParams();
  const invoices = useSelector(state => state.invoice.invoices)
  
	const [state, setState] = useState(invoiceId ? invoices[invoiceId - 1] : {
		isOpen: false,
		currency: '$',
		currentDate: '',
		invoiceNumber: 1,
		dateOfIssue: '',
		billTo: '',
		billToEmail: '',
		billToAddress: '',
		billFrom: '',
		billFromEmail: '',
		billFromAddress: '',
		notes: '',
		total: '0.00',
		subTotal: '0.00',
		taxRate: '',
		taxAmmount: '0.00',
		discountRate: '',
		discountAmmount: '0.00',
		items: [
			{
				id: 0,
				name: '',
				description: '',
				price: '1.00',
				quantity: 1,
			},
		],
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const addInvoiceToStore = () => {
		dispatch(addInvoice(state));
		navigate('/');
	};

	const editInvoiceToStore = () => {
    dispatch(editInvoice(state));
    navigate('/');
	};

	const action = type === 'create' ? addInvoiceToStore : editInvoiceToStore;

	useEffect(() => {
		handleCalculateTotal();
	}, []);

	const handleRowDel = (items) => {
		const index = state.items.indexOf(items);
		state.items.splice(index, 1);
		setState({ ...state, items: state.items });
	};

	const handleAddEvent = (evt) => {
		const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(
			36
		);
		const items = {
			id: id,
			name: '',
			price: '1.00',
			description: '',
			quantity: 1,
		};
		state.items.push(items);
		setState({ ...state, items: state.items });
	};

	const handleCalculateTotal = () => {
		const items = state.items;
		let subTotal = 0;

		items.map(function (items) {
			subTotal = parseFloat(
				subTotal +
					parseFloat(items.price).toFixed(2) *
						parseInt(items.quantity)
			).toFixed(2);
		});

		setState({
			...state,
			subTotal: parseFloat(subTotal).toFixed(2),
			taxAmmount: parseFloat(
				parseFloat(subTotal) * (state.taxRate / 100)
			).toFixed(2),
			discountAmmount: parseFloat(
				parseFloat(subTotal) * (state.discountRate / 100)
			).toFixed(2),
			total:
				subTotal - state.discountAmmount + parseFloat(state.taxAmmount),
		});
	};

	const onItemizedItemEdit = (evt) => {
		const item = {
			id: evt.target.id,
			name: evt.target.name,
			value: evt.target.value,
		};
		const items = state.items.slice();
		const newItems = items.map(function (items) {
			for (let key in items) {
				if (key == item.name && items.id == item.id) {
					items[key] = item.value;
				}
			}
			return items;
		});
		setState({ ...state, items: newItems });
		handleCalculateTotal();
	};

	const editField = (event) => {
		setState({
			...state,
			[event.target.name]: event.target.value,
		});
	};

	const onCurrencyChange = (selectedOption) => {
		setState(selectedOption);
	};

	const openModal = (event) => {
		event.preventDefault();
		handleCalculateTotal();
		setState({ ...state, isOpen: true });
	};

	const closeModal = (event) => setState({ ...state, isOpen: false });

	return (
		<div className='App d-flex flex-column align-items-center justify-content-center w-100'>
			<Form onSubmit={openModal}>
				<Row>
					<Col md={8} lg={9}>
						<Card className='p-4 p-xl-5 my-3 my-xl-4'>
							<div className='d-flex flex-row align-items-start justify-content-between mb-3'>
								<div class='d-flex flex-column'>
									<div className='d-flex flex-column'>
										<div class='mb-2'>
											<span className='fw-bold'>
												Current&nbsp;Date:&nbsp;
											</span>
											<span className='current-date'>
												{new Date().toLocaleDateString()}
											</span>
										</div>
									</div>
									<div className='d-flex flex-row align-items-center'>
										<span className='fw-bold d-block me-2'>
											Due&nbsp;Date:
										</span>
										<Form.Control
											type='date'
											value={state.dateOfIssue}
											name={'dateOfIssue'}
											onChange={(event) =>
												editField(event)
											}
											style={{
												maxWidth: '150px',
											}}
											required='required'
										/>
									</div>
								</div>
								<div className='d-flex flex-row align-items-center'>
									<span className='fw-bold me-2'>
										Invoice&nbsp;Number:&nbsp;
									</span>
									<Form.Control
										type='number'
										value={state.invoiceNumber}
										name={'invoiceNumber'}
										onChange={(event) => editField(event)}
										min='1'
										style={{
											maxWidth: '70px',
										}}
										required='required'
									/>
								</div>
							</div>
							<hr className='my-4' />
							<Row className='mb-5'>
								<Col>
									<Form.Label className='fw-bold'>
										Bill to:
									</Form.Label>
									<Form.Control
										placeholder={'Who is this invoice to?'}
										rows={3}
										value={state.billTo}
										type='text'
										name='billTo'
										className='my-2'
										onChange={(event) => editField(event)}
										autoComplete='name'
										required='required'
									/>
									<Form.Control
										placeholder={'Email address'}
										value={state.billToEmail}
										type='email'
										name='billToEmail'
										className='my-2'
										onChange={(event) => editField(event)}
										autoComplete='email'
										required='required'
									/>
									<Form.Control
										placeholder={'Billing address'}
										value={state.billToAddress}
										type='text'
										name='billToAddress'
										className='my-2'
										autoComplete='address'
										onChange={(event) => editField(event)}
										required='required'
									/>
								</Col>
								<Col>
									<Form.Label className='fw-bold'>
										Bill from:
									</Form.Label>
									<Form.Control
										placeholder={
											'Who is this invoice from?'
										}
										rows={3}
										value={state.billFrom}
										type='text'
										name='billFrom'
										className='my-2'
										onChange={(event) => editField(event)}
										autoComplete='name'
										required='required'
									/>
									<Form.Control
										placeholder={'Email address'}
										value={state.billFromEmail}
										type='email'
										name='billFromEmail'
										className='my-2'
										onChange={(event) => editField(event)}
										autoComplete='email'
										required='required'
									/>
									<Form.Control
										placeholder={'Billing address'}
										value={state.billFromAddress}
										type='text'
										name='billFromAddress'
										className='my-2'
										autoComplete='address'
										onChange={(event) => editField(event)}
										required='required'
									/>
								</Col>
							</Row>
							<InvoiceItem
								onItemizedItemEdit={onItemizedItemEdit}
								onRowAdd={handleAddEvent}
								onRowDel={handleRowDel}
								currency={state.currency}
								items={state.items}
							/>
							<Row className='mt-4 justify-content-end'>
								<Col lg={6}>
									<div className='d-flex flex-row align-items-start justify-content-between'>
										<span className='fw-bold'>
											Subtotal:
										</span>
										<span>
											{state.currency}
											{state.subTotal}
										</span>
									</div>
									<div className='d-flex flex-row align-items-start justify-content-between mt-2'>
										<span className='fw-bold'>
											Discount:
										</span>
										<span>
											<span className='small '>
												({state.discountRate || 0}%)
											</span>
											{state.currency}
											{state.discountAmmount || 0}
										</span>
									</div>
									<div className='d-flex flex-row align-items-start justify-content-between mt-2'>
										<span className='fw-bold'>Tax:</span>
										<span>
											<span className='small '>
												({state.taxRate || 0}%)
											</span>
											{state.currency}
											{state.taxAmmount || 0}
										</span>
									</div>
									<hr />
									<div
										className='d-flex flex-row align-items-start justify-content-between'
										style={{
											fontSize: '1.125rem',
										}}
									>
										<span className='fw-bold'>Total:</span>
										<span className='fw-bold'>
											{state.currency}
											{state.total || 0}
										</span>
									</div>
								</Col>
							</Row>
							<hr className='my-4' />
							<Form.Label className='fw-bold'>Notes:</Form.Label>
							<Form.Control
								placeholder='Thanks for your business!'
								name='notes'
								value={state.notes}
								onChange={(event) => editField(event)}
								as='textarea'
								className='my-2'
								rows={1}
							/>
						</Card>
					</Col>
					<Col md={4} lg={3}>
						<div className='sticky-top pt-md-3 pt-xl-4'>
							<Button
								variant='primary'
								type='submit'
								className='d-block w-100'
							>
								Review Invoice
							</Button>
							<Button
								variant='primary'
								onClick={action}
								className='d-block w-100 mt-2'
							>
								{type === 'create'
									? 'Add invoice'
									: 'Edit invoice'}
							</Button>
							<InvoiceModal
								showModal={state.isOpen}
								closeModal={closeModal}
								info={state}
								items={state.items}
								currency={state.currency}
								subTotal={state.subTotal}
								taxAmmount={state.taxAmmount}
								discountAmmount={state.discountAmmount}
								total={state.total}
							/>
							<Form.Group className='mb-3'>
								<Form.Label className='fw-bold'>
									Currency:
								</Form.Label>
								<Form.Select
									onChange={(event) =>
										onCurrencyChange({
											currency: event.target.value,
										})
									}
									className='btn btn-light my-1'
									aria-label='Change Currency'
								>
									<option value='$'>
										USD (United States Dollar)
									</option>
									<option value='£'>
										GBP (British Pound Sterling)
									</option>
									<option value='¥'>
										JPY (Japanese Yen)
									</option>
									<option value='$'>
										CAD (Canadian Dollar)
									</option>
									<option value='$'>
										AUD (Australian Dollar)
									</option>
									<option value='$'>
										SGD (Signapore Dollar)
									</option>
									<option value='¥'>
										CNY (Chinese Renminbi)
									</option>
									<option value='₿'>BTC (Bitcoin)</option>
								</Form.Select>
							</Form.Group>
							<Form.Group className='my-3'>
								<Form.Label className='fw-bold'>
									Tax rate:
								</Form.Label>
								<InputGroup className='my-1 flex-nowrap'>
									<Form.Control
										name='taxRate'
										type='number'
										value={state.taxRate}
										onChange={(event) => editField(event)}
										className='bg-white border'
										placeholder='0.0'
										min='0.00'
										step='0.01'
										max='100.00'
									/>
									<InputGroup.Text className='bg-light fw-bold text-secondary small'>
										%
									</InputGroup.Text>
								</InputGroup>
							</Form.Group>
							<Form.Group className='my-3'>
								<Form.Label className='fw-bold'>
									Discount rate:
								</Form.Label>
								<InputGroup className='my-1 flex-nowrap'>
									<Form.Control
										name='discountRate'
										type='number'
										value={state.discountRate}
										onChange={(event) => editField(event)}
										className='bg-white border'
										placeholder='0.0'
										min='0.00'
										step='0.01'
										max='100.00'
									/>
									<InputGroup.Text className='bg-light fw-bold text-secondary small'>
										%
									</InputGroup.Text>
								</InputGroup>
							</Form.Group>
						</div>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

export default InvoiceForm;
