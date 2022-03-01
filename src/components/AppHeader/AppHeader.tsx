import React, {ReactElement, useState} from 'react';
import Logo from '../../resource/images/logo.png';
import './AppHeader.scss';
// todo img height 맞추기
import MenuClose from '../../resource/images/menu_close.png';
import MenuOpen from '../../resource/images/menu_open.png';

// todo variable 파일로 관리하기
const myGitHubURL = 'https://github.com/woasidh?tab=repositories';

// todo react-responsive 사용하기
// todo refactoring하기

interface AppHeaderProps {
  onClickLogoutBtn: () => any;
  isLogined: boolean;
}

const AppHeader = (props: AppHeaderProps): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className='appHeader'>
      <div className="topbar">
        <div className='left_section'>
          <img src={Logo} alt="logo"/>
        </div>
        <div className="right_section" id='PC'>
          <span><a href={myGitHubURL} target={'_blank'}>Github</a></span>
          {props.isLogined && <span onClick={props.onClickLogoutBtn}>Logout</span>}
        </div>
        <div className="right_section" id='mobile'>
          <button onClick={toggleMenu}>
            <img className='menu_close' src={isMenuOpen ? MenuOpen : MenuClose}/>
          </button>
        </div>
      </div>
      <div className = {`subMenu ${isMenuOpen ? 'open' : ''}`}>
        <a href = {myGitHubURL} target={'_blank'}>Github</a>
        {props.isLogined && <span onClick={props.onClickLogoutBtn}>Logout</span>}
      </div>
    </header>
  );
}

export default AppHeader;
