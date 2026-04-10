/**
 * The Dashboard Routes.
 */
import { useLocation } from 'react-router-dom';
import { __ } from '@wordpress/i18n';
import Welcome from '@DashboardApp/screens/routes/Welcome';

const DashRoutes = () => {
	// Get the current page and path.
	const query = new URLSearchParams( useLocation().search );
	const page = query.get( 'page' );

	// If the page is not set, return the fallback route.
	if ( zip_ai_react.page_slug !== page ) {
		return <p>{ __( 'Default route fallback', 'zip-ai' ) }</p>;
	}

	// Return Welcome for now - Later on we will return the required page based on the query path.
	return <Welcome />;
};

export default DashRoutes;
