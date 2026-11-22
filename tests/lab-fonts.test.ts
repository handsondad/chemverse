import { describe, expect, it } from 'vitest';
import { parseFontCss, pickChunks } from '../src/learning/lab-fonts';

const CSS = `
/* [118] */
@font-face {
  font-family: 'Ma Shan Zheng';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/mashanzheng/v1/a.118.woff2) format('woff2');
  unicode-range: U+4e00-4e09, U+6c34;
}
/* [119] */
@font-face {
  font-family: 'Ma Shan Zheng';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/mashanzheng/v1/a.119.woff2) format('woff2');
  unicode-range: U+8840;
}
/* latin */
@font-face {
  font-family: 'Comic Neue';
  font-style: normal;
  font-weight: 700;
  src: url(https://fonts.gstatic.com/s/comicneue/v1/b.woff2) format('woff2');
  unicode-range: U+00??, U+2000-206F;
}
`;

describe('lab fonts handed to the sandboxed lab', () => {
  it('reads every chunk with its family, weight and unicode-range', () => {
    const chunks = parseFontCss(CSS);
    expect(chunks.map(chunk => [chunk.family, chunk.weight, chunk.url.split('/').pop()])).toEqual([
      ['Ma Shan Zheng', '400', 'a.118.woff2'],
      ['Ma Shan Zheng', '400', 'a.119.woff2'],
      ['Comic Neue', '700', 'b.woff2'],
    ]);
    expect(chunks[2].ranges).toEqual([[0x0, 0xff], [0x2000, 0x206f]]);
  });

  it('picks only the chunks whose characters appear in the text', () => {
    const chunks = parseFontCss(CSS);
    expect(pickChunks(chunks, '水').map(chunk => chunk.url.split('/').pop())).toEqual(['a.118.woff2']);
    expect(pickChunks(chunks, 'a 一').map(chunk => chunk.url.split('/').pop())).toEqual(['a.118.woff2', 'b.woff2']);
    expect(pickChunks(chunks, '火')).toEqual([]);
  });
});
