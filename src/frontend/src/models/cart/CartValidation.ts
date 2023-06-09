import AvailableShippingMethod from "./AvailableShippingMethod";
import Cart from "./Cart";
import Totals from "./Totals";
import ValidationIssue from "./ValidationIssue";

export default interface CartValidation {
    cart: Cart;
    totals: Totals;
    availableShippingMethods: AvailableShippingMethod;
    validationIssues: ValidationIssue[];
}