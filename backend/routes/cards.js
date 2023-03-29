const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { URL_REGEX } = require('../utils/constants');

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const validateCardId = () => celebrate({
  params: Joi.object().keys({ cardId: Joi.string().length(24).hex() }),
});

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(URL_REGEX),
  }),
}), createCard);

router.delete('/:cardId', validateCardId(), deleteCard);

router.put('/:cardId/likes', validateCardId(), likeCard);

router.delete('/:cardId/likes', validateCardId(), dislikeCard);

module.exports = router;
