const router = require('express').Router();

const Board = require('./board-model.js');

router.get('/', async (req, res) => {
  try {
    res.status(200).json(await Board.getBy({ user_id: req.auth_id }));
  }
  catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed to get boards.', message, stack });
  }
});

router.get('/:id', validateBoardId, async (req, res) => {
  try {
    res.status(200).json(req.board);
  }
  catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed to get board by id.', message, stack });
  }
});

router.get('/:id/articles', validateBoardId, async (req, res) => {
  try {
    const articles = await Board.getArticles(req.board.id);

    if (articles.length === 0) {
      res.status(200).json({ message: 'There are no articles for this board.'});
    } else {
      res.status(200).json(articles);
    }
  }
  catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed to get articles for this board.', message, stack });
  }
});

router.post('/', validateBoardInfo, async (req, res) => {
  try {
    req.body.user_id = req.auth_id;
    const [newBoard] = await Board.add(req.body);
    res.status(200).json(newBoard);
  }
  catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed to save board.', message, stack });
  }
})

router.put('/:id', validateBoardId, async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({ message: 'No changes were provided.' })
    } else {
      res.status(200).json(await Board.update(req.board.id, req.body));
    }
  }
  catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed to update board.', message, stack });
  }
});

router.delete('/:id', validateBoardId, async (req, res) => {
  try {
    await Board.remove(req.board.id);
    res.status(200).json(await Board.getBy({ user_id: req.auth_id }));
  }
  catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed to remove board.', message, stack });
  }
});

// middleware

function validateBoardId(req, res, next) {
  return Board.getBy({ id: req.params.id, user_id: req.auth_id }).first().then(board => {
    if (!board) {
      res.status(404).json({ message: 'Board with the specified id was not found.' });
    } else {
      req.board = board;
      next();
    }
  });
}

function validateBoardInfo(req, res, next) {
  if (!req.body || !req.body.name) {
    res.status(400).json({ message: 'Missing required field: name.' });
  } else {
    next();
  }
}

module.exports = router;