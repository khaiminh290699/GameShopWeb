import { Button, Card, List, Comment, Tooltip } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { createElement, useEffect, useState } from "react";
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { useParams } from "react-router-dom";
import baseApi from "../../../ultilities/axios";
import CommentContent from "./comment-content";

function Comments(props) {
  const { id } = useParams();
  const { setModal } = props;
  let [state, setState] = useState({
    comments: [],
    body: null,
    total: 0,
    page: 1,
    loading: false
  })
  useEffect(() => {
    const { id: contact_id } = JSON.parse(localStorage.getItem("user") || "{}");
    baseApi.post("/comment/list", {
      limit: 5, page: state.page, contact_id, product_id: id
    })
    .then(({ data }) => {
      const { rows: comments, count: total } = data;

      state = { ...state, comments: [...state.comments,...comments], total, loading: false };
      setState(state);
    })
  }, [state.page])
  return (
    <Card title={
      <div>
        <h5>Bình luận</h5>
        <TextArea placeholder="Hãy đăng nhập và để lại bình luận về sản phẩm này..." autoSize={{ minRows: 3, maxRows: 5 }}
          onChange={(event) => {
            state = { ...state, body: event.target.value };
            setState(state);
          }}
        />
        <div>
          <Button style={{float: "right", marginTop: 5}} type="primary"
            onClick={() => {
              const token = localStorage.getItem("token");
              if (!token) {
                setModal(<p>Hãy đăng nhập để có thể bình luận</p>);
                return;
              }
              if (!state.body) {
                setModal(<p>Chưa nhập nội dung bình luận</p>);
                return;
              }
              baseApi.post("/comment/create", {
                body: state.body,
                product_id: id,
                parent_id: null
              })
              .then(({status, message, error, data}) => {
                if (status != 200) {
                  if (status === 500) {
                    setModal(<p>{error}</p>);
                    return;
                  }
                  setModal(<p>{message}</p>);
                  return;
                }
                const { comment, contact } = data;
                comment.Contact = contact;
                comment.Likes = [];
                const comments = [comment, ...state.comments];
                state = { ...state, comments };
                setState(state);
                return;
              })
            }}
          >Đăng</Button>
        </div>
      </div>
    }>
        <List
          dataSource={state.comments}
          header={`${state.total} bình luận`}
          itemLayout="horizontal"
          loadMore={
            state.total > state.comments.length && !state.loading ? 
            (
              <div
                style={{
                  textAlign: 'center',
                  marginTop: 12,
                  height: 32,
                  lineHeight: '32px',
                }}
              >
                <Button onClick={() => {
                  state = { ...state, loading: true, page: state.page + 1 }
                  setState(state)
                }}>loading more</Button>
              </div>
            )
            :
            (
              <></>
            )
          }
          renderItem={(item, index) => {
            return (
              <CommentContent key={item.id} comment={item} {...props} ></CommentContent>
            )
          }}
        />
    </Card>
  )
}

export default Comments;