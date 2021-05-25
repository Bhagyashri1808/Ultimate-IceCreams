import React, {useState, useEffect} from 'react'
import Main from '../structure/Main'
import {getIceCreamList} from '../data/IceCreamData'
import IceCreamCardContainer from './IceCreamCardContainer'
import IceCreamCard from './IceCreamCard'

const IceCreams = ({history}) => {
    const [iceCreams, setIceCreams] = useState([]);
    
    useEffect(()=>{
        let isMounted = true;
        getIceCreamList().then(iceCreamList => {
            if(isMounted){
                setIceCreams(iceCreamList);
            }
        });
        
        return ()=>{
            isMounted=false;
        }
    },[]);


    return (
      <Main headingText="Choose your IceCream and enjoy!">
        {iceCreams.length > 0 ? (
          <IceCreamCardContainer>
            {iceCreams.map(({ id, name }) => (
              <IceCreamCard 
              key={id.toString()}
              to={{
                pathname:'/menu-items/add',
                search:`?iceCreamId=${id.toString()}`
              }}
              history={history}
              IceCreamId={id}
              heading={name}></IceCreamCard>
            ))}
          </IceCreamCardContainer>
        ) : (
          <p className="fully-stocked">Your Menu is fully stocked</p>
        )}
      </Main>
    );
}

export default IceCreams;