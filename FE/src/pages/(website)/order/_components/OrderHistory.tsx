import { useOrder } from "@/common/hooks/useOrder"
import { format, toZonedTime } from 'date-fns-tz';
import { useRef, useState } from "react";
import html2pdf from 'html2pdf.js';
import Invoice from "./Invoice";
export const convertToVietnamTime = (utcTime: any) => {
    const vietnamTimeZone = 'Asia/Ho_Chi_Minh';
    const zonedTime = toZonedTime(utcTime, vietnamTimeZone);
    return format(zonedTime, 'dd-MM-yyyy | HH:mm:ss', { timeZone: vietnamTimeZone });
};
const OrderHistory = () => {
    const { orderData } = useOrder()
    const [currentItem, setCurrentItem] = useState(null);
    const pdfRef = useRef<HTMLDivElement>(null);
    const handleDownloadPdf = (item: any) => {
        setCurrentItem(item);
        setTimeout(() => {
            if (pdfRef.current) {
                const element = pdfRef.current;
                const opt = {
                    margin: 0.5,
                    filename: `invoice-${item._id}.pdf`,
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
                };

                html2pdf().from(element).set(opt).save();
                setCurrentItem(null); // Reset the current item after generating PDF
            }
        }, 500); // Optional delay to ensure the component is fully rendered
    };
    return (
        <>
            <section className=" relative">
                <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
                    <h2 className="font-semibold text-xl lead-10 text-black mb-9">Order History</h2>
                    <div className="mt-7 pt-0">
                        {
                            orderData?.data?.map((item: any) => (
                                <>
                                    <div key={item._id} className="flex max-lg:flex-col items-center gap-8 lg:gap-24 p-3 md:px-11">
                                        <div className="grid grid-cols-4 w-full">
                                            {/* <div className="col-span-4 sm:col-span-1">
                                            <img src="https://pagedone.io/asset/uploads/1705474774.png" className="max-sm:mx-auto" />
                                        </div> */}
                                            <div className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                                                <h6 className="font-manrope font-semibold text-2xl leading-9 text-black mb-3 whitespace-nowrap">
                                                    Mã đơn hàng: {item?.orderNumber}
                                                </h6>
                                                <p className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                                                    Người đặt: {item?.name}
                                                </p>
                                                <p className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                                                    Số điện thoại: {item?.phone}
                                                </p>
                                                <p className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                                                    Địa chỉ: {item?.address}
                                                </p>
                                                <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                                                    <p className="font-semibold text-xl leading-8 text-black whitespace-nowrap">Tổng tiền: ${item?.totalOrder}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-around w-full  sm:pl-28 lg:pl-0">
                                            <div className="flex flex-col justify-center items-start max-sm:items-center">
                                                <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                                                    Trạng thái</p>
                                                {item?.status === 'pending' && (<p className="font-semibold text-lg leading-8 text-yellow-500 text-left whitespace-nowrap">Đang xác nhận đơn hàng</p>)}
                                                {item?.status === 'confirmed' && (<p className="font-semibold text-lg leading-8 text-green-400 text-left whitespace-nowrap">Đã xác nhận đơn hàng</p>)}
                                                {item?.status === 'shipped' && (<p className="font-semibold text-lg leading-8 text-orange-500 text-left whitespace-nowrap">Đang giao hàng</p>)}
                                                {item?.status === 'delivered' && (<p className="font-semibold text-lg leading-8 text-green-500 text-left whitespace-nowrap">Giao hàng thành công</p>)}
                                            </div>
                                            <div className="flex flex-col justify-center items-start max-sm:items-center">
                                                <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                                                    Ngày đặt hàng</p>
                                                <p className="font-semibold text-lg leading-8 text-black text-left whitespace-nowrap">
                                                    {convertToVietnamTime(item?.createdAt)}
                                                </p>
                                            </div>
                                            <button onClick={() => handleDownloadPdf(item)}>Tải hóa đơn PDF</button>
                                        </div>
                                    </div>
                                    <svg className="my-1 w-full" xmlns="http://www.w3.org/2000/svg" width={1216} height={2} viewBox="0 0 1216 2" fill="none">
                                        <path d="M0 1H1216" stroke="#D1D5DB" />
                                    </svg>
                                </>
                            ))
                        }
                    </div>
                    {currentItem && (
                        <div style={{ display: 'none' }}>
                            <Invoice ref={pdfRef} item={currentItem} />
                        </div>
                    )}
                </div>
            </section>

        </>
    )
}

export default OrderHistory