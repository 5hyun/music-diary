import MyButton from "./MyButton";

const MusicItem = ({ id, date, artist, title, genre, emotion, content }) => {
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  return (
    <div className="MusicItem">
      <div className="MusicItem-album">여긴 사진</div>

      <div className="MusicItem-info-detail">
        <div className="MusicItem-info__date">{strDate}</div>
        <div className="MusicItem-info__title">{title.slice(0, 25)}</div>
        <div className="MusicItem-info__artist">{artist.slice(0, 25)}</div>
      </div>

      <div className="MusicItem-info__genre">{genre}</div>

      <div className="MusicItem_info__emotion">
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>

      <div className="MusicItem-editButton">
        <MyButton text={"수정하기"} />
      </div>
    </div>
  );
};

export default MusicItem;
