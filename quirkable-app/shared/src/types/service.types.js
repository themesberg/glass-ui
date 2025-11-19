"use strict";
/**
 * Service Types for Quirkable Application
 * All types use British English spelling
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintQuality = exports.PrintMaterial = exports.OrderStatus = exports.ServiceType = void 0;
/**
 * The four core services offered by Quirkable
 */
var ServiceType;
(function (ServiceType) {
    ServiceType["READY_MADE"] = "READY_MADE";
    ServiceType["BESPOKE"] = "BESPOKE";
    ServiceType["FILE_REPAIR"] = "FILE_REPAIR";
    ServiceType["DESIGN"] = "DESIGN";
})(ServiceType || (exports.ServiceType = ServiceType = {}));
/**
 * Status of a service request or order
 */
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["QUOTE_SENT"] = "QUOTE_SENT";
    OrderStatus["IN_PROGRESS"] = "IN_PROGRESS";
    OrderStatus["COMPLETED"] = "COMPLETED";
    OrderStatus["DELIVERED"] = "DELIVERED";
    OrderStatus["CANCELLED"] = "CANCELLED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
/**
 * Print material options
 */
var PrintMaterial;
(function (PrintMaterial) {
    PrintMaterial["PLA"] = "PLA";
    PrintMaterial["ABS"] = "ABS";
    PrintMaterial["PETG"] = "PETG";
    PrintMaterial["TPU"] = "TPU";
    PrintMaterial["NYLON"] = "NYLON";
    PrintMaterial["RESIN"] = "RESIN";
})(PrintMaterial || (exports.PrintMaterial = PrintMaterial = {}));
/**
 * Print quality levels
 */
var PrintQuality;
(function (PrintQuality) {
    PrintQuality["STANDARD"] = "STANDARD";
    PrintQuality["HIGH"] = "HIGH";
    PrintQuality["ULTRA"] = "ULTRA";
})(PrintQuality || (exports.PrintQuality = PrintQuality = {}));
//# sourceMappingURL=service.types.js.map