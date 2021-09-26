import React, {ReactElement, useState} from 'react';
import './index.scss';
import Logo from '../../resource/images/logo.png';
import List from '../../resource/images/list.png';
import Left from '../../resource/images/left.png';
import Right from '../../resource/images/right.png';
import Calendar from "./Calendar/Calendar";

const Index = (): ReactElement => {

    const [month, setMonth] = useState(new Date().getMonth() + 1);

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

    function addMonth(): void {
        setMonth(month + 1);
    }

    function subtractMonth(): void {
        setMonth(month - 1);
    }

    return (
        <div className="home">
            {renderHeader()}
            <section className = "function_menu">
                <div className="calendar_submenu">
                    <div className = "calendar_controller">
                        <button onClick={subtractMonth}>
                            <img src = {Left}/>
                        </button>
                        <button onClick={addMonth}>
                            <img src = {Right}/>
                        </button>
                    </div>
                    <div className = "date_shower">{month}월</div>
                </div>
            </section>
            <section className = "main_container">
                <Calendar/>
            </section>
        </div>
    )
}
export default Index;