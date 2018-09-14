[![Build Status](https://travis-ci.org/mfrachet/rn-displayable.svg?branch=master)](https://travis-ci.org/mfrachet/rn-displayable)
[![Coverage Status](https://coveralls.io/repos/github/mfrachet/rn-displayable/badge.svg?branch=master)](https://coveralls.io/github/mfrachet/rn-displayable?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Display your components based on props or a set of rules.

### Installation

```shell
$ yarn add rn-displayable

# or

$ npm install rn-displayable --save
```

### In your code

#### `isDisplayed` props

The following code connect the `Text` component via an `HoC` to provide a
`isDisplayed` props.

By default, the component is hidden.

To display a component, simply add the `isDisplayed` props to the connected
component:

```javascript
/* react stuff... */
import displayable from "rn-displayable";

const DisplayableText = displayable(Text);

export default function() {
  return (
    <View>
      <DisplayableText isDisplayed>This is displayed</DisplayableText>
      <DisplayableText>This is NOT displayed</DisplayableText>
    </View>
  );
}
```

#### Using rules

It's quite common to display or hide components based on business logic. This
module also helps to display or not component by using an array of rules. The
module expect each function to accept the component props as argument and to
return a boolean value:

```javascript
/* react stuff... */
import displayable from "rn-displayable";

const isBiggerThan5 = props => props.number > 5;
const isBiggerThan10 = props => props.number > 10;

const rules = [isBiggerThan5, isBiggerThan10];

const DisplayableText = displayable(Text);

export default function() {
  return (
    <View>
      <DisplayableText number={3} rules={rules}>
        This is not displayed ! (first rule not resolved)
      </DisplayableText>

      <DisplayableText number={8} rules={rules}>
        This is not displayed ! (second rule not resolved)
      </DisplayableText>

      <DisplayableText number={12} rules={rules}>This is displayed !</DisplayableText>
    </View>
  );
}
```
