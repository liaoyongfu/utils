import { useState } from 'react';
import { useDebounce } from 'react-use';

const useDebounceText = (initValue = '', ms = 500) => {
    const [originValue, setOriginValue] = useState(initValue);
    const [targetValue, setTargetValue] = useState(initValue);

    useDebounce(
        () => {
            setTargetValue(originValue);
        },
        ms,
        [originValue]
    );

    const onOriginChange = (curVal: string) => {
        setOriginValue(curVal);
    };

    return {
        originValue,
        targetValue,
        onOriginChange
    };
};

export default useDebounceText;
