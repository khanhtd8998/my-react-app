import { Category } from "@/common/types/category";
import { getAllCategories } from "@/services/category";
import { addProduct, editProduct, getProductById } from "@/services/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Checkbox, Form, Input, message, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ForwardIcon, LoaderIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";

type FieldType = {
    name: string;
    price: number;
    slug: string;
    discount: number;
    countInStock: number;
    category: string;
    image: string,
    description: string
};

const EditProductPage = () => {
    const { id } = useParams()
    const [messageApi, contextHolder] = message.useMessage()
    const { data: categories } = useQuery({
        queryKey: ["CATEGORIES"],
        queryFn: async () => {
            const res = await getAllCategories()
            return res.data
        },
    })
    const queryClient = useQueryClient()
    const { data: product, isLoading } = useQuery({
        queryKey: ["PRODUCT", id],
        queryFn: async () => {
            const res = await getProductById(id!)
            return res.data
        },
    })
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: FieldType) => {
            const res = await editProduct(id!, data)
            return res
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Đã thêm sản phẩm thành công",
            })
            queryClient.invalidateQueries({ queryKey: ["PRODUCT"] })
        }
    })
    if (isLoading) return <div>Loading...</div>
    return (
        <>
            {contextHolder}
            <div className="flex justify-between items-center py-3">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Cập nhật sản phẩm
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
            <div className="grid grid-cols-[auto,400px]">
                <Form
                    name="basic"
                    layout="vertical"
                    disabled={isPending}
                    // labelCol={{ span: 16 }}
                    // wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 800 }}
                    initialValues={{ ...product }}
                    onFinish={(formData) => { mutate(formData) }}
                    autoComplete="off">
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
                    <div className="grid grid-cols-2 space-x-3">
                        <Form.Item<FieldType>
                            label="Giá"
                            name="price"
                            rules={[{ required: true, message: 'Không để trống thông tin' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Giảm giá"
                            name="discount"
                            rules={[{ required: true, message: 'Không để trống thông tin' }]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="grid grid-cols-2 space-x-2">
                        <Form.Item<FieldType>
                            label="Số lương"
                            name="countInStock"
                            rules={[{ required: true, message: 'Không để trống thông tin' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Ảnh sản phẩm"
                            name="image"
                            rules={[{ required: true, message: 'Không để trống thông tin' }]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <Form.Item<FieldType>
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
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Mô tả"
                        name="description"
                        rules={[{ required: true, message: 'Không để trống thông tin' }]}
                    >
                        <TextArea rows={4}></TextArea>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {isPending && <LoaderIcon className="animate-spin" />}
                            Thực hiện
                        </Button>
                    </Form.Item>
                </Form>
                <div className="py-1">
                    <div className="flex flex-col">
                        <Typography.Title level={5}>Chọn danh mục</Typography.Title>
                        <Form className="grid grid-cols-3 gap-y-0">
                            {
                                categories?.map((category: Category) => {
                                    return (

                                        <Form.Item<FieldType> name="category" key={category._id}>
                                            <Checkbox key={category._id}>{category?.name}</Checkbox>
                                        </Form.Item>
                                    )
                                })
                            }
                        </Form>
                    </div>
                    <div className="flex flex-col">
                        <Typography.Title level={5}>Album ảnh</Typography.Title>

                    </div>
                </div>
            </div>
        </>
    )
}
export default EditProductPage