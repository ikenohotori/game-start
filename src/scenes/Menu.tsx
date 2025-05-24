import "../css/Menu.css";

type props = {
  onStart: () => void;
};

function Menu({ onStart }: props) {
  return (
    <div className="menu-root">
      <h2 className="title">猫回避ゲーム</h2>
      <span className="description">ハムスターを動かして猫から逃げてね</span>
      <p>1分を超えたら良い事があるかも・・</p>
      <div className="button-wrapper">
        <button className="start-button" onClick={() => onStart()}>
          はじめる
        </button>
      </div>
    </div>
  );
}

export default Menu;
