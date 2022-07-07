import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const MusicItem = ({ id, date, artist, title, genre, emotion, content }) => {
  const strDate = new Date(parseInt(date)).toLocaleDateString();
  const navigate = useNavigate();

  const goDiary = () => {
    navigate(`/dairy/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="MusicItem">
      <div onClick={goDiary} className="MusicItem-album">
        여긴 사진
      </div>

      <div onClick={goDiary} className="MusicItem-info-detail">
        <div className="MusicItem-info__date">{strDate}</div>
        <div className="MusicItem-info__title">{title.slice(0, 14)}</div>
        <div className="MusicItem-info__artist">{artist.slice(0, 14)}</div>
      </div>

      <div className="MusicItem-info__genre">{genre}</div>

      <div
        className={[
          "MusicItem_info__emotion",
          `emotion_img_warapper_${emotion}`,
        ].join(" ")}
      >
        <img
          src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
          alt="이미지"
        />
      </div>

      <div className="MusicItem-editButton">
        <MyButton onClick={goEdit} text={"수정하기"} />
      </div>
    </div>
  );
};

export default MusicItem;
