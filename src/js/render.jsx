// @flow

import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
// <Heading>コンポーネントを読み込む
import Heading from './heading';
// CSSファイルを読み込む
import '../css/index.css';

export class Render {
  constructor(targetId: string) {
    // コンポーネントを出力するDOMを取得する
    const target = document.getElementById(targetId);
    if (target != null) {
      this.render(target);
    }
  }

  render(target: HTMLElement) {
    ReactDOM.render(<Heading name="Frontend" />, target);
  }
}

export default hot(new Render('frontend'));
