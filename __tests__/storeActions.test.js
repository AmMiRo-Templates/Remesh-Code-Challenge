// import * as actions from "../client/src/store/state/stateActions";

// beforeEach(() => {
//     jest.resetAllMocks();
// });

// describe("get users actions", () => {
//     test("dispatches SEARCHING_USERS_START", () => {
//         const dispatch = jest.fn();
//         actions.getUsers()(dispatch);

//         expect(dispatch).toHaveBeenCalledWith({
//             type: actions.SEARCHING_USERS_START,
//         });
//     });

//     test("dispatches SEARCHING_USERS_SUCCESS upon a successful request", async () => {
//         const dispatch = jest.fn();

//         const responseData = [{ id: 1, username: "UserA" }];

//         await actions.getUsers()(dispatch);

//         expect(dispatch).toHaveBeenCalledTimes(2);
//         expect(dispatch).toHaveBeenCalledWith({
//             type: actions.SEARCHING_USERS_START,
//         });
//         expect(dispatch).toHaveBeenCalledWIth({
//             type: actions.SEARCHING_USERS_SUCCESS,
//             payload: responseData,
//         });
//     });
// });

// describe("get conversation actions", () => {
//     test("dispatches SEARCHING_USERS_START", () => {
//         const dispatch = jest.fn();
//         actions.getConversations()(dispatch);

//         expect(dispatch).toHaveBeenCalledWith({
//             type: actions.GETTING_CONVERSATIONS_START,
//         });
//     });

//     test("dispatches GETTING_CONVERSATIONS_SUCCESS upon a successful request", async () => {
//         const dispatch = jest.fn();

//         const responseData = [{ id: 1, title: "ConvoA" }];

//         await actions.getConversations()(dispatch);

//         expect(dispatch).toHaveBeenCalledTimes(2);
//         expect(dispatch).toHaveBeenCalledWith({
//             type: actions.GETTING_CONVERSATIONS_START,
//         });
//         expect(dispatch).toHaveBeenCalledWIth({
//             type: actions.GETTING_CONVERSATIONS_SUCCESS,
//             payload: responseData,
//         });
//     });
// });

test("We are in the test environment", () => {
    const env = process.env.DB_ENVIRONMENT;
    expect(env).toBe("testing");
});
