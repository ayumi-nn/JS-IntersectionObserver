const header = () => {
  // 要素を取得
  const mainContents = document.querySelector(".js-main");
  const kv = document.querySelector(".js-kv");
  const header = document.querySelector(".js-header-container");

  // 要素が無い場合の処理
  if (!mainContents || !kv || !header) return;

  // Opening Keyframe
  const openingKeyframes = {
    transform: ["translateY(-100%)", "translateY(0)"],
  };

  // Closing Keyframe
  const closingKeyframes = {
    transform: ["translateY(0)", "translateY(-100%)"],
  };

  // 共通Option
  const options = {
    duration: 200,
  };

  // 監視時の処理
  const showKv = (entries) => {
    // キービジュアルが範囲外になったら、ヘッダーをfixedにする
    if (entries[0].isIntersecting === false) {
      header.classList.add("is-view");
      header.animate(openingKeyframes, options);
      // キービジュアルが範囲内でヘッダーにクラスがついてたら消す
    } else if (header.classList.contains("is-view")) {
      const closingKvAnime = header.animate(closingKeyframes, options);
      closingKvAnime.onfinish = () => {
        header.classList.remove("is-view");
      };
    }
  };

  // 監視ロボ
  const kvObserver = new IntersectionObserver(showKv);

  // 監視ロボに監視させる
  kvObserver.observe(kv);
};

// 関数を実行
header();
