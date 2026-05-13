/**
 * Compatibility shim — the canonical source is restaurants.data.js.
 * Existing imports of `mockRestaurants` keep working unchanged.
 */
import { restaurants } from './restaurants.data';

export const mockRestaurants = restaurants;
export { restaurants };
export default restaurants;
