import React from 'react'
import IceCreamImage from './IceCreamImage'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const IceCreamCard = ({children, to, history, IceCreamId, heading}) => {

    
    const onClickHandler = () => {
        history.push(to, {focus:true});
    }

    const onLinkClickHandler = e => {
        //This is done to avoid the click handler of the <section>
        // firing and placing two browse entries in browser history
        e.stopPropagation();
    }

    return (
        <section className='card' onClick={onClickHandler}>
                        <div className='image-container'>
                            <IceCreamImage IceCreamId={IceCreamId} />
                        </div>
                        <div className='text-container'>
                            <h3><Link to={to} onClick={onLinkClickHandler}>
                            {heading}</Link></h3>
                            {children}
                        </div>
                    </section>
    );

}


IceCreamCard.propTypes = {
  children: PropTypes.node,
  to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
          pathName: PropTypes.string.isRequired,
          focus: PropTypes.bool
      }),
  ]).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  IceCreamId: PropTypes.number.isRequired,
  heading: PropTypes.string.isRequired
};
export default IceCreamCard;