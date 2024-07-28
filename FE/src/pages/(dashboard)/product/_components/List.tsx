import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllProducts } from "@/services/product";
import { useQuery } from "@tanstack/react-query";
import TableDefautl from "./TableDefautl";
import { Button, message } from "antd";

const ProductList = () => {
    const [messageApi, contentHolder] = message.useMessage()
    const { data, isLoading } = useQuery({
        queryKey: ["PRODUCTS"],
        queryFn: async () => {
            try {
                const res = await getAllProducts()
                if (res.status === 200) {
                    return res.data
                }
            } catch (error: any) {
                messageApi.open({
                    type: "error",
                    content: "Lỗi " + error,
                })
            }
        },
    })


    return (
        <>
            {contentHolder}
            <div className="flex justify-between items-center py-3">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Quản lý sản phẩm
                    </h2>
                </div>
                <div>
                    <Link
                        to="/admin/products/add"
                    >
                        <Button type="primary">
                            <Plus />
                            Thêm sản phẩm
                        </Button>
                    </Link>
                </div>
            </div>
            <hr />
            <div className="my-5">
                <div className="w-full">
                    <div className="flex items-center py-4">
                    </div>
                    <div className="rounded-md border">
                        {isLoading ? (
                            <>
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th>
                                                <Skeleton className="w-full h-[25px] rounded-full" />
                                            </th>
                                            <th>
                                                <Skeleton className="w-full h-[25px] rounded-full" />
                                            </th>
                                            <th>
                                                <Skeleton className="w-full h-[25px] rounded-full" />
                                            </th>
                                            <th>
                                                <Skeleton className="w-full h-[25px] rounded-full" />
                                            </th>
                                            <th>
                                                <Skeleton className="w-full h-[25px] rounded-full" />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Skeleton className="w-full h-[25px] rounded-full" />
                                            </td>
                                            <td>
                                                <Skeleton className="w-full h-[25px] rounded-full" />
                                            </td>
                                            <td>
                                                <Skeleton className="w-full h-[25px] rounded-full" />
                                            </td>
                                            <td>
                                                <Skeleton className="w-full h-[25px] rounded-full" />
                                            </td>
                                            <td>
                                                <Skeleton className="w-full h-[25px] rounded-full" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <TableDefautl data={data} ></TableDefautl>
                        )}
                    </div>
                    <div className="flex items-center justify-end space-x-2 py-4">
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductList;
