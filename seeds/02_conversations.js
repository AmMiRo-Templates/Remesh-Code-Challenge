exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("conversations")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("conversations").insert([
                { user_id: 1, title: "ConversationA" },
                { user_id: 2, title: "ConversationB" },
                { user_id: 2, title: "ConversationC" },
            ]);
        });
};
