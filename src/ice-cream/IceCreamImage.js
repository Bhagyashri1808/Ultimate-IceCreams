import React from 'react';
import PropTypes from 'prop-types';

const IceCreamImage = ({IceCreamId}) => (IceCreamId !=null && <img 
src={`${process.env.PUBLIC_URL}/ice-cream-images/ice-cream-${IceCreamId}.svg`}
alt=''
/> );

IceCreamImage.propTypes = {
    IceCreamId: PropTypes.number
}

export default IceCreamImage;