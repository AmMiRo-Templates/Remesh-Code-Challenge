exports.up = function (knex) {
    return knex.schema.createTable("thoughts", (thoughts) => {
        thoughts.increments();

        thoughts
            .integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");

        thoughts
            .integer("message_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("messages")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");

        thoughts.string("text", 512).notNullable().unique();

        thoughts.integer("time").defaultTo(Date.now()).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("thoughts");
};
