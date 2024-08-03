import LayoutAdmin from "@/pages/(dashboard)/layout";
import AddProductPage from "@/pages/(dashboard)/product/add/page";
import EditProductPage from "@/pages/(dashboard)/product/edit/page";
import ProductManagement from "@/pages/(dashboard)/product/page";
import Signin from "@/pages/(website)/(auth)/Signin";
import Signup from "@/pages/(website)/(auth)/Signup";
import NotFound from "@/pages/(website)/404/page";
import ServerErrorPage from "@/pages/(website)/500/page";
import AboutPage from "@/pages/(website)/about/page";
import CartPage from "@/pages/(website)/cart/page";
import ContactPage from "@/pages/(website)/contact/page";
import DoneOrderPage from "@/pages/(website)/done/page";
import HomePage from "@/pages/(website)/home/page";
import LayoutWebsite from "@/pages/(website)/layout";
import OrderHistory from "@/pages/(website)/order/_components/OrderHistory";
import OrderPage from "@/pages/(website)/order/page";
import CategoryDetail from "@/pages/(website)/product/category/detail/page";
import DetailProduct from "@/pages/(website)/product/detail/page";
import ShopPage from "@/pages/(website)/product/page";
import { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const location = useLocation();
    const topRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);

    return <div ref={topRef} />;
};
const Router = () => {
    return (
        <>
            <ScrollToTop />
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
                    <Route path="order/history" element={<OrderHistory />} />
                </Route>
                <Route path="order-done" element={<DoneOrderPage />} />
                <Route path="signin" element={<Signin />} />
                <Route path="signup" element={<Signup />} />
                <Route
                    path="admin"
                    element={
                        <LayoutAdmin />
                    }
                >
                    <Route path="products" element={<ProductManagement />} />
                    <Route path="products/add" element={<AddProductPage />} />
                    <Route path="products/:id/edit" element={<EditProductPage />} />
                </Route>
                <Route path="500" element={<ServerErrorPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default Router;
