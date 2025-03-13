var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _Singleton_instance;
/**
 * La clase Singleton define un getter `instance`, que permite a los clientes acceder
 * a la instancia única del Singleton.
 */
var Singleton = /** @class */ (function () {
    /**
     * El constructor del Singleton debe ser siempre privado para evitar que se creen instancias
     * directamente utilizando el operador `new`.
     */
    function Singleton() {
    }
    Object.defineProperty(Singleton, "instance", {
        //El getter estático que controla el acceso a la instancia del Singleton.
        get: function () {
            // Si no existe una instancia, crea una nueva.
            if (!__classPrivateFieldGet(_a, _a, "f", _Singleton_instance)) {
                __classPrivateFieldSet(_a, _a, new _a(), "f", _Singleton_instance);
            }
            // Devuelve la instancia única del Singleton.
            return __classPrivateFieldGet(_a, _a, "f", _Singleton_instance);
        },
        enumerable: false,
        configurable: true
    });
    Singleton.prototype.someBusinessLogic = function () { };
    return Singleton;
}());
_a = Singleton;
_Singleton_instance = { value: void 0 }; // Variable estática privada que almacena la instancia única del Singleton.
function clientCode() {
    var s1 = Singleton.instance; // Obtiene la instancia única del Singleton.
    var s2 = Singleton.instance; // Obtiene la misma instancia del Singleton (debería ser la misma que s1).
    if (s1 === s2) {
        console.log("Singleton works, both variables contain the same instance.");
    }
    else {
        console.log("Singleton failed, variables contain different instances.");
    }
}
clientCode();
