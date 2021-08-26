import test from 'ava';
import process from 'node:process';


class Iva {
  constructor(options) {
    if (typeof options === "string") {
      options = {
        text: options,
      };
    }
    this.options = {
      text: "",
      color: "cyan",
      stream: process.stderr,
      discardStdin: true,
      ...options,
    };
    this.spinner = this.options.spinner;
  }

  start(text){
    if(text){
      console.log('text', text);
      this.text = this.text
    }
    if (this.isSpinning) {
      console.log('isSpinning', this.isSpinning);
			return this;
		}
    console.log('nnn', !this.isEnabled);
    if (!this.isEnabled) {
			if (this.text) {
				this.stream.write(`- ${this.text}\n`);
			}

			return this;
		}
    return this
  }
  stop() {
		if (!this.isEnabled) {
			return this;
		}
  }
}

export default function iva(options) {
  console.log('options-->', options);
  return new Iva(options);
}
