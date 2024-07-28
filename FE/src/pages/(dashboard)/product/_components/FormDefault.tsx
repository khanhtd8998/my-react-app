/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";


import { Product } from "@/common/types/product";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { getAllCategories } from "@/services/category";
import { addProduct, editProduct, getProductById } from "@/services/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ForwardIcon } from "lucide-react";


const FormDefault = () => {
    const { id } = useParams()
    const nav = useNavigate()
    const form = useForm<Product>({
        defaultValues: {
            name: "",
            price: 0,
            description: "",
            image: "",
            slug: "",
            category: "",
            discount: 0,
            countInStock: 0,
        }
    })

    const queryClient = useQueryClient()
    const { data: categories } = useQuery({
        queryKey: ["CATEGORIES"],
        queryFn: async () => {
            const res = await getAllCategories()
            console.log(res.data);
            return res.data
        }
    })

    const { data } = useQuery({
        queryKey: ["PRODUCT", id],
        queryFn: async () => {
            const res = await getProductById(id!)
            console.log(res);
            form.reset({
                name: res?.data.name,
                price: res?.data.price,
                description: res?.data.description,
                image: res?.data.image,
                slug: res?.data.slug,
                category: res?.data.category,
                discount: res?.data.discount,
                countInStock: res?.data.countInStock
            })
            return res
        },
        enabled: !!id
    })
    const { mutate } = useMutation({
        mutationFn: async (data: Product) => {
            try {
                if (id) {
                    const res = await editProduct(id, data)
                    return res
                }
                const res = await addProduct(data)
                return res
            } catch (error) {
                console.log(error);
            }
        },
        onSuccess: () => {
            form.reset()
            toast({
                title: id
                    ? "Cập nhật sản phẩm thành công"
                    : "Thêm sản phẩm thành công",
                variant: "success"
            })
            queryClient.invalidateQueries({ queryKey: ["PRODUCTS"] })
            nav('/admin/products')
        }
    })
    const onHandleSubmit = (data: Product) => {
        mutate(data);
    }
    return (
        <>
            <div className="max-w-screen mx-auto">
                <div className="space-y-0.5 flex justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            {id ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
                        </h2>
                        <p className="text-muted-foreground">
                            {id ? "Chỉnh sửa thông tin sản phẩm" : "Thêm sản phẩm mới"}
                        </p>
                    </div>
                    <Link
                        to="/admin/products"
                        className="flex items-center"
                    >
                        <Button>
                            <ForwardIcon />
                            Quay lại
                        </Button>
                    </Link>
                </div>
                <div className="shrink-0 bg-border h-[1px] w-full my-6"></div>
                <div className="grid grid-cols-[auto,300px]">
                    <div>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onHandleSubmit)}
                                className="space-y-8"
                            >
                                <div className="grid grid-cols-2 gap-2">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="name">
                                                    Tên sản phẩm
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} id="name" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    ></FormField>
                                    <FormField
                                        control={form.control}
                                        name="slug"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="slug">
                                                    Slug
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} id="slug" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    ></FormField>

                                </div>
                                <div className="grid grid-cols-1 gap-8">
                                    <div className="grid grid-cols-4 gap-2">
                                        <FormField
                                            control={form.control}
                                            name="price"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel htmlFor="price">
                                                        Giá
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field} id="price" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        ></FormField>
                                        <FormField
                                            control={form.control}
                                            name="discount"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel htmlFor="discount">
                                                        Giảm giá
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field} id="discount" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="countInStock"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel htmlFor="countInStock">
                                                        Số lượng
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field} id="countInStock" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="category"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Danh mục</FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={
                                                            field.value
                                                        }
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a category" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {categories && categories?.map(
                                                                (
                                                                    category: any,
                                                                    index: number,
                                                                ) => (
                                                                    <SelectItem
                                                                        key={index}
                                                                        value={
                                                                            category._id
                                                                        }
                                                                    >
                                                                        {category.name}
                                                                    </SelectItem>
                                                                ),
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="description">
                                                    Mô tả
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} id="description" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="image"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="image">
                                                    Hình ảnh
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} id="image" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <Button type="submit">
                                    {id ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
                                </Button>
                            </form>
                        </Form>
                    </div>
                    <div>
                        Sidebar
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormDefault