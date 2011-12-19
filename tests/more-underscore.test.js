module( 'More Underscore' );

test( 'extendClass', function() {
	var a = function() {},
		b = function() {},
		c = function() {},
		d = function() {};
	function ParentClass() {
		this.a = a;
		this.d = function() {};
		this.e = true;
	}
	ParentClass.prototype.b = b;
	function ChildClass() { }
	ChildClass.prototype.c = c;
	ChildClass.prototype.d = d;
	_.extendClass( ChildClass, ParentClass );
	strictEqual( ChildClass.prototype.a, a, 'Child prototype has methods from parent constructor' );
	strictEqual( ChildClass.prototype.b, b, 'Child prototype has methods from parent prototype' );
	strictEqual( ChildClass.prototype.c, c, 'Child prototype has methods from child prototype' );
	strictEqual( ChildClass.prototype.d, d, 'Child prototype overrides parent methods' );
	strictEqual( ChildClass.prototype.e, undefined, 'Parent properties are ignored' );
	strictEqual( ParentClass.prototype.c, undefined, 'Parent prototype is not modified' );
} );

test( 'objectify', function() {
	deepEqual(
		_.objectify( [1, 2, 3], 'a', 'b', 'c' ),
		{ 'a': 1, 'b': 2, 'c': 3 },
		'Property names and array values are mapped into an object'
	);
	deepEqual(
		_.objectify( [1], 'a', 'b', 'c' ),
		{ 'a': 1, 'b': undefined, 'c': undefined },
		'Missing array values are undefined in object'
	);
	deepEqual(
		_.objectify( [1, 2, 3], 'a' ),
		{ 'a': 1 },
		'Object will only contain named properties'
	);
} );

test( 'traverse', function() {
	var tree = { 'a': [1, { 'd': 3 }] };
	deepEqual( _.traverse( tree, ['a'] ), [1, { 'd': 3 }], 'Traverse an array' );
	equal( _.traverse( tree, ['a', 0] ), 1, 'Traverse to an array in an object' );
	equal( _.traverse( tree, ['a', 1, 'd'] ), 3, 'Traverse to an object in an array in an object' );
	equal( _.traverse( tree, ['b', 1, 'd'] ), undefined, 'Invalid paths return undefined' );
	equal( _.traverse( tree, [] ), tree, 'Empty path returns top-level object' );
	equal( _.traverse( tree ), tree, 'Undefined path returns top-level object' );
} );
