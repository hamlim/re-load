# re-load

Re-load is a react component for handling (psuedo-)async loading states.

## Example

```jsx
import Reload from '@matthamlin/re-load'

let src = 'https://my-cool-img-resource.com/img.jpg'

render(
  <Reload
    propName="src"
    src={src}
    resolver={() =>
      new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = () => resolve(img)
        img.onerror = () => reject('Failed to load the image resource :(')
        img.src = src
      })
    }
  >
    {({ src, meta }) =>
      src === null ? (
        <p> Image Loading ... </p>
      ) : (
        <img
          src={src}
          height={meta.height}
          width={meta.width}
          alt="My Cool Image"
        />
      )
    }
  </Reload>,
)
```

## API

### Props

- `propName` [Required] The name of the prop that will be resolved
- `resolver` An optional function that returns a promise, the value resolved will be set to the `meta` key in the callback, and the value rejected will be set to the `error` key in the callback
- `delay` An optional delay used if `resolver` isn't provided
- `children` [Required] The callback render function for Reload, it is called with an object containing the following:

```js
{
  [this.props.propName]: null | any,
  meta?: any,
  error?: any
}
```
