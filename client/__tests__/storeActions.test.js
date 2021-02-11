import * as actions from "../client/src/store/state/stateActions";

beforeEach(() => {
    jest.resetAllMocks();
});

test("We are in the test environment", () => {
    const env = process.env.DB_ENVIRONMENT;
    expect(env).toBe("testing");
});

describe("get users actions", () => {
    test("dispatches SEARCHING_USERS_START", () => {
        const dispatch = jest.fn();
        actions.getUsers()(dispatch);

        expect(dispatch).toHaveBeenCalledWith({
            type: actions.SEARCHING_USERS_START,
        });
    });
});
