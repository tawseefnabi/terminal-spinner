
import {PassThrough as PassThroughStream} from 'node:stream';
import getStream from 'get-stream';
import test from "ava";
import stripAnsi from 'strip-ansi';
import iva from "./index.js";


const spinnerCharacter = process.platform === 'win32' ? '-' : '⠋';
const noop = () => {};

const getPassThroughStream = () => {
	const stream = new PassThroughStream();
	stream.clearLine = noop;
	stream.cursorTo = noop;
	stream.moveCursor = noop;
	return stream;
};

const doSpinner = async (fn, extraOptions = {}) => {
	const stream = getPassThroughStream();
	const output = getStream(stream);

	const spinner = iva({
		stream,
		text: 'foo',
		color: true,
		isEnabled: true,
		isSilent: false,
		...extraOptions,
	});

	spinner.start();

	fn(spinner);
	stream.end();

	return stripAnsi(await output);
};


const macro = async (t, fn, expected, extraOptions = {}) => {
	t.regex(await doSpinner(fn, extraOptions), expected);
};

test("title", macro, spinner  => {
  spinner.stop()
},  new RegExp(`${spinnerCharacter} foo`));
