[![Build Status](https://travis-ci.org/mfrachet/rn-displayable.svg?branch=master)](https://travis-ci.org/mfrachet/rn-displayable)
[![Coverage Status](https://coveralls.io/repos/github/mfrachet/rn-displayable/badge.svg?branch=master)](https://coveralls.io/github/mfrachet/rn-displayable?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Make your component visible with animations and a set of rules or simple props

# Content

- <a href="#installation">Installation</a>
- <a href="#props">Display content with simple props</a>
- <a href="#rules">Display content using business rules</a>
- <a href="#animation">Make the transition beautiful with animation</a>

# Usage

<h3 name="installation">Installation</h3>

```shell
$ yarn add rn-displayable
```

### In your code

<h4 name="props">Usage with primitive props</h4>

```javascript
/* react stuff... */
import { makeDisplayable, makeVisible } from "rn-displayable";

const DisplayableText = makeDisplayable(Text);
const VisibleText = makeVisible(Text);

export default function() {
  return (
    <View>
      <DisplayableText isDisplayed>This is displayed</DisplayableText>
      <DisplayableText>This is NOT displayed</DisplayableText>

      <VisibleText isVisible>This is visible</VisibleText>
      <VisibleText isVisible>This is NOT visible</VisibleText>
    </View>
  );
}
```

**Why two different ways to handle the same thing?**

The `makeDisplayable` HoC allows to **create** and **remove** the view on the native part. The view doesn't exist anymore. This operation has a cost in React Native: multiple messages go across the bridge and can lead to slowness.

The `makeVisible` on the other side only deals with `style` under the hood. It's better in term of performances because the element always exist and is not recreated each time it's displayed: it only changes its style.

<h4 name="rules">Using rules</h4>

```javascript
/* react stuff... */
import { makeDisplayable, makeVisible } from "rn-displayable";

const isBiggerThan5 = props => props.number > 5;
const isBiggerThan10 = props => props.number > 10;

const rules = [isBiggerThan5, isBiggerThan10];

const DisplayableText = makeDisplayable(Text);
const VisibleText = makeVisible(Text);

export default function() {
  return (
    <View>
      <DisplayableText number={3} rules={rules}>
        This is not displayed ! (first rule not resolved)
      </DisplayableText>

      <DisplayableText number={12} rules={rules}>
        This is displayed !
      </DisplayableText>

      <VisibleText number={8} rules={rules}>
        This is not visible ! (second rule not resolved)
      </VisibleText>

      <VisibleText number={15} rules={rules}>
        This is visible !
      </VisibleText>
    </View>
  );
}
```

<h4 name="animation">Usage with Animation</h4>

The library provides a `Animation` prop with the HoC. This animation is playing while _entering_ (in the future, a leaving animation will be added).

Here's a little example:

```javascript
const CustomFade = ({ children }) => {
  const animation = new Animated.Value(0);

  Animated.timing(animation, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true
  }).start();

  const style = { opacity: animation };
  return <Animated.View style={style}>{children}</Animated.View>;
};

/* ... */
const SomeComponent = ({ isVisible }) => (
  <VisibleView isVisible={isVisible} Animation={CustomFade}>
    <Text>Appearing with a wonderful (\o/) opacity animation</Text>
  </VisibleView>;
)
```
