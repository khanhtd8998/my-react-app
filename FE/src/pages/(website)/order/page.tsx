import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { Button, Form, Input, InputNumber, Modal, Radio, Space, Typography } from "antd";
import useCart from "@/common/hooks/useCart";
import { useOrder } from "@/common/hooks/useOrder";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
type FieldType = {
    name?: string;
    phone?: number;
    address?: string
    payment?: string
};
const OrderPage = () => {
    const [user, setUser] = useState<FieldType>({})
    const [modal2Open, setModal2Open] = useState(false);
    const { createOrderFormCart, contextHolder } = useOrder()
    const nav = useNavigate()
    const { count } = useCart()
    const { cartData } = useCart()
    const [form] = Form.useForm()
    const handleOpenModal = () => {
        form.validateFields()
            .then((values) => {
                setUser({
                    name: values.name,
                    phone: values.phone,
                    address: values.address,
                    payment: values.payment,
                });
                setModal2Open(true);
            })
            .catch((errorInfo) => {
                console.log('Validation Failed:', errorInfo);
                // Optional: Show an error message if needed
            });
    }
    const handleCreateOrder = (data: FieldType) => {
        try {
            createOrderFormCart(data);
            nav('/order-done')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {contextHolder}
            {
                (count == 0) && (
                    <Space className="h-[80vh] flex justify-center items-center">
                        <div>
                            <Typography>
                                Bạn chưa có sản phẩm nào.
                                Quay lại <Link to="/">Trang chủ</Link> để mua hàng
                            </Typography>
                        </div>
                    </Space>
                )
            }
            {
                (count > 0) && (
                    <div className="container mx-auto">
                        <span className="text-xl flex mb-[1px] items-center justify-between pb-6 border-b">Order</span>
                        <div className="grid grid-cols-12 gap-8 mt-10">
                            <div className="col-span-8">
                                <Form
                                    form={form}
                                    name="basic"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    style={{ maxWidth: 600 }}
                                    autoComplete="off"
                                >
                                    <Form.Item<FieldType>
                                        label="Name"
                                        name="name"
                                        rules={[{ required: true, message: 'Please input your name!' }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item<FieldType>
                                        label="Phone"
                                        name="phone"
                                        rules={[{ required: true, message: 'Please input your phone!' }]}
                                    >
                                        <InputNumber />
                                    </Form.Item>

                                    <Form.Item<FieldType>
                                        label="Address"
                                        name="address"
                                        rules={[{ required: true, message: 'Please input your address!' }]}
                                        className="w-[10rem ]"
                                    >
                                        <Input className="w-full" />
                                    </Form.Item>

                                    <Form.Item<FieldType>
                                        label="Payment"
                                        name="payment"
                                        rules={[
                                            { required: true, message: 'Please input your payment!' }
                                        ]}
                                    >
                                        <Radio.Group className="flex flex-col gap-2">
                                            <Radio value="cod">COD</Radio>
                                            <Radio value="paypal">Paypal</Radio>
                                        </Radio.Group>
                                    </Form.Item>

                                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                        <Button htmlType="submit" type="primary" onClick={handleOpenModal}>
                                            Thanh toán
                                        </Button>
                                        <Modal
                                            title={`Xác nhận thanh toán ${count} sản phẩm`}
                                            centered
                                            open={modal2Open}
                                            onOk={() => {
                                                setModal2Open(false)
                                                handleCreateOrder(user);
                                            }}
                                            onCancel={() => setModal2Open(false)}
                                            okText="Xác nhận"
                                            cancelText="Hủy bỏ"
                                        >
                                            {
                                                cartData?.data?.products?.map((item: any) => (
                                                    <div key={item?.id} className="flex justify-between my-2 py-2">
                                                        <h3>{item?.name}</h3>
                                                        <p>{item.quantity} sản phẩm</p>
                                                        <img className="size-12 rounded-sm" src={item?.image} alt="" />
                                                    </div>
                                                ))
                                            }
                                            <hr />
                                            <div className="flex justify-end my-2">
                                                <p><strong>Tổng tiền</strong>: {cartData?.data?.totalPrice}</p>
                                            </div>
                                            <hr />
                                            <div className="my-2">
                                                <table className=" w-[100%] flex-col items-start justify-start flex-wrap">
                                                    <tr>
                                                        <td className="font-semibold">Tên người nhận</td>
                                                        <td>{user.name?.toLocaleUpperCase()}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-semibold">Số điện thoại</td>
                                                        <td>{user.phone}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-semibold">Địa chỉ người nhận</td>
                                                        <td className="w-[60%]">{user.address?.toLocaleUpperCase()}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-semibold">Phương thức thanh toán</td>
                                                        <td>{user.payment?.toLocaleUpperCase()}</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </Modal>
                                    </Form.Item>
                                </Form>
                            </div>

                            <div className="col-span-4">
                                {cartData?.data?.products?.map((item: any) => (
                                    <Space key={item.productId} className="flex justify-between w-[20rem] border-b py-4">
                                        <div>
                                            <h4>Tên: <strong>{item.name}</strong></h4>
                                            <p>Giá: {item.price}</p>
                                            <p>Số lượng: {item.quantity}</p>
                                        </div>
                                        <div>
                                            <img className="border rounded w-12 h-12 p-1" src={item.image} alt="" />
                                        </div>
                                    </Space>
                                ))}
                                <p>
                                    <strong className="mr-2">Tổng tiền:</strong>
                                    {cartData?.data?.totalPrice}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default OrderPage;
