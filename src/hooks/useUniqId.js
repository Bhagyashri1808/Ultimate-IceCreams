import {useRef} from 'react'
import uniqId from 'uniqid';

const useUniqId = (count) => {
    const ids = useRef([...new Array(count)].map(()=>uniqId()));
    return ids.current;
};

export default useUniqId;