import React, { useRef, useReducer } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// componentes
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";

import Home from "./pages/Home";
import Music from "./pages/Music";
import New from "./pages/New";
import Edit from "./pages/Edit";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT":
      {
        newState = state.map((it) =>
          it.id === action.data.id ? { ...action.data } : it
        );
        break;
      }

      return newState;
  }
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const onCreate = (date, album, artist, title, emotion, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        album,
        artist,
        title,
        emotion,
        content,
      },
    });
  };

  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  const onEdit = (targetId, date, album, artist, title, emotion, content) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        album,
        artist,
        title,
        emotion,
        content,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={(onCreate, onEdit, onRemove)}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="music" element={<Music />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
