/**
 * Add-ons for Underscore.
 * 
 * @file
 * @license Apache v2
 * @author Trevor Parscal <trevorparscal@gmail.com>
 * @see https://github.com/documentcloud/underscore
 */
_.mixin( {
	/**
	 * Extends a constructor with the prototype of another.
	 * 
	 * When using this, it's required to include a call to the constructor of the parent class as
	 * the first code in the child class's constructor.
	 * 
	 * @example
	 *     // Define parent class
	 *     function Foo() {
	 *         // code here
	 *     }
	 *     // Define child class
	 *     function Bar() {
	 *         // Call parent constructor
	 *         Foo.call( this );
	 *     }
	 *     // Extend prototype
	 *     _.extendClass( Bar, Foo );
	 * 
	 * @static
	 * @method
	 * @param {Function} dst Class to extend
	 * @param {Function} src Base class to inherit from
	 */
	'extendClass': function( dst, src ) {
		var base = src.prototype;
		for ( var method in base ) {
			if ( typeof base[method] === 'function' && !( method in dst.prototype ) ) {
				dst.prototype[method] = base[method];
			}
		}
	},
	/**
	 * Creates an object from array values with specified property names.
	 * 
	 * @example
	 *     _.objectify( [1, 2], 'a', 'b' ); // returns { 'a': 1, 'b': 2 }
	 * 
	 * @static
	 * @method
	 * @param {Array} arr Values
	 * @param {String} [...] Property names
	 * @returns {Object} Object with properties derrived property names and array values
	 */
	'objectify': function( arr ) {
		var obj = {};
		for ( var i = 1, length = arguments.length; i < length; i++ ) {
			obj[arguments[i]] = arr[i - 1];
		}
		return obj;
	},
	/**
	 * Gets a value within a multi-level collection.
	 * 
	 * A path is a list of object keys and array indexes which describe how to reach a specific
	 * value.
	 * 
	 * @example
	 *     _.traverse( { 'a': ['b', 'c', { 'd': 'test' }] }, ['a', 2, 'd'] ); // returns 'test'
	 * 
	 * @static
	 * @method
	 * @param {Mixed} Value to traverse
	 * @param {Array} [path] List of keys and indexes in the document
	 * @param {Integer} [steps] Number of steps to take, positive to set/negative to reduce limit
	 * @returns {Mixed} Value path points to
	 * @throws {Error} If path is not valid
	 */
	'traverse': function( value, path, steps ) {
		if ( !path || !path.length ) {
			return value;
		}
		var length = !steps ? path.length :
			( steps > 0 ? Math.min( steps, path.length ) : Math.max( 0, path.length - steps ) );
		for ( var i = 0; i < length; i++ ) {
			value = value[path[i]];
			if ( value === undefined ) {
				break;
			}
		}
		return value;
	},
	/**
	 * Inserts items of one array into another at a given offset.
	 *
	 * This is the equivalent of calling arr.splice( offset, 0, d1, d2, d3, ... ) except that the
	 * "d1, d2, d3, ..." arguments are specified as an array rather than separate parameters.
	 *
	 * @example
	 *     var arr = [1, 2, 3];
	 *     _.inject( arr, 1, [4, 5, 6] );
	 *     // arr is now [1, 4, 5, 6, 2, 3];
	 *
	 * @static
	 * @method
	 * @param {Array} arr Array to remove from and insert into. Will be modified
	 * @param {Number} offset Offset in arr to splice at. May be negative; see the 'index'
	 * parameter for Array.prototype.splice()
	 * @param {Array} items Array of items to insert at the offset
	 * @returns {Array} Modified array
	 */
	'inject': function( arr, offset, items ) {
		// Splicing needs to be done in in batches, because of maximum argument length limits tend
		// to vary between JavaScript engines - 1024 seems to be a safe batch size on all of them
		var index = 0,
			batchSize = 1024;
		// Splice in batches of 1024 items at a time
		while ( index < items.length ) {
			arr.splice.apply(
				arr, [index + offset, 0].concat( items.slice( index, index + batchSize ) )
			);
			index += batchSize;
		}
		return arr;
	}
} );
