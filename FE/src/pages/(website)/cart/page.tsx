/* eslint-disable @typescript-eslint/no-explicit-any */

import useCart from "@/common/hooks/useCart"
import { Cart } from "@/common/types/cart"
import { useAuth } from "@/contexts/AuthContext"
import { Button, Form, Input, InputNumber, Popconfirm, Space, Table } from "antd"
import Typography from "antd/es/typography/Typography"
import { Link, useNavigate } from "react-router-dom"
import { DeleteOutlined } from '@ant-design/icons'
import { Trash2 } from "lucide-react"
import type { InputNumberProps } from 'antd';
import { useState } from "react"

type FieldType = {
    quantity: number
}
const CartPage = () => {
    const nav = useNavigate()
    const { isLogin } = useAuth()
    const [form] = Form.useForm()
    const { cartData, count, handleDeleteItemCart, handleDeleteCart } = useCart()
    const newCartData = cartData?.data?.products
    const dataSource = newCartData?.map((item: any) => {
        return {
            ...item,
            key: item.productId
        }
    })

    const onChange: InputNumberProps['onChange'] = (value: any) => {
        console.log('changed', value);
    };


    const handleOrder = () => {
        form.validateFields()
            .then((values) => {
                nav('/order')
            })
            .catch((errorInfo) => {
                console.log('Validation Failed:', errorInfo);
            });
    }
    const columns = [
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (text: string) => {
                return (
                    <img className="border rounded w-12 h-12 p-1" src={text} alt={`Image ${text}`} />

                )
            }
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_: any, item: any) => {
                return (
                    <>
                        <p className="opacity-0"> {item.quantity}</p>

                        <Form form={form} initialValues={{ quantity: item.quantity }} className="flex items-center justify-center">
                            <Form.Item<FieldType>
                                name="quantity"
                                rules={[{ required: true, message: 'Please input your quantity!' }]}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {/* <Button onClick={onDecrement}>-</Button> */}
                                    <InputNumber
                                        min={1}
                                        max={10}
                                        // value={quantity}
                                        defaultValue={item.quantity}
                                        onChange={onChange}
                                        style={{ margin: '0 10px' }}
                                    />
                                    {/* <Button onClick={onIncrement}>+</Button> */}
                                </div>
                            </Form.Item>
                        </Form>
                    </>
                )
            }
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
        {
            action: '',
            dataIndex: '',
            key: '',
        },
        {
            action: 'Tổng',
            key: "action",
            render: (_: any, item: any) => {
                return <p>{item?.price * item?.quantity}</p>
            }
        },
        {
            className: 'text-center size-5',
            action: 'Xóa',
            key: 'action',
            render: (_: any, item: any) => {
                return (
                    <>
                        <Popconfirm
                            title={`Xóa ${item?.name} khỏi giỏ hàng `}
                            description="Bạn chắc chắn muốn xóa sản phẩm này?"
                            onConfirm={() => handleDeleteItemCart(item?.productId!)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <DeleteOutlined className="text-red-500" />
                        </Popconfirm>
                    </>
                )
            }
        }

    ]
    return (
        <>
            {
                (!isLogin) && (
                    <Space className="h-[80vh] flex justify-center items-center">
                        <div>
                            <Typography>
                                <Link to="/signin">Đăng nhập</Link> hoặc <Link to="/signup">Đăng ký</Link> để tiếp tục
                            </Typography>
                        </div>
                    </Space>
                )
            }
            {
                isLogin && (
                    <main className="lg:w-[1170px] mb:w-[342px] lg:mt-8 mb:mt-6 mx-auto grid lg:grid-cols-[686px_420px] mb:grid-cols-[100%] justify-between *:w-full pb-10">
                        <div>
                            <span className="text-xl flex mb-[1px] items-center justify-between pb-6 border-b">Your Cart
                                {
                                    count > 1 && (
                                        <Popconfirm
                                            // title={`Xóa sản phẩm ${item?.products?.name}`}
                                            title={`Xoát toàn bộ giỏ hàng`}
                                            description="Bạn chắc chắn muốn xóa hết sản phẩm?"
                                            onConfirm={() => handleDeleteCart(cartData?.data?._id)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button className="px-1" type="primary" danger><p className="text-[white] lg:text-base mb:text-sm flex space-x-1"><Trash2 /><span>({count})</span></p></Button>
                                        </Popconfirm>
                                    )

                                }
                            </span>
                            <Table columns={columns} dataSource={dataSource} pagination={false}></Table>
                        </div>
                        {
                            count != 0 && (
                                <>
                                    <div className="hidden lg:block">
                                        <div className="w-full lg:p-6 mb:p-5 border rounded-2xl flex flex-col gap-y-[3px]">
                                            <div className="flex flex-col gap-y-4">
                                                <section className="flex justify-between text-sm">
                                                    <span className="text-[#9D9EA2]">Subtotal </span>
                                                    <p>${cartData?.data.totalPrice}</p>
                                                </section>
                                                <section className="flex justify-between text-sm">
                                                    <span className="text-[#9D9EA2]">Discount </span>
                                                    <p></p>
                                                </section>
                                                <section className="flex justify-between text-sm">
                                                    <span className="text-[#9D9EA2]">Shipping Costs </span>
                                                    <p></p>
                                                </section>
                                            </div>
                                            {/* voucher */}
                                            <div className="flex items-center justify-between gap-x-3 *:h-12 *:border border-b py-[19px]">
                                                <input type="text " placeholder="Coupon code" className="px-3 py-2 rounded-lg" />
                                                <button className="text-[#17AF26] font-medium bg-[#F3FBF4] whitespace-nowrap text-sm rounded-[100px] px-5 py-2">Apply
                                                    Coupon</button>
                                            </div>
                                            {/* *** */}
                                            <div className="my-3">
                                                <span role="progressbar" aria-labelledby="ProgressLabel" aria-valuenow={50} className="block rounded-full bg-[#F4F4F4]">
                                                    <span className="block h-[7px] rounded-full bg-[#17AF26]" style={{ width: '100%' }} />
                                                </span>
                                            </div>
                                            {/* *** */}
                                            <span className="flex mt-0.5 gap-x-[3px] items-center font-medium text-sm text-[#717378]">Get Free <p className="text-[#1A1E26]">
                                                Shipping</p> for orders over <p className="text-[#EB2606]">$100.00</p></span>
                                            <a href="" className="font-semibold text-sm underline cursor-pointer my-1 tracking-[-0.1px]">Continue Shopping</a>
                                            {/* <Link to={'/order'}> */}
                                            <button onClick={() => handleOrder()} className="bg-[#17AF26] hover:bg-green-600 px-10 h-14 rounded-[100px] text-white flex my-[13px] gap-x-4 place-items-center justify-center">
                                                <span>Checkout</span>
                                                |
                                                <span>${cartData?.data.totalPrice}</span>
                                            </button>
                                            {/* </Link> */}
                                            {/* payment */}
                                            <div className="flex flex-col gap-y-4 border-t mt-[3px] pt-[22px]">
                                                <span className="tracking-[0.8px] text-[#717378] text-xs">SECURE PAYMENTS PROVIDED BY</span>
                                                <div className="flex items-center gap-x-3 *:cursor-pointer">
                                                    <img src="../Images/mastercard_v1.png" alt="" />
                                                    <img src="../Images/mastercard_v2.png" alt="" />
                                                    <img src="../Images/mastercard_v3.png" alt="" />
                                                    <img src="../Images/mastercard_v4.png" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="block lg:hidden mt-[35px]">
                                        <div className="w-full lg:p-6 mb:p-5 border rounded-2xl flex flex-col gap-y-[3px]">
                                            <div className="flex flex-col gap-y-4">
                                                <section className="flex justify-between text-sm">
                                                    <span className="text-[#9D9EA2]">Subtotal </span>
                                                    <p>$497.00</p>
                                                </section>
                                                <section className="flex justify-between text-sm">
                                                    <span className="text-[#9D9EA2]">Discount </span>
                                                    <p>$0.0</p>
                                                </section>
                                                <section className="flex justify-between text-sm">
                                                    <span className="text-[#9D9EA2]">Shipping Costs </span>
                                                    <p>$50.00</p>
                                                </section>
                                            </div>
                                            {/* voucher */}
                                            <div className="flex items-center justify-between gap-x-3 *:h-12 *:border border-b py-[19px]">
                                                <input type="text" placeholder="Coupon code" className="lg:px-3 mb:pl-[22px] mb:w-[150px] lg:w-auto rounded-lg text-sm lg:text-base" />
                                                <button className="text-[#17AF26] font-medium bg-[#F3FBF4] whitespace-nowrap text-sm rounded-[100px] px-5 py-2">Apply Coupon</button>
                                            </div>
                                            {/* *** */}
                                            <div className="my-3">
                                                <span role="progressbar" aria-labelledby="ProgressLabel" aria-valuenow={60} className="block rounded-full bg-[#F4F4F4]">
                                                    <span className="block h-[7px] rounded-full bg-[#17AF26]" style={{ width: '58%' }} />
                                                </span>
                                            </div>
                                            {/* *** */}
                                            <span className="flex mt-0.5 gap-x-[3px] items-center font-medium text-sm text-[#717378]">Get Free <p className="text-[#1A1E26]">
                                                Shipping</p> for orders over <p className="text-[#EB2606]">$100.00</p></span>
                                            <a href="" className="font-semibold text-sm underline cursor-pointer my-1 tracking-[-0.1px]">Continue Shopping</a>
                                            <button className="bg-[#C8C9CB] px-10 h-14 rounded-[100px] text-white flex my-[13px] gap-x-4 place-items-center justify-center">
                                                <span>Checkout</span>
                                                |
                                                <span>$547.00</span>
                                            </button>
                                            {/* check out */}
                                            <div className="flex flex-col gap-y-4 border-t mt-[3px] pt-[22px]">
                                                <span className="tracking-[0.8px] text-[#717378] text-xs">SECURE PAYMENTS PROVIDED BY</span>
                                                <div className="flex items-center gap-x-3 *:cursor-pointer">
                                                    <img src="../Images/mastercard_v1.png" alt="" />
                                                    <img src="../Images/mastercard_v2.png" alt="" />
                                                    <img src="../Images/mastercard_v3.png" alt="" />
                                                    <img src="../Images/mastercard_v4.png" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        {/* delivery */}
                        <div className="w-full flex flex-col gap-y-3.5 lg:-mt-6 md:mt-16">
                            <div className="flex justify-between lg:gap-x-6 *:w-full mt-16">
                                <span className="text-[#17AF26]">Delivery</span>
                                <span />
                                <span className="text-[#17AF26] hidden lg:block">Free Returns</span>
                            </div>
                            <section className="w-full flex lg:flex-row mb:flex-col lg:justify-between lg:items-start lg:gap-x-6 mb:gap-y-[22px] *:w-full lg:mt-0 mb:mt-0.5">
                                <div className="p-4 flex flex-col gap-y-3.5 border rounded-xl h-[270px]">
                                    <img className="w-12 h-12 p-3 rounded-[50%] bg-[#F2F6F4]" src="../Images/transaction-minus.png" alt="" />
                                    <span className="lg:text-lg mb:text-base mt-0.5 text-[#1A1E26]">Order by 10pm for free next day delivery on
                                        Orders overs $100</span>
                                    <p className="text-[#717378] lg:text-base mb:text-sm">We deliver Monday to Saturday - excluding Holidays</p>
                                </div>
                                <div className="p-4 flex flex-col lg:gap-y-3.5 mb:gap-y-4 border rounded-xl h-[270px]">
                                    <img className="w-12 h-12 p-3 rounded-[50%] bg-[#F2F6F4]" src="../Images/box-time.png" alt="" />
                                    <span className="lg:text-lg mb:text-base lg:mt-0.5 text-[#1A1E26] lg:tracking-[0] mb:tracking-[0.1px]">Free next day delivery to stores.</span>
                                    <p className="text-[#717378] lg:text-base mb:text-sm">Home delivery is $4.99 for orders under $100 and is FREE for
                                        all orders over $100</p>
                                </div>
                                <span className="text-[#17AF26] lg:hidden  -mb-2">Free Returns</span>
                                <div className="p-4 flex flex-col gap-y-3.5 border rounded-xl h-[270px]">
                                    <img className="w-12 h-12 p-3 rounded-[50%] bg-[#F2F6F4]" src="../Images/truck-time.png" alt="" />
                                    <p className="text-[#717378] lg:text-base mt-0.5 mb:text-sm leading-[29px]">30 days to return it to us for a refund. We have made
                                        returns SO EASY - you can now return your order to a store or send it with FedEx FOR FREE</p>
                                </div>
                            </section>
                        </div>
                    </main >
                )
            }
        </>
    )
}

export default CartPage
