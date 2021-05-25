import React, {useEffect,useRef,useState} from 'react'
import IceCreamImage from './IceCreamImage'
import useUniqId from '../hooks/useUniqId'
import useValidation from '../hooks/useValidation'
import {validateDescription,validatePrice,validateQuantity} from '../utils/Validators'
import ErrorContainer from './ErrorCotainer'
const IceCream = ({ iceCream ={}, onDelete, 
    price = 0,
    quantity = 0,
    inStock=true,
    description = '',
    onSubmit }) => {
  const [
    descriptionId,
    descriptionErrorId,
    stockId,
    priceId,
    priceErrorId,
    quantityId,
    quantityErrorId,
  ] = useUniqId(7);
  const formRef = useRef(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [internalData, setInternalData] = useState({
    description: '',
    inStock: true,
    quantity: '0',
    price: '0.00',
  });

  const [descriptionError, descriptionErrorProps] = useValidation(
    internalData.description,
    descriptionErrorId,
    hasSubmitted,
    validateDescription,
    true
  );

  const [quantityError, quantityErrorProps] = useValidation(
    internalData.quantity,
    quantityErrorId,
    hasSubmitted,
    validateQuantity,
    false,
    internalData.inStock
  );

  const [priceError, priceErrorProps] = useValidation(
    internalData.price,
    priceErrorId,
    hasSubmitted,
    validatePrice,
    true
  );

  useEffect(()=>{
    setInternalData({
        price: price.toFixed(2),
        quantity: quantity.toString(),
        inStock,
        description,
    });
  },[price, quantity, description,inStock]);

  const onChangeHandler = e => {
    const newInternalData = {
      ...internalData,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    };

    if (e.target.name === 'quantity') {
      newInternalData.inStock = e.target.value !== '0';
    }

    if (e.target.name === 'inStock' && !e.target.checked) {
      newInternalData.quantity = '0';
    }
    setInternalData(newInternalData);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    setHasSubmitted(true);
    if (descriptionError || quantityError || priceError) {
      setTimeout(() => {
        const errorController = formRef.current.querySelector(
          '[aria-invalid="true"]'
        );
        errorController.focus();
      });
    } else {
      onSubmit({
        iceCream: { id: iceCream.id },
        price: parseFloat(internalData.price),
        inStock: internalData.inStock,
        quantity: parseInt(internalData.quantity),
        description: internalData.description,
      });
    }
  };

  return (
    <div className="form-frame">
      <div className="image-container">
        <IceCreamImage IceCreamId={iceCream.id} />
      </div>
      <div className="form-container">
        <dl>
          <dt>Name :</dt>
          <dd>{iceCream.name}</dd>
        </dl>
        <form onSubmit={onSubmitHandler} noValidate ref={formRef}>
          <label htmlFor={descriptionId}>
            Description<span aria-hidden="true">*</span> :
          </label>
          <ErrorContainer
            errorText={descriptionError}
            hasSubmitted={hasSubmitted}
            errorId={descriptionErrorId}
          >
            <textarea
              name="description"
              rows="3"
              value={internalData.description}
              onChange={onChangeHandler}
              id={descriptionId}
              {...descriptionErrorProps}
            />
          </ErrorContainer>
          <label htmlFor={stockId}>In Stock :</label>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id={stockId}
              name="inStock"
              checked={internalData.inStock}
              onChange={onChangeHandler}
            />
            <div className="checkbox-wrapper-checked" />
          </div>
          <label htmlFor={quantityId}>Qauntiy :</label>
          <ErrorContainer
            errorText={quantityError}
            hasSubmitted={hasSubmitted}
            errorId={quantityErrorId}
          >
            <select
              name="quantity"
              id={quantityId}
              value={internalData.quantity}
              onChange={onChangeHandler}
              {...quantityErrorProps}
            >
              <option value="0">0</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </ErrorContainer>
          <label htmlFor={priceId}>
            Price<span aria-hidden="true">*</span> :
          </label>
          <ErrorContainer
            errorText={priceError}
            hasSubmitted={hasSubmitted}
            errorId={priceErrorId}
          >
            <input
              type="number"
              name="price"
              id={priceId}
              step="0.01"
              value={internalData.price}
              onChange={onChangeHandler}
              {...priceErrorProps}
            />
          </ErrorContainer>
          <div className="button-container">
            <button className="ok" type="submit">
              Save
            </button>
            {onDelete && (
              <button className="warning" type="button" onClick={onDelete}>
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default IceCream;