import { Product } from "@/common/types/product"
import ProductCart from "@/components/ProductCart";
import instance from "@/configs/axios";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { Link } from "react-router-dom";


type Props = {
    products: Product[]
}

const ChooseYouWeed = ({ products }: Props) => {

    return (
        <>
            <div className="lg:w-[1200px] mx-auto sm:w-[95vw] mb:w-[342px] flex flex-col lg:py-24 mb:py-7">
                <strong className="lg:text-[64px] mb:text-[32px] lg:leading-[70px] mb:leading-[40px] lg:tracking-[-4.5px] mb:tracking-[-1.7px]">CHOOSE
                    YOUR WEED</strong>
                {/* menu */}
                <div className="flex mb:flex-col md:flex-row md:items-center mb:gap-y-8 md:gap-y-0 lg:gap-x-[40px] lg:mt-16 lg:mb-0.5 mb:my-6">
                    <span className="lg:text-2xl mb:text-base lg:tracking-[-0.5px]">Filter by Interest</span>
                    <ul className="*:md:h-[48px] overflow-x-scroll lg:mt-0 mb:-mt-[7px] hidden_scroll_x *:border flex whitespace-nowrap *:grid *:place-items-center *:px-5 *:py-2 *:rounded-[100px] lg:gap-x-[24px] mb:gap-x-4 *:lg:text-base *:mb:text-sm *:cursor-pointer *:duration-200">
                        <li className="hover:text-[#05422C] hover:bg-[#F2F6F4] bg-[#F2F6F4] text-[#05422C] hover:border-black border-black">
                            Flowers</li>
                        <li className="hover:text-[#05422C] hover:bg-[#F2F6F4] hover:border-black">Mushrooms</li>
                        <li className="hover:text-[#05422C] hover:bg-[#F2F6F4] hover:border-black">Concentrate</li>
                        <li className="hover:text-[#05422C] hover:bg-[#F2F6F4] hover:border-black">Edibles</li>
                        <li className="hover:text-[#05422C] hover:bg-[#F2F6F4] hover:border-black">Shop All Weed</li>
                    </ul>
                </div>
                <div className="grid lg:py-16 lg:mt-[30px] pb:my-10 lg:grid-cols-[276px_276px_276px_276px] mb:grid-cols-[159px_159px] border-t justify-between lg:gap-y-8 mb:gap-y-[29px] mb:pt-10">
                    {
                        products?.map((product) => (
                            <ProductCart key={product._id} product={product} />
                        ))
                    }

                </div>
            </div>
        </>
    )
}

export default ChooseYouWeed