/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

export { default as UserHome } from './UserHome';
export { Login, Signup } from './forms/AuthForm';

export { default as Navbar } from './static_components/Navbar';
export { default as SearchBar } from './search/SearchBar';
export { default as SearchBarContainer } from './search/SearchBarContainer';
export { default as Footer } from './static_components/Footer';

export { default as AllGlassesContainer } from './all_items/AllGlassesContainer';
export { default as SingleItemContainer } from './single_item/SingleItemContainer';
export { default as SingleItemView } from './single_item/SingleItemView';
export { default as ReviewForm } from './forms/ReviewForm';

export { default as GlassesForm } from './forms/GlassesForm';
export { GlassesCardView, SelectCategoryMenu } from './all_items/AllGlassesViews';

export { default as Cart } from './Cart';
export { default as Homepage} from './static_components/Homepage'
export { default as CheckoutForm} from './forms/CheckoutForm'
