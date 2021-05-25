export const validateDescription = description =>
  description ? null : 'Description can not be empty';


export const validateQuantity = (quantity, inStock) => 
    inStock && quantity === '0' ? 'Quantity can nt be set to zero' : null;

export const validatePrice = price => {
    const regex = /^[0-9]+(\.[0-9][0-9])$/;
    console.log(regex.test(price));
    if(!price && price === '0.0'){
        return 'You must enter price';
    }else if(!regex.test(price)){
        return 'Please enter a valid price';
    }

    return null;
}