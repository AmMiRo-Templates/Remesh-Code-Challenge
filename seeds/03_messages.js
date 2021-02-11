exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("messages")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("messages").insert([
                { user_id: 1, conversation_id: 1, text: "message1" },
                { user_id: 1, conversation_id: 2, text: "message2" },
                { user_id: 2, conversation_id: 1, text: "message3" },
                { user_id: 2, conversation_id: 2, text: "message4" },
                { user_id: 2, conversation_id: 1, text: "message5" },
                { user_id: 2, conversation_id: 2, text: "message6" },
            ]);
        });
};
