import {combineReducers} from 'redux';

const user_actions = ( state={}, actions ) => {

  console.log("Selected action is : " + actions.type );

  switch(actions.type)
  {
    case 'STORE_USER':
      console.log("STORE_USER action is triggered");
      state['id'] = actions.payload.id;
      state = Object.assign({}, state);
      break;

    default:
      console.log("Got inside the Default case");
  }

  console.log(state);
  return state;

}

const storeData = combineReducers({

  user:user_actions

});

export default storeData;
