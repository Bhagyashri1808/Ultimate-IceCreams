import React,{useEffect,useState,useRef} from 'react';
import {getIceCream,postMenuItem} from '../data/IceCreamData'
import PropTypes from 'prop-types'
import Main from '../structure/Main'
import IceCream from './IceCream'

const AddIceCream = ({history, location}) => {

    const [iceCream, setIceCream] = useState({});

    const isMounted = useRef(true);
    
    useEffect(()=>{
        return () => isMounted.current = false;
    },[]);

    useEffect(()=>{
        getIceCream(location.search.split('=')[1]).then(item=>
        {

            if(isMounted.current){
            setIceCream(item);
        }
        }).catch( err =>{
            if(err.response.status === 404 && isMounted.current){
                history.replace('/');
            }
        });
    },[history,location.search]);

    

    const onSubmitHandler = menuItem => {
        postMenuItem(menuItem).then(()=>{
            history.push('/' , {focus : true});
        });
    }

    return (
      <Main headingText="Add this beauty" headingLevel="2">
        <IceCream iceCream={iceCream} 
        onSubmit={onSubmitHandler}></IceCream>
      </Main>
    );
}

AddIceCream.propTypes = {
    
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired
    })
}
 export default AddIceCream;