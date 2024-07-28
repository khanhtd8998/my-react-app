import LayoutAdmin from "@/pages/(dashboard)/layout";
import FormProduct from "@/pages/(dashboard)/product/_components/Form";
import ProductManagement from "@/pages/(dashboard)/product/page";
import Signin from "@/pages/(website)/(auth)/Signin";
import NotFound from "@/pages/(website)/404/page";
import AboutPage from "@/pages/(website)/about/page";
import CartPage from "@/pages/(website)/cart/page";
import ContactPage from "@/pages/(website)/contact/page";
import HomePage from "@/pages/(website)/home/page";
import LayoutWebsite from "@/pages/(website)/layout";
import OrderPage from "@/pages/(website)/order/page";
import CategoryDetail from "@/pages/(website)/product/category/detail/page";
import DetailProduct from "@/pages/(website)/product/detail/page";
import ShopPage from "@/pages/(website)/product/page";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import FormDefault from "@/pages/(dashboard)/product/_components/FormDefault";
import AddProductPage from "@/pages/(dashboard)/product/add/page";
import EditProductPage from "@/pages/(dashboard)/product/edit/page";
import Signup from "@/pages/(website)/(auth)/Signup";

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LayoutWebsite />}>
                    <Route index element={<HomePage />} />
                    <Route path="shop" element={<ShopPage />} />
                    <Route path="products/:id" element={<DetailProduct />} />
                    <Route path="categories/:id" element={<CategoryDetail />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="order" element={<OrderPage />} />
                </Route>
                <Route path="signin" element={<Signin />} />
                <Route path="signup" element={<Signup />} />
                <Route
                    path="admin"
                    element={
                        <LayoutAdmin />
                    }
                >
                    <Route path="products" element={<ProductManagement />} />
                    {/* <Route path="products/add" element={<FormProduct />} /> */}
                    {/* <Route path="products/:id/edit" element={<FormDefault />} /> */}
                    <Route path="products/add" element={<AddProductPage />} />
                    <Route path="products/:id/edit" element={<EditProductPage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default Router;
