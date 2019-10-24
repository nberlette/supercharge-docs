# Collections


## Introduction
Node.js is an event-driven platform, handling most of its processing asynchronously. The JavaScript Array class has no built-in support for asynchronous operations. That’s one reason working with arrays in Node.js can be cumbersome.

The [`@supercharge/collections`](https://github.com/superchargejs/collections) package fills this gap. This package provides a fluent interface for working with JavaScript arrays. Create a new collection instance based on an array and run the items through a pipeline of operations.

The following example takes an array of IDs and fetches the related users from the database to filter them based on a user’s name:

```js
await Collect([ 1, 2, 3, 4, 5 ])
  .map(async id => {
    return User.findById(id)
  })
  .filter(user => user.name === 'supercharge')
  .all()

// result: [{
//   id: 1,
//   name: 'supercharge',
//   description: 'Powerful Node.js framework — not just a web-framework'
// }]
```

You can chain methods for fluent processing, like mapping and filtering of the underlying array. Typically, the collection methods are immutable and return a new collection instance without changing the original input array.


## Installation
The `@supercharge/collections` package lives independently from the Supercharge framework. Using it in your application requires you to install it as a project dependency:

```bash
npm i @supercharge/collections
```

You can use this collections package with every project even if it’s not build on Supercharge. Enjoy!


## Creating Collections
Creating a collection is as simple as importing the `@supercharge/collections` package and passing an array to the imported function:

```js
const Collect = require('@supercharge/collections')

const collection = Collect([ 'Supercharge', 'Collection' ])
```


## Available Methods
Here’s a list of available methods in the collections package:

<style>
    #collection-method-list > p {
        column-count: 2; -moz-column-count: 2; -webkit-column-count: 2;
        column-gap: 2rem; -moz-column-gap: 2rem; -webkit-column-gap: 2rem;
    }

    #collection-method-list a {
        display: block;
    }
</style>

<div id="collection-method-list" markdown="1">

