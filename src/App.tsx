import React from "react";
import { ItemModel } from "./components/AddItem/ItemModel";
import AddItem from "./components/AddItem/AddItem";
import TodaysList from "./components/TodaysList/TodaysList";
import TomorrowsList from "./components/TomorrowsList/TomorrowsList";

import classes from "./App.module.scss";
import cx from "classnames";

const App: React.FC = () => {
  const [datas, setData] = React.useState<ItemModel[]>([]);
  const [tab, setTab] = React.useState<string>("today");
  const [toggle, setToggle] = React.useState<boolean>(false);

  React.useEffect(() => {
    const localData = localStorage.getItem("dataList");
    if (localData) {
      setData((prevState) => [...prevState, ...JSON.parse(localData)]);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("dataList", JSON.stringify(datas));
  });

  const addItemHandler = (data: ItemModel) => {
    setData((prevState) => [...prevState, data]);
  };

  const deleteItemHandler = (id: string) => {
    setData((prevState) => prevState.filter((item) => item.id !== id));
  };

  return (
    <div className={classes.container}>
      <h2>Birthday Reminder</h2>
      {toggle ? (
        <AddItem addItem={addItemHandler} close={() => setToggle(false)} />
      ) : (
        <button className={classes.btn} onClick={() => setToggle(true)}>
          Set a Reminder
        </button>
      )}

      <ul className={classes.container_tab}>
        <li className={cx({ [classes.active]: tab === "today" })}>
          <div onClick={() => setTab("today")}>
            <span>Today</span>
          </div>
        </li>
        <li className={cx({ [classes.active]: tab === "tomorrow" })}>
          <div onClick={() => setTab("tomorrow")}>
            <span>Tomorrow</span>
          </div>
        </li>
      </ul>
      <div
        className={classes.tab_content}
        style={tab === "today" ? { display: "block" } : { display: "none" }}
      >
        <TodaysList List={datas} delete={deleteItemHandler} />
      </div>
      <div
        className={classes.tab_content}
        style={tab === "tomorrow" ? { display: "block" } : { display: "none" }}
      >
        <TomorrowsList List={datas} delete={deleteItemHandler} />
      </div>
    </div>
  );
};

export default App;
