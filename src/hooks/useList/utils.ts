import dayjs from 'dayjs';

interface Types {
    string?: (val: string) => string;
    number?: (val: number) => number;
    object?: (val: string) => object;
    array?: (val: any[]) => object;
    undefined?: () => string;
    boolean?: (val: boolean) => '0' | '1';
    [other: string]: any;
}

const Tool = {
    objectToString: (obj: { [index: string]: any }) => {
        const result = {} as {
            [index: string]: any;
        };
        Object.keys(obj).forEach((prop) => {
            const val = obj[prop];
            if (typeof val !== 'object' || typeof val !== 'function') {
                result[prop] = val;
            } else if (val instanceof Date) {
                result[prop] = dayjs(val).format('YYYYMMDDHHmmss');
            } else if (typeof val === 'object') {
                result[prop] = Tool.objectToString(val);
            } else {
                result[prop] = '';
            }
        });
    }
};

export default Tool;
