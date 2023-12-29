/*
 * Copyright (C) 2016 The ToastHub Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import reducerUtils from '../../core/common/reducer-utils';

export default function marketReducer(state = {}, action) {
	let myState = {};
	switch(action.type) {
    	case 'EC_MARKET_ADMIN_INIT': {
    		if (action.responseJson != null && action.responseJson.params != null) {
    			return Object.assign({}, state, {
    				prefTexts: Object.assign({}, state.prefTexts, reducerUtils.getPrefTexts(action)),
    				prefLabels: Object.assign({}, state.prefLabels, reducerUtils.getPrefLabels(action)),
    				prefOptions: Object.assign({}, state.prefOptions, reducerUtils.getPrefOptions(action)),
    				columns: reducerUtils.getColumns(action),
    				itemCount: reducerUtils.getItemCount(action),
    				items: reducerUtils.getItems(action),
    				listLimit: reducerUtils.getListLimit(action),
    				listStart: reducerUtils.getListStart(action),
    				orderCriteria: [{'orderColumn':'EC_MARKET_ADMIN_TABLE_TITLE','orderDir':'ASC'}],
    				searchCriteria: [{'searchValue':'','searchColumn':'EC_MARKET_ADMIN_TABLE_TITLE'}],
					paginationSegment: 1,
					selected: null,
					view: "MAIN",
					pageName:"EC_MARKET_ADMIN",
					isDeleteModalOpen: false,
					errors:null, 
					warns:null, 
					successes:null,
					searchValue:""
    			});
    		} else {
    			return state;
    		}
    	}
    	case 'EC_MARKET_ADMIN_LIST': {
    		if (action.responseJson != null && action.responseJson.params != null) {
    			return Object.assign({}, state, {
    				itemCount: reducerUtils.getItemCount(action),
    				items: reducerUtils.getItems(action),
    				listLimit: reducerUtils.getListLimit(action),
    				listStart: reducerUtils.getListStart(action),
    				paginationSegment: action.paginationSegment,
    				selected: null,
					view: "MAIN",
					isDeleteModalOpen: false,
					errors:null, 
					warns:null, 
					successes:null
    			});
    		} else {
    			return state;
    		}
		}
    	case 'EC_MARKET_ADMIN_ITEM': {
			if (action.responseJson !=  null && action.responseJson.params != null) {
				// load inputFields
				let inputFields = {};
				let prefForms = reducerUtils.getPrefForms(action);
				for (let i = 0; i < prefForms.EC_MARKET_ADMIN_FORM.length; i++) {
					if (prefForms.EC_MARKET_ADMIN_FORM[i].group === "FORM1") {
						let classModel = JSON.parse(prefForms.EC_MARKET_ADMIN_FORM[i].classModel);
						if (action.responseJson.params.item != null && action.responseJson.params.item.hasOwnProperty(classModel.field)) {
							inputFields[prefForms.EC_MARKET_ADMIN_FORM[i].name] = action.responseJson.params.item[classModel.field];
						} else {
							let result = "";
							if (prefForms.EC_MARKET_ADMIN_FORM[i].value != null && prefForms.EC_MARKET_ADMIN_FORM[i].value != ""){
								let formValue = JSON.parse(prefForms.EC_MARKET_ADMIN_FORM[i].value);
								for (let j = 0; j < formValue.options.length; j++) {
									if (formValue.options[j] != null && formValue.options[j].defaultInd == true){
										result = formValue.options[j].value;
									}
								}
							}
							inputFields[prefForms.EC_MARKET_ADMIN_FORM[i].name] = result;
						}
					}
				}
				// add id if this is existing item
				if (action.responseJson.params.item != null) {
					inputFields.itemId = action.responseJson.params.item.id;
				}
				return Object.assign({}, state, {
					prefForms: Object.assign({}, state.prefForms, reducerUtils.getPrefForms(action)),
					selected : action.responseJson.params.item,
					inputFields : inputFields,
					view: "MODIFY"
				});
			} else {
				return state;
			}
		}
		case 'EC_MARKET_ADMIN_INPUT_CHANGE': {
			return reducerUtils.updateInputChange(state,action);
		}
		case 'EC_MARKET_ADMIN_CLEAR_FIELD': {
			return reducerUtils.updateClearField(state,action);
		}
		case 'EC_MARKET_ADMIN_LISTLIMIT': {
			return reducerUtils.updateListLimit(state,action);
		}
		case 'EC_MARKET_ADMIN_SEARCH': { 
			return reducerUtils.updateSearch(state,action);
		}
		case 'EC_MARKET_ADMIN_SEARCH_CHANGE': { 
			return Object.assign({}, state, {
				searchValue: action.value
			});
		}
		case 'EC_MARKET_ADMIN_ORDERBY': { 
			return reducerUtils.updateOrderBy(state,action);
		}
		case 'EC_MARKET_ADMIN_SET_STATUS': {
			reducerUtils.updateStatus(state,action);
		}
		case 'EC_MARKET_ADMIN_CLOSE_DELETE_MODAL': {
			return Object.assign({}, state, {
				isDeleteModalOpen: false
			});
		}
		case 'EC_MARKET_ADMIN_OPEN_DELETE_MODAL': {
			return Object.assign({}, state, {
				isDeleteModalOpen: true,
				selected: action.item
			});
		}
		case 'EC_MARKET_ADMIN_CANCEL': {
			return Object.assign({}, state, {
				view: "MAIN",
				selected:null,
				inputFields:null
			});
		}
    	default:
    		return state;
	}
}

