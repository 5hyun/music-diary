import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmotionItem from "./EmotionItem";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import ControlMenu from "./ControlMenu";

import { emotionList } from "../util/emotion.js";
import { MusicDispatchContext } from "../App";

const genreOptionList = [
  { value: "ballade", name: "발라드" },
  { value: "dance", name: "댄스" },
  { value: "hippop", name: "랩/힙합" },
  { value: "rnb", name: "R&B" },
  { value: "indie", name: "인디" },
];

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const MusicEditor = () => {
  const [date, setDate] = useState(getStringDate(new Date()));

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genreType, setGenreType] = useState("ballade");

  const [content, setContent] = useState("");
  const contentRef = useRef();
  const titleRef = useRef();
  const artistRef = useRef();

  const [emotion, setEmotion] = useState(3);

  const { onCreate } = useContext(MusicDispatchContext);

  const handleSubmit = () => {
    if (title.length < 1) {
      titleRef.current.focus();
      return;
    } else if (artist.length < 1) {
      artistRef.current.focus();
      return;
    } else if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    onCreate(date, artist, title, emotion, content);
    navigate("/", { replace: true });
  };

  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  const navigate = useNavigate();

  return (
    <div className="MusicEditor">
      <MyHeader
        headText={"새 음악평"}
        leftchild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
      />
      <div>
        <section className="DateSelctor">
          <h4>오늘은 언제인가요?</h4>
          <div className="DateSelctor-box">
            <input
              className="DateSelctor-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>

        <section className="todayEmotion">
          <h4>오늘의 감정</h4>
          <div className="todayEmotion-input">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>

        <section className="genre-input">
          <h4>장르</h4>
          <ControlMenu
            value={genreType}
            onChange={setGenreType}
            optionList={genreOptionList}
          />
        </section>

        <section className="Title">
          <h4>노래 제목</h4>
          <div className="Title-input">
            <input
              placeholder="노래 제목 입력"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              ref={titleRef}
            />
          </div>
        </section>

        <section className="Artist">
          <h4>가수</h4>
          <div className="Artist-input">
            <input
              placeholder="가수 입력"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              ref={artistRef}
            />
          </div>
        </section>

        <section className="Content">
          <h4>음악평</h4>
          <div className="Content-input">
            <textarea
              placeholder="음악평을 적어주세요"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>

        <section className="control-btn">
          <div className="control-btn__positon">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default MusicEditor;
