import React,{useEffect,useState,useRef} from 'react';
import {getMenuItem,putMenuItem,deleteMenuItem} from '../data/IceCreamData'
import PropTypes from 'prop-types'
import Main from '../structure/Main'
import IceCream from './IceCream'

const EditIceCream = ({match,history}) => {

    const [menuItem, setMenuItem] = useState({});
    const isMounted = useRef(true);
    
    useEffect(()=>{
        return () => isMounted.current = false;
    },[]);


    useEffect(()=>{
        getMenuItem(match.params.menuItemId).then(item=>
        {

            if(isMounted.current){
            setMenuItem(item);
        }
        }).catch( err =>{
            if(err.response.status === 404 && isMounted.current){
                history.replace('/');
            }
        });
    },[match.params.menuItemId, history]);

    

    const onSubmitHandler = updatedItem => {
       
        putMenuItem({id: updatedItem.id, ...updatedItem}).then(()=>{
            history.push('/');
        })
        
    }

    const onDeleteHandler = () => {
        deleteMenuItem(match.params.menuItemId).then(()=> {
            history.replace('/', {focus:true})
        });
    }

    return (
      <Main headingText="Edit this beauty" headingLevel="2">
        <IceCream {...menuItem} onDelete={onDeleteHandler}
        onSubmit={onSubmitHandler}></IceCream>
      </Main>
    );
}

EditIceCream.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    }),
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired
    })
}
 export default EditIceCream;