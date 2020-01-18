export default class PasswordUtil {
  static generate() {
    const SPECIALS = '.,?+-=*&!#$%';
    const letterAndNumber = Math.random()
      .toString(36)
      .slice(-8);
    const specialBits = '..'.map(
      () => SPECIALS[Math.floor(Math.random() * SPECIALS.length)]
    );
    return letterAndNumber + specialBits;
  }
}
