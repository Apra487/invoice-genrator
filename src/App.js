/* -----------------Globals--------------- */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* -----------------UI--------------- */
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

/* -----------------Child components--------------- */
import InvoiceScreen from './components/InvoiceScreen';
import InvoiceForm from './components/InvoiceForm';

const App = () => {

	return (
		<Router>
			<Routes>
				<Route
					path='/create-invoice'
					element={<InvoiceForm type={"create"} />}
				/>
				<Route path='/' element={<InvoiceScreen />} />
        <Route path='/edit-invoice/:invoiceId' element={<InvoiceForm  type={"edit"} />} />
			</Routes>
		</Router>
	);
};

export default App;
