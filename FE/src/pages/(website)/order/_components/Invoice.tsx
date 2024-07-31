import React from 'react';
import { format, toZonedTime } from 'date-fns-tz';
export const convertToVietnamTime = (utcTime: any) => {
    const vietnamTimeZone = 'Asia/Ho_Chi_Minh';
    const zonedTime = toZonedTime(utcTime, vietnamTimeZone);
    return format(zonedTime, 'dd-MM-yyyy | HH:mm:ss', { timeZone: vietnamTimeZone });
};
const Invoice = React.forwardRef<HTMLDivElement, { item: any }>(({ item }, ref) => {
    console.log(item);
    return (
        <div ref={ref} style={{ padding: '20px', maxWidth: '600px' }}>
            <h1 className='text-2xl text-red-500'>Hóa đơn</h1>
            <p>Ngày đặt hàng: {convertToVietnamTime(item?.createdAt)}</p>
            <p>Tên khách hàng: {item?.name}</p>
            <p>Số điện thoại: {item?.phone}</p>
            <p>Địa chỉ: {item?.address}</p>
            <p>Tổng: {item?.totalOrder}</p>
            <div>
                {
                    item?.products.map((p: any) => {
                        return <div>{p?.product?.name} _ {p?.price} _ {p?.quantity}</div>
                    })
                }
            </div>
        </div>
    );
});

export default Invoice;