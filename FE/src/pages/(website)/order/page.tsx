import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { Button, Checkbox, Form, Input, InputNumber, Space } from "antd";
import useCart from "@/common/hooks/useCart";
type FieldType = {
    name?: string;
    phone?: number;
    address?: string
    email?: string;
    payment?: string
};
const OrderPage = () => {
    const { cartData } = useCart()
    console.log(cartData);
    const data = JSON.parse(localStorage.getItem('user') || '{}')
    const [form] = Form.useForm()
    const { name, phone, address, email } = data;


    return (
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
                        initialValues={{ name, phone, address }}
                        // onFinish={onFinish}
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


                        {/* <Form.Item<FieldType>
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'The input is not valid E-mail!' }
                            ]}
                        >
                            <Input />
                        </Form.Item> */}

                        <Form.Item<FieldType>
                            label="Payment"
                            name="payment"
                            valuePropName="checked"
                            rules={[
                                { required: true, message: 'Please input your payment!' },
                            ]}
                        // wrapperCol={{ offset: 8, span: 16 }}
                        >
                            <Checkbox.Group className="flex flex-col gap-2">
                                <Checkbox value="remember">Remember me</Checkbox>
                                <Checkbox value="anotherOption">Another option</Checkbox>
                            </Checkbox.Group>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
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
    );
}

export default OrderPage;
