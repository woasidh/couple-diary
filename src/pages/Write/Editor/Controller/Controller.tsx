import {ReactElement, useState} from 'react';
import Bold from '../../../../resource/images/bold.png';
import Italic from '../../../../resource/images/italic.png';
import LeftAlign from '../../../../resource/images/left-align.png';
import CenterAlign from '../../../../resource/images/center-align.png';
import RightAlign from '../../../../resource/images/right-align.png';
import {ReactComponent as NumberedList} from '../../../../resource/images/numberedlist.svg';
import {ReactComponent as RoundedList} from '../../../../resource/images/roundedlist.svg';
import {ReactComponent as CheckedList} from '../../../../resource/images/checkedList.svg';
import ImageUpload from '../../../../resource/images/image.png';
import './Controller.scss';

/**
 * types
 */

enum Heading {
  paragraph = 'paragraph',
  h1 = 'header1',
  h2 = 'header2',
  h3 = 'header3'
}

const Controller = (): ReactElement => {
  const [heading, setHeading] = useState<Heading>(Heading.paragraph);
  const [fontColor, setFontColor] = useState<string>('#000000');

  const onChangeHeading = (e: any): void => {
    setHeading(e.target.value);
  }


  return (
    <div className='controller_wrapper'>
      <section className='controllerItem' id='headings'>
        <select id='headings' onChange={onChangeHeading}>
          <option value='paragraph'>paragraph</option>
          <option value='heading1'>heading1</option>
          <option value='heading2'>heading2</option>
          <option value='heading3'>heading3</option>
        </select>
      </section>
      <section className='controllerItem' id='fontEffect'>
        <div className='fontEffectItem'>
          <button className='bold'><img src={Bold}/></button>
        </div>
        <div className='fontEffectItem'>
          <button className='italic'><img src={Italic}/></button>
        </div>
        <ColorChip color={fontColor} onChange={(color: string): void => {
          console.log(color);
          setFontColor(color)
        }}/>
      </section>
      <section className='controllerItem' id='align'>
        <div className='alignItem'>
          <button className='left'><img src={LeftAlign}/></button>
        </div>
        <div className='alignItem'>
          <button className='center'><img src={CenterAlign}/></button>
        </div>
        <div className='alignItem'>
          <button className='right'><img src={RightAlign}/></button>
        </div>
      </section>
      <section className='controllerItem' id='list'>
        <div className='listItem'>
          <button className='rounded'><RoundedList/></button>
        </div>
        <div className='listItem'>
          <button className='numbered'><NumberedList/></button>
        </div>
        <div className='listItem'>
          <button className='checked'><CheckedList/></button>
        </div>
      </section>
      <section className='controllerItem' id='image'>
        <div className='imageItem'>
          <button><img className='imageUpload' src={ImageUpload}/></button>
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