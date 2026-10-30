import * as x from 'immer';
import run from './public-probe.cjs';
run(x,{format:'import',resolved:import.meta.resolve('immer'),NODE_ENV:process.env.NODE_ENV??null});
