import type { TableColumnsType, TableProps } from 'antd';
import { Product, ProductResponse } from "@/common/types/product"
import { removeProduct } from "@/services/product"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button, Flex, Image, Popconfirm, Space, Table } from 'antd';

type TableRowSelection<T> = TableProps<T>['rowSelection'];
type Props = {
    data: ProductResponse[]
}
const isValidUrl = (string: string) => {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}
const TableDefautl = ({ data }: Props) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const dataSource = data?.map((product) => {
        return {
            ...product,
            key: product._id
        }
    })
    const rowSelection: TableRowSelection<ProductResponse> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: async (id: string) => {
            return await removeProduct(id)
        },
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ["PRODUCTS"] })
        }
    })
    const columns: TableColumnsType<ProductResponse> = [
        { title: 'Name', dataIndex: 'name', key: 'name', className: 'w-[10%]' },
        {
            title: 'Image', dataIndex: 'image', key: 'image', render(text: string) {
                return (
                    isValidUrl(text) ? (
                        <Image
                            width={70}
                            height={70}
                            src={text}
                            alt="image"
                            className='object-cover'
                        />
                    ) : (
                        <img className='mx-auto' width={100} height={100} src="https://dietmoindp.com/admin/assets/images/404.png" alt="" />
                    )

                )
            }
        },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Category', dataIndex: ['category', 'name'], key: 'category' },
        { title: 'Description', dataIndex: 'description', key: 'description', },
        {
            key: 'actions', className: 'w-[10%]', render: (_: any, p: ProductResponse) => {
                const isSelected = selectedRowKeys.includes(p._id!);
                return (
                    <>
                        <Space className='flex justify-center'>
                            <Link to={`/admin/products/${p._id}/edit`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 text-green-600 mx-auto">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </Link>
                            {
                                isSelected && (
                                    <Popconfirm
                                        title="Xóa sản phẩm"
                                        description="Bạn có chắc muốn xóa sản phẩm này?"
                                        onConfirm={() => mutate(p._id!)}
                                        okText="Có"
                                        cancelText="Không"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 text-red-600 hover:cursor-pointer">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </Popconfirm>
                                )}
                        </Space>
                    </>
                )
            }
        },

    ];
    return (
        <>
            <Flex gap="middle" vertical>
                <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
            </Flex>
        </>
    )
}

export default TableDefautl