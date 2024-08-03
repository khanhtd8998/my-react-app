import { Category } from "@/common/types/category";
import { getAllCategories } from "@/services/category";
import { addProduct } from "@/services/product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Form, Input, InputNumber, message, Select, Space, Typography } from "antd"
import TextArea from "antd/es/input/TextArea";
import { ForwardIcon } from "lucide-react"
import { useState } from "react";
import { Link } from "react-router-dom"

type FieldType = {
    name: string;
    price: number;
    slug: string;
    discount: number;
    countInStock: number;
    category: { _id: string; name: string; };
    image: string,
    description: string
};

const AddProductPage = () => {
    const [isIdSelected, setIsIdSelected] = useState('')
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()
    const { data: categories } = useQuery({
        queryKey: ["CATEGORIES"],
        queryFn: async () => {
            const res = await getAllCategories()
            return res.data
        },
    })
    const handleCheckboxChange = (e: any, id: string) => {
        if (e.target.checked) {
            setIsIdSelected(id)
        }
    };



    const { mutate } = useMutation({
        mutationFn: async (data: FieldType) => {
            const res = await addProduct({ ...data, category: isIdSelected })
            return res
        },
        onSuccess: () => {
            form.resetFields()
            messageApi.open({
                type: "success",
                content: "Đã thêm sản phẩm thành công",
            })
        }
    })

    return (
        <>
            {contextHolder}
            <div className="flex justify-between items-center py-3">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Thêm sản phẩm mới
                    </h2>
                </div>
                <div>
                    <Link
                        to="/admin/products"
                        className="flex items-center"
                    >
                        <Button type="primary">
                            <ForwardIcon />
                            Quay lại
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="w-full">
                <Form
                    form={form}
                    // onValuesChange={handleForm1Change}
                    name="basic"
                    layout="vertical"
                    style={{ width: "100%" }}
                    initialValues={{ remember: true }}
                    onFinish={(formData) => { mutate(formData) }}
                    autoComplete="off">
                    <div className="grid grid-cols-3 gap-3">
                        <div className="grid col-start-1 col-end-3">
                            <div className="grid grid-cols-2 space-x-3">
                                <Form.Item<FieldType>
                                    label="Tên sản phẩm"
                                    name="name"
                                    rules={[{ required: true, message: 'Không để trống thông tin' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item<FieldType>
                                    label="Slug"
                                    name="slug"
                                    rules={[{ required: true, message: 'Không để trống thông tin' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className="grid grid-cols-3">
                                <Form.Item<FieldType>
                                    label="Giá"
                                    name="price"
                                    rules={[{ required: true, message: 'Không để trống thông tin' }]}
                                >
                                    <InputNumber type="number" />
                                </Form.Item>
                                <Form.Item<FieldType>
                                    label="Giảm giá"
                                    name="discount"
                                    rules={[{ required: true, message: 'Không để trống thông tin' }]}
                                >
                                    <InputNumber />
                                </Form.Item>
                                <Form.Item<FieldType>
                                    label="Số lượng"
                                    name="countInStock"
                                    rules={[{ required: true, message: 'Không để trống thông tin' }]}
                                >
                                    <InputNumber type="number" />
                                </Form.Item>
                            </div>
                            <div className="grid grid-cols-1 space-x-2">

                                <Form.Item<FieldType>
                                    label="Ảnh sản phẩm"
                                    name="image"
                                    rules={[{ required: true, message: 'Không để trống thông tin' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </div>
                            {/* <Form.Item<FieldType>
                        label="Danh mục"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: "Bắt buộc chọn",
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Search to Select"
                            optionFilterProp="label"
                            filterSort={(optionA, optionB) =>
                                (optionA?.label?.toString() ?? "")
                                    .toLowerCase()
                                    .localeCompare(
                                        (
                                            optionB?.label?.toString() ?? ""
                                        ).toLowerCase(),
                                    )
                            }
                            options={categories?.map((category: any) => ({
                                value: category._id,
                                label: category.name,
                            }))}
                        />
                    </Form.Item> */}
                            <Form.Item<FieldType>
                                label="Mô tả"
                                name="description"
                                rules={[{ required: true, message: 'Không để trống thông tin' }]}
                            >
                                <TextArea rows={4}></TextArea>
                            </Form.Item>
                        </div>
                        <div className="grid col-start-3 col-end-4">
                            <span className="h-[5px]">
                                <Typography.Title level={5}>Chọn danh mục</Typography.Title>
                                <Form.Item<FieldType> name="category"
                                    className="h-full"

                                >
                                    {
                                        categories?.map((category: Category) => {
                                            return (
                                                <Space key={category._id} className="flex gap-1">
                                                    <Checkbox onChange={(e) => handleCheckboxChange(e, category._id)} value={category._id} >{category?.name}</Checkbox>
                                                </Space>
                                            )
                                        })
                                    }
                                </Form.Item>
                            </span>
                            <span>
                                <Typography.Title level={5}>Album ảnh</Typography.Title>
                            </span>
                            <span>
                                <Typography.Title level={5}>Album ảnh</Typography.Title>
                            </span>
                        </div>
                    </div>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Thực hiện
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </>
    )
}
export default AddProductPage