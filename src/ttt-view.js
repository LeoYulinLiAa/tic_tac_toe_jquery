class View {

  /**
   *
   * @param {Game} game
   * @param {*} $el
   */
  constructor(game) {
    this.game = game;
    this.$container = $(".ttt");
  }

  bindEvents() {
    this.$container.on("click", () => {
      const $square = $(event.target)
      this.makeMove($square);
    })
  }

  makeMove($square) {
    if (this.game.isOver()) return;
    try {
      const position = $square.data("loc");
      // if (this.game.board.isEmptyPos(postion))
      console.log(this.game.currentPlayer);
      const player = this.game.currentPlayer;
      this.game.playMove(position);
      $square.toggleClass(player);
      const winner = this.game.winner()
      if (winner) {
        const $winningMessage = $("<p>")
        $winningMessage.text(`${winner} won!`)
        this.$container.append($winningMessage)
      }
    } catch(e) {
      console.log(e.msg);
    }
  }

  setupBoard() {
    const $container = $(".ttt");
    const $ul = $("<ul>");
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        const $li = $("<li>");
        $li.data("loc", [row, column]);
        $ul.append($li);
      }
    }
    $container.append($ul);
  }
}

module.exports = View;
