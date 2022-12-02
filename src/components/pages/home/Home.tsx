import * as React from 'react';
import { EditorAndVideoGenerator } from './EditorAndVideoGenerator';
import { Hero } from './Hero';

export function Home () {
  return (
    <>
        <Hero/>
        <EditorAndVideoGenerator/>
    </>
  );
}
