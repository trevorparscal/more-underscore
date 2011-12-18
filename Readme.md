# More-underscore

More-underscore is an add-on to [Underscore][1]. Please enjoy, and feel free to suggest additions.

## Documentation

###extendClass

    _.extendClass( dst, src )

Extends a constructor with the prototype of another. When using this, it's required to include a call to the constructor of the parent class as the first code in the child class's constructor. Only methods in the parent class which will not conflict with methods in the child class will be added to the child constructor.

    // Define parent class
    function Foo() {
        // code here
    }
    // Define child class
    function Bar() {
        // Call parent constructor
        Foo.call( this );
    }
    // Extend prototype
    _.extendClass( Bar, Foo );

###objectify

    _.objectify( arr, [...] )

Creates an object from array values with specified property names. This can be useful when encoding arguments into arrays.

    _.objectify( [1, 2], 'a', 'b' );
    => { 'a': 1, 'b': 2 }

### traverse

    _.traverse( value, path, steps )

Gets a value within a multi-level collection. A path is a list of object keys and array indexes which describe how to reach a specific value. Steps can be defined as a positive number which will limit the number of a steps, or a negative number which will reduce the number of steps. Using an invalid path will return undefined.

    _.traverse( { 'a': ['b', 'c', { 'd': 'test' }] }, ['a', 2, 'd'] );
    => 'test'

[1]: http://github.com/documentcloud/underscore/