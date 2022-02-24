import {ReactElement, useEffect, useRef, useState} from 'react';
import './Editor.scss';
import Controller from './Controller/Controller';

/**
 * types
 */
export enum Heading {
  paragraph = '<p>',
  h1 = '<h1>',
  h2 = '<h2>',
  h3 = '<h3>'
}

export enum AlignOrder {
  left = 'justifyLeft',
  center = 'justifyCenter',
  right = 'justifyRight'
}

export enum ListType {
  none = 'none',
  rounded = 'insertUnorderedList',
  numbered = 'insertOrderedList',
}

export enum EditorConfigType {
  heading,
  fontColor,
  fontEffect,
  align,
  list,
  imageUpload
}

export interface EditorState {
  heading: Heading;
  isBold: boolean;
  isItalic: boolean;
  fontColor: string;
  align: AlignOrder;
  listing: ListType;
}

const defaultEditorState = {
  heading: Heading.paragraph,
  isBold: false,
  isItalic: false,
  fontColor: '#000000',
  align: AlignOrder.left,
  listing: ListType.none
}

const Editor = (): ReactElement => {

  // useEffect(() => {
  //   // todo 선택한 곳에 따라 controller 보여주는 정보 다르게 하기
  //   console.log(contentRef);
  //   contentRef.current?.addEventListener('click', (e) => {
  //     console.log(window.getSelection());
  //     console.log(window.getSelection()?.anchorNode?.childNodes);
  //   })
  // });


  const [editorState, setEditorState] = useState<EditorState>(defaultEditorState);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const applyEditorCommand = (command: string, value?: string): void => {
    if (value) document.execCommand(command, false, value);
    else document.execCommand(command);
  }
  const focusEditor = (): void => {
    contentRef.current?.focus();
  }

  const updateEditorState = (configType: EditorConfigType, value: any): void => {
    console.log(configType, value);
    switch (configType) {
      case EditorConfigType.heading:
        updateHeading(value);
        break;
      case EditorConfigType.fontEffect:
        updateFontEffect(value);
        break;
      case EditorConfigType.fontColor:
        updateFontColor(value);
        break;
      case EditorConfigType.align:
        updateAlign(value);
        break;
      case EditorConfigType.list:
        updateListing(value);
        break;
      case EditorConfigType.imageUpload:
        uploadImages(value);
    }
    focusEditor();
  }

  const updateHeading = (heading: Heading): void => {
    setEditorState({...editorState, heading});
    applyEditorCommand('formatBlock', heading);
  }
  const updateFontColor = (color: string): void => {
    setEditorState({...editorState, fontColor: color});
    applyEditorCommand('foreColor', color);
  }
  const updateFontEffect = (fontEffect: string): void => {
    if (fontEffect === 'bold') setEditorState({...editorState, isBold: true});
    else if (fontEffect === 'italic') setEditorState({...editorState, isItalic: true});
    applyEditorCommand(fontEffect);
  }
  const updateAlign = (alignOrder: AlignOrder): void => {
    if (alignOrder === AlignOrder.left) setEditorState({...editorState, align: AlignOrder.left});
    else if (alignOrder === AlignOrder.center) setEditorState({...editorState, align: AlignOrder.center});
    else if (alignOrder === AlignOrder.right) setEditorState({...editorState, align: AlignOrder.right});
    applyEditorCommand(alignOrder);
  }
  const uploadImages = (imageUrls: Array<string>): void => {
    focusEditor();
    console.log(imageUrls);
    for (const imageUrl of imageUrls) {
      const imgElement = '<img src = "http://localhost:5000/' + imageUrl + '"/>'
      applyEditorCommand('insertHTML', imgElement);
    }
  }

  const updateListing = (listType: ListType): void => {
    setEditorState({...editorState, listing: listType});
    applyEditorCommand(listType);
  }

  return (
    <div className='EditorWrapper'>
      <Controller editorState={editorState} onChangeConfig={updateEditorState}/>
      <div className='textArea' contentEditable ref={contentRef}>
      </div>
    </div>
  )
}

export default Editor;