import AvailableShippingMethod from "./AvailableShippingMethod";
import Cart from "./Cart";
import Total from "./Total";
import ValidationIssue from "./ValidationIssue";

export default interface CartValidation {
    cart: Cart;
    total: Total;
    availableShippingMethods: AvailableShippingMethod;
    validationIssues: ValidationIssue[];
}