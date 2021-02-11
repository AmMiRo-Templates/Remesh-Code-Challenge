exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("thoughts")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("thoughts").insert([
                { user_id: 1, message_id: 1, text: "thought1" },
                { user_id: 1, message_id: 2, text: "thought2" },
                { user_id: 2, message_id: 3, text: "thought3" },
                { user_id: 2, message_id: 4, text: "thought4" },
                { user_id: 2, message_id: 5, text: "thought5" },
                { user_id: 2, message_id: 1, text: "thought6" },
                { user_id: 1, message_id: 2, text: "thought7" },
                { user_id: 2, message_id: 3, text: "thought8" },
                { user_id: 2, message_id: 4, text: "thought9" },
                { user_id: 2, message_id: 5, text: "thought10" },
            ]);
        });
};
