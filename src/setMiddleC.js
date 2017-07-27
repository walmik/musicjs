'use strict';
const assert = require('assert');
let transposition = 0;

/**
 * Takes an integer and transposes all notes to a different middle C octave.
 * @param {Integer} octaveIndex		The new octave for middle C.
 */
function setMiddleC(octaveIndex) {
	assert(Number.isInteger(octaveIndex), 'Octave Index must be an integer.');
	transposition = octaveIndex - 4;
}

/**
 * Takes an octave and transposes it to the octave determined by transposition
 * @param {Integer/String} initialOctave	The initial octave
 * @return {Integer} The correctly transposed octave
 */
function transposeOctave(initialOctave){
	assert(Number.isInteger(initialOctave) || typeof initialOctave === 'string', 'Initial Octave must be an integer.');
	if(typeof initialOctave === 'string'){
		initialOctave = parseInt(initialOctave);
	}
	return initialOctave += transposition;
}
/**
 * Takes a noteObj and transposes the note into the octave given by transposition 
 * @param {noteObj} noteObj		The Array/String contaning the note(s)
 * @return {String(s)} 	The correctly transposed note(s)
 */
function transposeNote(noteObj){
    let note;
	assert(noteObj.note !== undefined && (typeof noteObj.note == 'string' || typeof noteObj.note == 'object'), 'NoteObj must contain a note that is either an object or a string.');
	if(typeof noteObj.note === 'string'){
		//If a single note was passed, transpose the single note
		note = transposeSingle(noteObj.note);
	} else{
		//If an array of notes were passed, transpose every note in the array
		note = [];
		//Create an array for the transposed notes to be stores in
		for(var i = 0; i<noteObj.note.length; i++){
		    const transposedNote = transposeSingle(noteObj.note[i]);
		    //Transpose the single note
		    note.push(transposedNote);
		    //Push the transposed note into the note array
		}
	}
	return note;
}
/**
 * Transposes a single note to the correct octave determined by transposition
 * @param {String} note     Note to be transposed
 * @return {String} Transposed note
 */
function transposeSingle(note){
    let index = 1;
	if(isNaN(note[1])){
		//Test if note is a single character like 'a5' or if it is like 'ab5'
		index = 2;
	}
	let oct = parseInt(note.slice(index,note.length));
	//Parse the octave into an integer
	oct += transposition;
	//Transpose the octave
	return note.slice(0,index) + oct.toString();
}
module.exports = {setMiddleC, transposeNote, transposeOctave};