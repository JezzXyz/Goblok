module.exports = {
  config: {
    name: "tictactoe",
    version: "1.0",
    author: "Your Name",
    role: 0,
    category: "game"
  },

  onStart: async function ({ api, event }) {
    const playerX = event.senderID;
    const playerO = "123456789"; // Ganti dengan ID pengguna yang ingin Anda ajak main

    const players = { 'X': playerX, 'O': playerO };
    let currentPlayer = 'X';
    let board = createBoard();

    function createBoard() {
      return [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];
    }

    function printBoard() {
      let boardStr = "";
      for (let row of board) {
        boardStr += row.join(' | ') + '\n';
        boardStr += '---------\n';
      }
      return boardStr;
    }

    function checkWinner() {
      for (let i = 0; i < 3; i++) {
        if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
          return board[i][0];
        }
        if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
          return board[0][i];
        }
      }

      if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];
      }
      if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2];
      }

      return null;
    }

    function isBoardFull() {
      for (let row of board) {
        if (row.includes('')) {
          return false;
        }
      }
      return true;
    }

    async function playGame() {
      while (true) {
        await api.sendMessage(`Current Board:\n${printBoard()}\nPlayer ${currentPlayer}, enter row (0, 1, or 2):`, event.threadID, event.messageID);
        const row = await waitForMessage(playerX); // Menggunakan helper function untuk menunggu pesan dari pemain
        const col = await waitForMessage(playerX);
        
        if (isNaN(row) || isNaN(col) || row < 0 || row > 2 || col < 0 || col > 2 || board[row][col] !== '') {
          await api.sendMessage('Invalid move. Try again.', event.threadID);
          continue;
        }

        board[row][col] = currentPlayer;

        const winner = checkWinner();
        if (winner) {
          await api.sendMessage(`Current Board:\n${printBoard()}\nPlayer ${winner} wins!`, event.threadID);
          break;
        }

        if (isBoardFull()) {
          await api.sendMessage(`Current Board:\n${printBoard()}\nIt's a tie!`, event.threadID);
          break;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }

    // Helper function untuk menunggu pesan dari pemain
    async function waitForMessage(playerID) {
      return new Promise((resolve) => {
        api.listenMqtt(async (err, message) => {
          if (message.senderID === playerID && message.body.trim() !== "") {
            resolve(parseInt(message.body.trim()));
          }
        });
      });
    }

    playGame();
  }
};