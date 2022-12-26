class Loader {
  id = "main-loader";
  idApp = "app";
  constructor() {
    this.$elApp = document.getElementById(this.idApp);
    this.$el = document.getElementById(this.id);
  }

  hide() {
    if (this.$el) this.$el.style.opacity = "0";
    if (this.$elApp) this.$elApp.style.opacity = "100%";
    setTimeout(() => {
      if (this.$el) this.$el.style.display = "none";
    }, 350);
  }

  show() {
    // this.$el.style.display = "unset";
    // this.$elApp.style.display = "none";
  }
}
export default new Loader();