[all](#all)
[avg](#avg)
[chunk](#chunk)
[collapse](#collapse)
[compact](#compact)
[concat](#concat)
[diff](#diff)
[every](#every)
[filter](#filter)
[filterSeries](#filterseries)
[find](#find)
[findSeries](#findseries)
[first](#first)
[flatMap](#flatmap)
[forEach](#foreach)
[forEachSeries](#foreachseries)
[has](#has)
[intersect](#intersect)
[isEmpty](#isempty)
[isNotEmpty](#isnotempty)
[join](#join)
[last](#last)
[map](#map)
[mapSeries](#mapseries)
[max](#max)
[median](#median)
[min](#min)
[pop](#pop)
[push](#push)
[reduce](#reduce)
[reduceRight](#reduceright)
[reject](#reject)
[rejectSeries](#rejectseries)
[reverse](#reverse)
[shift](#shift)
[size](#size)
[slice](#slice)
[splice](#splice)
[some](#some)
[someSeries](#someseries)
[sort](#sort)
[sum](#sum)
[take](#take)
[takeAndRemove](#takeandremove)
[toJSON](#tojson)
[union](#union)
[unshift](#unshift)

</div>


## Methods


#### all
The `all` method returns the collections underlying array:

```js
await Collect([1, 2, 3])
  .all()

// [1, 2, 3]
```

Some of the methods (like `map`, `filter`, `collapse`, or `compact`) return the collection instance allowing you to chain additional methods to this pipeline.

To retrieve the results of these operations, you must explicitly end your collection pipeline with `.all()`.


#### avg
The `avg` method returns the average of all collection items:

```js
await Collect([1, 2, 3, 4])
  .avg()

// 2,5
```


#### chunk
The `chunk` method splits the collection into multiple, smaller collections of a given size:

```js
await Collect([1, 2, 3, 4, 5, 6, 7, 8])
  .chunk(3)
  .all()

// [[1, 2, 3], [4, 5, 6], [7, 8]]
```


#### collapse
The `collapse` method collapses a collection of arrays into a single, flat collection.

```js
await Collect([[1], [{}, 'Marcus', true], [22]])
  .collapse()
  .all()

// [1, {}, 'Marcus', true, 22]
```


#### compact
The `compact` method removes all falsy values from the collection. For example, falsy values are `null`, `undefined`, `''`, `false`, `0`, `NaN`.

```js
await Collect([0, null, undefined, 1, false, 2, '', 3, NaN])
  .collapse()
  .all()

// [1, 2, 3]
```


#### concat
The `concat` method merges two or more collections. It returns a new collection with the concatenated items without changing the original collection:

```js
const collection = Collect([1, 2, 3])
const concat = collection.concat([4, 5])

await concat.all()

// [1, 2, 3, 4, 5]

await collection.all()

// [1, 2, 3]
```


#### diff
The `diff` method removes all values from the `collection` that are present in the given `array`.

```js
await Collect([1, 2, 3])
  .diff([2, 3, 4, 5])
  .all()

// [1]
```


#### every
The `every` method determines whether all items in the collection satisfy the testing function:

```js
await Collect([1, 2, 3])
  .every(item => item > 2)

// false
```

The `every` method supports async callbacks:

```js
await Collect([1, 2, 3])
  .every(async id => {
    const user = await User.findById(id)

    return !!user
  })

// true
```


#### filter
The `filter` method keeps all items in the collection satisfying the (async) testing function:

```js
await Collect([1, 2, 3])
  .filter(async id => {
    const user = await User.findById(id)

    return user.scope === 'admin'
  })
  .all()

// [ 1 ]
```

See the [`reject`](#reject) method for the inverse of `filter`.


#### filterSeries
The `filterSeries` method keeps all items in the collection satisfying the (async) testing function. It runs each check **in sequence**:

```js
await Collect([1, 2, 3])
  .filterSeries(async id => {
    const user = await User.findById(id)

    return user.scope === 'admin'
  })
  .all()

// [ 1 ]
```

See the [`rejectSeries`](#rejectseries) method for the inverse of `filterSeries`.


#### find
The `find` method returns the first item in the collection that satisfies the (async) testing function, `undefined` otherwise:

```js
const usernames = ['marcus', 'norman', 'christian']

await Collect(usernames)
  .find(async name => {
    // check if a user with the given `name` exists
    const user = await User.findByName(name)

    return !!user
  })

// 'marcus'
```

```info
The `!!` operator converts any data type to boolean by using a “doubled negation”. If the value of `user` is `undefined`, it will return `false`, otherwise `true`.
```


#### findSeries
The `findSeries` method returns the first item in the collection satisfying the (async) testing function, `undefined` otherwise. It runs all checks **in sequence**:

```js
const usernames = ['marcus', 'norman', 'christian']

await Collect(usernames)
  .findSeries(async name => {
    // imagine `fetchFromAPI` as function sending a request to an API
    return fetchFromAPI(name)
  })

// 'marcus'
```

The `findSeries` limits the number of parallel requests to the API.


#### first
The `first` method returns the first item in the collection. It won’t remove the item from the original collection:

```js
await Collect([ 1, 2, 3 ]).first()

// 1
```

You can also pass an (async) testing function as a parameter to the `first` method:

```js
await Collect([
  { id: 1, name: 'marcus' },
  { id: 3, name: 'marcus' }
]).first(async ({ name }) => {
  return await User.findByName(name)
})

// { id: 1, name: 'marcus' }
```


#### flatMap
The `flatMap` method invokes the (async) callback on each collection item. The callback can modify and return the item resulting in a new collection of modified items. Ultimately, `flatMap` flattens the mapped results:

```js
await Collect([1, 2, 3])
  .flatMap(async item => {
    return [item, item]
  })
  .all()

// [1, 1, 2, 2, 3, 3]
```


#### forEach
The `forEach` method invokes the (async) callback on each collection item. This method has no return value.

```js
await Collect(await queue.getActive())
  .forEach(async job => {
    await job.finished()
  })
```


#### forEachSeries
The `forEachSeries` method invokes the (async) callback on each collection item **in sequence**. This method has no return value.

```js
const files = [
  { tenantId: 1, name: '01-this-must-be-the-first-file.txt' },
  { tenantId: 1, name: '02-this-must-go-second.txt' }
]

await Collect(files)
  .forEachSeries(async ({ tenantId, name }) => {
    await Fs.writeFile(`./files/${tenantId}/${name}`)
  })
```


#### has
The `has` method returns `true` when the collection an item satisfying the argument or a callback function, otherwise `false`:

```js
await Collect([1, 2, 3]).has(1)

// true
```

You can also use a callback function to iterate through the list of items:

```js
await Collect([1, 2, 3]).has(item => item === 10)

// false

await Collect([
  { id: 1, name: 'Marcus' },
  { id: 2, name: 'Norman' },
  { id: 3, name: 'Christian' }
]).has(item => {
  return item.id === 1
})

// true
```


#### intersect
The `isEmpty` method removes all values from the `collection` that are not present in the given `array`.

```js
await Collect([1, 2, 3])
  .intersect([2, 3, 4, 5])
  .all()

// [2, 3]
```


#### isEmpty
The `isEmpty` method returns `true` when the collection is empty, otherwise `false`:

```js
await Collect([]).isEmpty()

// true
```


#### isNotEmpty
The `isNotEmpty` method returns `true` when the collection is not empty, otherwise `false`:

```js
await Collect([]).isNotEmpty()

// false
```


#### join
The `join` method joins all items in the collection using the given `str` and returns the resulting string value:

**Example**

```js
await Collect([10, 2, 3, 4])
  .join('-')

// '10-2-3-4'
```


#### last
The `last` method returns the last item in the collection, otherwise `undefined`. It won’t remove the item from the original collection:

```js
await Collect([ 1, 2, 3 ]).last()

// 3
```

You can also pass an (async) testing function as a parameter to the `last` method:

```js
await Collect([
  { id: 1, name: 'norman' },
  { id: 3, name: 'christian' }
  { id: 3, name: 'marcus' }
]).last(async ({ name }) => {
  return name === 'marcus'
})

// { id: 3, name: 'marcus' }
```


#### map
The `map` method invokes the (async) callback on each collection item and returns an array of transformed items. Because `map` return a collection instance, you could chain further operations. You must explicitly start processing by calling `.all()`:

```js
await Collect([1, 2, 3])
  .map(async item => {
    return item * 10
  })
  .all()

// [ 10, 20, 30 ]
```

```info
`map` invokes all transformations in parallel. If you want to run them in sequence, use [`mapSeries`](#mapseries).
```


#### mapSeries
The `mapSeries` method is like `map` running the given (async) callback on each collection item **in sequence**:

```js
const logfiles = [
  '2019-07-15.log',
  '2019-07-16.log',
  '2019-07-17.log'
]

await Collect(logfiles)
  .mapSeries(async file => {
    return { file, content: await Fs.readFile(file) }
  })
  .all()

// [ { file: '2019-07-15.log', content: '…' }, … ]
```

Consider the `mapSeries` method to ensure sequential processing of your items. The processing keeps the item order as present in the collection.

The example of reading the content of log files is a good candidate for sequential processing because it minimizes the disk load. Imagine the load on your file system when reading all log files in parallel (using `map`).

```info
`mapSeries` invokes all transformations in sequence. If you want to run them in parallel, use [`map`](#map).
```


#### max
The `max` method returns the max value in the collection:

```js
await Collect([1, 20, 3, 4])
  .max()

// 20
```


#### median
The `median` method returns the [median](https://en.wikipedia.org/wiki/Median) value of the collection:

```js
await Collect([4, 1, 37, 2, 1])
  .median()

// 2

await Collect([1, 2, 3, 4, 5, 6])
  .median()

// 3.5
```


#### min
The `min` method returns the min value in the collection:

```js
await Collect([10, 2, 3, 4])
  .min()

// 2
```


#### pop
The `pop` method removes and returns the last item from the collection. It changes the original collection:

```js
const collection = Collect([1, 2, 3])

await collection.pop()

// 3

await collection.all()

// [1, 2]
```


#### push
The `push` method appends one or more items to the end of the collection. It returns a new collection with the pushed items without changing the original collection:

```js
const collection = Collect([1, 2, 3])
const pushed = collection.push(4, 5)

await pushed.all()

// [1, 2, 3, 4, 5]

await collection.all()

// [1, 2, 3]
```


#### reduce
The `reduce` method invokes a(n async) reducer function on each array item, passing the result of each iteration to the subsequent iteration. The result is a reduced collection to a single value:

```js
await Collect([1, 2, 3])
  .reduce(async (carry, item) => {
    return carry + item
  }, 0)

// 6
```

The `reduce` method takes the initial value as a second argument. In the code snippet above, the initial value is `0`. Using `5` as the initial value returns a different result:

```js
await Collect([1, 2, 3])
  .reduce((carry, item) => {
    return carry + item
  }, 5)

// 11
```


#### reduceRight
The `reduceRight` method is similar to `reduce`, reducing a collection to a single value. It invokes a(n async) reducer function on each array item **from right-to-left**, passing the result of each iteration to the subsequent iteration:

```js
await Collect([1, 2, 3])
  .reduceRight(async (carry, item) => {
    return carry.concat(item)
  }, [])

// [3, 2, 1]
```

The `reduceRight` method takes the initial value as a second argument.


#### reject
The `reject` method removes all items from the collection satisfying the (async) testing function:

```js
await Collect([1, 2, 3, 4, 5])
  .reject(async item => {
    return item % 2 === 1 // true when odd
  })
  .all()

// [2, 4]
```

See the [`filter`](#filter) method for the inverse of `reject`.


#### rejectSeries
The `rejectSeries` method removes all items from the collection satisfying the (async) testing function. It runs each check **in sequence**:

```js
await Collect([1, 2, 3, 4, 5])
  .rejectSeries(async id => {
    const user = await User.findById(id)

    // remove users already subscribed to the newsletter
    return user.subscribedToNewsletter()
  })
  .all()

// [2, 3]
```

See the [`filterSeries`](#filterseries) method for the inverse of `rejectSeries`.


#### reverse
The `reverse` method reverses the collection. The first item becomes the last one, the second item becomes the second to last, and so on:

```js
await Collect([4, 6, 8, 9])
  .reverse()
  .all()

// [9, 8, 6, 4]
```


#### shift
The `shift` method removes and returns the first item from the collection. It changes the original collection:

```js
const collection = Collect([1, 2, 3])

await collection.shift()

// 1

await collection.all()

// [2, 3]
```


#### size
The `size` method returns the number of items in the collection:

```js
await Collect([1, 2, 3]).size()

// 3
```


#### slice
The `slice` method returns a slice of the collection starting at the given index without changing the collection:

```js
const collection = Collect([1, 2, 3, 4, 5, 6, 7])
const chunk = collection.slice(2)

await chunk.all()

// [3, 4, 5, 6, 7]

await collection.all()

// [1, 2, 3, 4, 5, 6, 7]
```

You can limit the size of the slice by passing a second argument to the `slice` method:

```js
const collection = Collect([1, 2, 3, 4, 5, 6, 7])
const chunk = collection.slice(2, 2)

await chunk.all()

// [3, 4]
```


#### splice
The `splice` method removes abd returns a slice of items from the collection starting at the given index:

```js
const collection = Collect([1, 2, 3, 4, 5])
const chunk = collection.splice(2)

await chunk.all()

// [3, 4, 5]

await collection.all()

// [1, 2]
```

You can limit the size of the slice by passing a second argument:

```js
const collection = Collect([1, 2, 3, 4, 5])
const chunk = collection.splice(2, 2)

await chunk.all()

// [3, 4]

await collection.all()

// [1, 2, 5]
```

You can replace the removed items by passing an array as the third argument:

```js
const collection = Collect([1, 2, 3, 4, 5])
const chunk = collection.splice(2, 2, [10, 11])

await chunk.all()

// [3, 4]

await collection.all()

// [1, 2, 10, 11, 5]
```


#### some
The `some` method determines whether at least one item from the collection satisfies the (async) testing function:

```js
await Collect([1, 2, 3])
  .some(item => {
    return item > 10
  })

// false
```

Notice that you have to `await` the result of `some()`, because it also supports async functions:

```js
await Collect([
  'https://superchargejs.com',
  'https://futurestud.io'
]).some(async uri => {
  // imagine `fetch` as a function sending a request to `uri`
  const { status } = await fetch(uri)

  return status === 200
})

// true
```


#### someSeries
The `someSeries` method determines whether at least one item from the collection satisfies, running the (async) testing function **in sequence**:

```js
const logfiles = [
  '2019-07-15.log',
  '2019-07-16.log',
  '2019-07-17.log'
]

await Collect(logfiles)
  .someSeries(async file => {
    const content = await Fs.readFile(file)

    return content.includes('youtube-bot')
  })

// false
```


#### sort
The `sort` method returns the sorted collection:

```js
await Collect([4, 1, 37, 2, 1])
  .sort()
  .all()

// [1, 1, 2, 4, 37]
```

The `sort` method accepts an optional comparator for custom sort operations:

```js
await Collect([4, 1, 37, 2, 1])
  .sort((a, b) => {
    return b - a
  })
  .all()

// [37, 4, 2, 1, 1]
```


#### sum
The `sum` method returns the sum of all collection items:

```js
await Collect([1, 2, 3, 4])
  .sum()

// 10
```


#### take
The `take` method returns a new Collection containing the specified number of items:

```js
const collection = Collect([1, 2, 3, 4, 5])
const chunk = collection.take(3)

await chunk.all()

// [1, 2, 3]

await collection.all()

// [1, 2, 3, 4, 5]
```

Use a negative integer to `take` items from the end of the collection:

```js
const collection = Collect([1, 2, 3, 4, 5])
const chunk = collection.take(-2)

await chunk.all()

// [4, 5]

await collection.all()

// [1, 2, 3, 4, 5]
```


#### takeAndRemove
The `takeAndRemove` method removes the specified number of items from the collection and returns them as a new Collection:

```js
const collection = Collect([1, 2, 3, 4, 5])
const chunk = collection.takeAndRemove(3)

await chunk.all()

// [1, 2, 3]

await collection.all()

// [4, 5]
```

Use a negative integer to `takeAndRemove` items from the end of the collection:

```js
const collection = Collect([1, 2, 3, 4, 5])
const chunk = collection.takeAndRemove(-2)

await chunk.all()

// [4, 5]

await collection.all()

// [1, 2, 3]
```


#### toJSON
The `toJSON` method creates a JSON string from the values of the collection:

```js
await Collect([1, 2, 3])
  .toJSON()

// "[1,2,3]"

await Collect([{ name: 'Marcus'}])
  .toJSON()

// "[{"name":"Marcus"}]"
```


#### union
The `union` method adds all values from the array to the underlying collection and removes duplicates:

```js
await Collect([1, 2, 3])
  .union([2, 3, 4, 5])
  .all()

// [1, 2, 3, 4, 5]
```


#### unshift
The `unshift` method adds one or more elements to the beginning of the collection. It returns the new collection containing the added items:

```js
await Collect([1, 2, 3])
  .unshift(5, 6)
  .all()

// [5, 6, 1, 2, 3]
```
