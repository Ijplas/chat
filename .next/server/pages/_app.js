"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 621:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const UserContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserContext);


/***/ }),

/***/ 484:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SupabaseSlackClone)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lib_UserContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(621);
/* harmony import */ var lib_Store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(555);
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(880);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([jwt_decode__WEBPACK_IMPORTED_MODULE_5__]);
jwt_decode__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];







function SupabaseSlackClone({ Component , pageProps  }) {
    const { 0: userLoaded , 1: setUserLoaded  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: user , 1: setUser  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: session1 , 1: setSession  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        function saveSession(/** @type {Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session']} */ session) {
            setSession(session);
            const currentUser = session === null || session === void 0 ? void 0 : session.user;
            if (session) {
                const jwt = (0,jwt_decode__WEBPACK_IMPORTED_MODULE_5__.jwtDecode)(session.access_token);
                currentUser.appRole = jwt.user_role;
            }
            setUser(currentUser !== null && currentUser !== void 0 ? currentUser : null);
            setUserLoaded(!!currentUser);
            if (currentUser) {
                router.push("/channels/[id]", "/channels/1");
            }
        }
        lib_Store__WEBPACK_IMPORTED_MODULE_4__/* .supabase.auth.getSession */ .OQ.auth.getSession().then(({ data: { session  }  })=>saveSession(session)
        );
        const { subscription: authListener  } = lib_Store__WEBPACK_IMPORTED_MODULE_4__/* .supabase.auth.onAuthStateChange */ .OQ.auth.onAuthStateChange(async (event, session)=>{
            console.log(session);
            saveSession(session);
        });
        return ()=>{
            authListener.unsubscribe();
        };
    }, []);
    const signOut = async ()=>{
        const { error  } = await lib_Store__WEBPACK_IMPORTED_MODULE_4__/* .supabase.auth.signOut */ .OQ.auth.signOut();
        if (!error) {
            router.push("/");
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(lib_UserContext__WEBPACK_IMPORTED_MODULE_3__/* ["default"].Provider */ .Z.Provider, {
        value: {
            userLoaded,
            user,
            signOut
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
            ...pageProps
        })
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 885:
/***/ ((module) => {

module.exports = require("@supabase/supabase-js");

/***/ }),

/***/ 853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 880:
/***/ ((module) => {

module.exports = import("jwt-decode");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [555], () => (__webpack_exec__(484)));
module.exports = __webpack_exports__;

})();