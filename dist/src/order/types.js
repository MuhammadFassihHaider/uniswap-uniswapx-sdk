"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const validation_1 = require("./validation");
class Order {
    /**
     * Returns the parsed validation
     * @return The parsed validation data for the order
     */
    get validation() {
        return (0, validation_1.parseValidation)(this.info);
    }
}
exports.Order = Order;
//# sourceMappingURL=types.js.map