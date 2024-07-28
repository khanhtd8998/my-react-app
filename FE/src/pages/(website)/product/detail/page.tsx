import { useProductQuery } from "@/common/hooks/useProductQuery";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const DetailProduct = () => {
    const { id } = useParams();
    const { data: product, isLoading } = useProductQuery({ id: id! });
    const { data: relatedProduct } = useQuery({
        queryKey: ["RELATED_PRODUCT"],
        queryFn: async () => {
            const { data } = await axios.get(
                `http://localhost:8080/api/v1/products/${product.category}/related/${product._id}`,
            );
            return data;
        },
    });

    if (isLoading) return <p>Loading...</p>;
    return (
        <div>
            {product?.name}

            <hr />
            <h3>Related Products</h3>
            {relatedProduct?.map((item: any) => (
                <div>
                    <Link to={`/products/${item._id}`}>{item.name}</Link>
                </div>
            ))}
        </div>
    );
};

export default DetailProduct;
