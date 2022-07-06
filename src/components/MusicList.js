import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MusicItem from "./MusicItem";
import MyButton from "./MyButton";

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

const genreOptionList = [
  { value: "synthesis", name: "종합" },
  { value: "ballade", name: "발라드" },
  { value: "dance", name: "댄스" },
  { value: "hippop", name: "랩/힙합" },
  { value: "rnb", name: "R&B" },
  { value: "indie", name: "인디" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const MusicList = ({ musicList }) => {
  const navigate = useNavigate();

  const [genreType, setGenreType] = useState("synthesis");
  const [filter, setFillter] = useState("all");

  const getProcesseMusicList = () => {
    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const genre = (item) => {
      if (genreType === "ballade") {
        return item.genre === "발라드";
      } else if (genreType === "dance") {
        return item.genre === "댄스";
      } else if (genreType === "hippop") {
        return item.genre === "랩/힙합";
      } else if (genreType === "rnb") {
        return item.genre === "R&B";
      } else if (genreType === "indie") {
        return item.genre === "인디";
      }
    };

    const copyList = JSON.parse(JSON.stringify(musicList));
    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));
    const sortedList =
      genreType === "synthesis"
        ? filteredList
        : filteredList.filter((it) => genre(it));

    return sortedList;
  };

  const goNew = () => {
    navigate(`/new`);
  };

  return (
    <div className="MusicList">
      <div className="MusicList-menu">
        <div className="MusicList-menu__left">
          <ControlMenu
            className="MusicList-menu__emotion-filter"
            value={filter}
            onChange={setFillter}
            optionList={filterOptionList}
          />
          <ControlMenu
            className="MusicList-menu__genre-filter"
            value={genreType}
            onChange={setGenreType}
            optionList={genreOptionList}
          />
        </div>
        <div className="MusicList-menu__right">
          <MyButton onClick={goNew} type={"positive"} text={"새 일기쓰기"} />
        </div>
      </div>
      {getProcesseMusicList().map((it) => (
        <MusicItem key={it.id} {...it} />
      ))}
    </div>
  );
};

MusicList.defaultProps = {
  musicList: [],
};

export default MusicList;
