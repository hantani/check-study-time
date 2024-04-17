const sayings = [
  "큰 목표를 이루고 싶으면 허락을 구하지 마라.",
  "상황을 가장 잘 활용하는 사람이 가장 좋은 상황을 맞는다. – 존 우든",
  "일반적인 것을 잃을 위험을 감수하지 않으면 평범한 것에 만족해야 한다. – 짐 론",
  "신뢰의 이유는 안전하거나 확실해서가 아니라, 위험을 감수할 용의가 있어서이다.",
];

export const getSaying = (storedSaying: any) => {
  if (storedSaying) {
    let loop = true;
    while (loop) {
      const randomNumber = Math.floor(Math.random() * sayings.length);
      if (sayings[randomNumber] !== storedSaying) {
        return sayings[randomNumber];
      }
    }
  } else {
    const randomNumber = Math.floor(Math.random() * sayings.length);
    return sayings[randomNumber];
  }
};
