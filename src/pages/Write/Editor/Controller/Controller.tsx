import {ReactElement, useEffect, useRef, useState} from 'react';
import Bold from '../../../../resource/images/bold.png';
import Italic from '../../../../resource/images/italic.png';
import LeftAlign from '../../../../resource/images/left-align.png';
import CenterAlign from '../../../../resource/images/center-align.png';
import RightAlign from '../../../../resource/images/right-align.png';
import {ReactComponent as NumberedList} from '../../../../resource/images/numberedlist.svg';
import {ReactComponent as RoundedList} from '../../../../resource/images/roundedlist.svg';
import './Controller.scss';
import {AlignOrder, EditorConfigType, EditorState, Heading, ListType} from '../Editor';
import axios from 'axios';
import {NotificationPopupType} from '../../../../components/Popup/NotificationPopup';
import {PopupUtil} from '../../../../shared/hoc/PopupUtil';

interface ControllerProps {
  editorState: EditorState;
  onChangeConfig: (configType: EditorConfigType, value: any) => void;
}

const Controller = (props: ControllerProps): ReactElement => {

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getImagePathAfterUpload = async (fileList: FileList): Promise<Array<string>> => {
      const formData = new FormData();
      for (const file of fileList) formData.append('photo', file);
      return axios.post(process.env.REACT_APP_DB_HOST + '/api/file/upload/images', formData,
        {headers: {'Content-Type': 'multipart/form-data'}})
      .then(res => {
        if (res.data.success) return res.data.filePaths;
        else PopupUtil.showNotificationPopup(NotificationPopupType.API_FAILURE, res.data.err);
      })
      .catch((e) => PopupUtil.showNotificationPopup(NotificationPopupType.API_ERROR, e.toString()));
    }

    fileInputRef.current?.addEventListener('change', async () => {
      const fileList = fileInputRef.current?.files;
      if (fileList) {
        const imageUrls = await getImagePathAfterUpload(fileList);
        props.onChangeConfig(EditorConfigType.imageUpload, imageUrls);
      }
    })
  });

  const updateHeading = (e: any): void => {
    props.onChangeConfig(EditorConfigType.heading, e.target.value);
  }
  const updateFontEffect = (fontEffect: string): void => {
    props.onChangeConfig(EditorConfigType.fontEffect, fontEffect);
  }
  const updateAlignOrder = (alignOrder: AlignOrder): void => {
    props.onChangeConfig(EditorConfigType.align, alignOrder);
  }
  const updateListing = (listType: ListType): void => {
    props.onChangeConfig(EditorConfigType.list, listType);
  }

  return (
    <div className='controller_wrapper'>
      <section className='controllerItem' id='headings'>
        <select id='headings' onChange={updateHeading} value={props.editorState.heading}>
          <option value={Heading.paragraph}>paragraph</option>
          <option value={Heading.h1}>heading1</option>
          <option value={Heading.h2}>heading2</option>
          <option value={Heading.h3}>heading3</option>
        </select>
      </section>
      <section className='controllerItem' id='fontEffect'>
        <div className='fontEffectItem'>
          <button className='bold' onClick={(): void => updateFontEffect('bold')}><img src={Bold}/></button>
        </div>
        <div className='fontEffectItem'>
          <button className='italic' onClick={(): void => updateFontEffect('italic')}><img src={Italic}/></button>
        </div>
        <ColorChip color={props.editorState.fontColor} onChange={(color: string): void => {
          props.onChangeConfig(EditorConfigType.fontColor, color);
        }}/>
      </section>
      <section className='controllerItem' id='align'>
        <div className='alignItem'>
          <button className='left' onClick={(): void => updateAlignOrder(AlignOrder.left)}><img src={LeftAlign}/>
          </button>
        </div>
        <div className='alignItem'>
          <button className='center' onClick={(): void => updateAlignOrder(AlignOrder.center)}><img src={CenterAlign}/>
          </button>
        </div>
        <div className='alignItem'>
          <button className='right' onClick={(): void => updateAlignOrder(AlignOrder.right)}><img src={RightAlign}/>
          </button>
        </div>
      </section>
      <section className='controllerItem' id='list'>
        <div className='listItem'>
          <button className='rounded' onClick={(): void => updateListing(ListType.rounded)}><RoundedList/></button>
        </div>
        <div className='listItem'>
          <button className='numbered' onClick={(): void => updateListing(ListType.numbered)}><NumberedList/></button>
        </div>
      </section>
      <section className='controllerItem' id='image'>
        <div className='imageItem'>
          {/*<button><img className='imageUpload' src={ImageUpload}/></button>*/}
          <input type="file" accept='image/*' multiple ref={fileInputRef}/>
        </div>
      </section>
    </div>
  );
}

interface ColorChipProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorChip = ({color, onChange}: ColorChipProps): ReactElement => {
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  const providedColors = [
    'rgb(0, 0, 0)', 'rgb(89, 89, 89)', 'rgb(120, 120, 120)', 'rgb(158, 158, 158)', 'rgb(194, 194, 194)', 'rgb(238, 238, 238)', 'rgb(255, 255, 255)',
    'rgb(254, 204, 190)', 'rgb(254, 235, 182)', 'rgb(221, 236, 202)', 'rgb(184, 230, 225)', 'rgb(184, 233, 255)', 'rgb(204, 210, 240)', 'rgb(224, 191, 230)',
    'rgb(253, 138, 105)', 'rgb(255, 205, 74)', 'rgb(175, 212, 133)', 'rgb(130, 203, 196)', 'rgb(88, 204, 255)', 'rgb(159, 169, 216)', 'rgb(185, 107, 198)',
    'rgb(252, 82, 48)', 'rgb(253, 159, 40)', 'rgb(125, 178, 73)', 'rgb(47, 165, 153)', 'rgb(24, 168, 241)', 'rgb(93, 109, 190)', 'rgb(154, 48, 174)',
    'rgb(217, 73, 37)', 'rgb(253, 111, 34)', 'rgb(86, 138, 53)', 'rgb(18, 136, 122)', 'rgb(17, 135, 207)', 'rgb(58, 76, 168)', 'rgb(105, 36, 152)'
  ]

  const togglePopup = (): void => {
    setOpenPopup(!openPopup);
  }

  const renderProvidedColors = (): any => {

    const onClickProvidedColor = (e: any): void => {
      onChange((e.target as HTMLButtonElement).style.backgroundColor);
      togglePopup();
    }

    return providedColors.map((color) => (
      <button style={{backgroundColor: color}} key={color} onClick={onClickProvidedColor}/>
    ))
  }

  return (
    <div className='colorChipWrapper'>
      <button className='colorChip' style={{backgroundColor: color}} onClick={togglePopup}/>
      {openPopup &&
      <div className='colorMenu'>
        <div className='providedColorWrapper'>
          {renderProvidedColors()}
        </div>
      </div>
      }
    </div>
  );
}

export default Controller;