/*
SynthForce

Copyright (c) 2015 Jonne Itkonen

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var audioCtx;

window.addEventListener('load', init, false);

function init() {
    audioCtx = new (window.AudioContext ? AudioContext : webkitAudioContext)()
	audioCtx.oscs = [];
}

function playFreq(f, startTime, length) {
    var o1 = audioCtx.createOscillator();
    o1.frequency.value = f;

    o1.connect(audioCtx.destination);
    o1.context.oscs.push(o1);
    o1.onended = function () {
	o1.disconnect();
	o1.context.oscs.splice(o1.context.oscs.indexOf(o1),1); };
    o1.start(startTime);
    o1.stop(startTime+length);

    return o1;
}

function play(str) {
    var notes = str.split(',').map(Number).filter(function (x) { return !isNaN(x); });
    var startTime = audioCtx.currentTime+0.5;

    for (i in notes) {
	playFreq(notes[i], startTime+i*0.5, 0.5);
    }
}


function stop() {
    audioCtx.close().then(init);
}
