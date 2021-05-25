import React,{useState, useEffect} from 'react';
import {getMenu} from '../data/IceCreamData';
import PropTypes from 'prop-types'
import Main from '../structure/Main';
import IceCreamCard from './IceCreamCard'
import IceCreamCardContainer from './IceCreamCardContainer'

const Menu = ({history}) => {
    const [menu, setMenu] = useState([]);
    let isMounted  = true;
    useEffect(()=>{
        getMenu().then(menudata => {
            if(isMounted){
                setMenu(menudata);
            }
        })

        return () => {
            isMounted = false; 
        };
    },[]);

    return (
      <Main
        headingText="Rock your taste buds by selecting one of these iceCream."
        headingLevel="2"
      >
        <IceCreamCardContainer>
          {menu.map(
            ({ id, iceCream, inStock, quantity, price, description }) => (
                <IceCreamCard 
                key={id.toString()}
                IceCreamId={iceCream.id}
                to={`/menu-items/${id.toString()}`}
                heading={iceCream.name}
                history={history}>
                  <div className="content card-content">
                    <p className="price">{`$${price.toFixed(2)}`}</p>
                    <p className={`stock${inStock ? '' : ' out'}`}>
                      {inStock
                        ? `${quantity} in stock`
                        : `Currently not available!`}
                    </p>
                    <p>{description}</p>
                  </div>
                </IceCreamCard>
            )
          )}
        </IceCreamCardContainer>
      </Main>
    );

}

Menu.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
};

export default Menu;