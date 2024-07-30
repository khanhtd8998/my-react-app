import { Product } from "@/common/types/product";
import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, InputNumber, message } from "antd";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const DetailProduct = () => {
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1);
    const { data } = useQuery({
        queryKey: ["PRODUCTS", id],
        queryFn: async () => {
            try {
                const res = await instance.get(`/products/${id}`)
                if (res.status == 200) return res.data
            } catch (error) {
                console.log(error);
            }
        }
    })

    const onIncrement = () => {
        if (quantity < 10) {
            setQuantity(quantity + 1);
        }
    };

    const onDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const queryClient = useQueryClient()
    const [messageApi, contextHolder] = message.useMessage()
    const { mutate } = useMutation({
        mutationFn: async (product: Product) => {
            try {
                const data = {
                    product: product._id,
                    price: product.price,
                    quantity: quantity
                }
                const res = await instance.post('/carts/add-to-cart', data)
                return res.data
            } catch (error: any) {
                messageApi.open({
                    type: 'error',
                    content: `Cần có tài khoản để thêm sản phẩm vào giỏ hàng`,
                })
            }
        },
        onSuccess(data) {
            messageApi.open({
                type: 'success',
                content: `${data?.message}`,
            })
            queryClient.invalidateQueries({ queryKey: ['carts'] })
        },
        onError(error) {
            console.log(error);
        }
    })
    const addToCart = (product: Product) => {
        mutate(product);
    }
    return (
        <>
            <div>
                {contextHolder}
                <main className="w-full *:lg:w-[1312px] *:w-[342px] *:mx-auto *:h-full lg:py-10 mb:py-6 lg:mt-0 mb:mt-0.5">
                    <div className="lg:grid lg:grid-cols-[573px_640px] justify-between border-b">
                        {/*  desktop : left  , mobile : row 1 */}
                        <div className="w-full h-full">
                            <div className="w-full flex flex-col lg:items-center lg:gap-y-6 gap-y-3.5">
                                <div className="handle_show_img_product relative cursor-pointer w-full lg:h-[520px] mb:h-[342px] bg-white border grid place-items-center mb:rounded-xl lg:rounded-3xl">
                                    <img className="lg:w-[400px] lg:h-[400px] mb:w-[240px] mb:h-[240px]" src={data?.image} />
                                    <div className="absolute bottom-0 cursor-pointer hover:scale-110 duration-300 right-0 -translate-x-1/2 -translate-y-1/2 lg:w-10 lg:h-10 mb:w-8 mb:h-8 lg:p-2.5 mb:p-2 rounded-[50%] bg-white grid place-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link">
                                            <path d="M15 3h6v6" />
                                            <path d="M10 14 21 3" />
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="*:lg:w-16 *:lg:h-16 *:mb:w-14 *:mb:h-14 *:p-2 *:bg-[#F4F4F4] *:rounded-lg *:duration-300 *:cursor-pointer flex items-center gap-x-4">
                                    <button className="hover:scale-110">
                                        <img src={data?.image} />
                                    </button>
                                    <button className="hover:scale-110">
                                        <img src={data?.image} />
                                    </button>
                                    <button className="hover:scale-110">
                                        <img src={data?.image} />
                                    </button>
                                    <button className="hover:scale-110">
                                        <img src={data?.image} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/*desktop: right, mobile : row 2 */}
                        <div className="h-full w-full *:w-full lg:mt-0 mb:mt-[42px]">
                            <div className="flex flex-col lg:gap-y-5">
                                {/* row 1 */}
                                <div className="lg:h-[211px] flex flex-col lg:gap-y-4">
                                    <span className="text-[#9D9EA2] lg:text-sm mb:text-xs lg:tracking-[4px] mb:tracking-[2px]">CONCENTRATES</span>
                                    <strong className="lg:text-[32px] lg:mt-[1px] mb:mt-3.5 mb:text-[20px] lg:tracking-[-1.2px] font-medium lg:leading-[38.4px]">
                                        {data?.name} <br className="lg:block mb:hidden" />
                                    </strong>
                                    <div className="*:bg-[#F2F6F4] *:lg:rounded-lg *:lg:px-4 *:lg:py-2.5 *:text-[#05422C] flex items-center lg:gap-x-4 *:text-xs lg:my-0 mb:mt-3 mb:mb-2 *:mb:px-2.5 *:mb:py-[5.5px] mb:gap-2 *:mb:rounded">
                                        <button>{data?.category?.name}</button>
                                        <button>Authentic 100%</button>
                                    </div>
                                    <div className="flex lg:items-center mb:items-end justify-between">
                                        <span className="font-medium text-[#EB2606] lg:text-xl lg:tracking-[0.7px] mb:text-base flex items-center lg:gap-x-3 lg:mt-0.5 mb:gap-x-2"><del className="font-light lg:text-sm mb:text-sm text-[#9D9EA2]">$200.00</del>${data?.price}</span>
                                        <section className="lg:w-[163px] mb:w-[157px] mb:mt-[8px] lg:mt-0 h-[21px] *:lg:text-sm *:mb:text-xs flex justify-between items-start">
                                            <div className="flex items-start lg:gap-x-0 mb:gap-x-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                </svg>
                                                <strong>4.6/5</strong>
                                            </div>
                                            <div className="flex gap-x-2">
                                                <strong>135</strong>
                                                <span className="text-[#C8C9CB]">Reviews</span>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                                <div className="py-5 flex lg:flex-row mb:flex-col lg:gap-y-0 gap-y-[17px] justify-between lg:items-center mb:items-start border-y lg:mt-[22px]">
                                    <div className="border lg:py-2.5 lg:pr-6 lg:pl-4 mb:py-1 mb:pl-2 mb:pr-[18px] *:text-xs flex items-center gap-x-3 rounded-xl">
                                        <div className="flex items-center">
                                            <Button onClick={onDecrement}>-</Button>
                                            <InputNumber
                                                className="w-12"
                                                min={1}
                                                max={10}
                                                value={quantity}
                                                onChange={(value) => setQuantity(value!)}
                                                style={{ margin: '0 10px' }}
                                            />
                                            <Button onClick={onIncrement}>+</Button>
                                        </div>
                                        |
                                        <span className="text-[#17AF26] lg:tracking-[0.5px]">In Stock</span>
                                    </div>
                                    {/* add cart */}
                                    <button onClick={() => addToCart(data)} className="lg:text-base mb:text-sm font-medium flex place-items-center gap-x-4 text-white bg-[#17AF26] rounded-[100px] lg:px-[30px] mb:px-[22px] lg:h-14 mb:h-12">
                                        <span>Add to Cart</span> | <span>${data?.price * quantity}</span>
                                    </button>
                                </div>



                            </div>
                            {/* description */}
                            <div className="flex flex-col border-t lg:py-10 lg:mt-10 mb:py-[34px] mb:mt-8">
                                {/* menu description */}
                                <ul className="flex items-center justify-between border-b lg:pb-6 mb:pb-5 *:lg:w-[197.33px] *:mb:w-[106px] *:lg:py-2.5 *:mb:py-[7px] *:rounded-[100px] *:border *:place-items-center *:lg:text-base *:mb:text-xs">
                                    <button className="btn_show_description grid hover:border-[#05422C] border-[#05422C] text-[#05422C] hover:bg-[#F2F6F4] bg-[#F2F6F4]">Description</button>
                                    <button className="btn_show_review flex items-center justify-center gap-x-1 hover:border-[#05422C] hover:text-[#05422C] hover:bg-[#F2F6F4]">Reviews
                                        <p>(350)</p>
                                    </button>
                                    <button className="btn_show_refer grid hover:border-[#05422C] hover:text-[#05422C] hover:bg-[#F2F6F4]">Refer a
                                        Friend</button>
                                </ul>
                                {/* text description */}
                                <div className="show_description">
                                    <section className="flex flex-col text-sm text-[#46494F] leading-[21px] gap-y-4 lg:py-6 mb:pt-[19px]">
                                        <p>Jungle Diamonds is a slightly indica dominant hybrid strain (60% indica/40% sativa) created through
                                            crossing the infamous Slurricane X Gorilla Glue #4 strains. Named for its gorgeous appearance and
                                            breeder,
                                            Jungle Diamonds is a favorite of indica and hybrid lovers alike thanks to its delicious taste and
                                            tingly,
                                            arousing high. Jungle Diamonds buds have sparkling oversized spade-shaped olive green nugs with vivid
                                            amber hairs and a thick frosty blanket of glittering tiny blue-tinted white crystal trichomes. As you
                                            pull
                                            apart each sticky little nugget, aromas of spicy mocha coffee and fruity herbs are released. </p>
                                        <p>The flavor is of sweet chocolate with hints of fresh ripe berries to it, too. The Jungle Diamonds high
                                            is
                                            just as delicious, with happy effects that will boost the spirits and kick negative thoughts and moods
                                            to
                                            the curb. You'll feel a tingly sense in your body from start to finish that serves to remove any aches
                                            or
                                            pains while leaving you pretty aroused at times. This is accompanied by a blissfully unfocused heady
                                            lift
                                            that leaves your head in the clouds without causing sedation. With these effects and its pretty high
                                            17-24% THC level, Jungle Diamonds is ideal for experienced patients with chronic pain, cramps or muscle
                                            spasms and appetite loss or nausea.</p>
                                    </section>
                                </div>
                                {/* detail comment */}
                                <section className="show_review hidden">
                                    <div className="flex flex-col text-sm text-[#46494F] leading-[21px] gap-y-4 lg:pt-6 mb:pt-5 mb:pb-0">
                                        {/* content comment 1 */}
                                        <div className="border rounded-2xl lg:p-6 mb:p-5">
                                            {/* user and time comment */}
                                            <div className="flex items-center *:flex *:items-center gap-x-4 border-b border-[#F4F4F4] pb-4 mb-4">
                                                <img width={36} height={36} src="../Images/vikki_user_icon.png" />
                                                <strong className="text-base text-[#1A1E26] font-medium gap-x-4">Vikki Starr <span className="text-sm text-[#9D9EA2] font-light">|</span> <span className="text-sm text-[#9D9EA2] font-light">January 15, 2023</span></strong>
                                            </div>
                                            {/* text comment */}
                                            <section className="flex flex-col gap-y-4">
                                                <nav className="flex items-center gap-x-1">
                                                    <img src="../Images/star.png" />
                                                    <img src="../Images/star.png" />
                                                    <img src="../Images/star.png" />
                                                    <img src="../Images/star.png" />
                                                    <img src="../Images/star.png" />
                                                </nav>
                                                <p className="text-[#1A1E26] text-base">Absolutely love TopShelfBC; affordable on any budget and such fast
                                                    delivery, straight to my door! I
                                                    recommend them to all my friends and family for their 420 needs.</p>
                                            </section>
                                        </div>
                                        {/* content comment 2 */}
                                        <div className="border rounded-2xl lg:p-6 mb:p-5">
                                            {/* user and time comment */}
                                            <div className="flex items-center *:flex *:items-center gap-x-4 border-b border-[#F4F4F4] pb-4 mb-4">
                                                <img width={36} height={36} src="../Images/vikki_user_icon.png" />
                                                <strong className="text-base text-[#1A1E26] font-medium gap-x-4">Terry Baskey <span className="text-sm text-[#9D9EA2] font-light">|</span> <span className="text-sm text-[#9D9EA2] font-light">January 15, 2023</span></strong>
                                            </div>
                                            {/* text comment */}
                                            <section className="flex flex-col gap-y-4">
                                                <nav className="flex items-center gap-x-1">
                                                    <img src="../Images/star.png" />
                                                    <img src="../Images/star.png" />
                                                    <img src="../Images/star.png" />
                                                    <img src="../Images/star.png" />
                                                    <img src="../Images/star.png" />
                                                </nav>
                                                <p className="text-[#1A1E26] text-base">Best damn place to buy your canabis at great prices.</p>
                                            </section>
                                        </div>
                                        {/*btn show more */}
                                        <div className="flex justify-center my-1">
                                            <button className="px-5 py-2 text-[#17AF26] text-sm rounded-[100px] border hover:bg-[#F9F9F9] cursor-pointer duration-300">Show
                                                More</button>
                                        </div>
                                        {/* add comment */}
                                        <div className="flex flex-col gap-y-6 border-t lg:pt-7 lg:pb-[22px]">
                                            <strong className="lg:text-lg">Add A Review</strong>
                                            <section className="flex item-center gap-x-4">
                                                <span className="mt-0.5">Your rating</span>
                                                <span>:</span>
                                                <div className="flex item-center *:w-5 *:h-5 gap-x-1 *:cursor-pointer">
                                                    <img src="../Images/star_no_color.png" />
                                                    <img src="../Images/star_no_color.png" />
                                                    <img src="../Images/star_no_color.png" />
                                                    <img src="../Images/star_no_color.png" />
                                                    <img src="../Images/star_no_color.png" />
                                                </div>
                                            </section>
                                            <form className="-mt-1.5">
                                                <span>Your Review</span>
                                                <div className="overflow-hidden lg:p-4 rounded-lg border border-gray-200 shadow-sm focus-within:border-none focus-within:ring-1 focus-within:none mt-2">
                                                    <textarea id="OrderNotes" className="w-full resize-none outline-none border-none align-top focus:ring-0 sm:text-sm" rows={3} placeholder="Enter your review" defaultValue={""} />
                                                </div>
                                                <button className="px-10 py-4 bg-[#17AF26] rounded-[100px] text-base text-white mt-4">Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </section>
                                {/* detail refer a friend */}
                                <div className="show_refer hidden">
                                    <div className="rounded-2xl lg:px-6 lg:pt-7 lg:pb-4 mb:p-5 border flex flex-col gap-y-5 mt-5 mb-[23px]">
                                        <section className="border-b pb-6">
                                            <strong className="lg:text-xl mb:text-lg font-medium text-[#060709]">Referral Program</strong>
                                            <p className="text-[#717378] lg:text-base mb:text-sm mt-4">Absolutely love TopShelfBC; affordable on any
                                                budget and
                                                such fast delivery, straight to my door! I
                                                recommend them to all my friends and family for their 420 needs.</p>
                                        </section>
                                        <section className="*:p-4 mt-1 *:bg-[#F3FBF4] flex flex-col gap-y-6 *:rounded-xl border-b pb-6">
                                            <div className="flex item-center justify-between gap-x-3">
                                                {/* col line */}
                                                <div className="w-0.5 bg-[#EB2606]" />
                                                {/* text */}
                                                <span className="flex flex-col gap-y-2 text-sm font-light">
                                                    Your Referral URL
                                                    <strong className="text-base font-medium">Referral code is available only to users with at least one
                                                        order.</strong>
                                                </span>
                                                {/* coppy */}
                                                <div className="w-10 h-10 rounded-[50%] bg-white grid place-items-center">
                                                    <img width={18} height={18} src="../Images/copy.png" />
                                                </div>
                                            </div>
                                            {/* *** */}
                                            <div className="flex item-center justify-between gap-x-3">
                                                {/* col line */}
                                                <div className="w-0.5 bg-[#EB2606]" />
                                                {/* text */}
                                                <span className="flex flex-col gap-y-2 text-sm font-light">
                                                    Your Coupon Code to share
                                                    <strong className="text-base font-medium">Referral code is available only to users with at least one
                                                        order.</strong>
                                                </span>
                                                {/* coppy */}
                                                <div className="w-10 h-10 rounded-[50%] bg-white grid place-items-center">
                                                    <img width={18} height={18} src="../Images/copy.png" />
                                                </div>
                                            </div>
                                        </section>
                                        {/* social */}
                                        <nav className="flex lg:flex-row mb:flex-col mt-1 *:lg:px-5 *:lg:py-4 *:gap-y-4 *:border *:rounded-[14px] justify-between lg:gap-x-6 *:grid *:place-items-center">
                                            {/* fb */}
                                            <div>
                                                <button className="w-12 h-12 grid place-items-center bg-[#EDF4FF] rounded-[50%]">
                                                    <img src="../Images/fb_icon.png" />
                                                </button>
                                                <span className="text-[#46494F] text-sm">Share Via Facebook</span>
                                            </div>
                                            {/* twitter */}
                                            <div>
                                                <button className="w-12 h-12 grid place-items-center bg-[#EDF4FF] rounded-[50%]">
                                                    <img src="../Images/twitter_icon.png" />
                                                </button>
                                                <span className="text-[#46494F] text-sm">Share Via Twitter</span>
                                            </div>
                                            {/* hotline */}
                                            <div>
                                                <button className="w-12 h-12 grid place-items-center bg-[#EDF4FF] rounded-[50%]">
                                                    <img src="../Images/hotline_icon.png" />
                                                </button>
                                                <span className="text-[#46494F] text-sm">Share Via Whatsapp</span>
                                            </div>
                                        </nav>
                                        <span className="text-[#C8C9CB] text-center mt-1">Or share via email</span>
                                        {/* contact to email */}
                                        <form>
                                            <div className="grid mt-1 lg:grid-cols-[42%_42%_auto] items-end justify-between gap-y-4">
                                                <div className="flex flex-col items-start gap-y-2">
                                                    <span className="text-sm">Email</span>
                                                    <input type="text" placeholder="Enter your email" className="border rounded-lg w-full p-3 outline-none placeholder:text-[#C8C9CB] text-[#C8C9CB] font-normal" />
                                                </div>
                                                <div className="flex flex-col items-start gap-y-2">
                                                    <span className="text-sm">Name</span>
                                                    <input type="text" placeholder="Enter your name" className="border rounded-lg p-3 w-full outline-none placeholder:text-[#C8C9CB] placeholder:font-normal text-[#C8C9CB] font-normal" />
                                                </div>
                                                <button className="bg-[#F3FBF4] rounded-[50%] w-12 h-12 hover:scale-105 duration-300 cursor-pointer text-[#17AF26] text-3xl font-light grid place-items-center">
                                                    <img src="../Images/add.png" />
                                                </button>
                                                <div className="flex flex-col items-start gap-y-2">
                                                    <input type="text" placeholder="johndoe@example.com" className="border w-full placeholder:text-black rounded-lg p-3 outline-none text-black font-normal" />
                                                </div>
                                                <div className="flex flex-col items-start gap-y-2">
                                                    <input type="text" defaultValue="John Doe" className="border w-full rounded-lg p-3 outline-none text-black font-normal" />
                                                </div>
                                            </div>
                                            {/*btn show more */}
                                            <div className="flex justify-start my-1.5">
                                                <button className="px-[42px] py-4 bg-[#17AF26] rounded-[100px] text-base text-white mt-4">Send
                                                    Emails</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                {/* show img when click */}
                <div className="show_img_product hidden top-12 absolute left-1/2 -translate-x-1/2 z-[1]">
                    <section className="lg:w-[800px] mb:min-w-[342px] flex flex-col gap-y-6 lg:items-center">
                        <div className="relative w-full lg:h-[520px] mb:min-h-[414px]  grid place-items-center bg-[#F2F6F4] rounded-3xl">
                            <img className="lg:w-[320px] lg:h-[320px] mb:w-[240px] mb:h-[240px]" src="../Images/img_product.png" />
                            <div className="absolute bottom-0 cursor-pointer hover:scale-110 duration-300 right-0 -translate-x-1/2 -translate-y-1/2 lg:w-10 lg:h-10 mb:w-8 mb:h-8 lg:p-2.5 mb:p-2 rounded-[50%] bg-white grid place-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link">
                                    <path d="M15 3h6v6" />
                                    <path d="M10 14 21 3" />
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                </svg>
                            </div>
                        </div>
                        <div className="*:lg:w-16 *:lg:h-16 *:mb:w-14 *:mb:h-14 flex items-center gap-x-4 *:rounded-lg *:p-2 *:bg-[#F2F6F4] *:border-2 *:cursor-pointer *:duration-300">
                            <img className="border-[#17AF26]" src="../Images/img_product.png" />
                            <img className="hover:border-[#17AF26] border-[#F2F6F4]" src="../Images/img_product.png" />
                            <img className="hover:border-[#17AF26] border-[#F2F6F4]" src="../Images/img_product.png" />
                            <img className="hover:border-[#17AF26] border-[#F2F6F4]" src="../Images/img_product.png" />
                        </div>
                    </section>
                </div>
                {/* lớp phủ */}
                <div className="bg_show_img_product hidden fixed top-0 w-screen h-screen bg-[#01100B40]">
                </div>
                {/* show cart */}
                <div className="show_cart translate-x-[110%] duration-300 fixed lg:w-[41vw] mb:w-screen lg:rounded-none mb:rounded-3xl z-[1] lg:h-screen mb:h-[90vh] lg:top-0 mb:top-[10vh] right-0 bg-white py-8 mb:px-6 lg:px-8">
                    {/* close */}
                    <button className="close_cart absolute -translate-x-[200%] top-1/2 -translate-y-1/2">
                        <div className="relative w-10 h-10 rounded-[50%] bg-white duration-300 hover:scale-110"><img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src="../Images/arrow-right.png" />
                        </div>
                    </button>
                    <div className="border-b pb-6 flex justify-between item-center">
                        <strong className="text-xl font-medium text-[#060709]">Your Cart</strong>
                        <span className="text-[#9D9EA2] font-light">(0)</span>
                    </div>
                    {/* items */}
                    <div className="w-full">
                        {/* no items : */}
                        <div className=" show_items_cart w-full min-h-[519px] flex flex-col justify-center place-items-center gap-y-16">
                            <div className="lg:w-[160px] lg:h-[160px] mb:w-[120px] mb:h-[120px] rounded-[50%] bg-[#F2F6F4] grid place-items-center">
                                <img src="../Images/bag-2.png" />
                            </div>
                            <button className="lg:h-14 mb:h-10 grid place-items-center lg:px-10 mb:px-6 bg-[#17AF26] rounded-[100px] text-white">
                                Show Product
                            </button>
                        </div>
                        {/* list items and check out */}
                        <div className="hidden items_cart">
                            <div className="w-full flex flex-col gap-y-5 *:flex *:flex-col">
                                {/* list item */}
                                <div className="hidden_scroll_y flex flex-col gap-y-5 overflow-y-scroll mt-5">
                                    {/* item */}
                                    <div className="flex gap-x-4 border-b pb-5">
                                        <img className="w-14 h-14 p-2 border rounded-xl" src="../Images/img_product.png" />
                                        <div className="w-full flex flex-col gap-y-5">
                                            <section className="w-full flex flex-col gap-y-1.5">
                                                <strong className="flex lg:items-center mb:items-start font-normal justify-between text-[#05422C]">Mix And
                                                    Match Shatter/Budder 28g (4 X 7G) <button className="w-6 h-6 rounded-[50%] border text-[#9D9EA2] font-light text-xs grid place-items-center">x</button>
                                                </strong>
                                                <div className="w-full flex justify-between items-center">
                                                    <span className="flex gap-x-2 text-[#717378] font-light">2x<p className="font-normal">$120.00</p></span>
                                                    <p>$245.00</p>
                                                </div>
                                            </section>
                                            <section className="w-full flex flex-col gap-y-1.5">
                                                <strong className="flex lg:items-center mb:items-start font-normal justify-between text-[#060709]">Add
                                                    Integra Pack - 4g<button className="w-6 h-6 rounded-[50%] border text-[#9D9EA2] font-light text-xs grid place-items-center">x</button>
                                                </strong>
                                                <div className="w-full flex justify-between items-center">
                                                    <span className="flex gap-x-2 text-[#717378] font-light">1x<p className="font-normal">$2.00</p></span>
                                                    <p>$2.00</p>
                                                </div>
                                            </section>
                                            <section className="w-full flex flex-col gap-y-1.5">
                                                <strong className="flex lg:items-center mb:items-start font-normal justify-between text-[#060709]">Add
                                                    Integra Pack - 8g <button className="w-6 h-6 rounded-[50%] border text-[#9D9EA2] font-light text-xs grid place-items-center">x</button>
                                                </strong>
                                                <div className="w-full flex justify-between items-center">
                                                    <span className="flex gap-x-2 text-[#717378] font-light">1x<p className="font-normal">$3.00</p></span>
                                                    <p>$3.00</p>
                                                </div>
                                            </section>
                                            <span className="pt-5 flex justify-between text-[#9D9EA2] text-sm border-t">Subtotal <p className="text-[#060709]">$245.00</p></span>
                                        </div>
                                    </div>
                                    {/* item */}
                                    <div className="flex gap-x-4 border-b pb-5">
                                        <img className="w-14 h-14 p-2 border rounded-xl" src="../Images/img_product.png" />
                                        <div className="w-full flex flex-col gap-y-5">
                                            <section className="w-full flex flex-col gap-y-1.5">
                                                <strong className="flex lg:items-center mb:items-start font-normal justify-between text-[#05422C]">Shipwreck
                                                    Edibles Gummy <button className="w-6 h-6 rounded-[50%] border text-[#9D9EA2] font-light text-xs grid place-items-center">x</button>
                                                </strong>
                                                <div className="w-full flex justify-between items-center">
                                                    <span className="flex gap-x-2 text-[#717378] font-light">5x<p className="font-normal">$13.00</p></span>
                                                    <p>$65.00</p>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                    {/* subtotal */}
                                    <div className="border-b -mt-2">
                                        <span className="text-sm flex justify-between items-center pl-[75px]">TOTAL <p className="text-xl text-[#EB2606] font-medium">$305.00</p></span>
                                        <button className="lg:h-14 mb:h-10 rounded-[100px] bg-[#17AF26] lg:px-10 mb:px-8 text-white my-5">Checkout</button>
                                    </div>
                                </div>
                                {/* check out */}
                                <div className="gap-y-4">
                                    <span className="tracking-[1px] text-[#717378] text-xs">SECURE PAYMENTS PROVIDED BY</span>
                                    <div className="flex items-center gap-x-3">
                                        <img src="../Images/mastercard_v1.png" />
                                        <img src="../Images/mastercard_v2.png" />
                                        <img src="../Images/mastercard_v3.png" />
                                        <img src="../Images/mastercard_v4.png" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default DetailProduct;
