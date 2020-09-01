import React, { useRef, useLayoutEffect, CSSProperties } from 'react';
import QRC from 'qrcode.react';

export interface QRCodeProps {
    /**
     * 是否生成图片。当需要长按保存图片时可以设置为 `true`
     * @default false
     */
    useImg?: boolean;
    /**
     * 需要生成二维码的 `URL`
     */
    value: string;
    /**
     * 当设置成 `useImg` 时，可以指定 `<img>` 标签的 alt 属性
     */
    alt?: string;
    /**
     * 针对图片设置 css 样式
     */
    style?: CSSProperties;
}

const QRCode = ({ useImg, value, style, alt }: QRCodeProps) => {
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
            />
            {useImg && <img alt={alt} style={style} ref={img} />}
        </div>
    );
};

QRCode.defaultProps = {
    useImg: false,
    alt: '二维码',
    style: {}
} as QRCodeProps;

export default QRCode;
