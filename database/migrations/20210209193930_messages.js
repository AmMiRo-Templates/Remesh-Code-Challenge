exports.up = function (knex) {
    return knex.schema.createTable("messages", (messages) => {
        messages.increments();

        messages
            .integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");

        messages
            .integer("conversation_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("conversations")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");

        messages.string("text", 512).notNullable().unique();

        messages.integer("time").defaultTo(Date.now()).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("messages");
};
