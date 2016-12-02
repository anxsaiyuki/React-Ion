import React from 'react';
import _ from 'lodash';
import { setSelected } from '../actions/selected';
import Block from '../containers/user_component/Block';
import Text from '../containers/user_component/Text';
import Menu from '../containers/user_component/Menu';
import Image from '../containers/user_component/Image';
import List from '../containers/user_component/List';
import Radio from '../containers/user_component/Radio';
import DropDown from '../containers/user_component/DropDown';
import Carousel from '../containers/user_component/Carousel';

const BLOCK_COMPONENT = 'Block';
const TEXT_COMPONENT = 'Text';
const MENU_COMPONENT = 'Menu';
const IMAGE_COMPONENT = 'Image';
const LIST_COMPONENT = 'List';
const RADIO_COMPONENT = 'Radio';
const DROPDOWN_COMPONENT = 'DropDown';
const PHOTO_CAROUSEL_COMPONENT = 'Carousel';

export function getValue(key, id, routes) {
  let value;

  (function search(tree) {
    if (tree.id === id) {
      value = tree.props[key];
    } else { tree.children.forEach(child => search(child)); }
  }(routes[0]));

  return value;
}

export function linkTo(path) {
  window.location.href = `/${path}`;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function makeComponentName(string) {
  return string.split(' ').map(word => capitalizeFirstLetter(word)).join('');
}

export function mapComponents(components, selected) {
  const mapped = [];

  _.each(components, (c) => {
    switch (c.componentType) {
      case BLOCK_COMPONENT:
        mapped.push(
          <Block
            setSelected={() => setSelected()}
            key={c.id}
            id={c.id}
            selected={selected}
            aUrl={c.aUrl}
            tag={c.aUrl ? 'a' : 'div'}
            {...c.props}
          >
            {c.children ? mapComponents(c.children, selected) : null}
          </Block>,
        );
        break;
      case TEXT_COMPONENT:
        mapped.push(
          <Text
            setSelected={() => setSelected()}
            key={c.id}
            id={c.id}
            selected={selected}
            {...c.props}
          >
            {c.children ? mapComponents(c.children, selected) : null}
          </Text>,
        );
        break;
      case MENU_COMPONENT:
        mapped.push(
          <Menu
            setSelected={() => setSelected()}
            key={c.id}
            id={c.id}
            selected={selected}
            {...c.props}
          />,
        );
        break;
      case IMAGE_COMPONENT:
        mapped.push(
          <Image
            setSelected={() => setSelected()}
            key={c.id}
            id={c.id}
            selected={selected}
            {...c.props}
          />,
        );
        break;
      case LIST_COMPONENT:
        mapped.push(
          <List
            setSelected={() => setSelected()}
            key={c.id}
            id={c.id}
            selected={selected}
            {...c.props}
          >
            {c.children ? mapComponents(c.children, selected) : null}
          </List>,
        );
        break;
      case RADIO_COMPONENT:
        mapped.push(
          <Radio
            setSelected={() => setSelected()}
            key={c.id}
            id={c.id}
            selected={selected}
            {...c.props}
          >
            {c.children ? mapComponents(c.children, selected) : null}
          </Radio>,
        );
        break;
      case DROPDOWN_COMPONENT:
        mapped.push(
          <DropDown
            setSelected={() => setSelected()}
            key={c.id}
            id={c.id}
            selected={selected}
            {...c.props}
          >
            {c.children ? mapComponents(c.children, selected) : null}
          </DropDown>,
        );
        break;
      case PHOTO_CAROUSEL_COMPONENT:
        mapped.push(
          <Carousel
            {...c.props}
            setSelected={() => setSelected()}
            key={c.id}
            id={c.id}
            selected={selected}
          >
            {c.children ? mapComponents(c.children, selected) : null}
          </Carousel>,
        );
        break;
      default:
        break;
    }
  });

  return mapped;
}

export function rebuildTree(tree) {
  const newTree = _.cloneDeep(tree);
  newTree.children.forEach((child) => {
    child.parent = this;
    rebuildTree(child);
  });

  return newTree;
}

export function createCookie(name, value, time) {
  let expires;
  if (time) {
    const date = new Date();
    date.setTime(`${date.getTime()}${time * 1000}`);
    expires = `; expires=${date.toGMTString()}`;
  } else {
    expires = '';
  }
  document.cookie = `${name}=${value}${expires}; path=/`;
}
