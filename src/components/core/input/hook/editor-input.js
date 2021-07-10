import { useEffect, useState } from "react";
import {EditorState, ContentState, convertToRaw} from 'draft-js';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';
import draftToHtml from 'draftjs-to-html';

import api from "../api/index"

const API_URL = process.env.API_URL || "http://localhost:8080"

function useEditorInput(props) {
  const {content, setContent} = props
  const [editorState, setEditorState] = useState();

  useEffect(() => {
    setEditorState(
      content ? 
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            DraftPasteProcessor.processHTML(content)
          )
        )
        :
        EditorState.createEmpty())
  }, [])

  const onUploadImage = (file)=>{
    return new Promise((resolve) => {
      api.upload(file)
      .then((res) => {
        const { data: { data: { path } } } = res;
        resolve({ data: { link: `${API_URL}/${path}` } });
      })
    });
  }

  const onEditorStateChange = (editorState) => {
    setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    setEditorState(editorState);
  }

  return {
    editorState,
    onEditorStateChange,
    onUploadImage
  }
}

export default useEditorInput;