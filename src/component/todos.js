import React from 'react';

class Todo extends React.Component
{
  render()
  {
    let printer="";

    console.log(this.props.data);

    if(this.props.data)
    {
      printer = this.props.data.map( a=>{

        let bool = "";
        if(a.completed === true)
        bool = "True";
        else {
          bool = "False";
        }
        
        return (
          <div className='card' key={a.id}>
            <h3> {a.title} </h3>
            <li> <strong> Status : </strong> {bool} </li>
          </div>
        );
      });
    }

    return(
      <div className="data_loader_style1">
          {printer}
      </div>
    );
  }
}

export default Todo;
