
var reducer = function(state, action) {
  switch (action.type) {
    case "SET_STATE":
        return state;
    case "ADD_PHONE":
        return state = action.phone;
    case "DELETE_PHONE":
        return state.update("phones",
            (phones) => phones.filterNot(
                (item) => item === action.phone
            )
        );
    default:
      return state
  }
}
export default reducer;