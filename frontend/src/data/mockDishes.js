/**
 * Compatibility shim — the canonical source is dishes.data.js.
 * Existing imports of `mockDishes` keep working unchanged.
 */
import { dishes } from './dishes.data';

export const mockDishes = dishes;
export { dishes };
export default dishes;
