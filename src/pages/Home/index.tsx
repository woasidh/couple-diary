import React, {ReactElement} from 'react';
import './index.scss';
import Logo from '../../resource/images/logo.png';
import List from '../../resource/images/list.png';
import Calendar from "./Calendar/Calendar";

const Index = (): ReactElement => {

    function renderHeader(): ReactElement {
        const srcList = [List, List, List];
        const altList = ["list", "list", "list"];
        const buttons = srcList.map((src, index) => (
            <button className="item_container" key = {index}>
                <img src={src} alt={altList[index]}/>
            </button>
        ));
        return (
            <header className="main_header">
                <img src={Logo} alt="logo"/>
                <div className="right_menu_container">
                    {buttons}
                </div>
            </header>
        );
    }

    return (
        <div className="home">
            {renderHeader()}
            <section className = "function_menu">
                <div className="button_container">
                    <button></button>
                    <button></button>
                    <button></button>
                    <button></button>
                </div>
            </section>
            <section className = "main_container">
                <Calendar/>
            </section>
        </div>
    )
}
export default Index;