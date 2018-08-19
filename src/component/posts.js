import React from 'react';

class Post extends React.Component
{
  render()
  {
    let printer="";

    console.log(this.props.data);

    if(this.props.data)
    {
      printer = this.props.data.map( a=>{
        return (
          <div className='card' key={a.id}>
            <h3> {a.title} </h3>
            <li> {a.body} </li>
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

export default Post;
