exports.up = function (knex) {
    return knex.schema.createTable("conversations", (conversations) => {
        conversations.increments();

        conversations
            .integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");

        conversations.string("title", 128).notNullable().unique();

        conversations.integer("time").defaultTo(Date.now()).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("conversations");
};
