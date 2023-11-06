import InputView from './InputView.js';
import Purchase from './Purchase.js';
import OutputView from './OutputView.js';
import LottoMaker from './LottoMaker.js';
import Lotto from './Lotto.js';
import Bonus from './Bonus.js';
import Count from './Count.js';

class Game {
  #quantity;
  #lottos;
  winningNumbers;
  bonusNumber;

  constructor() {
    this.#quantity;
    this.#lottos;
    this.winningNumbers;
    this.bonusNumber;
  }

  purchase() {
    InputView.purchaseLotto(this.handlePurchase);
  }

  handlePurchase = (amount) => {
    this.#quantity = new Purchase(amount).getAmount();
    OutputView.printQuantity(this.#quantity);
    this.#lottos = LottoMaker.generate(this.#quantity);
    OutputView.printLottos(this.#lottos);
    this.askWinningNumbers();
  };

  askWinningNumbers() {
    InputView.readWinningNumbers(this.handleWinningNumbers);
  }

  handleWinningNumbers = (numbers) => {
    const WINNING_LIST = numbers.split(',').map((number) => {
      return (number = parseInt(number, 10));
    });
    this.winningNumbers = new Lotto(WINNING_LIST).getWinningNumbers();
    this.askBonusNumber();
  };

  askBonusNumber() {
    InputView.readBonusNumbers(this.handleBonusNumber);
  }

  handleBonusNumber = (number) => {
    const BONUS_NUMBER = parseInt(number, 10);
    this.bonusNumber = new Bonus(BONUS_NUMBER, this.winningNumbers).getBonusNumber();

    this.getReward();
  };

  getReward() {
    const count = new Count(this.#lottos, this.winningNumbers, this.bonusNumber);
    console.log(count);
  }
}

export default Game;
