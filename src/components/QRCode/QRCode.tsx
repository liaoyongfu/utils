import React, {useRef, useLayoutEffect, CSSProperties} from 'react';
import QRC, {BaseQRCodeProps} from 'qrcode.react';

interface Props {
    useImg: boolean,
    value: string,
    alt: string,
    style: CSSProperties,
    qrSetting: BaseQRCodeProps
}

const QRCode = ({useImg, value, style, alt, qrSetting}: Props) => {
    const qrCode = useRef<HTMLDivElement>(null);
    const img = useRef<HTMLImageElement>(null);

    useLayoutEffect(() => {
        if (qrCode.current && img.current) {
            const qrcodeImg = img.current;
            const canvas = qrCode.current.querySelector('canvas');

            if (!canvas) return;

            qrcodeImg.src = canvas.toDataURL();
        }
    }, [qrCode, img]);
    return (
        <div ref={qrCode}>
            <QRC
             value={value}
             style={{
                 display: useImg ? 'none' : 'block',
                 ...style
             }}
             {...qrSetting}
            />
            {useImg && (
                <img
                    alt={alt}
                    style={style} ref={img}
                />
            )}
        </div>
    );
};

export default QRCode;
