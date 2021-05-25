import React from 'react';

const IceCreamCardContainer = ({ children }) => {
  return (
    <ul className="container">
      {React.Children.map(children, card => (
        <li>{card}</li>
      ))}
    </ul>
  );
};

export default IceCreamCardContainer;
