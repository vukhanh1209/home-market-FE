import { Fragment } from "react"
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import HomePage from "../../container/HomePage";
import SearchPage from "../../container/SearchPage";
import CartPage from "../../container/CartPage";
import PlaceOrderPage from "../../container/PlaceOrderPage";

const MainLayout = () => {
    return (
        <Fragment>
            <Header/>
            {/* <HomePage/> */}
            {/* <SearchPage/> */}
            {/* <CartPage/> */}
            <PlaceOrderPage/>
            <Footer/>
        </Fragment>
    )
}

export default MainLayout;