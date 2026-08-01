<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Remembering Game</title>
  <link rel="stylesheet" href="memory-game.css" />
</head>
<body>
  <section class="game">
    <h1>Remembering Game</h1>
    <div class="info">
      <div><span>Level</span><strong id="level">1</strong></div>
      <div><span>Moves</span><strong id="moves">0</strong></div>
      <div><span>Matches</span><strong id="matches">0 / 8</strong></div>
    </div>

    <div id="board"></div>
    <div class="message" id="message">Find all matching pairs.</div>
    <div class="controls">
      <button class="action" id="restart">Restart</button>
      <button class="action" id="nextLevel">Next Level</button>
    </div>
  </section>

  <script src="memory-game.js"></script>
</body>
</html>
