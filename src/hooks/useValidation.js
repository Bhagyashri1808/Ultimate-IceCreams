import {useEffect, useState} from 'react'

const useValidation = (value, showError, errorId,  validatorFn,isRequierd, compareValue=null) => {

    const [error, setError] = useState('');

    useEffect(()=>{
        setError(validatorFn(value, compareValue));
    },[value,validatorFn,compareValue]);

    return [error,
    {
        'aria-describedby' : error && showError ? errorId : null,
        'aria-invalid' : error && showError ? errorId : null,
        'aria-required' : isRequierd ? true : false,
        required : isRequierd,
    }
    ];
};

export default useValidation;