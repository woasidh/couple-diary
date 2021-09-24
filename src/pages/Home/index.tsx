import React, {ReactElement} from 'react';
import './index.scss';
import Logo from '../../resource/images/logo.png';
import List from '../../resource/images/list.png';

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
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                </div>
            </section>
            <section className = "main_container">
                <div className = "calendar">
                    <div className = "weekdayRow">
                        <div className="weekDayCell"/>
                        <div className="weekDayCell"/>
                        <div className="weekDayCell"/>
                        <div className="weekDayCell"/>
                        <div className="weekDayCell"/>
                        <div className="weekDayCell"/>
                        <div className="weekDayCell"/>
                    </div>
                    <div className = "weekRows">
                        <div className="weekRow">
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                        </div>
                        <div className="weekRow">
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                        </div>
                        <div className="weekRow">
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                        </div>
                        <div className="weekRow">
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                        </div>
                        <div className="weekRow">
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                        </div>
                        <div className="weekRow">
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                            <div className="dayCell"/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Index;