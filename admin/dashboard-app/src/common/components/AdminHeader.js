/**
 * The Admin Header Bar.
 */
import { __ } from '@wordpress/i18n';
import { Disclosure } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { zipAiClassNames } from '@Scripts/Helpers';
import { ZipWPLogo } from '@Scripts/IconComponents';

const AdminHeader = ( props ) => {
	const {
		iconLogo = true,
		title = '',
		children,
	} = props;

	return (
		<Disclosure as="nav" className="bg-white shadow">
			<div className="max-w-3xl mx-auto px-6 lg:max-w-7xl">
				<div className="relative flex justify-between h-16">
					<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
						{ iconLogo ? (
							<Link
								to={ {
									pathname: 'admin.php',
									search: `?page=${ zip_ai_react.page_slug }`,
								} }
								className="flex-shrink-0 flex items-center justify-start focus:outline-none focus-visible:outline-none focus:shadow-none active:outline-none active:shadow-none transition-colors"
							>
								<div className="flex-shrink-0 flex items-center">
									{ ZipWPLogo( {
										className: zipAiClassNames( [
											'h-10 text-zip',
											title && 'mr-6',
										] ),
									} ) }
									{ title && (
										<h1 className="h-6 m-0 text-xl leading-6 font-semibold text-slate-800">
											{ title }
										</h1>
									) }
								</div>
							</Link>
						) : null }
						{ children && (
							<div className="sm:ml-8 sm:flex sm:space-x-8">
								{ children }
							</div>
						) }
					</div>
					<div className="absolute inset-y-0 right-0 flex items-center pr-2 gap-8 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						<a
							className="text-base text-slate-500 focus:text-spec focus-visible:text-spec active:text-spec hover:text-spec transition-colors"
							href="https://wpspectra.com/zip-ai/"
							target="_blank"
							rel="noreferrer"
						>
							{ __( 'Visit Website', 'zip-ai' ) }
						</a>
					</div>
				</div>
			</div>
		</Disclosure>
	);
};

export default AdminHeader;
