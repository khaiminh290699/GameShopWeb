import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { Modal } from "antd";
import ProductCreate from "./components/page/admin/product-create";
import ProductDetail from "./components/page/product/product-detail";

import "antd/dist/antd.css";
import "./styles/index.css"
import Cart from "./components/page/cart/cart";
import Home from "./components/page/home/home";
import ListProduct from "./components/page/admin/list-product";
import ListOrder from "./components/page/order/list-order";
import OrderDetail from "./components/page/order/order-detail";
import SignUp from "./components/page/auth/sign-up";
import SignIn from "./components/page/auth/sign-in";
import ForgetPassword from "./components/page/auth/forget-password";
import PageHeader from "./components/core/menu/page-header";
import useApp from "./components/page/app/hook/app";
import PageSidebar from "./components/core/menu/page-sidebar";
import Layout, { Content } from "antd/lib/layout/layout";
import CategoryCreate from "./components/page/admin/category-create";
import ListCategory from "./components/page/admin/list-category";
import UpdateProfile from "./components/page/auth/update-profile";
import Statistic from "./components/page/statistic/statistic"
import CouponCreate from "./components/page/admin/coupon-create";
import ListCoupon from "./components/page/admin/list-coupon";
import Coupon from "./components/page/coupon/coupon";
import ImportGoods from "./components/page/admin/import-goods";
import ImportDetail from "./components/page/admin/import-detail";

function App() {
  const { user, modal, onOk, setModal, setUser } = useApp();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Modal title="Info" visible={modal ? true : false} onOk={onOk}>
        {modal}
      </Modal>
      <PageSidebar user={user}></PageSidebar>
      <Layout className="site-layout">
        <PageHeader user={user} setUser={setUser}></PageHeader>
        <Content style={{ margin: '0 16px' }}>
          <Switch>
            <Route path="/sign-up">
              <SignUp></SignUp>
            </Route>
            <Route path="/sign-in">
              <SignIn></SignIn>
            </Route>
            <Route path="/forget-password">
              <ForgetPassword setModal={setModal}></ForgetPassword>
            </Route>
            <Route path="/admin" render={() => {
              const user = localStorage.getItem("user");
              const token = localStorage.getItem("token");
              if (!user || !token || JSON.parse(user).permission < 255) {
                return <Redirect to="/not-permission" ></Redirect>
              }
              return (
                <Switch>
                   <Route path="/admin/category/update/:id">
                    <CategoryCreate></CategoryCreate>
                  </Route>
                  <Route path="/admin/category/create">
                    <CategoryCreate></CategoryCreate>
                  </Route>
                  <Route path="/admin/category">
                    <ListCategory setModal={setModal} ></ListCategory>
                  </Route>
                  <Route path="/admin/order">
                    <ListOrder pageAdmin={true} setModal={setModal}></ListOrder>
                  </Route>
                  <Route path="/admin/product/update/:id">
                    <ProductCreate setModal={setModal}></ProductCreate>
                  </Route>
                  <Route path="/admin/product/create">
                    <ProductCreate setModal={setModal}></ProductCreate>
                  </Route>
                  <Route path="/admin/product">
                    <ListProduct setModal={setModal}></ListProduct>
                  </Route>
                  <Route path="/admin/coupon/update/:id">
                    <CouponCreate setModal={setModal}></CouponCreate>
                  </Route>
                  <Route path="/admin/coupon/create">
                    <CouponCreate setModal={setModal}></CouponCreate>
                  </Route>
                  <Route path="/admin/coupon">
                    <ListCoupon setModal={setModal}></ListCoupon>
                  </Route>
                  <Route path="/admin/statistic">
                    <Statistic></Statistic>
                  </Route>
                  <Route path="/admin/import/:id">
                    <ImportDetail></ImportDetail>
                  </Route>
                  <Route path="/admin/import">
                    <ImportGoods setModal={setModal}></ImportGoods>
                  </Route>
                </Switch>
              )
            }} ></Route>
            <Route path="/order" render={() => {
              const token = localStorage.getItem("token");
              if (!token) {
                return <Redirect to="/not-permission" ></Redirect>
              }
              return (
                <Switch>
                  <Route path="/order/:id">
                    <OrderDetail pageAdmin={true} setModal={setModal}></OrderDetail>
                  </Route>
                  <Route path="/order">
                    <ListOrder pageAdmin={false} setModal={setModal}></ListOrder>
                  </Route>
                </Switch>
              )
            }}></Route>
            <Route path="/cart">
              <Cart setModal={setModal}></Cart>
            </Route>
            <Route path="/coupon/:id">
              <Coupon setModal={setModal} ></Coupon>
            </Route>
            <Route path="/product/:id">
              <ProductDetail setModal={setModal} ></ProductDetail>
            </Route>
            <Route path="/category/:id">
              <Home></Home>
            </Route>
            <Route path="/update-profile">
              <UpdateProfile></UpdateProfile>
            </Route>
            <Route path="/">
              <Home setModal={setModal}></Home>
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App;
