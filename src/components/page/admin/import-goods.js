import { Button, Card, Image, Pagination, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import convertMoney from "../../../ultilities/moneyConvert";
import useProduct from "../home/hook/useProduct";
import useListProduct from "./hook/list-product";

import moment from "moment"
import baseApi from "../../../ultilities/axios";
import connectSocket from "../../../ultilities/socket";


let list = [];
const API_URL = process.env.API_URL || "http://localhost:8080"

function ImportGoods(props) {

  const { setModal } = props;

  let [state, setState] = useState({
    importing: false,
    filename: null,
    formData: null,
    proccess: null,
    socket: null,
    limit: 10,
    page: 0,
    list: [],
    total: 0
  })

  const ref = {
    file: useRef()
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    const data = new FormData();
    data.append("import", file);
    state = {
      ...state, filename: file.name, formData: data
    }
    setState(state)
  }

  const onImportClick = () => {
    baseApi.post("product/import", state.formData).then(({ status, message, data: proccess }) => {
      if (status != 200) {
        setModal(<p>{message}</p>);
        return;
      }
      list.unshift(proccess);
      list = [...list]
      state = {
        ...state, proccess, importing: true, list
      }
      setState(state)
    })
  }

  useEffect(() => {
    baseApi.post("product/current-import").then(({ data }) => {
      if (data) {
        state = {
          ...state, proccess: data, importing: true
        }
        setState(state);
      }
    })
  }, [])

  useEffect(() => {
    baseApi.post("product/list-import",{
      limit: state.limit,
      page: state.page
    }).then(({ data: { rows, count } }) => {
      list = rows;
      state = {
        ...state, list, total: count 
      }
      console.log(state)
      setState(state);
    })
  }, [])

  useEffect(async() => {
    if (state.proccess) {
      let socket = state.socket;
      if (!socket) {
        socket = await connectSocket("socket", "token");
        state = {
          ...state, socket, list
        }
        setState(state);
      }
      socket.on(`import_goods_${state.proccess.id}`, ({ import_id, imported, status, error, total_price }) => {
        const proccess = {
          ...state.proccess,
          amount_imported: imported,
          status
        }
        state = {
          ...state, importing: status === "waiting", proccess, list
        }
        setState(state)
        if (status != "waiting") {
          if (error && error.length) {
            setModal(<p>
              Nhập hàng thành công, nhưng những sản phẩm sau đây không tồn tại, yêu cầu kiểm tra lại:
              {
                error.map((e) => {
                  return <div>
                    + { e }
                  </div>
                })
              }
            </p>)
          } else {
            setModal(<p>Nhập hàng thành công</p>)
          }
          const index = list.findIndex((item) => item.id === import_id);
          if (index != -1) {
            const process = list[index];
            list[index] = {
              ...process,
              amount_imported: imported,
              total_price,
              status
            }
            list = [...list]
            state = {
              ...state, list
            }
            setState(state)
          }
        } else {
          const index = list.findIndex((item) => item.id === import_id);
          if (index != -1) {
            const process = list[index];
            list[index] = {
              ...process,
              amount_imported: imported,
            }
            list = [...list]
            state = {
              ...state, list
            }
            setState(state)
          }
        }
      })
    }
  }, [state.proccess])


  const columns = [
    { title: "Mã nhập kho", dataIndex: "id", key: "id", render: (value, item) => <b><Link to={`/admin/import/${item.id}`} >{value}</Link></b> },
    { title: "Người nhập", dataIndex: "Contact", key: "Contact", render: (value) => <b>{value.username}</b> },
    { title: "Số lượng nhập", dataIndex: "amount_product", key: "amount_product", render: (value) => <p>{value}</p> },
    { title: "Số lượng nhập hợp lệ", dataIndex: "amount_imported", key: "amount_imported", render: (value) => <p>{value}</p> },
    { title: "Tổng tiền", dataIndex: "total_price", key: "total_price", render: (value) => <p>{value ? convertMoney(value) : "Đang tinh toán..."}</p> },
    { title: "Trạng thái", dataIndex: "status", key: "stock", render: (value) => <p>{value}</p> },
    { title: "Ngày tạo", dataIndex: "createdAt", key: "createdAt", render: (value) => <p>{moment(value).format("DD/MM/YYYY HH:mm")}</p> },
  ];

  return (
    <Card title="Quản lý nhập kho">
      <input type="file" accept=".csv" hidden ref={ref.file} onChange={onFileChange} />
      {
        state.importing ?
        (
          <>
            <Button disabled>Đang nhập hàng {state.proccess.amount_imported || 0} / {state.proccess.amount_product}</Button>
          </>
        )
        :
        (
          !state.filename && !state.formData ? (
            <Button style={{ background: "yellow", marginRight: 5 }} onClick={() => {
              if (ref.file) {
                return ref.file.current.click();
              }
            }} >
              <b>Chọn File CSV để nhập kho</b>
            </Button>
          )
          :
          (
            <>
              <Button style={{ background: "yellow", marginRight: 5 }} onClick={onImportClick}>
                <b>Nhập hàng từ</b>
              </Button>
              { state.filename }
            </>
          )
        )
        
      }
      <Table columns={columns} dataSource={state.list} pagination={false} ></Table>
      <div style={{textAlign: "center"}}>
        <Pagination current={state.page + 1} total={state.total} pageSize={state.limit} onChange={() => {
          state = {
            ...state, page: state.page + 1
          }
          setState(state)
        }} />
      </div>
    </Card>
  )
}



export default ImportGoods;