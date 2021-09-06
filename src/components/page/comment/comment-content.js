import { Button, Comment, Tooltip } from "antd";
import React, { createElement, useState } from "react";
import { LikeOutlined, LikeFilled } from '@ant-design/icons';
import baseApi from "../../../ultilities/axios";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";


function CommentContent(props) {
  const { comment, setModal } = props;
  const { id: contact_id } = JSON.parse(localStorage.getItem("user") || "{}");
  let [state, setState] = useState({ comment: { ...comment }, replies: [], total: 0, replying: false, body: null, editing: false, edit_body: null });
  if (!state.comment) {
    return <></>
  }
  return (
    <>
      <Comment
        author={<p><b>{state.comment.Contact.username}</b> đã đăng lúc { moment().diff(moment(state.comment.createdAt), "minutes") < 60 ? `${moment().diff(moment(state.comment.createdAt), "minutes")} phút trước` : moment(state.comment.createdAt).format("DD/MM/YYYY HH:mm")  } {state.comment.edited_at ? `(đã cập nhật)` : ``}</p>}
        content={<p>{state.comment.body}</p>}
        actions={[
          <Tooltip key="comment-basic-like" title="Like">
            <span onClick={() => {
              if (state.comment.Likes) {
                baseApi.post(state.comment.Likes[0] ? "/comment/unlike" : "/comment/like", {
                  comment_id: state.comment.id
                })
                .then(({ status, data }) => {
                  if (status === 200) {
                    if (state.comment.Likes[0]) {
                      state.comment.Likes[0] = false;
                    } else {
                      state.comment.Likes[0] = true;
                    }
                    state.comment = { ...state.comment, ...data }
                    state = { ... state};
                    setState(state)
                  }
                })
              }
            }}>
              {createElement(state.comment.Likes && state.comment.Likes[0] ? LikeFilled : LikeOutlined)}
              <span className="comment-action">{state.comment.amount_like}</span>
            </span>
          </Tooltip>,
          <span key="comment-basic-reply-to"
            onClick={() => {
              const { id: contact_id } = JSON.parse(localStorage.getItem("user") || "{}");
              baseApi.post("/comment/list-reply", {
                contact_id,
                comment_id: state.comment.id
              }).then(({ data }) => {
                const { rows: replies, count: total } = data;
                state = { ...state, replies, total };
                setState(state)
              })
            }}
          >Xem {state.comment.amount_reply} phản hồi</span>,
          <span key="comment-basic-reply-to"
            onClick={() => {
              state = { ...state, replying: true };
              setState(state)
            }}
          >Phản hồi</span>,
          contact_id === state.comment.contact_id ?
            <span key="comment-basic-reply-to"
            onClick={() => {
              state = { ...state, editing: true };
              setState(state);
            }}
            >Sửa</span>
            :
            <></>,
          contact_id === state.comment.contact_id ?
            <span key="comment-basic-reply-to"
            onClick={() => {
              baseApi.post("/comment/delete", {
                comment_id: state.comment.id
              })
              .then(({ status }) => {
                if (status === 200) {
                  setState({ comment: null, replies: [], total: 0, replying: false, body: null, editing: false, edit_body: null });
                }
              })
            }}
            >Xoá</span>
            :
            <></>
          
        ]}
      ></Comment>
      {
        state.editing ?
        <>
          <TextArea placeholder="Hãy đăng nhập và sửa nội dung bình luận..." autoSize={{ minRows: 3, maxRows: 5 }}
            onChange={(event) => {
              state = { ...state, edit_body: event.target.value };
              setState(state);
            }}
          />
          <div>
            <Button style={{marginTop: 5}} type="primary"
              onClick={() => {
                baseApi.put("/comment/update", {
                  body: state.edit_body,
                  comment_id: state.comment.id,
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
                  state.comment.edited_at = data.edited_at;
                  state.comment.body = state.edit_body;
                  state = { ...state, edit_body: null, editing: false };
                  setState(state);
                  return;
                })
              }}
            >
              Phản hồi
            </Button>
          </div>
        </>
        :
        <></>
      }
      {
        state.replying ?
        <>
          <TextArea placeholder="Hãy đăng nhập và để lại phản hồi..." autoSize={{ minRows: 3, maxRows: 5 }}
            onChange={(event) => {
              state = { ...state, body: event.target.value };
              setState(state);
            }}
          />
          <div>
            <Button style={{marginTop: 5}} type="primary"
              onClick={() => {
                const token = localStorage.getItem("token");
                if (!token) {
                  setModal(<p>Hãy đăng nhập để có thể bình luận</p>);
                  return;
                }
                if (!state.body) {
                  setModal(<p>Chưa nhập nội dung phản hồi</p>);
                  return;
                }
                baseApi.post("/comment/create", {
                  body: state.body,
                  product_id: state.comment.product_id,
                  parent_id: state.comment.id
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
                  const { comment: reply, contact } = data;
                  reply.Contact = contact;
                  reply.Likes = [];
                  state.comment.amount_reply += 1;
                  const replies = [reply, ...state.replies]
                  state = { ...state, replies };
                  setState(state);
                  return;
                })
              }}
            >
              Phản hồi
            </Button>
          </div>
        </>
        :
        <></>
      }
      <div style={{ marginLeft: 50 }}>
        {
          state.replies.map((reply) => {
            return (
              <Comment key={reply.id}
                author={<p><b>{reply.Contact.username}</b> đã phản hồi { moment().diff(moment(reply.createdAt), "minutes") < 60 ? `${moment().diff(moment(reply.createdAt), "minutes")} phút trước` : moment(reply.createdAt).format("DD/MM/YYYY HH:mm")  }</p>}
                content={<p>{reply.body}</p>}
              ></Comment>
            )
          })
        }
      </div>
    </>
  )
}

export default CommentContent;