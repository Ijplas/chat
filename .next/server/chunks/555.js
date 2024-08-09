"use strict";
exports.id = 555;
exports.ids = [555];
exports.modules = {

/***/ 555:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$Z": () => (/* binding */ deleteMessage),
/* harmony export */   "Hz": () => (/* binding */ addMessage),
/* harmony export */   "OQ": () => (/* binding */ supabase),
/* harmony export */   "mR": () => (/* binding */ addChannel),
/* harmony export */   "oR": () => (/* binding */ useStore),
/* harmony export */   "zz": () => (/* binding */ deleteChannel)
/* harmony export */ });
/* unused harmony exports fetchChannels, fetchUser, fetchMessages */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(885);
/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_1__);


const supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_1__.createClient)("https://gdejmeuksufjzbconmlk.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkZWptZXVrc3VmanpiY29ubWxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyMzQwNDEsImV4cCI6MjAzODgxMDA0MX0.2yt32nGZrh6aD193Zh6zjEaIiQJs10aYZMJJHHUZET4");
/**
 * @param {number} channelId the currently selected Channel
 */ const useStore = (props)=>{
    const { 0: channels , 1: setChannels  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const { 0: messages1 , 1: setMessages  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const { 0: users  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(new Map());
    const { 0: newMessage , 1: handleNewMessage  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const { 0: newChannel , 1: handleNewChannel  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const { 0: newOrUpdatedUser , 1: handleNewOrUpdatedUser  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const { 0: deletedChannel , 1: handleDeletedChannel  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const { 0: deletedMessage , 1: handleDeletedMessage  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    // Load initial data and set up listeners
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        // Get Channels
        fetchChannels(setChannels);
        // Listen for new and deleted messages
        const messageListener = supabase.channel("public:messages").on("postgres_changes", {
            event: "INSERT",
            schema: "public",
            table: "messages"
        }, (payload)=>handleNewMessage(payload.new)
        ).on("postgres_changes", {
            event: "DELETE",
            schema: "public",
            table: "messages"
        }, (payload)=>handleDeletedMessage(payload.old)
        ).subscribe();
        // Listen for changes to our users
        const userListener = supabase.channel("public:users").on("postgres_changes", {
            event: "*",
            schema: "public",
            table: "users"
        }, (payload)=>handleNewOrUpdatedUser(payload.new)
        ).subscribe();
        // Listen for new and deleted channels
        const channelListener = supabase.channel("public:channels").on("postgres_changes", {
            event: "INSERT",
            schema: "public",
            table: "channels"
        }, (payload)=>handleNewChannel(payload.new)
        ).on("postgres_changes", {
            event: "DELETE",
            schema: "public",
            table: "channels"
        }, (payload)=>handleDeletedChannel(payload.old)
        ).subscribe();
        // Cleanup on unmount
        return ()=>{
            supabase.removeChannel(supabase.channel(messageListener));
            supabase.removeChannel(supabase.channel(userListener));
            supabase.removeChannel(supabase.channel(channelListener));
        };
    }, []);
    // Update when the route changes
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if ((props === null || props === void 0 ? void 0 : props.channelId) > 0) {
            fetchMessages(props.channelId, (messages)=>{
                messages.forEach((x)=>users.set(x.user_id, x.author)
                );
                setMessages(messages);
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        props.channelId
    ]);
    // New message received from Postgres
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (newMessage && newMessage.channel_id === Number(props.channelId)) {
            const handleAsync = async ()=>{
                let authorId = newMessage.user_id;
                if (!users.get(authorId)) await fetchUser(authorId, (user)=>handleNewOrUpdatedUser(user)
                );
                setMessages(messages1.concat(newMessage));
            };
            handleAsync();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        newMessage
    ]);
    // Deleted message received from postgres
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (deletedMessage) setMessages(messages1.filter((message)=>message.id !== deletedMessage.id
        ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        deletedMessage
    ]);
    // New channel received from Postgres
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (newChannel) setChannels(channels.concat(newChannel));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        newChannel
    ]);
    // Deleted channel received from postgres
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (deletedChannel) setChannels(channels.filter((channel)=>channel.id !== deletedChannel.id
        ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        deletedChannel
    ]);
    // New or updated user received from Postgres
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (newOrUpdatedUser) users.set(newOrUpdatedUser.id, newOrUpdatedUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        newOrUpdatedUser
    ]);
    return {
        // We can export computed values here to map the authors to each message
        messages: messages1.map((x)=>({
                ...x,
                author: users.get(x.user_id)
            })
        ),
        channels: channels !== null ? channels.sort((a, b)=>a.slug.localeCompare(b.slug)
        ) : [],
        users
    };
};
/**
 * Fetch all channels
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */ const fetchChannels = async (setState)=>{
    try {
        let { data  } = await supabase.from("channels").select("*");
        if (setState) setState(data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
};
/**
 * Fetch a single user
 * @param {number} userId
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */ const fetchUser = async (userId, setState)=>{
    try {
        let { data  } = await supabase.from("users").select(`*`).eq("id", userId);
        let user = data[0];
        if (setState) setState(user);
        return user;
    } catch (error) {
        console.log("error", error);
    }
};
/**
 * Fetch all messages and their authors
 * @param {number} channelId
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */ const fetchMessages = async (channelId, setState)=>{
    try {
        let { data  } = await supabase.from("messages").select(`*, author:user_id(*)`).eq("channel_id", channelId).order("inserted_at", {
            ascending: true
        });
        if (setState) setState(data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
};
/**
 * Insert a new channel into the DB
 * @param {string} slug The channel name
 * @param {number} user_id The channel creator
 */ const addChannel = async (slug, user_id)=>{
    try {
        let { data  } = await supabase.from("channels").insert([
            {
                slug,
                created_by: user_id
            }
        ]).select();
        return data;
    } catch (error) {
        console.log("error", error);
    }
};
/**
 * Insert a new message into the DB
 * @param {string} message The message text
 * @param {number} channel_id
 * @param {number} user_id The author
 */ const addMessage = async (message, channel_id, user_id)=>{
    try {
        let { data  } = await supabase.from("messages").insert([
            {
                message,
                channel_id,
                user_id
            }
        ]).select();
        return data;
    } catch (error) {
        console.log("error", error);
    }
};
/**
 * Delete a channel from the DB
 * @param {number} channel_id
 */ const deleteChannel = async (channel_id)=>{
    try {
        let { data  } = await supabase.from("channels").delete().match({
            id: channel_id
        });
        return data;
    } catch (error) {
        console.log("error", error);
    }
};
/**
 * Delete a message from the DB
 * @param {number} message_id
 */ const deleteMessage = async (message_id)=>{
    try {
        let { data  } = await supabase.from("messages").delete().match({
            id: message_id
        });
        return data;
    } catch (error) {
        console.log("error", error);
    }
};


/***/ })

};
;