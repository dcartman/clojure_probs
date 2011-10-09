/**
 * JavaScript functions to transform a number between 0 and 4999
 * into a Roman Numeral Representation and transfrom a Roman Numeral
 * into a base10 number.
 *
 * This was a 4Clojure problem presented to be by @quephird and figured it
 * it would be fun to do in JS, as a know it where I don't know clojure.
 *
 * The Roman Numeral to Base10 was easy, the Base10 to Roman Numeral took a bit
 * more effort.
 * 
 * I feel a bit like I cheated, since JS doesn't have builtin method to repeat a 
 * string I added one to the prototype. I took the function from the MDN page on
 * the String object.
 *
 * I also added a toNum function since you can't add a numerical string to a number
 * and get the response you are expecting. Normally I wouldn't use the eval function 
 * in my javascript as it can be very dangerous, but since I'm matching and evaluating
 * only the digit characters I thought it would be fine.
 *
 * This is first run, if I were to use this in production it would need to be cleaned up,
 * and probably placed in an object.
 *
 * Author: Daniel Carter @dcartman
 * Email: daniel (•) carter ( at ) d dot b (•) com
 * Date: Oct 8, 2011
 **/

String.prototype.repeat = function(n) {
   var s = "", t = this.toString();
   while (--n >= 0) {
     s += t
   }
   return s;
}

String.prototype.toNum = function() {
	return eval(this.valueOf().match(/\d/g).join(''))
}


function to_rn(num) {
	var roman_numeral_list = ["I","V","X","L","C","D","M"],
		roman_numeral = [];
		
	num = num.toString().match( /\d/g ).reverse().forEach( function(ele,position) { 
			var tmp = [],
				segments = ( ele / 5 ).toFixed(1).split('.'),
				is_a_fourth = Math.floor( ( segments[1].toNum() + 2 )/10 );
			
			tmp.push( ( /[8]/.test( segments[1] ) ) 
				? roman_numeral_list[ position * 2 ] 
				: roman_numeral_list[ position * 2 ].repeat( ( segments[1].toNum() )/2) );
					
			if( segments[0].toNum() + is_a_fourth ) {
				tmp.push( roman_numeral_list[position * 2 + segments[0].toNum() + is_a_fourth]);
			}
			 
			roman_numeral.unshift( ( is_a_fourth ) ? tmp.join('') : tmp.reverse().join('') );
		});
		
	return roman_numeral.join('');	
}

function to_base10(romNum) {
	var roman_numeral_values = {"I":1,"V":5,"X":10,"L":50,"C":100,"D":500,"M":1000},
		last_value = 0,
		total = 0;
		
	romNum = romNum.match(/[I,V,X,L,C,D,M]/g).reverse().forEach(function(l) {
		total += ( roman_numeral_values[l] < last_value) ? -1 * ( roman_numeral_values[l] ) : ( roman_numeral_values[l] );
		last_value = roman_numeral_values[l];
	});	
	return total;
}