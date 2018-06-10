/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

export { default as UserHome } from './UserHome';
export { Login, Signup } from './AuthForm';

export { default as Navbar } from './Navbar';
export { default as SearchBar } from './SearchBar';
export { default as SearchBarContainer } from './SearchBarContainer';
export { default as Footer } from './Footer';

export { default as AllGlassesContainer } from './AllGlassesContainer';
export { default as SingleItemContainer } from './SingleItemContainer';
export { default as SingleItemView } from './SingleItemView';

export { default as GlassesForm } from './GlassesForm';
export { GlassesCardView, SelectCategoryMenu } from './AllGlassesViews';

export { default as Cart } from './Cart';
export { default as Homepage} from './Homepage'
