import {useState} from 'react';
import {useDebounce} from 'react-use';

const useDebounceText = (initValue: string|undefined, ms = 500) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [originValue, setOriginValue] = useState<string|undefined>(initValue);
    const [targetValue, setTargetValue] = useState<string|undefined>(initValue);

    useDebounce(
        () => {
            setTargetValue(originValue);
            setLoading(false);
        },
        ms,
        [originValue]
    );

    const onOriginChange = (curVal: string) => {
        setLoading(true);
        setOriginValue(curVal);
    };

    return {
        originValue,
        targetValue,
        onOriginChange,
        loading
    };
};

export default useDebounceText;
