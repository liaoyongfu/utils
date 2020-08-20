import React from 'react';
import QRCode from '../src/components/QRCode';

export default {
    title: 'components/QRCode',
    component: QRCode
};

export const Basic = () => <QRCode value="http://www.baidu.com" alt="百度" />;

export const useImg = () => <QRCode value="http://www.baidu.com" useImg alt="百度" />;
