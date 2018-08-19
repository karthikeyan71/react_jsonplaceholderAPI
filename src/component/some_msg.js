import React from 'react';

export default class Some extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {

    console.log(this.props);
    console.log(this.props.match.match.params);

    return (
      <div>
        The name given in the URl is <strong>{this.props.match.match.params.name}</strong>
      </div>
    );
  }
}
