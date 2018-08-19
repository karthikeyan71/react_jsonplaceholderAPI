import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectUser} from '../action/basic_action.js';

class User extends React.Component
{

  constructor(props)
  {
    super(props);

    this.state = {
      data:null
    }

  }

  componentDidMount()
  {

    axios.get("https://jsonplaceholder.typicode.com/users")
    .then( result =>{
      console.log(result.data);
      this.setState({
        data:result.data
      });
    })
    .catch( error =>{
      console.log("Error Ocurred");
    });

  }

  render()
  {
    let store = this.state.data;
    let printer = "";
    if(store)
    {
      printer = store.map( a =>{
        return <li key={a.id} onClick={()=>this.props.selectUser(a)}> {a.name} </li>;
      });
    }

    return (
        <ul className="name_style">
        {printer}
        </ul>
    );
  }
}

function mapDispatchToProps(dispatch)
{
  return bindActionCreators({selectUser:selectUser}, dispatch);
}

export default connect(()=>{},mapDispatchToProps)(User);
