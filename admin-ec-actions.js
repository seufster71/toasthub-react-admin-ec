import callService from '../core/api/api-call';

// action

// thunk
export function init() {
    return function(dispatch) {
      let requestParams = {};
      requestParams.action = "INIT";
      requestParams.service = "ADMIN_EC_SVC";
      requestParams.prefTexts = new Array("ADMIN_EC_PAGE");
      requestParams.menuNames = new Array("ADMIN_EC_MENU_TOP");
      let params = {};
      params.requestParams = requestParams;
      params.URI = '/api/admin/callService';

      return callService(params).then( (responseJson) => {
        dispatch({ type: "GLOBAL_INIT", responseJson });
      }).catch(error => {
        throw(error);
      });

    };
}
