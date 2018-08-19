import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Post from './posts.js';
import Todo from './todos.js';
import Some from './some_msg.js';

import { BrowserRouter as Router, Route, Switch, Link, NavLink, Redirect, Prompt } from 'react-router-dom';

class Detail extends React.Component
{

  constructor(props)
  {
    super(props);

    this.state = {
      posts:null,
      todos:null,
      type: "posts",
      id: "",
      loggedin:false
    };
  }

  getTodos = () =>{
    console.log("Todos called");
    if(!this.state.todos)
    axios.get("https://jsonplaceholder.typicode.com/todos?userId="+this.state.id)
    .then( result =>{
      console.log(result.data);
      this.setState({
        todos: result.data
      });
    })
    .catch( error =>{
      console.log("Error Ocurred : "+error);
    });

    this.setState({
      type: "todos"
    });

  }

  getPosts = () =>{
    this.setState({
      type:"posts"
    });
  }

  getDetail = () =>{
    this.setState({
      type:"details"
    });
  }

  componentDidUpdate(prevProps, prevState)
  {
    let value = this.props.pass.id;

    if(this.state.id !== value)
    {
      let type = this.state.type;

      if(value)
      {
        axios.get("https://jsonplaceholder.typicode.com/posts?userId="+value)
        .then( result =>{
          console.log(result.data);
          this.setState({
            id: value,
            posts: result.data,
            todos:null,
            type: "posts"
          });
        })
        .catch( error =>{
          console.log("Error Ocurred : "+error);
        });
      }
    }
  }

  markLog()
  {
    console.log("Mark Log is running");
    this.setState( prevState =>({
      loggedin: !prevState.loggedin
    }));

    console.log(this.state.loggedin);
  }

  render()
  {

    // <Post data={this.state.data.posts}/>

    console.log(this.state);

    let printer = "";

    let type = this.state.type;

    if(this.props.pass.id)
    {
      if(type === "posts")
      {
        printer = (
          <div className="globeClass">
            <div className="head_blog">
              <div className="head_list" onClick={()=>this.getTodos()}> Todos </div>
              <div className="head_list" onClick={()=>this.getDetail()}> Details </div>
              <div className="head_list head_fix_style" onClick={()=>this.getPosts()}> Posts </div>
            </div>
            <Post data={this.state.posts}/>
          </div>
        );
      }
      else if(type === "todos")
      {
        console.log("inside todos")
        printer = (
        <div className="globeClass">
          <div className="head_blog">
            <div className="head_list head_fix_style" onClick={()=>this.getTodos()}> Todos </div>
            <div className="head_list" onClick={()=>this.getDetail()}> Details </div>
            <div className="head_list" onClick={()=>this.getPosts()}> Posts </div>
          </div>
          <Todo data={this.state.todos}/>
        </div>
      );
      }
      else
      {
        printer = (
          <div className="globeClass">
            <div className="head_blog">
              <div className="head_list head_fix_style" onClick={()=>this.getTodos()}> Todos </div>
              <div className="head_list" onClick={()=>this.getDetail()}> Details </div>
              <div className="head_list" onClick={()=>this.getPosts()}> Posts </div>
            </div>
          </div>
        );
      }
    }
    else
    {
      printer = (
        <div>
          <Router>
            <div>
              <button onClick={this.markLog.bind(this)}> { !this.state.loggedin ? "Mark as Logged In" : "Mark as Logged Out" } </button>
              <ul>
                <li> <NavLink to="/some" activeStyle={
                  {color:'green'}
                }> Some </NavLink> </li>
                <li> <NavLink to="/more/" activeStyle={
                  {color:'green'}
                }> More </NavLink> </li>
                <li> <NavLink to="/so/cool" activeStyle={
                  {color:'green'}
                }> Username </NavLink> </li>
              </ul>
              <Prompt when={!this.state.loggedin}
              message={(location)=>{
                console.log(location.pathname);
                return location.pathname.startsWith("/so") ? "You are Not Logged in yet!!" : true ;
              }}
              />

              <Route path='/some' exact render={
                ()=> {
                  return (<h1> Welcome to some </h1>);
                }
              } />
              <Route path='/more/' strict render={
                ()=> {
                  return (<h1> Welcome to More </h1>);
                }
              } />
              <Route path='/so/:name' exact strict render={
                (match)=>{
                  return this.state.loggedin ? (<Some match={match} />) : (<Redirect to="/" />);
                }
              } />

            </div>
          </Router>
        </div>
      )
    }

    return printer;
  }

}

function mapStatesToProps(store)
{
  console.log("changed");
  return {
    pass: store.user
  };
}

export default connect(mapStatesToProps)(Detail);
