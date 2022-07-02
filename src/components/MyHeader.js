const MyHeader = ({ headText, leftchild, rightchild }) => {
  return (
    <header>
      <div className="head-btn__left">{leftchild}</div>
      <div className="head-text">{headText}</div>
      <div className="head-btn__right">{rightchild}</div>
    </header>
  );
};

export default MyHeader;
