const context = new AudioContext();
const nodes = new Map();

const osc = context.createOscillator();
osc.frequency.value = 220;
osc.type = "square";
osc.start();

const amp = context.createGain();
amp.gain.value = 0.5;

const out = context.destination;

nodes.set("a", osc);
nodes.set("b", amp);
nodes.set("c", out);
