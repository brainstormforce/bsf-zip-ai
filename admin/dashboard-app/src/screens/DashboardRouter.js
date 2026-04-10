/**
 * The Dashboard Router.
 */
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminHeader from '@DashboardApp/common/components/AdminHeader';
import DashRoutes from '@DashboardApp/common/components/DashRoutes';

const DashboardRouter = () => {
	// If Zip AI was authorized, but was not updated in the local storage, set it.
	useEffect( () => {
		if ( zip_ai_react?.is_authorized && ! localStorage.getItem( 'zipAiAuthorizationStatus' ) ) {
			localStorage.setItem( 'zipAiAuthorizationStatus', true );
		}
	}, [] );

	return (
		<Router>
			<AdminHeader title={ __( 'Zip - Your AI Assistant', 'zip-ai' ) } />
			<Switch>
				<Route path="/">
					<DashRoutes />
				</Route>
			</Switch>
		</Router>
	);
};

export default DashboardRouter;
