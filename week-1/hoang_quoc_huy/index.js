let changeNavColor = () => {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("navbar").style.background = "#fff";
  } else {
    document.getElementById("navbar").style.background = "none";
  }
};

let scrollBtn = () => {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    document.getElementById("scrollToTop").style.display = "block";
  } else {
    document.getElementById("scrollToTop").style.display = "none";
  }
};

let scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.onscroll = () => {
  changeNavColor();
  scrollBtn();
};
