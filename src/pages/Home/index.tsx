import React, {ReactElement, useState} from 'react';
import './index.scss';
import Logo from '../../resource/images/logo.png';
import List from '../../resource/images/list.png';
import Left from '../../resource/images/left.png';
import Right from '../../resource/images/right.png';
import Calendar from "./Calendar/Calendar";

const Index = (): ReactElement => {

    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());

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

    function subtractMonth(): void {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
            return;
        }
        setMonth(month - 1);
    }

    function addMonth(): void {
        if (month === 11) {
            setMonth(0);
            setYear(year + 1);
            return;
        }
        setMonth(month + 1);
    }

    return (
        <div className="home">
            {renderHeader()}
            <section className = "function_menu">
                <div className="calendar_submenu">
                    <div className = "calendar_controller">
                        <button onClick = {subtractMonth}>
                            <img src = {Left} alt = "left"/>
                        </button>
                        <button onClick = {addMonth}>
                            <img src = {Right} alt = "right"/>
                        </button>
                    </div>
                    <div className = "date_shower">{year}년 {month + 1}월</div>
                </div>
            </section>
            <section className = "main_container">
                <Calendar year = {year} month = {month}/>
            </section>
        </div>
    )
}
export default Index;