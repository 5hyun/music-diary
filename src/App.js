import React, { useRef, useReducer } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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

export const MusicStateContext = React.createContext();
export const MusicDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    date: 1657075362305,
    artist: "블락비",
    title: "잭팟",
    genre: "댄스",
    emotion: 5,
    content: "1",
  },
  {
    id: 2,
    date: 1657075362306,
    artist: "지코",
    title: "아무 노래",
    genre: "랩/힙합",
    emotion: 2,
    content: "2",
  },
  {
    id: 3,
    date: 1657075362307,
    artist: "잔나비",
    title: "주저하는 연인들을 위하여",
    genre: "인디",
    emotion: 1,
    content: "3",
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);

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
    <MusicStateContext.Provider value={data}>
      <MusicDispatchContext.Provider value={(onCreate, onEdit, onRemove)}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/music/:id" element={<Music />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
            </Routes>
          </div>
        </BrowserRouter>
      </MusicDispatchContext.Provider>
    </MusicStateContext.Provider>
  );
}

export default App;
